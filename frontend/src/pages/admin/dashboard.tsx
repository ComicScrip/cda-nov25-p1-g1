import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import {
  useCreateWordMutation,
  useDeleteWordMutation,
  useLogoutMutation,
  useMeQuery,
  useUpdateWordMutation,
  useWordsQuery,
} from "@/graphql/generated/schema";

type Difficulty = "Facile" | "Moyen" | "Difficile";

export default function AdminDashboardPage() {
  const router = useRouter();

  // Auth
  const {
    data: meData,
    loading: meLoading,
    error: meError,
  } = useMeQuery({
    fetchPolicy: "network-only", // ne prend pas le cache pour être sûr d'avoir les bonnes infos
  });
  const me = meData?.me;

  // Words list
  const {
    data: wordsData,
    loading: wordsLoading,
    refetch: refetchWords,
  } = useWordsQuery({
    variables: { limit: 200, sortBy: "idWord", order: "desc" },
    fetchPolicy: "network-only",
    skip: !me, // on attend d'être connecté
  });
  // useMemo evite de le ?? [] à chaque rendu
  const words = useMemo(() => wordsData?.words ?? [], [wordsData]);

  // Crud mutations
  const [createWordMutation, { loading: createWordLoading }] = useCreateWordMutation();
  const [updateWordMutation, { loading: updateWordLoading }] = useUpdateWordMutation();
  const [deleteWordMutation, { loading: deleteWordLoading }] = useDeleteWordMutation();
  const [logout, { loading: logoutLoading }] = useLogoutMutation();

  // UI state
  const [selectedId, setSelectedId] = useState<number | null>(null);
  // Ca trouve l'objet complet (label/indices/...) du mot selectionné
  const selectedWord = useMemo(
    () => words.find((w) => w.idWord === selectedId) ?? null,
    [words, selectedId],
  );

  // Champ du formulaire
  const [label, setLabel] = useState("");
  const [indice, setIndice] = useState("");
  const [difficulty, setDifficulty] = useState<Difficulty>("Facile");
  const [category, setCategory] = useState("");

  const [message, setMessage] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Quand on sélectionne un word -> on remplit le formulaire (pour Modifier)
  useEffect(() => {
    if (selectedWord) {
      setLabel(selectedWord.label);
      setIndice(selectedWord.indice);
      setDifficulty((selectedWord.difficulty as Difficulty) || "Facile");
      setCategory(selectedWord.category);
    }
  }, [selectedWord]);

  const clearForm = () => {
    setSelectedId(null);
    setLabel("");
    setIndice("");
    setDifficulty("Facile");
    setCategory("");
    setErrorMsg(null);
    setMessage(null);
  };
  // On nettoie les champs et trim enleve les espaces inutiles
  const validate = (): boolean => {
    const l = label.trim();
    const i = indice.trim();
    const c = category.trim();
    // si le mot est trop court : erreur + on bloque l'action
    if (l.length < 2) return setErrorMsg("Le mot doit faire au moins 2 caractères."), false;
    if (i.length < 2) return setErrorMsg("L’indice doit faire au moins 2 caractères."), false;
    if (c.length < 2) return setErrorMsg("La catégorie doit faire au moins 2 caractères."), false;

    return true;
  };

  // Actions
  const handleAdd = async () => {
    setErrorMsg(null);
    setMessage(null);

    if (!validate()) return;

    try {
      await createWordMutation({
        variables: {
          data: {
            label: label.trim(),
            indice: indice.trim(),
            difficulty, //déja typé "Facile" | "Moyen" | "Difficile"
            category: category.trim(),
          },
        },
      });
      await refetchWords();
      setMessage("Mot ajouté avec succès.");
      clearForm();
    } catch (e: any) {
      console.error("CREATE WORD ERROR:", e);
      setErrorMsg(e?.message || "Erreur lors de l’ajout du mot.");
    }
  };

  const handleUpdate = async () => {
    setErrorMsg(null);
    setMessage(null);

    if (!validate() || selectedId === null) return;

    try {
      await updateWordMutation({
        variables: {
          id: selectedId,
          data: {
            label: label.trim(),
            indice: indice.trim(),
            difficulty,
            category: category.trim(),
          },
        },
      });
      await refetchWords();
      setMessage("Mot mis à jour avec succès.");
      clearForm();
    } catch (e: any) {
      console.error("UPDATE WORD ERROR:", e);
      setErrorMsg(e?.message || "Erreur lors de la mise à jour du mot.");
    }
  };

  const handleDelete = async () => {
    setErrorMsg(null);
    setMessage(null);

    if (selectedId === null) return;

    try {
      await deleteWordMutation({
        variables: { id: selectedId },
      });
      await refetchWords();
      setMessage("Mot supprimé avec succès.");
      clearForm();
    } catch (e: any) {
      console.error("DELETE WORD ERROR:", e);
      setErrorMsg(e?.message || "Erreur lors de la suppression du mot.");
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      router.replace("/admin/login");
    } catch (e) {
      console.error("LOGOUT ERROR:", e);
    }
  };
  // Protection visuelle tant que me n'est pas chargé on affiche rien, si pas admin on affiche rien aussi
if (meLoading) return <div className="p-4 text-white">Chargement...</div>;
if (meError) return <div className="p-4 text-white">Erreur auth</div>;

if (!me) {
  router.replace("/admin/login");
  return null;
}

if (me.role !== "admin") {
  router.replace("/");
  return null;
}

    return (
      <div
        className="min-h-screen w-full bg-no-repeat"
        style={{ backgroundImage: "url(/DashboardAdmin.png)" }}
      >
        <div className="min-h-screen bg-cover bg-center flex flex-col items-center">
            <Image
              src="/AdminLogo.png"
              alt="Word Battle Administration"
              width={380}
              height={140}
              priority
              className="h-auto w-[220px] sm:w-[280px] md:w-[360px]"
            />
          <div className="mt-5">
            <button
              onClick={handleLogout}
              disabled={logoutLoading}
              className="rounded-md bg-[#E8D2A6] px-4 py-2 text-sm font-semibold text-[#4b2f1b] shadow disabled:opacity-60"
            >
              {logoutLoading ? "Déconnexion..." : "Déconnexion"}
            </button>
          </div>

          <div className="mx-auto mt-4 w-full max-w-[980px]">
                <div className="px-6 pt-20 pb-8 sm:px-10 sm:pt-24 md:px-10 md:pt-24">
                  {/* Champ label */}
                  <input
                    value={label}
                    onChange={(e) => setLabel(e.target.value)}
                    placeholder="Ajouter un mot "
                    className="h-9 w-full rounded-md bg-[#E8D2A6] px-3 text-sm text-[#4A2E13] placeholder:text-[#6b4a2a] outline-none shadow"
                  />

                  {/* Bloc difficulté + catégorie */}
                  <div className="mt-3 grid grid-cols-2 gap-3">
                    <select
                      value={difficulty}
                      onChange={(e) => setDifficulty(e.target.value as Difficulty)}
                      className="h-20 w-full rounded-md bg-[#E8D2A6] px-2 text-sm text-[#4A2E13] outline-none shadow"
                    >
                      <option value="Facile">Facile</option>
                      <option value="Moyen">Moyen</option>
                      <option value="Difficile">Difficile</option>
                    </select>

                    <div className="flex flex-col gap-2">
                      <input
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        placeholder="Tape ta catégorie"
                        className="h-9 w-full rounded-md bg-[#E8D2A6] px-3 text-sm text-[#4A2E13] placeholder:text-[#6b4a2a] outline-none shadow"
                      />
                      <input
                        value={indice}
                        onChange={(e) => setIndice(e.target.value)}
                        placeholder="Indice"
                        className="h-9 w-full rounded-md bg-[#E8D2A6] px-3 text-sm text-[#4A2E13] placeholder:text-[#6b4a2a] outline-none shadow"
                      />
                    </div>
                  </div>

                  {/* Boutons (colonne) */}
                  <div className="mt-4 flex flex-col items-center gap-2">
                    <button
                      onClick={handleAdd}
                      disabled={createWordLoading}
                      className="h-7 w-[150px] rounded-md bg-[#E8D2A6] text-sm font-semibold text-[#4A2E13] shadow disabled:opacity-60"
                    >
                      {createWordLoading ? "..." : "Ajouter"}
                    </button>

                    <button
                      onClick={handleUpdate}
                      disabled={updateWordLoading || !selectedId}
                      className="h-7 w-[150px] rounded-md bg-[#E8D2A6] text-sm font-semibold text-[#4A2E13] shadow disabled:opacity-60"
                    >
                      {updateWordLoading ? "..." : "Modifier"}
                    </button>

                    <button
                      onClick={handleDelete}
                      disabled={deleteWordLoading || !selectedId}
                      className="h-7 w-[150px] rounded-md bg-[#E8D2A6] text-sm font-semibold text-[#4b2f1b] shadow disabled:opacity-60"
                    >
                      {deleteWordLoading ? "..." : "Supprimer"}
                    </button>


                    <Link
                      href="/game"
                      className="mt-4 flex h-10 w-[220px] items-center justify-center rounded-xl bg-[#E2B15C] text-sm font-extrabold text-[#4A2E13] shadow-lg"
                    >
                      Faire une partie
                    </Link>

                    <button
                      onClick={clearForm}
                      className="mt-2 text-xs font-semibold text-[#4b2f1b]/80 underline"
                    >
                      Réinitialiser la sélection
                    </button>

                    {/* Feedback */}
                    <div className="mt-3 w-full">
                      {message && (
                        <div className="rounded-md bg-white/70 px-3 py-2 text-sm font-semibold text-[#2e6b2e] shadow">
                          {message}
                        </div>
                      )}
                      {errorMsg && (
                        <div className="mt-2 rounded-md bg-white/70 px-3 py-2 text-sm font-semibold text-red-700 shadow">
                          {errorMsg}
                        </div>
                      )}
                    </div>
                </div>
              </div>

              {/* LISTE DES MOTS */}
              <div className="rounded-2xl bg-white/75 p-4 shadow-lg m-5">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-bold text-[#4A2E13]">Liste des mots</h2>

                  <button
                    onClick={() => refetchWords()}
                    className="rounded-md bg-white/70 px-3 py-2 text-xs font-semibold text-[#4A2E13] shadow hover:bg-white"
                  >
                    Rafraîchir
                  </button>
                </div>

                <p className="mt-1 text-xs text-[#4A2E13]/80">
                  Clique sur un mot pour le sélectionner puis “Modifier” ou “Supprimer”.
                </p>

                <div className="mt-3">
                  {wordsLoading ? (
                    <p className="text-sm text-[#4A2E13]">Chargement...</p>
                  ) : words.length === 0 ? (
                    <p className="text-sm text-[#4A2E13]">Aucun mot.</p>
                  ) : (
                    <div className="max-h-[520px] overflow-auto rounded-xl bg-white/60 p-2">
                      <ul className="space-y-2">
                        {words.map((w) => {
                          const active = w.idWord === selectedId;
                          return (
                            <li key={w.idWord}>
                              <button
                                onClick={() => setSelectedId(w.idWord)}
                                className={[
                                  "w-full rounded-lg px-3 py-2 text-left shadow",
                                  active
                                    ? "bg-[#E8D2A6] text-[#4A2E13]"
                                    : "bg-white/70 text-[#4A2E13] hover:bg-white",
                                ].join(" ")}
                              >
                                <div className="flex items-center justify-between gap-3">
                                  <div className="min-w-0">
                                    <p className="truncate font-bold">{w.label}</p>
                                    <p className="truncate text-xs opacity-80">
                                      {w.category} — {w.indice}
                                    </p>
                                  </div>

                                  <span className="shrink-0 rounded-md bg-black/10 px-2 py-1 text-xs font-semibold">
                                    {w.difficulty}
                                  </span>
                                </div>
                              </button>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  )}
                </div>

                <div className="mt-3 text-xs text-[#4A2E13]/70">
                  Total : <span className="font-bold">{words.length}</span> mots
                </div>
              </div>
            </div>
          </div>

          {/* Footer mini */}
          <div className="mx-auto mt-6 w-full max-w-[980px] text-center text-xs text-white/70">
            Word Battle — Administration
          </div>
        </div>

    );
  }
