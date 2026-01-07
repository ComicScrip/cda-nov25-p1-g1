import React, { useState } from "react";

type Difficulty = "FACILE" | "MOYEN" | "DIFFICILE";

interface ConfigProps {
  onStart: (pseudo: string, diff: Difficulty) => void;
}

export default function ConfigPage({ onStart }: ConfigProps) {
  const [pseudo, setPseudo] = useState("");
  const [difficulte, setDifficulte] = useState<Difficulty>("FACILE");

  const descriptions: Record<Difficulty, string> = {
    FACILE: "6 erreurs autorisées. Parfait pour commencer l'aventure.",
    MOYEN: "4 erreurs autorisées. Un défi digne d'un scribe royal.",
    DIFFICILE: "2 erreurs seulement. Seul un grand Pharaon peut gagner !",
  };

  return (
    <div 
      className="h-screen w-screen bg-cover bg-center no-repeat relative overflow-hidden flex items-center justify-center"
      style={{ backgroundImage: "url('/Config.PNG')" }} 
    >
      {/* Le conteneur aspect-video assure que tes zones cliquables 
          restent alignées sur les dessins de l'image de fond 
      */}
      <div className="relative h-full aspect-video max-w-full">
        
        {/* 1. CHAMP PSEUDO */}
        <div className="absolute top-[28%] left-1/2 -translate-x-1/2 w-[28%] h-[8%] flex items-center justify-center">
          <input
            type="text"
            placeholder="Ton Pseudo..."
            value={pseudo}
            onChange={(e) => setPseudo(e.target.value)}
            className="w-full h-full bg-transparent text-center text-2xl font-bold text-[#5d3a1a] outline-none placeholder:text-[#5d3a1a]/40"
          />
        </div>

        {/* 2. BOUTONS DIFFICULTÉ */}
        <div className="absolute top-[50%] left-1/2 -translate-x-1/2 w-[48%] h-[9%] flex justify-between">
          {(["FACILE", "MOYEN", "DIFFICILE"] as const).map((level) => (
            <button
              key={level}
              type="button"
              onClick={() => setDifficulte(level)}
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

        {/* 3. CASE DESCRIPTION */}
        <div className="absolute top-[63.5%] left-1/2 -translate-x-1/2 w-[55%] h-[15%] flex items-center justify-center px-6 text-center">
          <p className="text-[#5d3a1a] font-bold italic text-lg leading-tight">
            {descriptions[difficulte]}
          </p>
        </div>

        {/* 4. BOUTON COMMENCER - Envoie vers GameBoard */}
        <div className="absolute bottom-[9%] left-1/2 -translate-x-1/2 w-[40%] h-[12%]">
          <button 
            type="button"
            onClick={() => onStart(pseudo, difficulte)}
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