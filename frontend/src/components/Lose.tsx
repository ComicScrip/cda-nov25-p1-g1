import { useEffect } from "react";

interface LoseProps {
  word: string;
  onRejouer: () => void;
  onComplete: (score: number) => void;
}

export default function Lose({ word, onRejouer, onComplete }: LoseProps) {
  
  useEffect(() => {
    // Redirection automatique après 8 secondes
    const timer = setTimeout(() => {
      onComplete(0);
    }, 8000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    /* h-[100dvh] gère la barre d'adresse dynamique sur Firefox Mobile */
    <div className="min-h-[100dvh] w-full flex flex-col items-center justify-center bg-[url('/Lose.png')] bg-cover bg-center bg-no-repeat p-4">
      
      {/* Container principal : Largeur auto sur mobile, max-w sur desktop */}
      <div className="flex flex-col items-center bg-black/60 p-6 md:p-12 rounded-3xl backdrop-blur-md border-2 border-red-900/50 w-full max-w-2xl">
        
        <h2 className="text-4xl md:text-7xl font-black text-white mb-6 md:mb-8 drop-shadow-[0_5px_5px_rgba(0,0,0,1)] uppercase tracking-tighter text-center">
          Dommage...
        </h2>

        <p className="text-lg md:text-xl text-gray-300 mb-4 font-bold text-center">
          Le mot secret était :
        </p>
        
        {/* Mot : flex-wrap pour éviter de sortir de l'écran sur mobile */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-8 md:mb-12">
          {word.split("").map((letter, index) => (
            <div key={index} className="flex flex-col items-center">
              <span className="text-3xl md:text-5xl font-black text-red-500 uppercase drop-shadow-sm">
                {letter}
              </span>
              <div className="w-6 md:w-10 border-b-2 md:border-b-4 border-white mt-1 md:mt-2"></div>
            </div>
          ))}
        </div>
        
        <div className="flex flex-col gap-4 items-center w-full max-w-[280px] md:max-w-md">
          <button 
            onClick={onRejouer} 
            className="w-full bg-[#dcd1b3] hover:bg-[#c8ba96] text-gray-800 font-bold py-4 rounded-full shadow-2xl border-2 border-white transition-all active:scale-95 text-lg"
          >
            RÉESSAYER 
          </button>

          {/* Message d'attente stylisé */}
          <p className="mt-6 md:mt-10 text-amber-200 font-black text-xs md:text-lg italic animate-pulse tracking-widest text-center">
            Analyse des scores en attente...
          </p>
        </div>
      </div>
    </div>
  );
}