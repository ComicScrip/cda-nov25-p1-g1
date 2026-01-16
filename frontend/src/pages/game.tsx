import BackgroundLayout from "@/components/BackgroundLayout";
import GameBoard from "@/components/GameBoard";

export default function GamePage() {
  return (
    <BackgroundLayout>
      <div className="mt-5 w-full flex justify-center">
        <GameBoard difficulty="FACILE" onQuit={() => { }} onGameOver={(score) => { }} />
        {/* <GameBoard /> Me donne une erreur si je laisse ainsi.
        Type '{}' is missing the following properties from type 'GameBoardProps': difficulty, onQuit, onGameOver
 */}      </div>
    </BackgroundLayout>
  );
}
