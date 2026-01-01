import * as fs from "fs";
import * as path from "path";
import { In } from "typeorm";
import dataSource from "./db";
import { Synonyme } from "./entities/Synonyme";
import { Word } from "./entities/Word";

async function main() {
    const synsets: number[] = [35399, 9337];
    const filePath = path.join(__dirname, "parsed_files", "chat.syn");

    const raw = fs.readFileSync(filePath, { encoding: "utf-8" });
    const lines = raw.split("\n").map((line) => line.trim()).filter(Boolean);

    await dataSource.initialize();
    const wordRepo = dataSource.getRepository(Word);
    const synRepo = dataSource.getRepository(Synonyme);

    for (const label of lines) {
        const existing = await wordRepo.findOne({ where: { label } });
        if (existing && !synsets.includes(existing.idWord)) {
            synsets.push(existing.idWord);
        }
    }

    if (synsets.length === 0) {
        console.log("Aucun mot trouvé pour créer un synset.");
        await dataSource.destroy();
        return;
    }

    const words = await wordRepo.findBy({ idWord: In(synsets) });
    const syn = synRepo.create({ words });
    await synRepo.save(syn);

    console.log(`Synset créé avec ${words.length} mots.`);
    await dataSource.destroy();
}

main().catch((err) => {
    console.error(err);
});
