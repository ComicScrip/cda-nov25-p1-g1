import fs from "fs";




const mot = "marteau";
const url = `http://www.jeuxdemots.org/rezo-dump.php?gotermsubmit=Chercher&gotermrel=${encodeURIComponent(mot)}`;
const file = `./${mot}.parser.tst`;


async function main() {

    const response = await fetch(url);
    const buff = await response.arrayBuffer();
    const text = new TextDecoder("utf-8").decode(buff)
    const lines = text.split("\n");


    fs.writeFileSync(file, text, { encoding: "utf-8" });



    /*     const words: string[] = [];
    
        console.log("Lycos Fetched this \n\n\n\n:");
        for (const line of lines) {
            console.log(line);
        } */



}

main();
