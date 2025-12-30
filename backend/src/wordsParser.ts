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
    return def;
}


async function main() {
    const mot = "marteau";
    const url = `http://www.jeuxdemots.org/rezo-dump.php?gotermsubmit=Chercher&gotermrel=${encodeURIComponent(mot)}`;
    const outputDir = path.join(__dirname, "parsed_files");
    const file = path.join(outputDir, `${mot}.parsed`);
    const response = await lycosGoFetch(url);
    //await saveToFile(file, outputDir, response);
    const definition = getDefinition(response);

}


main();
