import * as fs from "fs";
import * as path from "path";
import { In } from "typeorm";
import dataSource from "./db";
import { Synonyme } from "./entities/Synonyme";
import { Word } from "./entities/Word";

async function main() {
    const synsets = new Set<number>([35399, 9337]);
    const filePath = path.join(__dirname, "parsed_files", "chat.syn");
    const defaultCategory = "Tout";

    const raw = fs.readFileSync(filePath, { encoding: "utf-8" });
    const lines = raw.split("\n").map((line) => line.trim()).filter(Boolean);
    const uniqueLabels = Array.from(new Set(lines));

    await dataSource.initialize();
    const wordRepo = dataSource.getRepository(Word);
    const synRepo = dataSource.getRepository(Synonyme);

    const existingWords = await wordRepo.findBy({ label: In(uniqueLabels) });
    const existingByLabel = new Map(existingWords.map((word) => [word.label, word]));

    const wordsToCreate: Word[] = [];
    for (const label of uniqueLabels) {
        const existing = existingByLabel.get(label);
        if (existing) {
            synsets.add(existing.idWord);
            continue;
        }
        const length = label.length;
        const difficulty =
            length === 4 ? "Facile" : length <= 6 ? "Moyen" : "Difficile";

        const created = wordRepo.create({
            label,
            difficulty,
            category: defaultCategory,
        });
        wordsToCreate.push(created);
    }

    if (wordsToCreate.length > 0) {
        const savedWords = await wordRepo.save(wordsToCreate);
        for (const word of savedWords) {
            synsets.add(word.idWord);
        }
    }

    if (synsets.size === 0) {
        console.log("Aucun mot trouvé pour créer un synset.");
        await dataSource.destroy();
        return;
    }

    const words = await wordRepo.findBy({ idWord: In([...synsets]) });
    const syn = synRepo.create({ words });
    await synRepo.save(syn);

    console.log(`Synset créé avec ${words.length} mots.`);
    await dataSource.destroy();
}

main().catch((err) => {
    console.error(err);
});
