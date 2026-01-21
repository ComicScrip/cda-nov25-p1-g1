import { useState } from "react";
import GameBoard from "@/components/GameBoard"; 
import ConfigPage from "@/components/ConfigPage";
import ScorePage from "@/components/ScorePage";

// Type strict pour la difficulté
type Difficulty = "FACILE" | "MOYEN" | "DIFFICILE";

export default function Home() {
  const [step, setStep] = useState<'menu' | 'config' | 'game' | 'score'>('menu');
  
  const [gameData, setGameData] = useState<{ pseudo: string; difficulte: Difficulty }>({ 
    pseudo: "", 
    difficulte: "FACILE" 
  });

  const [currentScore, setCurrentScore] = useState(0);

  const [bestScores, setBestScores] = useState<Record<Difficulty, number>>({
    FACILE: 0,
    MOYEN: 0,
    DIFFICILE: 0
  });

  const [gameKey, setGameKey] = useState(0);

  const handleStartGame = (pseudo: string, diff: Difficulty) => {
    setGameData({ pseudo, difficulte: diff });
    setGameKey(prev => prev + 1); 
    setStep('game'); 
  };

  // --- MODIFICATION : handleGameOver devient asynchrone pour parler au backend ---
  const handleGameOver = async (scoreObtenu: number) => {
    setCurrentScore(scoreObtenu);

    if (scoreObtenu > bestScores[gameData.difficulte]) {
      setBestScores(prev => ({
        ...prev,
        [gameData.difficulte]: scoreObtenu
      }));
    }

    setStep('score'); 
  };

  const handleNextLevel = () => {
    let nextDiff = gameData.difficulte;

    if (currentScore > 0) {
      if (gameData.difficulte === "FACILE") {
        nextDiff = "MOYEN";
        alert("Bravo ! Passage au niveau MOYEN.");
      } else if (gameData.difficulte === "MOYEN") {
        nextDiff = "DIFFICILE";
        alert("Excellent ! Passage au niveau DIFFICILE.");
      } else {
        alert("Tu es déjà au niveau maximum ! Rejouons en DIFFICILE.");
      }
    } else {
      alert("Dommage ! Réessaie ce niveau pour progresser.");
    }

    setGameData(prev => ({ ...prev, difficulte: nextDiff }));
    setGameKey(prev => prev + 1); 
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
          <GameBoard 
            key={gameKey} 
            // On passe la difficulté pour que GameBoard appelle getRandomWord(difficulte)
            difficulty={gameData.difficulte} 
            onQuit={() => setStep('menu')} 
            onGameOver={handleGameOver} 
          /> 
        </div>
      )}

      {/* ÉCRAN 4 : SCORE */}
      {step === 'score' && (
        <ScorePage 
          currentScore={currentScore}
          bestScores={bestScores}
          difficulty={gameData.difficulte}
          onQuit={() => setStep('menu')}
          onNextLevel={handleNextLevel}
        />
      )}
      
    </main>
  );
}