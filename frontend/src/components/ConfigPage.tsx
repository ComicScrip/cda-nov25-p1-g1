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
      className="min-h-[100dvh] w-full bg-cover bg-center bg-no-repeat relative flex flex-col items-center justify-start md:justify-center font-sans p-4 overflow-y-auto"
      style={{ backgroundImage: "url('/Config.PNG')" }} 
    >
      {/* Overlay pour la lisibilité sur mobile */}
      <div className="absolute inset-0 bg-black/10 pointer-events-none" />

      {/* Container principal */}
      <div className="relative z-10 w-full max-w-4xl flex flex-col items-center gap-6 md:gap-10 py-4 md:py-8">
        
        {/* 1. BLOC PSEUDO (Style Bulle Beige) */}
        <div className="w-full max-w-[280px] sm:max-w-[350px] md:max-w-[450px] bg-[#e6d2b5] border-[3px] border-[#8b5a2b] rounded-2xl shadow-lg px-4 py-2 md:py-4">
          <input
            type="text"
            placeholder="Pseudo"
            value={pseudo}
            onChange={(e) => setPseudo(e.target.value)}
            className="w-full bg-transparent text-center text-xl sm:text-2xl md:text-4xl font-black text-[#5d3a1a] outline-none placeholder:text-[#5d3a1a]/40"
          />
        </div>

        {/* 2. TITRE "CHOISIR LA DIFFICULTÉ" */}
        <div className="w-full max-w-[90%] sm:max-w-[600px] bg-[#e6d2b5] border-[3px] border-[#8b5a2b] rounded-2xl py-3 px-4 flex items-center justify-center shadow-md">
          <h2 className="text-[#5d3a1a] text-lg sm:text-2xl md:text-5xl font-black tracking-tight text-center uppercase leading-none">
            Choisir la difficulté
          </h2>
        </div>

        {/* 3. LES BOUTONS DE DIFFICULTÉ */}
        <div className="w-full flex flex-col sm:flex-row justify-center items-stretch sm:items-center gap-3 md:gap-6 px-4">
          {(["FACILE", "MOYEN", "DIFFICILE"] as const).map((level) => (
            <button
              key={level}
              type="button"
              onClick={() => setDifficulte(level)}
              className={`flex-1 px-4 py-3 md:py-4 rounded-xl border-[3px] text-base sm:text-lg md:text-2xl font-black transition-all transform active:scale-95
                ${difficulte === level 
                  ? "bg-[#c4a484] border-[#5d3a1a] text-[#422a12] scale-105 shadow-md" 
                  : "bg-[#e6d2b5] border-[#8b5a2b] text-[#8b5a2b]/70 hover:bg-[#dec8a7]"
                }`}
            >
              {level.charAt(0) + level.slice(1).toLowerCase()}
            </button>
          ))}
        </div>

        {/* 4. ZONE DE DESCRIPTION */}
        <div className="w-full max-w-[90%] sm:max-w-[80%] min-h-[60px] flex items-center justify-center px-4">
          <p className="text-[#5d3a1a] font-bold italic text-base sm:text-xl md:text-2xl text-center drop-shadow-sm leading-tight">
             {descriptions[difficulte]}
          </p>
        </div>

        {/* 5. BOUTON COMMENCER */}
        <div className="w-full flex items-center justify-center mt-2 md:mt-6 pb-6">
          <button 
            type="button"
            onClick={() => onStart(pseudo, difficulte)}
            disabled={!pseudo}
            className={`transition-all duration-300 transform px-6 py-3 rounded-full
              ${!pseudo 
                ? "opacity-30 grayscale cursor-not-allowed" 
                : "hover:scale-110 active:scale-95 bg-white/20 backdrop-blur-sm md:bg-transparent"}`}
          >
            <span className="text-[#422a12] text-2xl sm:text-4xl md:text-6xl font-black uppercase tracking-tighter drop-shadow-xl text-center block">
              Commencer
            </span>
          </button>
        </div>

      </div>
    </div>
  );
}