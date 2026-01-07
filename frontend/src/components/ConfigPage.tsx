import React, { useState } from "react";

// Définition des types autorisés pour la difficulté
type Difficulty = "FACILE" | "MOYEN" | "DIFFICILE";

// Définition des propriétés (props) attendues par le composant
interface ConfigProps {
  // Fonction appelée pour démarrer le jeu avec le pseudo et la difficulté
  onStart: (pseudo: string, diff: Difficulty) => void;
}

export default function ConfigPage({ onStart }: ConfigProps) {
  // État local pour stocker le nom saisi par l'utilisateur
  const [pseudo, setPseudo] = useState("");
  // État local pour stocker la difficulté sélectionnée (par défaut : FACILE)
  const [difficulte, setDifficulte] = useState<Difficulty>("FACILE");

  // Objet de correspondance pour afficher une description selon la difficulté choisie
  const descriptions: Record<Difficulty, string> = {
    FACILE: "6 erreurs autorisées. Parfait pour commencer l'aventure.",
    MOYEN: "4 erreurs autorisées. Un défi digne d'un scribe royal.",
    DIFFICILE: "2 erreurs seulement. Seul un grand Pharaon peut gagner !",
  };

  return (
    <div 
      // Conteneur principal plein écran avec l'image de fond Config.PNG
      className="h-screen w-screen bg-cover bg-center no-repeat relative overflow-hidden flex items-center justify-center"
      style={{ backgroundImage: "url('/Config.PNG')" }} 
    >
      {/* Le conteneur aspect-video permet de garder les éléments interactifs 
          bien placés par-dessus les dessins de l'image de fond (pyramides, colonnes).
      */}
      <div className="relative h-full aspect-video max-w-full">
        
        {/* 1. CHAMP DE SAISIE DU PSEUDO */}
        <div className="absolute top-[28%] left-1/2 -translate-x-1/2 w-[28%] h-[8%] flex items-center justify-center">
          <input
            type="text"
            placeholder="Ton Pseudo..."
            value={pseudo}
            // Met à jour l'état 'pseudo' à chaque caractère tapé
            onChange={(e) => setPseudo(e.target.value)}
            // Style transparent pour se fondre dans le parchemin/dessin de l'image
            className="w-full h-full bg-transparent text-center text-2xl font-bold text-[#5d3a1a] outline-none placeholder:text-[#5d3a1a]/40"
          />
        </div>

        {/* 2. BOUTONS DE SÉLECTION DE LA DIFFICULTÉ */}
        <div className="absolute top-[50%] left-1/2 -translate-x-1/2 w-[48%] h-[9%] flex justify-between">
          {(["FACILE", "MOYEN", "DIFFICILE"] as const).map((level) => (
            <button
              key={level}
              type="button"
              // Change l'état de la difficulté au clic
              onClick={() => setDifficulte(level)}
              // Applique un style différent (bordure, échelle) si le bouton est sélectionné
              className={`w-[31%] h-full rounded-xl flex items-center justify-center font-black text-sm transition-all
                ${difficulte === level 
                  ? "bg-[#5d3a1a]/20 border-2 border-[#5d3a1a] text-[#5d3a1a] scale-105" 
                  : "bg-transparent text-[#5d3a1a]/60 hover:bg-[#5d3a1a]/10"
                }`}
            >
              {level}
            </button>
          ))}
        </div>

        {/* 3. AFFICHAGE DE LA DESCRIPTION DYNAMIQUE */}
        <div className="absolute top-[63.5%] left-1/2 -translate-x-1/2 w-[55%] h-[15%] flex items-center justify-center px-6 text-center">
          <p className="text-[#5d3a1a] font-bold italic text-lg leading-tight">
            {/* Affiche le texte correspondant à la difficulté stockée dans l'état */}
            {descriptions[difficulte]}
          </p>
        </div>

        {/* 4. BOUTON DE VALIDATION (COMMENCER) */}
        <div className="absolute bottom-[9%] left-1/2 -translate-x-1/2 w-[40%] h-[12%]">
          <button 
            type="button"
            // Déclenche la fonction onStart (qui redirige vers le GameBoard dans index.tsx)
            onClick={() => onStart(pseudo, difficulte)}
            // Désactive le bouton tant que le champ pseudo est vide
            disabled={!pseudo}
            className={`w-full h-full cursor-pointer transition-transform hover:scale-[1.02] active:scale-95 flex items-center justify-center
              ${!pseudo ? "opacity-20 grayscale cursor-not-allowed" : "opacity-100"}`}
          >
            <span className="text-3xl font-black text-[#5d3a1a] uppercase tracking-tighter">
              Commencer la partie
            </span>
          </button>
        </div>

      </div>
    </div>
  );
}