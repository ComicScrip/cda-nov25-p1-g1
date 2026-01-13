import React, { useState } from "react";

type Difficulty = "FACILE" | "MOYEN" | "DIFFICILE";

interface ConfigProps {
  onStart: (pseudo: string, diff: Difficulty) => void;
}

export default function ConfigPage({ onStart }: ConfigProps) {
  const [pseudo, setPseudo] = useState("");
  const [difficulte, setDifficulte] = useState<Difficulty>("FACILE");

  const descriptions: Record<Difficulty, string> = {
    FACILE: "6 erreurs autorisées. Parfait pour les jeunes scribes.",
    MOYEN: "4 erreurs autorisées. Un défi digne d'un architecte royal.",
    DIFFICILE: "2 erreurs seulement. Seul le Pharaon peut triompher !",
  };

  return (
    <div 
      className="min-h-[100dvh] w-full bg-cover bg-center no-repeat relative flex flex-col items-center justify-center font-sans p-4 overflow-y-auto"
      style={{ backgroundImage: "url('/Config.PNG')" }} 
    >
      {/* Overlay pour la lisibilité sur mobile */}
      <div className="absolute inset-0 bg-black/10 md:bg-transparent pointer-events-none" />

      {/* Container principal qui remplace l'aspect-video fixe */}
      <div className="relative z-10 w-full max-w-4xl flex flex-col items-center gap-6 md:gap-12 py-8">
        
        {/* 1. BLOC PSEUDO (Style Bulle Beige) */}
        <div className="w-full max-w-[320px] md:max-w-[400px] min-h-[60px] md:h-20 flex items-center justify-center bg-[#e6d2b5] border-[3px] border-[#8b5a2b] rounded-[20px] shadow-lg px-4">
          <input
            type="text"
            placeholder="Pseudo"
            value={pseudo}
            onChange={(e) => setPseudo(e.target.value)}
            className="w-full bg-transparent text-center text-2xl md:text-4xl font-bold text-[#5d3a1a] outline-none placeholder:text-[#5d3a1a]/40"
          />
        </div>

        {/* 2. TITRE "CHOISIR LA DIFFICULTÉ" */}
        <div className="w-full max-w-[600px] bg-[#e6d2b5] border-[3px] border-[#8b5a2b] rounded-[25px] py-4 px-6 flex items-center justify-center shadow-md">
          <h2 className="text-[#5d3a1a] text-xl md:text-5xl font-extrabold tracking-tight text-center uppercase">
            Choisir la difficulté
          </h2>
        </div>

        {/* 3. LES BOUTONS DE DIFFICULTÉ */}
        <div className="w-full flex flex-col sm:flex-row justify-center items-center gap-4 md:gap-6">
          {(["FACILE", "MOYEN", "DIFFICILE"] as const).map((level) => (
            <button
              key={level}
              type="button"
              onClick={() => setDifficulte(level)}
              className={`w-full sm:w-auto px-8 md:px-10 py-3 md:py-4 rounded-[20px] border-[3px] text-lg md:text-2xl font-black transition-all transform active:scale-95
                ${difficulte === level 
                  ? "bg-[#c4a484] border-[#5d3a1a] text-[#422a12] scale-105 shadow-inner" 
                  : "bg-[#e6d2b5] border-[#8b5a2b] text-[#8b5a2b]/70 hover:bg-[#dec8a7]"
                }`}
            >
              {level.charAt(0) + level.slice(1).toLowerCase()}
            </button>
          ))}
        </div>

        {/* 4. ZONE DE DESCRIPTION */}
        <div className="w-full max-w-[90%] md:max-w-[75%] min-h-[50px] flex items-center justify-center">
          <p className="text-[#5d3a1a] font-bold italic text-lg md:text-2xl text-center drop-shadow-sm leading-tight">
             {descriptions[difficulte]}
          </p>
        </div>

        {/* 5. BOUTON COMMENCER */}
        <div className="w-full flex items-center justify-center mt-4 md:mt-8">
          <button 
            type="button"
            onClick={() => onStart(pseudo, difficulte)}
            disabled={!pseudo}
            className={`transition-all duration-300 transform
              ${!pseudo ? "opacity-20 grayscale cursor-not-allowed" : "hover:scale-110 active:scale-95"}`}
          >
            <span className="text-[#422a12] text-3xl md:text-5xl font-black uppercase tracking-tighter drop-shadow-lg text-center">
              Commencer la partie
            </span>
          </button>
        </div>

      </div>
    </div>
  );
}