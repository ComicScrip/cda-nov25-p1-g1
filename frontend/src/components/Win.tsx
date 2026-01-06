interface WinProps {
  word: string;
  onRejouer: () => void;
}

export default function Win({ word, onRejouer }: WinProps) {
  return (
    /* h-screen et w-screen pour couvrir tout l'écran avec ton image Win.png */
    <div className="h-screen w-screen flex flex-col items-center justify-center bg-[url('/Win.png')] bg-cover bg-center no-repeat">
      
      <div className="flex flex-col items-center mt-20">
        
        {/* AFFICHAGE DU MOT EN BLEU (Sur le parchemin) */}
        <div className="flex gap-4 mb-24">
          {word.split("").map((letter, index) => (
            <div key={index} className="flex flex-col items-center">
              <span className="text-6xl font-black text-blue-600 uppercase drop-shadow-md">
                {letter}
              </span>
              {/* Le petit trait sous la lettre en bleu également */}
              <div className="w-10 border-b-4 border-blue-600 mt-1"></div>
            </div>
          ))}
        </div>
        
        {/* BLOC DES BOUTONS */}
        <div className="flex flex-col gap-4">
          <button 
            onClick={onRejouer} 
            className="bg-[#dcd1b3] hover:bg-[#c8ba96] text-gray-800 font-bold py-3 px-12 rounded-lg shadow-xl border-2 border-yellow-800 transition-all transform hover:scale-105"
          >
            REJOUER
          </button>

          <button 
            onClick={() => window.location.reload()} 
            className="bg-white/80 hover:bg-white text-gray-800 font-bold py-3 px-12 rounded-lg shadow-xl border-2 border-gray-400 transition-all transform hover:scale-105"
          >
            QUITTER
          </button>
        </div>
      </div>
    </div>
  );
}