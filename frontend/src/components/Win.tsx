import { useEffect } from "react";

interface WinProps {
  word: string;
  score: number;
  onRejouer: () => void;
  onComplete: (score: number) => void;
}

export default function Win({ word, score, onRejouer, onComplete }: WinProps) {
  
  useEffect(() => {
    // Redirection automatique après 8 secondes
    const timer = setTimeout(() => {
      onComplete(score);
    }, 8000);

    return () => clearTimeout(timer);
  }, [onComplete, score]);

  return (
    /* h-[100dvh] assure que l'image de fond s'adapte parfaitement à Firefox mobile */
    <div className="min-h-[100dvh] w-full flex flex-col items-center justify-center bg-[url('/Win.png')] bg-cover bg-center no-repeat p-4 overflow-x-hidden">
      
      <div className="flex flex-col items-center w-full max-w-4xl">
        
        {/* Mot affiché en bleu : flex-wrap permet de passer à la ligne sur mobile */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-10 md:mb-24 px-2">
          {word.split("").map((letter, index) => (
            <div key={index} className="flex flex-col items-center">
              <span className="text-4xl sm:text-5xl md:text-7xl font-black text-blue-600 uppercase drop-shadow-md">
                {letter}
              </span>
              {/* La barre s'adapte à la taille de la lettre */}
              <div className="w-6 sm:w-8 md:w-12 border-b-4 border-blue-600 mt-1"></div>
            </div>
          ))}
        </div>
        
        {/* Boutons : S'empilent sur mobile pour plus de confort tactile */}
        <div className="flex flex-col gap-4 w-full max-w-[300px] md:max-w-md">
          <button 
            onClick={onRejouer} 
            className="bg-[#dcd1b3] hover:bg-[#c8ba96] text-gray-800 font-black py-4 px-6 md:px-12 rounded-xl shadow-xl border-2 border-yellow-800 transition-all active:scale-95 text-lg md:text-2xl"
          >
            REJOUER 
          </button>

          <button 
            onClick={() => window.location.reload()} 
            className="bg-white/80 hover:bg-white text-gray-800 font-black py-4 px-6 md:px-12 rounded-xl shadow-xl border-2 border-gray-400 transition-all active:scale-95 text-lg md:text-2xl"
          >
            QUITTER
          </button>
        </div>

        {/* Message d'attente stylisé */}
        <p className="mt-8 md:mt-12 text-blue-900 font-black text-sm md:text-xl italic animate-pulse tracking-widest bg-white/40 px-6 py-3 rounded-full backdrop-blur-sm text-center">
          Analyse des scores en attente...
        </p>
      </div>
    </div>
  );
}