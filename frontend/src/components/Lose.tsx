import { useEffect } from "react";
import { ResultBackgroundLayout } from "@/components/BackgroundLayout";

interface LoseProps {
  word: string;
  onRejouer: () => void;
  onComplete: (score: number) => void;
}

export default function Lose({ word, onRejouer, onComplete }: LoseProps) {
  const AUTO_COMPLETE_ENABLED = false;

  useEffect(() => {
    if (!AUTO_COMPLETE_ENABLED) return;
    const timer = setTimeout(() => {
      onComplete(0);
    }, 3500);

    return () => clearTimeout(timer);
  }, [onComplete]);

  // FONCTION DE SÉCURITÉ : Pour s'assurer que onRejouer existe au clic
  const handleRetryClick = () => {
    console.log("Clic sur Réessayer détecté dans Lose.tsx");
    if (typeof onRejouer === "function") {
      onRejouer();
    } else {
      console.warn("Attention: onRejouer n'est pas une fonction. Redirection par défaut.");
      onComplete(0); // Backup pour éviter le crash
    }
  };

  return (
    <ResultBackgroundLayout variant="lose">
      <div className="relative w-full max-w-[980px] animate-in fade-in zoom-in duration-300">
        <img
          src="/DefeatPanel.png"
          alt="Défaite"
          className="w-full h-auto max-h-[70dvh] object-contain select-none pointer-events-none"
        />
        
        <div className="absolute inset-0 flex flex-col items-center px-6 py-6">
          <div className="flex-1 flex flex-col items-center justify-center gap-3 translate-y-1">
            <p className="text-sm md:text-xl text-amber-400 font-bold text-center italic drop-shadow-[0_2px_2px_rgba(0,0,0,1)]">
              Le mot secret était :
            </p>

            {/* Mot Secret */}
            <div className="flex flex-wrap justify-center gap-2 md:gap-4 px-2">
              {(word || "").split("").map((letter, index) => (
                <div key={index} className="flex flex-col items-center min-w-[20px] md:min-w-[40px]">
                  <span className="text-2xl md:text-6xl font-black text-red-500 uppercase drop-shadow-[0_2px_2px_rgba(0,0,0,1)]">
                    {letter}
                  </span>
                  <div className="w-full border-b-2 md:border-b-4 border-white mt-1"></div>
                </div>
              ))}
            </div>
          </div>

          {/* Bouton Réessayer */}
          <div className="w-full max-w-[200px] sm:max-w-[240px] md:max-w-[280px] pb-4">
            <button
              type="button"
              onClick={handleRetryClick}
              className="w-full bg-[#e6d2b5] hover:bg-[#d4bc9a] text-[#5d3a1a] font-black py-3 md:py-5 rounded-xl shadow-[0_5px_0px_#8b5a2b] active:shadow-none active:translate-y-1 transition-all text-lg md:text-2xl uppercase tracking-widest border-2 border-[#8b5a2b]/30 cursor-pointer"
            >
              Réessayer
            </button>
          </div>
        </div>
      </div>
    </ResultBackgroundLayout>
  );
}