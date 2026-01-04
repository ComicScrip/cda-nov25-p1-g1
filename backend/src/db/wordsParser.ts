import * as path from "path";
import * as fs from "fs";


function sleep(seconds: number): Promise<void> {
    return new Promise(resolve => {
        setTimeout(resolve, seconds * 1000);
    });
}


async function lycosGoFetch(stick: string): Promise<string> {

    const response = await fetch(stick)
    const buff = await response.arrayBuffer();
    const text = new TextDecoder("utf-8").decode(buff)
    return text;
}

function saveToFile(file: string, outputDir: string, text: string) {
    fs.mkdirSync(outputDir, { recursive: true });
    fs.writeFileSync(file, text, { encoding: "utf-8" });
    //console.log(`Copy to ${file}`);
}

function getDescription(raw: string): string | null {
    const match = raw.match(/<def>([\s\S]*?)<\/def>/i);
    if (!match) return null;
    let def = match[1];
    def = def.replace(/<br\s*\/?>/gi, "\n");
    def = def.replace(/\n+/g, "\n").trim();

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
        if (/^en:/i.test(rawTerm)) continue;
        const normalized = rawTerm
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase();

        if (!/^[a-z]{4,}$/.test(normalized)) continue;
        results.push(normalized);
    }

    return results;
}

function formatSeedWord(word: SeedWord): string {
    const label = JSON.stringify(word.label);
    const description = JSON.stringify(word.description);
    const difficulty = JSON.stringify(word.difficulty);
    return `  { label: ${label}, description: ${description}, difficulty: ${difficulty}, category: "Tout" },\n`;
}

function appendSeedWord(filePath: string, word: SeedWord): void {
    const header = "export const seedWords = [\n";
    const footer = "\n];\n";
    if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, `${header}${footer}`, { encoding: "utf-8" });
    }
    const entry = formatSeedWord(word);
    const fd = fs.openSync(filePath, "r+");
    try {
        const stats = fs.fstatSync(fd);
        const size = stats.size;
        const footerBytes = Buffer.from(footer, "utf-8");
        const readLen = Math.min(footerBytes.length, size);
        const tailBuf = Buffer.alloc(readLen);
        fs.readSync(fd, tailBuf, 0, readLen, size - readLen);
        const tail = tailBuf.toString("utf-8");
        const writePos = tail === footer ? size - readLen : size;
        fs.writeSync(fd, entry + footer, writePos, "utf-8");
    } finally {
        fs.closeSync(fd);
    }
}

type SeedWord = {
    label: string;
    description: string;
    difficulty: string;
    category: "Tout";
};

async function main() {
    const listFile = path.join(__dirname, "listeMotsFr.small");
    const seedFile = path.join(__dirname, "seedWordsSmall.ts");
    const words = fs
        .readFileSync(listFile, { encoding: "utf-8" })
        .split(/\r?\n/)
        .map((line) => line.trim())
        .filter(Boolean);

    for (const mot of words) {
        //console.log(`Processing word: ${mot}`);

        const url = `http://www.jeuxdemots.org/rezo-dump.php?gotermsubmit=Chercher&gotermrel=${encodeURIComponent(mot)}`;

        const mln = mot.length;
        const difficulty =
            mln === 4 ? "Facile" : mln <= 6 ? "Moyen" : "Difficile";

        let raw: string;
        try {
            raw = await lycosGoFetch(url);
        } catch (error) {
            console.log(`skip No data found for ${mot} cause fetch error`);
            await sleep(10);
            continue;
        }

        let description = getDescription(raw);
        //console.log(`description of ${mot}:\n${description}`);

        let synonyms = getSyn(raw);

        if (!description && synonyms.length === 0) {
            console.log(`skip No data found for ${mot}.`);
            //console.log('raw content was:', raw);
            await sleep(10);
            continue;
        }

        if (!description) { description = ""; }

        if (synonyms.length > 0) {
            //console.log("found synonyms:", synonyms.length);
            const parsedDir = path.join(__dirname, "parsed_files");
            const synFile = path.join(parsedDir, `${mot}.syn`);
            saveToFile(synFile, parsedDir, synonyms.join("\n"));
        }
        appendSeedWord(seedFile, {
            label: mot,
            description: description,
            difficulty: difficulty,
            category: "Tout",
        });


        console.log(`Processed word: ${mot}`);
        await sleep(5);

    }

}


main();
