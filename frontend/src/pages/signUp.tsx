import { useRouter } from "next/router";
import { useState } from "react";
import { SignupBackgroundLayout } from "@/components/BackgroundLayout";
import { useSignUpMutation } from "@/graphql/generated/schema";


export default function RegisterPage() {
    const router = useRouter();
    const [signUpUser, { loading }] = useSignUpMutation();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

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
        setSuccess(null);

        if (password !== confirmPassword) {
            setError("Les mots de passe ne sont pas identiques.");
            return;
        }

        try {
            const res = await signUpUser({
                variables: {
                    data: { username, password },
                },
            });

            if (res.data?.signUp) {
                setSuccess("Compte créé ! Tu peux lancer une partie.");
                setTimeout(() => {
                    router.push("/");
                }, 800);
                return;
            }

            setError("Impossible de créer le compte.");
        } catch (e: any) {
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
                "Erreur lors de l'inscription."
            );
        }
    };

    return (
        <SignupBackgroundLayout>
            <div className="absolute inset-0 backdrop-blur-[0px] bg-black/5 z-0 pointer-events-none" />

            <form
                onSubmit={onSubmit}
                className="relative z-10 font-aclonica"
            >
                <div className="mb-5 text-center">
                    <div className="mt-2 inline-block border border-black/30 bg-[#E8D2A6]/70 px-3 py-2 text-sm text-black/80 leading-tight">
                        Choisissez un identifiant et un mot de passe
                    </div>
                </div>

                <label className="mb-3 flex flex-col gap-2 text-sm text-black/80">
                    Identifiant
                    <input
                        className="h-11 rounded-md border border-black/20 bg-[#E8D2A6] px-4 text-base"
                        placeholder="Ex: Pierre-LeGoat-Genthon"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        autoComplete="username"
                    />
                </label>

                <label className="mb-3 flex flex-col gap-2 text-sm text-black/80">
                    Mot de passe
                    <input
                        className="h-11 rounded-md border border-black/20 bg-[#E8D2A6] px-4 text-base"
                        type="password"
                        placeholder="8 caractères minimum"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        autoComplete="new-password"
                    />
                </label>

                <label className="mb-3 flex flex-col gap-2 text-sm text-black/80">
                    Confirmer le mot de passe
                    <input
                        className="h-11 rounded-md border border-black/20 bg-[#E8D2A6] px-4 text-base"
                        type="password"
                        placeholder="Même mot de passe"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        autoComplete="new-password"
                    />
                </label>

                {error && (
                    <p className="rounded-md border border-red-200/40 bg-red-100/40 px-3 py-2 text-center text-sm text-red-900">
                        {error}
                    </p>
                )}
                {success && (
                    <p className="rounded-md border border-green-200/40 bg-green-100/40 px-3 py-2 text-center text-sm text-green-900">
                        {success}
                    </p>
                )}

                <div className="mt-10">
                    <button
                        type="submit"
                        disabled={loading}
                        className="disabled:opacity-60"
                    >
                        <span className="inline-flex h-30 items-center justify-center px-35 bg-[url('/parcheminH2.png')]  bg-contain bg-center bg-no-repeat">
                            <span className="font-semibold text-[#5d3a1a] whitespace-nowrap">
                                {loading ? "Création..." : "Confirmer"}
                            </span>
                        </span>
                    </button>
                </div>


            </form>
        </SignupBackgroundLayout>
    );
}
