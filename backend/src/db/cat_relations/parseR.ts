import * as fs from "fs";
import * as path from "path";
import readline from "readline";
import he from "he";

type NormalizeMode = "line" | "term";

function normalizeText(raw: string, mode: NormalizeMode): string {
    const cleaned = he.decode(raw)
        .replace(/\s+/g, " ")
        .trim();
    if (mode === "line") {
        return cleaned;
    }
    return cleaned
        .replace(/^[+-]\s+/, "")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase();
}

function createReadline(filePath: string): readline.Interface {
    const stream = fs.createReadStream(filePath, { encoding: "latin1" });
    return readline.createInterface({
        input: stream,
        crlfDelay: Infinity,
    });
}

async function parseFile(filePath: string): Promise<void> {
    const outPath = filePath.replace(/\.r$/i, ".cr");
    const output = fs.createWriteStream(outPath, { encoding: "utf8" });
    const rl = createReadline(filePath);

    try {
        for await (const line of rl) {
            const cleaned = normalizeText(line, "line");
            const normalized = cleaned
                .replace(/-/g, " ")
                .replace(/>/g, " ")
                .replace(/\s{2,}/g, " ")
                .trim();
            output.write(`${normalized}\n`);
        }
    } finally {
        rl.close();
        output.end();
    }
}

async function parseAll(): Promise<void> {
    const dir = __dirname;
    const entries = await fs.promises.readdir(dir);
    const files = entries
        .filter((name) => name.endsWith(".r"))
        .map((name) => path.join(dir, name));

    for (const filePath of files) {
        await parseFile(filePath);
    }
}

parseAll().catch((err) => {
    console.error(err);
    process.exitCode = 1;
});
