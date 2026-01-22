import { useEffect } from "react";
import { ResultBackgroundLayout } from "@/components/BackgroundLayout";

interface WinProps {
  word: string;
  score: number;
  onRejouer: () => void;
  onComplete: (score: number) => void;
}

export default function Win({ word, score, onRejouer, onComplete }: WinProps) {
  //skip du timeout pour le dev, mettre à false pour activer.
  const AUTO_COMPLETE_ENABLED = true;

  useEffect(() => {
    if (!AUTO_COMPLETE_ENABLED) return;
    const timer = setTimeout(() => {
      onComplete(score);
    }, 3500);

    return () => clearTimeout(timer);
  }, [onComplete, score]);

  return (
    <ResultBackgroundLayout variant="win">
      <div className="relative w-[92vw] max-w-[980px]">
        <img
          src="/VictoryPanel.png"
          alt="Victoire"
          className="w-full h-auto max-h-[65dvh] sm:max-h-[70dvh] object-contain select-none pointer-events-none"
        />
        <div className="absolute inset-0 flex flex-col items-center px-6 py-4">
          <div className="flex-1 flex flex-col items-center justify-center gap-4">
            {/* 1. TEXTE DE VICTOIRE & SCORE */}
            <div className="text-center">
              <div className="bg-blue-600/30 backdrop-blur-md border-2 border-blue-400/50 px-4 sm:px-6 py-1 rounded-full inline-block">
                <span className="text-lg sm:text-xl md:text-2xl font-black text-white whitespace-nowrap">
                  Score : {score}
                </span>
              </div>
            </div>

            {/* 2. LE MOT RÉVÉLÉ (Responsive et Wrap automatique) */}
            <div className="flex flex-wrap justify-center gap-2 sm:gap-4 px-2 max-w-full">
              {word.split("").map((letter, index) => (
                <div key={index} className="flex flex-col items-center min-w-[30px] sm:min-w-[45px] md:min-w-[70px]">
                  <span className="text-[8vw] sm:text-5xl md:text-8xl font-black text-blue-500 uppercase drop-shadow-[0_2px_10px_rgba(59,130,246,0.6)]">
                    {letter}
                  </span>
                  <div className="w-full border-b-[3px] md:border-b-[6px] border-blue-500 mt-1"></div>
                </div>
              ))}
            </div>
          </div>

          {/* 3. BOUTONS ACTIONS (Adaptés pour le tactile) */}
          <div className="flex flex-col gap-3 w-full max-w-[200px] sm:max-w-[240px] md:max-w-[280px]">
            {/* Bouton Rejouer */}
            <button
              onClick={onRejouer}
              className="w-full bg-[#e6d2b5] hover:bg-[#f2e2cd] text-[#5d3a1a] font-black py-3 sm:py-4 md:py-5 rounded-2xl shadow-[0_5px_0px_#8b5a2b] active:shadow-none active:translate-y-1 transition-all text-lg sm:text-2xl md:text-3xl uppercase tracking-widest border-2 border-yellow-600/30"
            >
              Rejouer
            </button>

            {/* Bouton Quitter  */}
            <button
              onClick={() => window.location.reload()}
              className="w-full bg-white/10 hover:bg-white/20 backdrop-blur-md text-white font-bold py-2 sm:py-3 rounded-xl border-2 border-white/20 transition-all active:scale-95 text-xs sm:text-sm md:text-lg uppercase"
            >
              Retour au menu
            </button>
          </div>
        </div>
      </div>
    </ResultBackgroundLayout>
  );
}
