import { useState } from "react";
import { useRouter } from "next/router";
import BackgroundLayout from "@/components/BackgroundLayout";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

return (
  <BackgroundLayout>
    <div className="absolute inset-0 backdrop-blur-[2px] bg-black/5 z-0" />
    <form
      onSubmit={onSubmit}
      className="
        relative z-10
        mt-10
        w-full max-w-[320px]
        flex flex-col gap-4
      "
    >
      <input
        className="h-10 rounded-md bg-[#E8D2A6] px-4"
        placeholder="Identifiant"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <input
        className="h-10 rounded-md bg-[#E8D2A6] px-4"
        type="password"
        placeholder="Mot de passe"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button className="h-10 rounded-md bg-black/50 font-semibold">
        Se connecter
      </button>

      <button
        type="button"
        onClick={() => router.push("/")}
        className="h-10 rounded-md bg-black/30"
      >
        Retour accueil
      </button>
    </form>
  </BackgroundLayout>
);
}
