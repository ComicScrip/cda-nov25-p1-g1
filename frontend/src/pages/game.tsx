import { useRouter } from "next/router";
import { GameBackgroundLayout } from "@/components/BackgroundLayout";
import GameBoard from "@/components/GameBoard";

export default function GamePage() {
  const router = useRouter();

  return (
    <GameBackgroundLayout showLogo={false}>
      <div className="mt-5 w-full flex justify-center">
        <GameBoard
          difficulty="FACILE"
          onQuit={() => router.push("/")}
          onGameOver={() => {}}
        />
      </div>
    </GameBackgroundLayout>
  );
}
