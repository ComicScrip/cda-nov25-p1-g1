interface LoseProps {
  word: string;
  onRejouer: () => void;
}

export default function Lose({ word, onRejouer }: LoseProps) {
  return (
    /* h-screen w-screen : plein écran
       bg-[url('/Lose.png')] : ton image de fond
       bg-cover : l'image s'adapte à la taille sans être déformée
    */
    <div className="h-screen w-screen flex flex-col items-center justify-center bg-[url('/Lose.png')] bg-cover bg-center bg-no-repeat">
      
      {/* Conteneur semi-transparent pour bien lire le texte par-dessus l'image */}
      <div className="flex flex-col items-center bg-black/40 p-12 rounded-2xl backdrop-blur-sm">
        
        <h2 className="text-6xl font-bold text-white mb-8 drop-shadow-lg uppercase tracking-widest">
          Dommage...
        </h2>

        <p className="text-xl text-gray-200 mb-4">Le mot était :</p>
        
        {/* AFFICHAGE DYNAMIQUE DES POINTILLÉS */}
        <div className="flex gap-4 mb-12">
          {word.split("").map((letter, index) => (
            <div key={index} className="flex flex-col items-center">
              {/* On affiche la lettre en rouge pour montrer qu'on a perdu */}
              <span className="text-5xl font-black text-red-500 uppercase">
                {letter}
              </span>
              {/* Le trait de soulignement */}
              <div className="w-10 border-b-4 border-white mt-2"></div>
            </div>
          ))}
        </div>
        
        <button 
          onClick={onRejouer} 
          className="bg-[#dcd1b3] hover:bg-[#c8ba96] text-gray-800 font-bold py-4 px-12 rounded-full shadow-2xl border-2 border-white transition-all transform hover:scale-110 active:scale-95"
        >
          RÉESSAYER
        </button>
      </div>
    </div>
  );
}