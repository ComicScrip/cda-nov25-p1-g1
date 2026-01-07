interface MenuProps {
  onStart: () => void;
}

export default function Menu({ onStart }: MenuProps) {
  return (
    /* L'image de fond image_1a1bb1.png avec le petit personnage au loin */
    <div className="h-screen w-screen flex flex-col items-center justify-end bg-[url('/image_1a1bb1.png')] bg-cover bg-center no-repeat pb-20">
      
      {/* Le bouton "Démarrer une partie" sur le parchemin du bas */}
      <button 
        onClick={onStart}
        className="relative group cursor-pointer transition-transform hover:scale-110 active:scale-95"
      >
        {/* On peut utiliser un conteneur qui simule le parchemin ou simplement le texte si l'image l'a déjà */}
        <div className="px-16 py-6 rounded-xl flex items-center justify-center">
          <span className="text-4xl font-black text-[#5d3a1a] uppercase tracking-widest drop-shadow-sm">
            Démarer une partie
          </span>
        </div>
      </button>
      
    </div>
  );
}