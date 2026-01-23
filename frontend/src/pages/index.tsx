import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router"; // Import pour la navigation (ou next/navigation si App Router)
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

  const [step, setStep] = useState<"auth" | "config" | "game" | "score">("auth");

  useEffect(() => {
    if (meLoading) return;
    setStep(meData?.me ? "config" : "auth");
  }, [meLoading, meData]);

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

  const handleGameOver = async (scoreObtenu: number) => {
    setCurrentScore(scoreObtenu);
    // ... ta logique d'enregistrement fetch existante ...
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
      if (gameData.difficulte === "FACILE") nextDiff = "MOYEN";
      else if (gameData.difficulte === "MOYEN") nextDiff = "DIFFICILE";
    }
    setGameData(prev => ({ ...prev, difficulte: nextDiff }));
    setGameKey(prev => prev + 1);
    setStep('game');
  };

  if (meLoading) {
    return (
      <main className="h-screen w-screen overflow-hidden relative">
        <div className="h-full w-full bg-cover bg-center no-repeat flex items-center justify-center" style={{ backgroundImage: "url('/Menu.PNG')" }}>
          <div className="relative z-10 text-2xl font-black text-[#5d3a1a] uppercase tracking-widest">Chargement...</div>
        </div>
      </main>
    );
  }

  return (
    <main className="h-screen w-screen overflow-hidden relative">

      {/* ÉCRAN 0 : AUTH */}
      {step === "auth" && (
        <BackgroundLayout>
          <div className="h-full w-full bg-cover bg-center no-repeat flex items-end justify-center pb-10 md:pb-16">
            <div className="absolute inset-0 bg-black/10 pointer-events-none" />
            <div className="absolute bottom-[12%] z-10 flex w-full max-w-4xl flex-col items-center gap-6 px-4 sm:flex-row sm:justify-center sm:gap-10">
              <Link href="/login" className="group inline-flex h-28 w-80 items-center justify-center bg-[url('/parcheminH.png')] bg-size-[100%_100%] bg-center bg-no-repeat">
                <span className="text-lg font-black uppercase tracking-widest text-[#5d3a1a] group-hover:scale-105 transition-transform">Connection</span>
              </Link>
              <Link href="/signUp" className="group inline-flex h-28 w-80 items-center justify-center bg-[url('/parcheminH2.png')] bg-size-[100%_100%] bg-center bg-no-repeat">
                <span className="text-lg font-black uppercase tracking-widest text-[#5d3a1a] group-hover:scale-105 transition-transform">Inscription</span>
              </Link>
            </div>
          </div>
        </BackgroundLayout>
      )}

      {/* ÉCRAN 1 : CONFIGURATION (Modifié pour inclure le bouton Profil) */}
      {step === 'config' && (
        <div className="h-full w-full relative">
            {/* Bouton Profil flottant au-dessus de ConfigPage */}
            <div className="absolute top-6 right-6 z-50">
                <Link href="/profile" className="group flex h-16 w-48 items-center justify-center bg-[url('/parcheminH.png')] bg-size-[100%_100%] bg-center bg-no-repeat transition-transform hover:scale-105 active:scale-95">
                    <span className="text-sm font-black uppercase text-[#5d3a1a]">📜 Mon Profil</span>
                </Link>
            </div>
            <ConfigPage pseudo={meData?.me?.username ?? ""} onStart={handleStartGame} />
        </div>
      )}

      {/* ÉCRAN 2 : JEU (GameBoard) */}
      {step === 'game' && (
        <GameBackgroundLayout showLogo={false}>
          <div className="w-full flex-1 flex items-center justify-center">
            <GameBoard
              key={gameKey}
              difficulty={gameData.difficulte}
              onQuit={() => setStep('config')}
              onGameOver={handleGameOver}
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