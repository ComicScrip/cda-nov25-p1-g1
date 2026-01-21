import { useRouter } from "next/router";
import { useState } from "react";
import BackgroundLayout from "@/components/BackgroundLayout";
import { useAdminLoginMutation } from '@/graphql/generated/Maybe';

export default function AdminLoginPage() {
  const router = useRouter();
  const [adminLogin, { loading }] = useAdminLoginMutation();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const res = await adminLogin({
        variables: {
          data: { username, password },
        },
      });

if (res.data?.adminLogin) {
  router.push("/admin/dashboard");
  return;
}

      setError("Identifiants invalides");
    } catch (e: any) {
      console.log("LOGIN ERROR:", e);
      setError(e?.message || "Erreur de connexion");
    }
  };

  return (
    <BackgroundLayout>
      <div className="absolute inset-0 backdrop-blur-[2px] bg-black/5 z-0" />

      <form
        onSubmit={onSubmit}
        className="relative z-10 mt-10 w-full max-w-[320px] flex flex-col gap-4"
      >
        <input
          className="h-10 rounded-md bg-[#E8D2A6] px-4"
          placeholder="Identifiant"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          autoComplete="username"
        />

        <input
          className="h-10 rounded-md bg-[#E8D2A6] px-4"
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
        />

        {error && <p className="text-red-200 text-sm -mt-2">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="h-10 rounded-md bg-black/50 font-semibold disabled:opacity-60"
        >
          {loading ? "Connexion..." : "Se connecter"}
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
