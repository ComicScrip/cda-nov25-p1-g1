interface MenuProps {
  onStart: () => void;
}

export default function Menu({ onStart }: MenuProps) {
  return (

    <div className="h-[100dvh] w-full flex flex-col items-center justify-end bg-[url('/image_1a1bb1.png')] bg-cover bg-center no-repeat pb-10 md:pb-20 overflow-hidden">
      
      
      <div className="absolute inset-0 bg-black/5 pointer-events-none" />

    
      <div className="relative z-10 w-full flex justify-center px-4 sm:px-6 mb-8 md:mb-0">
        <button 
          onClick={onStart}
          className="relative group cursor-pointer transition-all hover:scale-105 active:scale-95 w-full max-w-[320px] sm:max-w-[450px]"
        >
          
          <div className="px-2 py-4 md:px-16 md:py-6 rounded-2xl flex items-center justify-center bg-amber-50/10 backdrop-blur-[4px] md:bg-transparent border border-white/10 md:border-none shadow-xl md:shadow-none">
            <span className="text-xl sm:text-3xl md:text-4xl font-black text-[#5d3a1a] uppercase tracking-widest drop-shadow-lg text-center leading-tight">
              Démarrer une partie
            </span>
          </div>
        </button>
      </div>
      
    </div>
  );
}