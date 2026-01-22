import { useEffect } from "react";
import { ResultBackgroundLayout } from "@/components/BackgroundLayout";

interface LoseProps {
  word: string;
  onRejouer: () => void;
  onComplete: (score: number) => void;
}

export default function Lose({ word, onRejouer, onComplete }: LoseProps) {
  //skip du timeout pour le dev, mettre à true pour activer.
  const AUTO_COMPLETE_ENABLED = false;

  useEffect(() => {
    if (!AUTO_COMPLETE_ENABLED) return;
    const timer = setTimeout(() => {
      onComplete(0);
    }, 3500);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <ResultBackgroundLayout variant="lose">
      <div className="relative w-full max-w-[980px]">
        <img
          src="/DefeatPanel.png"
          alt="Defaite"
          className="w-full h-auto select-none pointer-events-none"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-between px-6 py-10">
          {/* Titre Fluide */}
          <h2 className="text-[8vw] md:text-7xl font-black text-white mb-2 drop-shadow-[0_4px_4px_rgba(0,0,0,1)] uppercase tracking-tighter text-center leading-none mt-2">
            Dommage...
          </h2>

          <p className="text-sm md:text-xl text-gray-200 mb-4 font-bold text-center italic">
            Le mot secret était :
          </p>

          {/* Mot Secret adaptatif (Flex-wrap pour les petits écrans) */}
          <div className="flex flex-wrap justify-center gap-2 md:gap-4 px-2">
            {word.split("").map((letter, index) => (
              <div key={index} className="flex flex-col items-center min-w-[20px] md:min-w-[40px]">
                <span className="text-2xl md:text-6xl font-black text-red-500 uppercase drop-shadow-[0_2px_2px_rgba(0,0,0,1)]">
                  {letter}
                </span>
                <div className="w-full border-b-2 md:border-b-4 border-white mt-1"></div>
              </div>
            ))}
          </div>

          {/* Bouton Réessayer Tactile */}
          <div className="w-full max-w-[250px] md:max-w-sm mt-4">
            <button
              onClick={onRejouer}
              className="w-full bg-[#e6d2b5] hover:bg-[#d4bc9a] text-[#5d3a1a] font-black py-3 md:py-5 rounded-xl shadow-[0_5px_0px_#8b5a2b] active:shadow-none active:translate-y-1 transition-all text-lg md:text-2xl uppercase tracking-widest border-2 border-[#8b5a2b]/30"
            >
              Réessayer
            </button>
          </div>
        </div>
      </div>
    </ResultBackgroundLayout>
  );
}
