import { useState } from "react";
import GameBoard from "@/components/GameBoard"; 
import ConfigPage from "@/components/ConfigPage";

// Type strict pour la difficulté
type Difficulty = "FACILE" | "MOYEN" | "DIFFICILE";

export default function Home() {
  const [step, setStep] = useState<'menu' | 'config' | 'game'>('menu');
  
  // Utilisation du type Difficulty pour garantir la cohérence avec GameBoard
  const [gameData, setGameData] = useState<{ pseudo: string; difficulte: Difficulty }>({ 
    pseudo: "", 
    difficulte: "FACILE" 
  });

  // on reçoit les données de ConfigPage et change l'étape vers 'game'
  const handleStartGame = (pseudo: string, diff: Difficulty) => {
    setGameData({ pseudo, difficulte: diff });
    setStep('game'); 
  };

  return (
    <main className="h-screen w-screen overflow-hidden relative">
      
      {/* ÉCRAN 1 : MENU */}
      {step === 'menu' && (
        <div 
          className="h-full w-full bg-cover bg-center no-repeat flex items-center justify-center"
          style={{ backgroundImage: "url('/Menu.PNG')" }}
        >
          <div className="absolute bottom-[12%] w-full flex justify-center">
           
            <button onClick={() => setStep('config')} className="w-[400px] h-[100px] cursor-pointer group">
              <span className="text-3xl font-black text-[#5d3a1a] uppercase group-hover:scale-110 transition-transform inline-block">
                Démarer une partie
              </span>
            </button>
          </div>
        </div>
      )}

      {/* ÉCRAN 2 : CONFIGURATION */}
      {step === 'config' && (
        <ConfigPage onStart={handleStartGame} />
      )}

      {/* ÉCRAN 3 : JEU (GameBoard) */}
      {step === 'game' && (
        <div 
          className="h-full w-full flex items-center justify-center bg-cover bg-center"
          style={{ backgroundImage: "url('/word-battle-bg.png')" }}
        >
          {/* Ici, GameBoard va recevoir 'FACILE', 'MOYEN' ou 'DIFFICILE'.
            Il utilisera cette prop pour choisir un mot dans le bon dictionnaire.
          */}
          <GameBoard 
            difficulty={gameData.difficulte} 
            onQuit={() => setStep('menu')} 
          /> 
        </div>
      )}
      
    </main>
  );
}