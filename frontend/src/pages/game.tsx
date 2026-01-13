import BackgroundLayout from "@/components/BackgroundLayout";
import GameBoard from "@/components/GameBoard";

export default function GamePage() {
  return (
    <BackgroundLayout>
      <div className="mt-5 w-full flex justify-center">
        <GameBoard />
      </div>
    </BackgroundLayout>
  );
}
