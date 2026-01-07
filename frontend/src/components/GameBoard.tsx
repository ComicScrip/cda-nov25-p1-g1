import { useState } from "react";
import Win from "./Win";
import Lose from "./Lose";

const MOT_SECRET = "LION";
const INDICE = "animal"; 
const MAX_ERRORS = 6;
const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export default function GameBoard() {
  const [lettresTestees, setLettresTestees] = useState<string[]>([]);
  const [erreurs, setErreurs] = useState(0);

  const estGagne = MOT_SECRET.split("").every((l) => lettresTestees.includes(l));
  const estPerdu = erreurs >= MAX_ERRORS;

  const handleClick = (lettre: string) => {
    if (lettresTestees.includes(lettre) || estGagne || estPerdu) return;
    setLettresTestees([...lettresTestees, lettre]);
    if (!MOT_SECRET.includes(lettre)) {
      setErreurs((prev) => prev + 1);
    }
  };

  const rejouer = () => {
    setLettresTestees([]);
    setErreurs(0);
  };

  // --- REDIRECTION INTERNE VERS LES COMPOSANTS ---
  if (estGagne) return <Win word={MOT_SECRET} onRejouer={rejouer} />;
  if (estPerdu) return <Lose word={MOT_SECRET} onRejouer={rejouer} />;

  return (
    <div className="w-[900px] rounded-xl bg-yellow-100 p-6 border-4 border-yellow-700 shadow-xl mx-auto">
      <h1 className="text-center text-4xl font-extrabold text-yellow-800 mb-6 text-shadow">WORD BATTLE</h1>

      <div className="mb-6 rounded-lg bg-yellow-50 p-4 border-2 border-yellow-600">
        <span className="font-semibold text-yellow-900">Indice :</span> {INDICE}
      </div>

      <div className="flex justify-center gap-3 mb-6">
        {MOT_SECRET.split("").map((lettre, index) => (
          <div
            key={index}
            className={`h-14 w-14 text-3xl font-bold flex items-center justify-center border-2 rounded
              ${lettresTestees.includes(lettre) ? "bg-blue-300 border-blue-700 text-blue-900" : "bg-yellow-200 border-yellow-700"}`}
          >
            {lettresTestees.includes(lettre) ? lettre : ""}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-13 gap-2 mb-6">
        {ALPHABET.map((lettre) => (
          <button
            key={lettre}
            onClick={() => handleClick(lettre)}
            disabled={lettresTestees.includes(lettre)}
            className={`p-2 font-bold rounded shadow-sm ${
              lettresTestees.includes(lettre)
                ? MOT_SECRET.includes(lettre) ? "bg-blue-400 text-white" : "bg-red-400 text-white"
                : "bg-yellow-300 hover:bg-yellow-400 text-yellow-900"
            }`}
          >
            {lettre}
          </button>
        ))}
      </div>

      <div className="flex justify-between items-center mt-4 pt-4 border-t border-yellow-600">
        <button className="bg-orange-400 hover:bg-orange-500 text-white font-bold py-2 px-6 rounded-lg" onClick={rejouer}>
          Reset / Quitter
        </button>
        <div className={`rounded-lg px-4 py-2 border-2 font-bold ${erreurs >= 5 ? "bg-red-600 text-white" : "bg-red-100 text-red-700 border-red-600"}`}>
          Incorrect : {erreurs} / {MAX_ERRORS}
        </div>
      </div>
    </div>
  );
}