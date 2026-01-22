import Link from "next/link";
import { useEffect, useState } from "react";
import GameBoard from "@/components/GameBoard";
import ConfigPage from "@/components/ConfigPage";
import ScorePage from "@/components/ScorePage";
import { useMeQuery } from "@/graphql/generated/schema";
import BackgroundLayout from "@/components/BackgroundLayout";


// Type strict pour la difficulté
type Difficulty = "FACILE" | "MOYEN" | "DIFFICILE";

export default function Home() {
  const { data: meData, loading: meLoading } = useMeQuery({
    fetchPolicy: "network-only",
  });

  // Ajout de l'étape 'score'
  const [step, setStep] = useState<"auth" | "config" | "game" | "score">("auth");

  useEffect(() => {
    if (meLoading) return;
    setStep(meData?.me ? "config" : "auth");
  }, [meLoading, meData]);

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

  // --- MODIFIÉ : Ajout de la communication Backend ---
  const handleGameOver = async (scoreObtenu: number) => {
    setCurrentScore(scoreObtenu);

    // Envoi du score au backend (BDD)
    try {
      await fetch("/api/scores", { // Remplace par ton URL d'API réelle
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          pseudo: gameData.pseudo,
          score: scoreObtenu,
          difficulte: gameData.difficulte,
          date: new Date().toISOString()
        }),
      });
      console.log("✅ Score enregistré en base de données");
    } catch (error) {
      console.error("❌ Échec de la communication avec la BDD :", error);
    }

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
        alert("Tu es déjà au niveau maximum ! Rejouonadmin/dashboards en DIFFICILE.");
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

  if (meLoading) {
    return (
      <main className="h-screen w-screen overflow-hidden relative">
        <div
          className="h-full w-full bg-cover bg-center no-repeat flex items-center justify-center"
          style={{ backgroundImage: "url('/Menu.PNG')" }}
        >
          <div className="absolute inset-0 bg-black/10 pointer-events-none" />
          <div className="relative z-10 text-2xl font-black text-[#5d3a1a] uppercase tracking-widest">
            Chargement...
          </div>
        </div>
      </main>
    );
  }

  return (

    <main className="h-screen w-screen overflow-hidden relative">

      {/* ÉCRAN 0 : AUTH */}
      {step === "auth" && (
        <BackgroundLayout>
          <div
            className="h-full w-full bg-cover bg-center no-repeat flex items-end justify-center pb-10 md:pb-16"
            style={{}}
          >
            <div className="absolute inset-0 bg-black/10 pointer-events-none" />

            <div className="absolute bottom-[12%] z-10 flex w-full max-w-4xl flex-col items-center gap-6 px-4 sm:flex-row sm:justify-center sm:gap-10">
              <Link
                href="/login"
                className="group inline-flex h-28 w-80 items-center justify-center bg-[url('/parcheminH.png')] bg-size-[100%_100%] bg-center bg-no-repeat"
              >
                <span className="text-lg font-black uppercase tracking-widest text-[#5d3a1a] group-hover:scale-105 transition-transform whitespace-nowrap">
                  Connection
                </span>
              </Link>
              <Link
                href="/signUp"
                className="group inline-flex h-28 w-80 items-center justify-center bg-[url('/parcheminH2.png')] bg-size-[100%_100%] bg-center bg-no-repeat"
              >
                <span className="text-lg font-black uppercase tracking-widest text-[#5d3a1a] group-hover:scale-105 transition-transform whitespace-nowrap">
                  Inscription
                </span>
              </Link>
            </div>
          </div>
        </BackgroundLayout>
      )}

      {/* ÉCRAN 1 : CONFIGURATION */}
      {step === 'config' && (
        <ConfigPage pseudo={meData?.me?.username ?? ""} onStart={handleStartGame} />
      )}

      {/* ÉCRAN 2 : JEU (GameBoard) */}
      {step === 'game' && (
        <div
          className="h-full w-full flex items-center justify-center bg-cover bg-center"
          style={{ backgroundImage: "url('/word-battle-bg.png')" }}
        >
          {/* L'ajout de key={gameKey} est crucial ici */}
          <GameBoard
            key={gameKey}
            difficulty={gameData.difficulte}
            onQuit={() => setStep('config')}
            onGameOver={handleGameOver}
          />
        </div>
      )}

      {/* ÉCRAN 3 : SCORE (Affichage des parchemins) */}
      {step === 'score' && (
        <ScorePage
          currentScore={currentScore}
          bestScores={bestScores}
          difficulty={gameData.difficulte}
          onQuit={() => setStep('config')}
          onNextLevel={handleNextLevel}
        />
      )}

    </main>
  );
}
