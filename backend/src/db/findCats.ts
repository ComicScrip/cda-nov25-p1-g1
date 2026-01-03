import * as fs from "fs";
import * as path from "path";
import readline from "readline";

const relationsDir = path.join(__dirname, "cat_relations");
const catList = ["action", "lieu", "outil", "vivant", "matière", "objet", "abstrait"] as const;

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
        encoding: "latin1",
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
    onLine: (line: string) => void | Promise<void>,
): Promise<void> {
    const rl = createReadline(filePath);
    try {
        for await (const line of rl) {
            await onLine(line);
        }
    } finally {
        rl.close();
    }
}

type RelationMatches = Map<RelationFileName, Set<string>>;

async function collectMatches(word: string): Promise<RelationMatches> {
    const normalizedWord = word.trim().toLowerCase();
    const matches = new Map<RelationFileName, Set<string>>();

    for (const fileName of relationFileNames) {
        const filePath = path.join(relationsDir, fileName);
        await readLines(filePath, (line) => {
            const cleaned = line.trim();
            if (!cleaned || cleaned.startsWith("****") || cleaned.startsWith("***")) {
                return;
            }
            const tokens = cleaned
                .split(/\s*;\s*/g)
                .map((token) => token.trim().toLowerCase())
                .filter(Boolean);

            if (!tokens.includes(normalizedWord)) {
                return;
            }
            const entry = matches.get(fileName) ?? new Set<string>();
            for (const token of tokens) {
                entry.add(token);
            }
            matches.set(fileName, entry);
        });
    }

    return matches;
}

export async function findCategory(word: string): Promise<Category> {
    const matches = await collectMatches(word);
    const hasSource = (fileName: RelationFileName, targetTerm?: string): boolean => {
        const terms = matches.get(fileName);
        if (!terms || terms.size === 0) {
            return false;
        }
        return targetTerm ? terms.has(targetTerm.trim().toLowerCase()) : true;
    };
    const hasTarget = (fileName: RelationFileName, targetTerm?: string): boolean =>
        hasSource(fileName, targetTerm);

    if (hasSource("isa.cr", "action") || hasSource("agent.cr") || hasSource("instr.cr")) {
        return "action";
    }
    if (hasSource("isa.cr", "lieu") || hasSource("lieu.cr") || hasSource("lieu2.cr")) {
        return "lieu";
    }
    if (
        hasSource("isa.cr", "outil")
        || hasSource("isa.cr", "instrument")
        || hasSource("instr2.cr")
        || hasTarget("instr.cr")
    ) {
        return "outil";
    }
    if (hasSource("isa.cr", "animal") || hasSource("isa.cr", "humain")) {
        return "vivant";
    }
    if (hasSource("isa.cr", "matiere") || hasTarget("mater.cr")) {
        return "matière";
    }
    if (hasSource("isa.cr", "objet") || hasSource("holo.cr")) {
        return "objet";
    }
    if (hasSource("hypo.cr", "outil")) return "outil";
    if (hasSource("hypo.cr", "lieu")) return "lieu";
    if (hasSource("hypo.cr", "animal")) return "vivant";
    if (hasSource("hypo.cr", "matiere")) return "matière";
    if (hasSource("hypo.cr", "objet")) return "objet";
    if (hasSource("lieu2.cr")) return "lieu";
    if (hasSource("agent.cr")) return "vivant";
    //pas de chance ...
    return "abstrait";
}

findCategory("chien").then(cat => console.log(`Catégorie de "chien": ${cat}`));
//Catégorie de "chien": action 
//Bon toutou...