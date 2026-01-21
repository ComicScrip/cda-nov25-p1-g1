interface MenuProps {
  onStart: () => void;
}

export default function Menu({ onStart }: MenuProps) {
  return (
    <div className="h-[100dvh] w-full flex flex-col items-center justify-end bg-[url('/image_1a1bb1.png')] bg-cover bg-center bg-no-repeat overflow-hidden">
      
      {/* Overlay discret */}
      <div className="absolute inset-0 bg-black/5 pointer-events-none" />

      {/* SECTION BOUTON PARCHEMIN */}
      <div className="relative z-10 w-full flex justify-center px-4 pb-[8vh] md:pb-[12vh]">
        <button 
          onClick={onStart}
          className="relative group cursor-pointer transition-all hover:scale-105 active:scale-95 w-full max-w-[320px] sm:max-w-[500px] md:max-w-[750px] aspect-[10/4.5] flex items-center justify-center"
        >
          {/* Image du Parchemin */}
          <img 
            src="/parchemin.png" 
            className="absolute inset-0 w-full h-full object-contain drop-shadow-2xl" 
            alt="Parchemin Bouton" 
          />
          
          {/* Texte avec taille adaptative (vw pour mobile, fixe pour desktop) */}
          <div className="relative z-20 px-8 pt-1 flex items-center justify-center w-[80%]">
            <span className="text-[5.5vw] sm:text-3xl md:text-5xl font-black text-[#432a13] uppercase tracking-tighter sm:tracking-normal text-center leading-none drop-shadow-sm">
              Démarrer une partie
            </span>
          </div>
        </button>
      </div>
      
    </div>
  );
}