import { useState } from "react";

// Mot à deviner
const MOT_SECRET = "TIGRE";

// Nombre maximum d’erreurs autorisées
const MAX_ERRORS = 6;

// Lettres de l’alphabet pour le clavier
const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export default function GameBoard() {
  const [lettresTestees, setLettresTestees] = useState<string[]>([]);
  const [erreurs, setErreurs] = useState(0);

  // --- LOGIQUE DE VICTOIRE ET DÉFAITE ---
  
  // On gagne si toutes les lettres du MOT_SECRET sont dans lettresTestees
  const estGagne = MOT_SECRET.split("").every((lettre) => lettresTestees.includes(lettre));
  
  // On perd si le nombre d'erreurs atteint le maximum
  const estPerdu = erreurs >= MAX_ERRORS;

  const handleClick = (lettre: string) => {
    // Bloque le clic si la lettre est déjà testée OU si la partie est finie
    if (lettresTestees.includes(lettre) || estGagne || estPerdu) return;

    setLettresTestees([...lettresTestees, lettre]);

    if (!MOT_SECRET.includes(lettre)) {
      setErreurs((prev) => prev + 1); // Utilisation de prev pour plus de sécurité
    }
  };

  const rejouer = () => {
    setLettresTestees([]);
    setErreurs(0);
  };

  // --- AFFICHAGE CONDITIONNEL DES ÉCRANS FINAUX ---

  if (estGagne) {
    return (
      <div className="flex flex-col items-center justify-center p-10 bg-green-100 border-4 border-green-700 rounded-xl">
        <h1 className="text-5xl font-bold text-green-800 mb-4">Victoire !</h1>
        <p className="text-2xl mb-6">Félicitations, le mot était : <strong>{MOT_SECRET}</strong></p>
        <button onClick={rejouer} className="btn bg-green-600 text-white px-8 py-3 rounded-full hover:bg-green-700">
          Suivant / Rejouer
        </button>
      </div>
    );
  }

  if (estPerdu) {
    return (
      <div className="flex flex-col items-center justify-center p-10 bg-red-100 border-4 border-red-700 rounded-xl">
        <h1 className="text-5xl font-bold text-red-800 mb-4">Défaite</h1>
        <p className="text-2xl mb-6">Dommage ! Le mot était : <strong>{MOT_SECRET}</strong></p>
        <button onClick={rejouer} className="btn bg-red-600 text-white px-8 py-3 rounded-full hover:bg-red-700">
          Recommencer
        </button>
      </div>
    );
  }

  // --- AFFICHAGE DU JEU NORMAL ---
  return (
    <div className="w-[900px] rounded-xl bg-yellow-100 p-6 border-4 border-yellow-700 shadow-xl">
      <h1 className="text-center text-4xl font-extrabold text-yellow-800 mb-6">WORD BATTLE</h1>

      <div className="mb-6 rounded-lg bg-yellow-50 p-4 border-2 border-yellow-600">
        <span className="font-semibold">Indice :</span> animal 
      </div>

      <div className="flex justify-center gap-3 mb-6">
        {MOT_SECRET.split("").map((lettre, index) => (
          <div
            key={index}
            className={`h-14 w-14 text-3xl font-bold flex items-center justify-center border-2 rounded
              ${lettresTestees.includes(lettre) 
                ? "bg-blue-300 border-blue-700 text-blue-900" 
                : "bg-yellow-200 border-yellow-700"}
            `}
          >
            {lettresTestees.includes(lettre) ? lettre : ""}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-13 gap-2 mb-6">
        {ALPHABET.map((lettre) => {
          const estBonne = MOT_SECRET.includes(lettre);
          const dejaClique = lettresTestees.includes(lettre);
          return (
            <button
              key={lettre}
              onClick={() => handleClick(lettre)}
              disabled={dejaClique || estGagne || estPerdu}
              className={`btn btn-sm font-bold ${
                  dejaClique
                    ? estBonne ? "bg-blue-400 text-blue-900" : "bg-red-400 text-red-900"
                    : "bg-yellow-300 hover:bg-yellow-400"
                }
              `}
            >
              {lettre}
            </button>
          );
        })}
      </div>

      <div className="flex justify-between items-center mt-4">
        <button className="btn bg-orange-400 hover:bg-orange-500 text-white" onClick={rejouer}>
          Quitter / Reset
        </button>

        <div className={`rounded-lg px-4 py-2 border-2 font-bold ${erreurs >= 5 ? "bg-red-600 text-white border-red-800" : "bg-red-100 text-red-700 border-red-600"}`}>
          Incorrect : {erreurs} / {MAX_ERRORS}
        </div>
      </div>
    </div>
  );
}