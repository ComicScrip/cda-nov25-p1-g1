import BackgroundLayout from "@/components/BackgroundLayout";
import { useRouter } from "next/router";

export default function HomePage() {
  const router = useRouter();

  return (
    <BackgroundLayout>
      <div className="mt-20 flex flex-col items-center gap-6 px-6">
        <button
          onClick={() => router.push("/game")}
className="h-10 rounded-md bg-[#E8D2A6] px-4"
        >
          Démarrer une partie
        </button>
      </div>
    </BackgroundLayout>
  );
}
