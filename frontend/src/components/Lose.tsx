interface LoseProps {
  word: string;
  onRejouer: () => void;
}

export default function Lose({ word, onRejouer }: LoseProps) {
  return (
    <div className="relative flex flex-col items-center justify-center w-[600px] h-[600px]">
      {/* Ton image Lose.png du dossier public */}
      <img src="/Lose.png" alt="Défaite" className="absolute inset-0 w-full h-full object-contain" />
      
      <div className="relative z-10 flex flex-col items-center mt-10">
        <h2 className="text-4xl font-bold text-blue-900 mb-2">Défaite</h2>
        <p className="text-2xl font-black tracking-widest mb-20">{word}</p>
        
        <div className="flex flex-col gap-2">
          <button onClick={onRejouer} className="bg-gray-200 hover:bg-gray-300 px-6 py-2 rounded-lg font-bold border-2 border-gray-800">
            Recommencer
          </button>
          <button onClick={() => window.location.reload()} className="bg-gray-100 hover:bg-gray-200 px-6 py-2 rounded-lg font-bold border-2 border-gray-800">
            Quitter
          </button>
        </div>
      </div>
    </div>
  );
}