import { useEffect } from "react";

interface LoseProps {
  word: string;
  onRejouer: () => void;
  onComplete: (score: number) => void;
}

export default function Lose({ word, onRejouer, onComplete }: LoseProps) {
  
  useEffect(() => {
    // Utilisation correcte d'un timer pour la redirection automatique
    const timer = setTimeout(() => {
      onComplete(0);
    }, 2000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="h-[100dvh] w-full flex flex-col items-center justify-center bg-[url('/Lose.png')] bg-cover bg-center bg-no-repeat p-2 overflow-hidden">
      
      {/* Overlay pour la lisibilité */}
      <div className="absolute inset-0 bg-black/50 pointer-events-none" />

      <div className="relative z-10 w-full max-w-[90vw] md:max-w-2xl flex flex-col items-center bg-black/60 p-6 md:p-12 rounded-[2rem] backdrop-blur-md border-2 border-red-900/50 shadow-2xl">
        
        {/* Titre Fluide */}
        <h2 className="text-[8vw] md:text-7xl font-black text-white mb-4 md:mb-8 drop-shadow-[0_4px_4px_rgba(0,0,0,1)] uppercase tracking-tighter text-center leading-none">
          Dommage...
        </h2>

        <p className="text-sm md:text-xl text-gray-300 mb-6 font-bold text-center italic">
          Le mot secret était :
        </p>
        
        {/* Mot Secret adaptatif (Flex-wrap pour les petits écrans) */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-8 md:mb-12 px-2">
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
        <div className="w-full max-w-[250px] md:max-w-sm">
          <button 
            onClick={onRejouer} 
            className="w-full bg-[#e6d2b5] hover:bg-[#d4bc9a] text-[#5d3a1a] font-black py-3 md:py-5 rounded-xl shadow-[0_5px_0px_#8b5a2b] active:shadow-none active:translate-y-1 transition-all text-lg md:text-2xl uppercase tracking-widest border-2 border-[#8b5a2b]/30"
          >
            Réessayer 
          </button>
        </div>
      </div>
    </div>
  );
}