import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { LoginBackgroundLayout } from "@/components/BackgroundLayout";
import { useLoginMutation } from "@/graphql/generated/schema";

export default function LoginPage() {
    const router = useRouter();
    const [login, { loading }] = useLoginMutation();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);

    const getValidationMessage = (errors: any[] | undefined) => {
        const firstError = errors?.[0];
        const validationErrors =
            firstError?.extensions?.validationErrors ||
            firstError?.extensions?.exception?.validationErrors;
        const constraints = validationErrors?.[0]?.constraints;
        if (!constraints) return null;
        const message = Object.values(constraints)[0];
        return typeof message === "string" ? message : null;
    };

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        try {
            const res = await login({
                variables: {
                    data: { username, password },
                },
            });

            if (res.data?.login) {
                router.push("/");
                return;
            }

            setError("Identifiants invalides");
        } catch (e: any) {
            console.log("LOGIN ERROR:", e);
            const graphQLErrors =
                e?.graphQLErrors ||
                e?.networkError?.result?.errors ||
                e?.cause?.result?.errors ||
                e?.errors ||
                [];
            const validationMessage = getValidationMessage(graphQLErrors);
            setError(
                validationMessage ||
                graphQLErrors?.[0]?.message ||
                e?.message ||
                "Erreur de connexion"
            );
        }
    };

    return (
        <LoginBackgroundLayout>
            <div className="absolute inset-0 backdrop-blur-[0px] bg-black/5 z-0" />

            <form
                onSubmit={onSubmit}
                className="relative z-10 mt-10 w-full max-w-[720px] flex flex-col items-center gap-6"
            >
                <div className="w-full max-w-[320px] flex flex-col gap-4">
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

                    {error && (
                        <p className="rounded-md border border-red-200/40 bg-red-100/40 px-3 py-2 text-center text-sm text-red-900">
                            {error}
                        </p>
                    )}
                </div>

                <div className="flex w-full flex-col items-center gap-4 sm:flex-row sm:justify-center">
                    <button
                        type="submit"
                        disabled={loading}
                        className="group inline-flex h-28 w-80 items-center justify-center bg-[url('/parcheminH.png')] bg-size-[100%_100%] bg-center bg-no-repeat disabled:opacity-60"
                    >
                        <span className="text-lg font-black uppercase tracking-widest text-[#5d3a1a] group-hover:scale-105 transition-transform whitespace-nowrap">
                            {loading ? "Connexion..." : "Se connecter"}
                        </span>
                    </button>

                    <Link
                        href="/"
                        className="group inline-flex h-28 w-80 items-center justify-center bg-[url('/parcheminH2.png')] bg-size-[100%_100%] bg-center bg-no-repeat"
                    >
                        <span className="text-lg font-black uppercase tracking-widest text-[#5d3a1a] group-hover:scale-105 transition-transform whitespace-nowrap">
                            Retour accueil
                        </span>
                    </Link>
                </div>
            </form>
        </LoginBackgroundLayout>
    );
}
