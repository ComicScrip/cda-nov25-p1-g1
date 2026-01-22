import { GameBackgroundLayout } from "@/components/BackgroundLayout";
import GameBoard from "@/components/GameBoard";

export default function GamePage() {
  return (
    <GameBackgroundLayout showLogo={false}>
      <div className="mt-5 w-full flex justify-center">
        <GameBoard difficulty="FACILE" onQuit={() => { }} onGameOver={(score) => { }} />
      </div>
    </GameBackgroundLayout>
  );
}
