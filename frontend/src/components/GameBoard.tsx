import { useState } from "react";

// Mot à deviner
const MOT_SECRET = "TIGRE";

// Nombre maximum d’erreurs autorisées
const MAX_ERRORS = 6;

// Lettres de l’alphabet pour le clavier
const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export default function GameBoard() {
  // Stocke les lettres déjà cliquées
  const [lettresTestees, setLettresTestees] = useState<string[]>([]);

  // Compte le nombre d’erreurs
  const [erreurs, setErreurs] = useState(0);

  // Fonction appelée quand on clique sur une lettre
  const handleClick = (lettre: string) => {
    // Empêche de cliquer deux fois sur la même lettre
    if (lettresTestees.includes(lettre)) return;

    // Ajoute la lettre aux lettres testées
    setLettresTestees([...lettresTestees, lettre]);

    // Si la lettre n'est pas dans le mot → erreur +1
    if (!MOT_SECRET.includes(lettre)) {
      setErreurs(erreurs + 1);
    }
  };

  return (
    <div className="w-[900px] rounded-xl bg-yellow-100 p-6 border-4 border-yellow-700 shadow-xl">
      {/* Titre du jeu */}
      <h1 className="text-center text-4xl font-extrabold text-yellow-800 mb-6">
        WORD BATTLE
      </h1>

      {/* Indice du mot */}
      <div className="mb-6 rounded-lg bg-yellow-50 p-4 border-2 border-yellow-600">
        <span className="font-semibold">Indice :</span> animal 
      </div>

      {/* Affichage du mot à deviner */}
      <div className="flex justify-center gap-3 mb-6">
        {MOT_SECRET.split("").map((lettre, index) => (
          <div
            key={index}
            className={`h-14 w-14 text-3xl font-bold flex items-center justify-center border-2 rounded
              ${
                // Si la lettre a été trouvée → bleu
                lettresTestees.includes(lettre)
                  ? "bg-blue-300 border-blue-700 text-blue-900"
                  // Sinon → jaune
                  : "bg-yellow-200 border-yellow-700"
              }
            `}
          >
            {/* Affiche la lettre seulement si elle a été trouvée */}
            {lettresTestees.includes(lettre) ? lettre : ""}
          </div>
        ))}
      </div>

      {/* Clavier des lettres */}
      <div className="grid grid-cols-13 gap-2 mb-6">
        {ALPHABET.map((lettre) => {
          // Vérifie si la lettre est dans le mot
          const estBonne = MOT_SECRET.includes(lettre);

          // Vérifie si la lettre a déjà été cliquée
          const dejaClique = lettresTestees.includes(lettre);

          return (
            <button
              key={lettre}
              onClick={() => handleClick(lettre)}
              disabled={dejaClique}
              className={`btn btn-sm font-bold
                ${
                  // Lettre déjà cliquée
                  dejaClique
                    ? estBonne
                      // Bonne lettre → bleu
                      ? "bg-blue-400 text-blue-900"
                      // Mauvaise lettre → rouge
                      : "bg-red-400 text-red-900"
                    // Lettre non jouée → jaune
                    : "bg-yellow-300 hover:bg-yellow-400"
                }
              `}
            >
              {lettre}
            </button>
          );
        })}
      </div>

      {/* Bas de page */}
      <div className="flex justify-between items-center mt-4">
        {/* Bouton quitter (reset du jeu) */}
        <button
          className="btn bg-orange-400 hover:bg-orange-500 text-white"
          onClick={() => window.location.reload()}
        >
          Quitter
        </button>

        {/* Compteur d'erreurs */}
        <div className="rounded-lg bg-red-100 px-4 py-2 border-2 border-red-600 font-bold text-red-700">
          Incorrect : {erreurs} / {MAX_ERRORS}
        </div>
      </div>
    </div>
  );
}
