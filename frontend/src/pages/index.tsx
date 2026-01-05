import Layout from "@/components/Layout";
import GameBoard from "@/components/GameBoard"; 
import { useUsersQuery } from "@/graphql/generated/schema";

export default function Home() {
  return (
    <main
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: "url('/word-battle-bg.png')",
      }}
    >
      <GameBoard />
    </main>
  );
}


 
