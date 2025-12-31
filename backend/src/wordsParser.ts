import * as path from "path";
import * as fs from "fs";

async function lycosGoFetch(stick: string): Promise<string> {

    const response = await fetch(stick)
    const buff = await response.arrayBuffer();
    const text = new TextDecoder("latin1").decode(buff)
    return text;
}

function saveToFile(file: string, outputDir: string, text: string) {
    fs.mkdirSync(outputDir, { recursive: true });
    fs.writeFileSync(file, text, { encoding: "utf-8" });
    console.log(`Copy to ${file}`);
}

function getDefinition(raw: string): string | null {
    const match = raw.match(/<def>([\s\S]*?)<\/def>/i);
    if (!match) return null;
    let def = match[1];
    def = def.replace(/<br\s*\/?>/gi, "\n");
    def = def.replace(/\n+/g, "\n").trim();

    // ya de la def super...maintenant on garde juste le début numéroté.
    const numberedLines = def
        .split("\n")
        .map((line) => line.trim())
        .filter((line) => /^\d+\.\s+/.test(line));

    return numberedLines.length > 0 ? numberedLines.join("\n") : def;
}

function getSyn(raw: string): string[] {
    const lines = raw.split("\n");
    const results: string[] = [];

    for (const line of lines) {
        const match = line.match(/^e;\d+;'([^']+)';1;\d+/);
        if (!match) continue;

        const rawTerm = match[1];
        const normalized = rawTerm
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase();

        if (!/^[a-z]{4,}$/.test(normalized)) continue;
        results.push(normalized);
    }

    return results;
}





async function main() {
    const mot = "chat";



    const url = `http://www.jeuxdemots.org/rezo-dump.php?gotermsubmit=Chercher&gotermrel=${encodeURIComponent(mot)}`;
    const outputDir = path.join(__dirname, "dump_html");
    const file = path.join(outputDir, `${mot}.html`);

    const useFetch = false;
    const sourceFile = "chat.html";

    let raw: string;
    if (useFetch) {
        raw = await lycosGoFetch(url);
        await saveToFile(file, outputDir, raw);
    } else {
        const inputFile = path.join(outputDir, sourceFile);
        raw = fs.readFileSync(inputFile, { encoding: "utf-8" });
    }
    const definition = getDefinition(raw);
    console.log(`Definition of ${mot}:\n${definition}`);

    const synonyms = getSyn(raw);
    if (synonyms.length > 0) {
        const parsedDir = path.join(__dirname, "parsed_files");
        const synFile = path.join(parsedDir, `${mot}.syn`);
        saveToFile(synFile, parsedDir, synonyms.join("\n"));
    }
}


main();
