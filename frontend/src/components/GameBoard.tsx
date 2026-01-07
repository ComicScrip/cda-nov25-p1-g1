import { useState, useEffect } from "react";
import Win from "./Win";
import Lose from "./Lose";

// Définition des types de difficulté autorisés
type Difficulty = "FACILE" | "MOYEN" | "DIFFICILE";

// Définition des outils que le composant reçoit du parent (index.tsx)
interface GameBoardProps {
  difficulty: Difficulty; // Le niveau choisi
  onQuit: () => void;     // La fonction pour fermer le jeu
}

// 1. LE RÉPERTOIRE DES MOTS
// On classe les mots et leurs indices par niveau de difficulté
const MOTS_PAR_DIFFICULTE: Record<Difficulty, { mot: string; indice: string }[]> = {
  FACILE: [
    { mot: "LION", indice: "Animal de la savane" },
    { mot: "CHAT", indice: "Petit félin domestique" },
    { mot: "PAIN", indice: "Aliment de base" },
  ],
  MOYEN: [
    { mot: "GUITARE", indice: "Instrument à cordes" },
    { mot: "PYRAMIDE", indice: "Monument égyptien" },
    { mot: "FROMAGE", indice: "Spécialité française" },
  ],
  DIFFICILE: [
    { mot: "ASTRONAUTE", indice: "Voyageur de l'espace" },
    { mot: "LABYRINTHE", indice: "Lieu dont il est dur de sortir" },
    { mot: "CHRONOMETRE", indice: "Sert à mesurer le temps" },
  ],
};

// Création d'un tableau contenant toutes les lettres de A à Z
const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export default function GameBoard({ difficulty, onQuit }: GameBoardProps) {
  // 2. LES ÉTATS (LA MÉMOIRE DU JEU)
  const [motSecret, setMotSecret] = useState("");      // Le mot à deviner
  const [indice, setIndice] = useState("");            // L'indice du mot
  const [lettresTestees, setLettresTestees] = useState<string[]>([]); // Lettres cliquées
  const [erreurs, setErreurs] = useState(0);           // Compteur de fautes

  // Calcul dynamique du nombre d'erreurs autorisées selon la difficulté
  const MAX_ERRORS = difficulty === "DIFFICILE" ? 2 : difficulty === "MOYEN" ? 4 : 6;

  // 3. PRÉPARATION DU JEU
  // Au démarrage, on choisit un mot aléatoire dans la bonne catégorie
  useEffect(() => {
    const listeMots = MOTS_PAR_DIFFICULTE[difficulty];
    const selection = listeMots[Math.floor(Math.random() * listeMots.length)];
    setMotSecret(selection.mot.toUpperCase());
    setIndice(selection.indice);
  }, [difficulty]); // Se relance si la difficulté change

  // 4. VÉRIFICATION DE LA VICTOIRE OU DÉFAITE
  // Gagné si : chaque lettre du mot secret est présente dans les lettres cliquées
  const estGagne = motSecret !== "" && motSecret.split("").every((l) => lettresTestees.includes(l));
  // Perdu si : le nombre d'erreurs atteint le maximum
  const estPerdu = erreurs >= MAX_ERRORS;

  // 5. ACTION LORS D'UN CLIC SUR UNE LETTRE
  const handleClick = (lettre: string) => {
    // Si déjà cliqué ou fini, on ne fait rien
    if (lettresTestees.includes(lettre) || estGagne || estPerdu) return;

    // On ajoute la lettre à la liste des touches pressées
    setLettresTestees((prev) => [...prev, lettre]);

    // Si la lettre n'est pas dans le mot, on compte une erreur
    if (!motSecret.includes(lettre)) {
      setErreurs((prev) => prev + 1);
    }
  };

  // Fonction pour recommencer une partie avec un nouveau mot
  const rejouer = () => {
    const listeMots = MOTS_PAR_DIFFICULTE[difficulty];
    const selection = listeMots[Math.floor(Math.random() * listeMots.length)];
    setMotSecret(selection.mot.toUpperCase());
    setIndice(selection.indice);
    setLettresTestees([]);
    setErreurs(0);
  };

  // Affichage des écrans de fin si nécessaire
  if (motSecret === "") return <div className="text-white text-center">Préparation du parchemin...</div>;
  if (estGagne) return <Win word={motSecret} onRejouer={rejouer} />;
  if (estPerdu) return <Lose word={motSecret} onRejouer={rejouer} />;

  return (
    <div className="w-[900px] rounded-xl bg-yellow-100/90 p-6 border-4 border-yellow-700 shadow-xl mx-auto backdrop-blur-sm">
      <h1 className="text-center text-4xl font-extrabold text-yellow-800 mb-6 uppercase">WORD BATTLE</h1>

      {/* AFFICHAGE DE L'INDICE ET DU MODE */}
      <div className="flex justify-between mb-6 rounded-lg bg-yellow-50 p-4 border-2 border-yellow-600">
        <div>
            <span className="font-semibold text-yellow-900">Indice :</span> {indice}
        </div>
        <div className="font-bold text-orange-800 uppercase text-sm">
            Mode : {difficulty}
        </div>
      </div>

      {/* AFFICHAGE DES LETTRES DU MOT (Trait ou Lettre) */}
      <div className="flex justify-center gap-3 mb-8">
        {motSecret.split("").map((lettre, index) => (
          <div
            key={index}
            className={`h-14 w-14 text-3xl font-black flex items-center justify-center border-b-4 
              ${lettresTestees.includes(lettre) ? "border-blue-700 text-blue-900" : "border-yellow-700 text-transparent"}`}
          >
            {lettresTestees.includes(lettre) ? lettre : "?"}
          </div>
        ))}
      </div>

      {/* LE CLAVIER VIRTUEL */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {ALPHABET.map((lettre) => (
          <button
            key={lettre}
            onClick={() => handleClick(lettre)}
            disabled={lettresTestees.includes(lettre)}
            className={`w-12 h-12 font-bold rounded shadow-sm transition-transform active:scale-90 ${
              lettresTestees.includes(lettre)
                ? motSecret.includes(lettre) ? "bg-blue-400 text-white" : "bg-red-400 text-white" // Couleur selon résultat
                : "bg-yellow-600 hover:bg-yellow-700 text-white" // Couleur si pas cliqué
            }`}
          >
            {lettre}
          </button>
        ))}
      </div>

      {/* BARRE D'INFOS ET BOUTON QUITTER */}
      <div className="flex justify-between items-center mt-4 pt-4 border-t border-yellow-600">
        <button 
          className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 px-6 rounded-lg shadow-md" 
          onClick={onQuit} // Déclenche le retour au menu
        >
          Quitter le jeu
        </button>

        {/* Compteur de vies qui clignote si on est proche de la défaite */}
        <div className={`rounded-full px-6 py-2 border-2 font-black transition-colors ${erreurs >= MAX_ERRORS - 1 ? "bg-red-600 text-white animate-pulse" : "bg-yellow-200 text-yellow-900 border-yellow-700"}`}>
          VIES : {MAX_ERRORS - erreurs} / {MAX_ERRORS}
        </div>
      </div>
    </div>
  );
}