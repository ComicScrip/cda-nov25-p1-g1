import * as fs from "fs";
import * as path from "path";
import readline from "readline";

const relationsDir = path.join(__dirname, "cat_relations");
const catList = ["action", "lieu", "outil", "vivant", "matière", "objet", "tout"] as const;

type Category = typeof catList[number];
const relationFileNames = [
    "isa.cr",
    "hypo.cr",
    "holo.cr",
    "lieu.cr",
    "lieu2.cr",
    "instr2.cr",
    "instr.cr",
    "agent.cr",
    "mater.cr",
] as const;

type RelationFileName = typeof relationFileNames[number];

function createFileStream(
    filePath: string,
    options?: fs.ReadStreamOptions,
): fs.ReadStream {
    const mergedOptions: fs.ReadStreamOptions = {
        encoding: "utf8",
        ...options,
    };
    return fs.createReadStream(filePath, mergedOptions);
}

function createReadline(filePath: string): readline.Interface {
    const stream = createFileStream(filePath);
    return readline.createInterface({
        input: stream,
        crlfDelay: Infinity,
    });
}

async function readLines(
    filePath: string,
    onLine: (line: string) => boolean | Promise<boolean>,
): Promise<void> {
    const rl = createReadline(filePath);
    try {
        for await (const line of rl) {
            const stop = await onLine(line);
            if (stop) {
                break;
            }
        }
    } finally {
        rl.close();
    }
}

type RelationMatches = Map<RelationFileName, boolean>;

async function basicMatches(word: string): Promise<RelationMatches> {
    const normalize = word.trim().toLowerCase();
    const matches = new Map<RelationFileName, boolean>();

    for (const fileName of relationFileNames) {
        const filePath = path.join(relationsDir, fileName);
        await readLines(filePath, (line) => {
            const cleaned = line.trim();
            if (!cleaned || cleaned.startsWith("****") || cleaned.startsWith("***")) {
                return false;
            }
            const [firstFieldRaw] = cleaned.split(/\s*;\s*/g);
            const firstField = firstFieldRaw?.trim().toLowerCase();
            if (!firstField || firstField !== normalize) {
                return false;
            }
            matches.set(fileName, true);
            return true;
        });
    }

    return matches;
}

async function finalGuess(words: string[], fileName: string): Promise<boolean> {
    const filePath = path.join(relationsDir, fileName);
    const normalized = words.map((w) => w.trim()).filter(Boolean);
    let found = false;
    const boundary = String.raw`(?:^|[^\p{L}\p{N}_])`;
    const escapeRegExp = (value: string): string =>
        value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

    await readLines(filePath, (line) => {
        const cleaned = line.trim();
        if (!cleaned || cleaned.startsWith("***")) {
            return false;
        }
        if (
            normalized.every((word) => {
                const pattern = `${boundary}${escapeRegExp(word)}${boundary}`;
                return new RegExp(pattern, "iu").test(cleaned);
            })
        ) {
            found = true;
            console.log(`Final guess found in ${fileName}: ${cleaned}`);
            return true;
        }
        return false;
    });
    return found;
}

function bestScore(scores: Map<Category, number>): Category {
    let max = -Infinity;
    let best: Category | null = null;
    let tie = false;

    for (const [cat, value] of scores) {
        if (value > max) { max = value; best = cat; tie = false; } else if (value === max) { tie = true; }
    }
    return tie || best === null ? "tout" : best;
}

export async function findCategory(word: string): Promise<Category> {
    const matches = await basicMatches(word);
    console.log(`Matches for "${word}":`, matches);
    const scores = new Map<Category, number>(catList.map(cat => [cat, 0]));

    if (matches.get("isa.cr") || matches.get("agent.cr") || matches.get("instr.cr")) {
        scores.set("action", (scores.get("action") ?? 0) + 1);

        if (await finalGuess([word, "action"], "isa.cr")) {
            scores.set("action", (scores.get("action") ?? 0) + 1);
        }

    }
    if (matches.get("isa.cr") && matches.get("lieu.cr") && matches.get("lieu2.cr")) {
        scores.set("lieu", (scores.get("lieu") ?? 0) + 1);

        if (await finalGuess([word, "lieu"], "isa.cr")) {
            scores.set("lieu", (scores.get("lieu") ?? 0) + 1);
        }
        if (await finalGuess([word, "lieu"], "hypo.cr")) {
            scores.set("lieu", (scores.get("lieu") ?? 0) + 1);
        }
    }
    if (matches.get("isa.cr") && matches.get("instr2.cr") && matches.get("instr.cr")) {
        scores.set("outil", (scores.get("outil") ?? 0) + 1);

        if (await finalGuess([word, "outil"], "isa.cr")) {
            scores.set("outil", (scores.get("outil") ?? 0) + 1);
        }
        if (await finalGuess([word, "outil"], "hypo.cr")) {
            scores.set("outil", (scores.get("outil") ?? 0) + 1);
        }

    }
    if (matches.get("isa.cr") && matches.get("hypo.cr")) {
        scores.set("vivant", (scores.get("vivant") ?? 0) + 1);

        if (await finalGuess([word, "vivant"], "isa.cr")) {
            scores.set("vivant", (scores.get("vivant") ?? 0) + 1);
        }
        if (await finalGuess([word, "animal"], "isa.cr")) {
            scores.set("vivant", (scores.get("vivant") ?? 0) + 1);
        }
        if (await finalGuess([word, "mammifère"], "isa.cr")) {
            scores.set("vivant", (scores.get("vivant") ?? 0) + 1);
        }

    }
    if (matches.get("isa.cr") && matches.get("mater.cr")) {
        scores.set("matière", (scores.get("matière") ?? 0) + 1);

        if (await finalGuess([word, "matière"], "isa.cr")) {
            scores.set("matière", (scores.get("matière") ?? 0) + 1);
        }
        if (await finalGuess([word, "matière"], "hypo.cr")) {
            scores.set("matière", (scores.get("matière") ?? 0) + 1);
        }


    }
    if (matches.get("isa.cr") && matches.get("hypo.cr") && matches.get("holo.cr")) {
        scores.set("objet", (scores.get("objet") ?? 0) + 1);

        if (await finalGuess([word, "objet"], "isa.cr")) {
            scores.set("objet", (scores.get("objet") ?? 0) + 1);
        }
        if (await finalGuess([word, "objet"], "hypo.cr")) {
            scores.set("objet", (scores.get("objet") ?? 0) + 1);
        }

    }


    console.log(`Scores for "${word}":`, scores);

    return bestScore(scores);


}

findCategory("abaisser").then(cat => console.log(`Catégorie deux "abaisser": ${cat}`));
