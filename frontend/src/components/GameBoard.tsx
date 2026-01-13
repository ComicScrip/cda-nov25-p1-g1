
import { useState, useEffect } from "react";
import Win from "./Win";
import Lose from "./Lose";

type Difficulty = "FACILE" | "MOYEN" | "DIFFICILE";

const MOTS_PAR_DIFFICULTE: Record<Difficulty, { mot: string; indice: string }[]> = {
  FACILE: [
    { mot: "LION", indice: "Animal de la savane" },
    { mot: "CHAT", indice: "Petit félin domestique" },
    { mot: "PAIN", indice: "Aliment de base" },
  ],
  MOYEN: [
    { mot: "GUITARE", indice: "Instrument à cordes" },
    { mot: "PYRAMIDE", indice: "Monument égyptien" },
    { mot: "FROMAGE", indice: "Spécialité française" },
  ],
  DIFFICILE: [
    { mot: "ASTRONAUTE", indice: "Voyageur de l'espace" },
    { mot: "LABYRINTHE", indice: "Lieu dont il est dur de sortir" },
    { mot: "CHRONOMETRE", indice: "Sert à mesurer le temps" },
  ],
};
interface GameBoardProps {
  difficulty: Difficulty;
  onQuit: () => void;
  onGameOver: (score: number) => void;
}


const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export default function GameBoard({ difficulty, onQuit, onGameOver }: GameBoardProps) {
  const [motSecret, setMotSecret] = useState("");
  const [indice, setIndice] = useState("");
  const [lettresTestees, setLettresTestees] = useState<string[]>([]);
  const [erreurs, setErreurs] = useState(0);

  const MAX_ERRORS = difficulty === "DIFFICILE" ? 2 : difficulty === "MOYEN" ? 4 : 6;

  useEffect(() => {
    const listeMots = MOTS_PAR_DIFFICULTE[difficulty];
    const selection = listeMots[Math.floor(Math.random() * listeMots.length)];
    setMotSecret(selection.mot.toUpperCase());
    setIndice(selection.indice);
  }, [difficulty]);

  const estGagne = motSecret !== "" && motSecret.split("").every((l) => lettresTestees.includes(l));
  const estPerdu = erreurs >= MAX_ERRORS;

  const handleClick = (lettre: string) => {
    if (lettresTestees.includes(lettre) || estGagne || estPerdu) return;
    setLettresTestees((prev) => [...prev, lettre]);
    if (!motSecret.includes(lettre)) setErreurs((prev) => prev + 1);
  };

  if (estGagne) return <Win word={motSecret} score={100 + (MAX_ERRORS - erreurs) * 10} onRejouer={onQuit} onComplete={onGameOver} />;
  if (estPerdu) return <Lose word={motSecret} onRejouer={onQuit} onComplete={onGameOver} />;
  if (motSecret === "") return null;

  return (
    <div className="w-full max-w-5xl px-4 py-6 mx-auto flex flex-col items-center">
      
      {/* 1. BLOC INDICE : Responsive (Stack en colonne sur petit mobile) */}
      <div className="w-full bg-white/20 backdrop-blur-md border-2 border-amber-900/30 rounded-2xl p-4 md:p-6 flex flex-col sm:flex-row justify-between items-center gap-4 shadow-xl">
        <div className="text-lg md:text-2xl font-black text-amber-950 italic text-center sm:text-left">
          Indice : {indice}
        </div>
        <div className="px-4 py-1 bg-amber-900/10 rounded-full font-black text-amber-900 uppercase text-xs md:text-base">
          {difficulty} • {MAX_ERRORS - erreurs} ❤️
        </div>
      </div>

      {/* 2. MOT À DEVINER : flex-wrap pour les longs mots sur mobile */}
      <div className="flex flex-wrap justify-center gap-3 md:gap-6 my-10 md:my-16">
        {motSecret.split("").map((lettre, index) => (
          <div key={index} className="flex flex-col items-center w-8 sm:w-12 md:w-16">
            <span className={`text-4xl sm:text-5xl md:text-7xl font-black transition-all duration-500 ${lettresTestees.includes(lettre) ? "text-amber-950 scale-100" : "scale-0"}`}>
              {lettre}
            </span>
            <div className="w-full h-1 md:h-2 bg-amber-950 rounded-full mt-1 md:mt-2" />
          </div>
        ))}
      </div>

      {/* 3. CLAVIER : Grille adaptative (6 colonnes mobile, 10 colonnes desktop) */}
      <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-9 lg:grid-cols-10 gap-2 md:gap-3 mb-10 w-full max-w-3xl justify-center">
        {ALPHABET.map((lettre) => {
          const cliquée = lettresTestees.includes(lettre);
          const estBonne = cliquée && motSecret.includes(lettre);
          return (
            <button
              key={lettre}
              onClick={() => handleClick(lettre)}
              disabled={cliquée}
              className={`h-12 w-full sm:h-14 sm:w-14 text-lg md:text-2xl font-black rounded-xl border-b-4 transition-all active:scale-90
                ${!cliquée ? "bg-amber-500 border-amber-700 text-amber-950 hover:bg-amber-400" 
                : estBonne ? "bg-blue-500 border-blue-800 text-white opacity-80" 
                : "bg-red-500 border-red-800 text-white opacity-40 cursor-not-allowed" 
              }`}
            >
              {lettre}
            </button>
          );
        })}
      </div>

      {/* 4. BOUTON QUITTER */}
      <button 
        onClick={onQuit} 
        className="w-full max-w-[250px] bg-orange-800 hover:bg-orange-700 text-white font-black py-4 px-6 rounded-2xl border-b-4 border-orange-950 transition-transform active:scale-95 text-sm md:text-base"
      >
        QUITTER LE JEU
      </button>
    </div>
  );
}
