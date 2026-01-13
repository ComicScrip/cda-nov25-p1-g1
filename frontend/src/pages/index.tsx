import { useState } from "react";
import GameBoard from "@/components/GameBoard"; 
import ConfigPage from "@/components/ConfigPage";
import ScorePage from "@/components/ScorePage";

// Type strict pour la difficulté
type Difficulty = "FACILE" | "MOYEN" | "DIFFICILE";

export default function Home() {
  // Ajout de l'étape 'score'
  const [step, setStep] = useState<'menu' | 'config' | 'game' | 'score'>('menu');
  
  const [gameData, setGameData] = useState<{ pseudo: string; difficulte: Difficulty }>({ 
    pseudo: "", 
    difficulte: "FACILE" 
  });

  // État pour le score de la partie actuelle
  const [currentScore, setCurrentScore] = useState(0);

  // État pour les records (Best Scores) par difficulté
  const [bestScores, setBestScores] = useState<Record<Difficulty, number>>({
    FACILE: 0,
    MOYEN: 0,
    DIFFICILE: 0
  });

  // --- MODIFICATION ICI : La clé magique pour forcer le relancement du jeu ---
  const [gameKey, setGameKey] = useState(0);

  // Reçoit les données de ConfigPage et démarre le jeu
  const handleStartGame = (pseudo: string, diff: Difficulty) => {
    setGameData({ pseudo, difficulte: diff });
    setGameKey(prev => prev + 1); // On change la clé pour une nouvelle instance
    setStep('game'); 
  };

  // Appelé par Win ou Lose (via GameBoard) après le délai de 2 secondes
  const handleGameOver = (scoreObtenu: number) => {
    setCurrentScore(scoreObtenu);

    // Mise à jour du record si le score est battu
    if (scoreObtenu > bestScores[gameData.difficulte]) {
      setBestScores(prev => ({
        ...prev,
        [gameData.difficulte]: scoreObtenu
      }));
    }

    setStep('score'); // On passe à l'écran des parchemins
  };

  // Logique du bouton "Prochaine Partie" sur la page Score
  const handleNextLevel = () => {
    let nextDiff = gameData.difficulte;

    // --- MODIFICATION : On ne monte de niveau QUE si le score est supérieur à 0 ---
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
      // Si le score est 0 (défaite), on reste sur la même difficulté
      alert("Dommage ! Réessaie ce niveau pour progresser.");
    }

    // 1. Mettre à jour la difficulté (sera la même si défaite)
    setGameData(prev => ({ ...prev, difficulte: nextDiff }));
    
    // 2. CHANGER LA CLÉ : Obligatoire pour réinitialiser le GameBoard même si la difficulté ne change pas
    setGameKey(prev => prev + 1); 
    
    // 3. Revenir au jeu
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
          {/* L'ajout de key={gameKey} est crucial ici */}
          <GameBoard 
            key={gameKey} 
            difficulty={gameData.difficulte} 
            onQuit={() => setStep('menu')} 
            onGameOver={handleGameOver} 
          /> 
        </div>
      )}

      {/* ÉCRAN 4 : SCORE (Affichage des parchemins) */}
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
