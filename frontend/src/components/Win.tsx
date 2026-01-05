interface WinProps {
  word: string;
  onRejouer: () => void;
}

export default function Win({ word, onRejouer }: WinProps) {
  return (
    <div className="relative flex flex-col items-center justify-center w-[600px] h-[600px]">
      {/* Ton image Win.png du dossier public */}
      <img src="/Win.png" alt="Victoire" className="absolute inset-0 w-full h-full object-contain" />
      
      <div className="relative z-10 flex flex-col items-center mt-10">
        <h2 className="text-4xl font-bold text-yellow-900 mb-2">Victoire</h2>
        <p className="text-2xl font-black tracking-widest mb-20">{word}</p>
        
        <div className="flex flex-col gap-2">
          <button onClick={onRejouer} className="bg-yellow-200 hover:bg-yellow-300 px-6 py-2 rounded-lg font-bold border-2 border-yellow-800">
            Suivant
          </button>
          <button onClick={() => window.location.reload()} className="bg-yellow-100 hover:bg-yellow-200 px-6 py-2 rounded-lg font-bold border-2 border-yellow-800">
            Quitter
          </button>
        </div>
      </div>
    </div>
  );
}