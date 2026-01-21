import { useState, useEffect, SetStateAction } from "react";
import Win from "./Win";
import Lose from "./Lose";
import { useGetRandomWordQuery } from "@/graphql/generated/schema";

type Difficulty = "FACILE" | "MOYEN" | "DIFFICILE";

interface GameBoardProps {
  difficulty: Difficulty;
  onQuit: () => void;
  onGameOver: (score: number) => void;
}

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export default function GameBoard({ difficulty, onQuit, onGameOver }: GameBoardProps) {
  // --- ÉTATS DU JEU ---
  const [motSecret, setMotSecret] = useState("");
  const [idWord, setIdWord] = useState<number | null>(null);
  const [indice, setIndice] = useState("");
  const [lettresTestees, setLettresTestees] = useState<string[]>([]);
  const [erreurs, setErreurs] = useState(0);
  const [showIndice, setShowIndice] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // --- GRAPHQL ---
  const [fetchWord, { loading: loadingWord, error: errorWord }] = useGetRandomWordQuery({
    fetchPolicy: "network-only",
    onCompleted: (data: { getRandomWord: { label: string; indice: SetStateAction<string>; idWord: SetStateAction<number | null>; }; }) => {
      if (data?.getRandomWord) {
        setMotSecret(data.getRandomWord.label.toUpperCase());
        setIndice(data.getRandomWord.indice);
        setIdWord(data.getRandomWord.idWord);
      }
    }
  });

  const [saveGame] = useSaveGameMutation();

  // --- LOGIQUE DE JEU ---
  const MAX_ERRORS = difficulty === "DIFFICILE" ? 2 : difficulty === "MOYEN" ? 4 : 6;
  const estGagne = motSecret !== "" && motSecret.split("").every((l) => lettresTestees.includes(l));
  const estPerdu = erreurs >= MAX_ERRORS;

  // Initialisation : Récupérer le mot depuis la DB
  useEffect(() => {
    const formattedDiff = difficulty.charAt(0) + difficulty.slice(1).toLowerCase();
    fetchWord({ variables: { difficulty: formattedDiff } });
    setLettresTestees([]);
    setErreurs(0);
    setShowIndice(false);
  }, [difficulty, fetchWord]);

  // Sauvegarde automatique quand la partie se termine
  useEffect(() => {
    if ((estGagne || estPerdu) && idWord && !isSaving) {
      handleFinalize();
    }
  }, [estGagne, estPerdu]);

  const calculerScoreFinal = () => {
    const scoreBase = 100;
    const bonusVies = (MAX_ERRORS - erreurs) * 20;
    const bonusSansIndice = showIndice ? 0 : 50;
    return Math.max(0, scoreBase + bonusVies + bonusSansIndice);
  };

  const handleFinalize = async () => {
    setIsSaving(true);
    const finalScore = calculerScoreFinal();
    try {
      await saveGame({
        variables: {
          score: finalScore,
          idWord: idWord!,
          status: estGagne ? "WON" : "LOST"
        }
      });
      onGameOver(finalScore);
    } catch (e) {
      console.error("Erreur grimoire:", e);
    }
  };

  const handleClick = (lettre: string) => {
    if (lettresTestees.includes(lettre) || estGagne || estPerdu) return;
    setLettresTestees((prev) => [...prev, lettre]);
    if (!motSecret.includes(lettre)) setErreurs((prev) => prev + 1);
  };

  // --- RENDU ---
  if (loadingWord) return <div className="h-screen flex items-center justify-center text-white font-black italic">INVOCATION DU MOT...</div>;
  if (errorWord) return <div className="h-screen flex items-center justify-center text-red-500">ERREUR DE CONNEXION AU TEMPLE</div>;

  if (estGagne) return <Win word={motSecret} score={calculerScoreFinal()} onRejouer={onQuit} onComplete={onGameOver} />;
  if (estPerdu) return <Lose word={motSecret} onRejouer={onQuit} onComplete={onGameOver} />;

  return (
    <div className="min-h-[100dvh] w-full flex flex-col items-center justify-between p-2 sm:p-4 md:p-6 overflow-x-hidden">
      
      {/* 1. BLOC INDICE */}
      <div className="w-full max-w-4xl bg-white/30 backdrop-blur-md border-2 border-amber-900/30 rounded-2xl p-3 md:p-6 flex justify-between items-center shadow-lg">
        <div className="flex-1 text-sm md:text-xl font-black text-amber-950 italic">
          {showIndice ? (
            <span className="animate-in fade-in slide-in-from-left-2 duration-500">💡 {indice}</span>
          ) : (
            <button
              onClick={() => setShowIndice(true)}
              className="bg-amber-700 hover:bg-amber-600 text-white text-[10px] md:text-sm px-3 py-2 rounded-lg border-b-2 border-amber-900 active:scale-95 transition-all"
            >
              RÉVÉLER L'INDICE (-50 pts)
            </button>
          )}
        </div>
        <div className="px-3 py-1 bg-amber-950/20 rounded-full font-black text-amber-950 text-[10px] md:text-base">
          {MAX_ERRORS - erreurs} ❤️
        </div>
      </div>

      {/* 2. MOT (Données réelles) */}
      <div className="flex flex-wrap justify-center gap-2 md:gap-4 my-6 md:my-10 max-w-full px-2">
        {motSecret.split("").map((lettre, index) => (
          <div key={index} className="flex flex-col items-center min-w-[20px] sm:min-w-[40px]">
            <span className={`text-2xl sm:text-4xl md:text-7xl font-black transition-all duration-500 ${lettresTestees.includes(lettre) ? "text-amber-950 scale-100" : "scale-0"}`}>
              {lettre}
            </span>
            <div className="w-full h-1 md:h-2 bg-amber-950 rounded-full mt-1" />
          </div>
        ))}
      </div>

      {/* 3. CLAVIER */}
      <div className="w-full max-w-3xl grid grid-cols-7 sm:grid-cols-9 md:grid-cols-10 gap-1.5 md:gap-3 px-1 sm:px-4">
        {ALPHABET.map((lettre) => {
          const cliquée = lettresTestees.includes(lettre);
          const estBonne = cliquée && motSecret.includes(lettre);
          return (
            <button
              key={lettre}
              onClick={() => handleClick(lettre)}
              disabled={cliquée}
              className={`h-10 sm:h-12 md:h-16 w-full text-sm sm:text-lg md:text-2xl font-black rounded-lg border-b-4 transition-all active:scale-90
                ${!cliquée ? "bg-amber-500 border-amber-700 text-amber-950" 
                : estBonne ? "bg-blue-500 border-blue-800 text-white opacity-80" 
                : "bg-red-500 border-red-800 text-white opacity-40 cursor-not-allowed" 
              }`}
            >
              {lettre}
            </button>
          );
        })}
      </div>

      {/* 4. ABANDONNER */}
      <div className="w-full flex justify-center mt-6 pb-2">
        <button 
          onClick={onQuit} 
          className="px-8 py-3 bg-orange-900/80 hover:bg-orange-800 text-white font-black rounded-xl border-b-4 border-black/40 text-[10px] md:text-sm uppercase active:scale-95 transition-transform"
        >
          Abandonner
        </button>
      </div>
    </div>
  );
}

function useSaveGameMutation(): [any] {
  throw new Error("Function not implemented.");
}
