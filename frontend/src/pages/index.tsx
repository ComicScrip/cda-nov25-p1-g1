import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import GameBoard from "@/components/GameBoard";
import ConfigPage from "@/components/ConfigPage";
import ScorePage from "@/components/ScorePage";
import { useMeQuery } from "@/graphql/generated/schema";
import BackgroundLayout, { GameBackgroundLayout } from "@/components/BackgroundLayout";

// Type strict pour la difficulté
type Difficulty = "FACILE" | "MOYEN" | "DIFFICILE";

export default function Home() {
  const router = useRouter();
  const { data: meData, loading: meLoading } = useMeQuery({
    fetchPolicy: "network-only",
  });

  // --- ÉTATS ---
  const [step, setStep] = useState<"auth" | "config" | "game" | "score">("auth");
  const [gameData, setGameData] = useState<{ pseudo: string; difficulte: Difficulty }>({
    pseudo: "",
    difficulte: "FACILE"
  });
  const [currentScore, setCurrentScore] = useState(0);
  const [bestScores, setBestScores] = useState<Record<Difficulty, number>>({
    FACILE: 0, MOYEN: 0, DIFFICILE: 0
  });
  
  // La gameKey est CRUCIALE : elle force le GameBoard à se remonter (unmount/remount)
  const [gameKey, setGameKey] = useState(0);

  // --- LOGIQUE D'AUTHENTIFICATION ---
  useEffect(() => {
    if (meLoading) return;
    setStep(meData?.me ? "config" : "auth");
  }, [meLoading, meData]);

  // --- ACTIONS DU JEU ---
  
  // Lancer une nouvelle partie (depuis la config)
  const handleStartGame = (pseudo: string, diff: Difficulty) => {
    setGameData({ pseudo, difficulte: diff });
    setGameKey(prev => prev + 1); // Reset le composant
    setStep('game');
  };

  // Rejouer immédiatement (depuis l'écran Lose ou Win)
  const handleRetry = () => {
    setGameKey(prev => prev + 1); // Force un nouveau mot via un nouveau cycle de vie
    setStep('game');
  };

  // Fin de partie (victoire ou défaite)
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

  // Passer au niveau suivant
  const handleNextLevel = () => {
    let nextDiff = gameData.difficulte;
    if (currentScore > 0) {
      if (gameData.difficulte === "FACILE") nextDiff = "MOYEN";
      else if (gameData.difficulte === "MOYEN") nextDiff = "DIFFICILE";
    }
    setGameData(prev => ({ ...prev, difficulte: nextDiff }));
    setGameKey(prev => prev + 1);
    setStep('game');
  };

  // --- RENDU CHARGEMENT ---
  if (meLoading) {
    return (
      <main className="h-screen w-screen overflow-hidden relative">
        <div className="h-full w-full bg-cover bg-center no-repeat flex items-center justify-center" style={{ backgroundImage: "url('/Menu.PNG')" }}>
          <div className="relative z-10 text-2xl font-black text-[#5d3a1a] uppercase tracking-widest animate-pulse">
            Invocation...
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="h-screen w-screen overflow-hidden relative font-sans">

      {/* ÉCRAN 0 : AUTH */}
      {step === "auth" && (
        <BackgroundLayout>
          <div className="h-full w-full bg-cover bg-center no-repeat flex items-end justify-center pb-10 md:pb-16">
            <div className="absolute inset-0 bg-black/10 pointer-events-none" />
            <div className="absolute bottom-[12%] z-10 flex w-full max-w-4xl flex-col items-center gap-6 px-4 sm:flex-row sm:justify-center sm:gap-10">
              <Link href="/login" className="group inline-flex h-28 w-80 items-center justify-center bg-[url('/parcheminH.png')] bg-contain bg-center bg-no-repeat cursor-pointer transition-transform hover:scale-105 active:scale-95">
                <span className="text-lg font-black uppercase tracking-widest text-[#5d3a1a]">Connexion</span>
              </Link>
              <Link href="/signUp" className="group inline-flex h-28 w-80 items-center justify-center bg-[url('/parcheminH2.png')] bg-contain bg-center bg-no-repeat cursor-pointer transition-transform hover:scale-105 active:scale-95">
                <span className="text-lg font-black uppercase tracking-widest text-[#5d3a1a]">Inscription</span>
              </Link>
            </div>
          </div>
        </BackgroundLayout>
      )}

      {/* ÉCRAN 1 : CONFIGURATION */}
      {step === 'config' && (
        <div className="h-full w-full relative">
            <div className="absolute top-6 right-6 z-50">
                <Link href="/profile" className="group flex h-16 w-48 items-center justify-center bg-[url('/parcheminH.png')] bg-contain bg-center bg-no-repeat transition-transform hover:scale-105 active:scale-95 cursor-pointer">
                    <span className="text-sm font-black uppercase text-[#5d3a1a]">📜 Mon Profil</span>
                </Link>
            </div>
            <ConfigPage pseudo={meData?.me?.username ?? ""} onStart={handleStartGame} />
        </div>
      )}

      {/* ÉCRAN 2 : JEU */}
      {step === 'game' && (
        <GameBackgroundLayout showLogo={false}>
          <div className="w-full flex-1 flex items-center justify-center">
            <GameBoard
              key={gameKey} // Le changement de clé réinitialise tout le GameBoard
              difficulty={gameData.difficulte}
              onQuit={() => setStep('config')}
              onGameOver={handleGameOver}
              onRetry={handleRetry} 
            />
          </div>
        </GameBackgroundLayout>
      )}

      {/* ÉCRAN 3 : SCORE */}
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