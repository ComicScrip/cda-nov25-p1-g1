import React from "react";

type Difficulty = "FACILE" | "MOYEN" | "DIFFICILE";

interface ScorePageProps {
  currentScore: number;
  bestScores: Record<Difficulty, number>;
  difficulty: Difficulty;
  onQuit: () => void;
  onNextLevel: () => void;
}

export default function ScorePage({
  currentScore,
  bestScores,
  difficulty,
  onQuit,
  onNextLevel
}: ScorePageProps) {

  return (
    <div
      className="h-dvh w-full bg-cover bg-center bg-no-repeat relative flex items-center justify-center font-sans p-2 overflow-hidden"
      style={{ backgroundImage: "url('/Config.PNG')" }}
    >
      {/* Overlay flou */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

      <div className="relative z-10 w-full max-w-[95vw] h-full flex flex-col items-center justify-around py-4">

        {/* SECTION PARCHEMINS ET PERSO */}
        <div className="flex flex-row w-full justify-center items-center gap-2 sm:gap-4 md:gap-10">

          {/* PARCHEMIN GAUCHE */}
          <div className="relative w-[40%] max-w-[300px] aspect-3/4 flex items-center justify-center">
            <img src="/parcheminV.png" className="absolute inset-0 w-full h-full object-contain" alt="Score" />
            <div className="relative z-10 text-center flex flex-col justify-center items-center h-full w-full px-2 pt-4">
              <h2 className="text-[#5d3a1a] text-[3vw] sm:text-lg md:text-2xl font-black uppercase leading-tight">
                Votre score
              </h2>
              <div className="text-[#8b5a2b] text-[6vw] sm:text-4xl md:text-6xl font-black my-1 md:my-4">
                {currentScore}
              </div>
              <div className="text-[#5d3a1a]/60 text-[2vw] sm:text-xs md:text-sm font-bold italic uppercase">
                {difficulty}
              </div>
            </div>
          </div>

          {/* PERSONNAGE CENTRAL (Taille fluide) */}
          <div className="w-[15%] max-w-[120px] flex justify-center items-center translate-y-25 md:translate-y-50">
            <img src="/wanabeet.png" className="w-full h-auto drop-shadow-2xl" alt="Pharaon" />
          </div>

          {/* PARCHEMIN DROITE */}
          <div className="relative w-[40%] max-w-[300px] aspect-3/4 flex items-center justify-center">
            <img src="/parcheminV2.png" className="absolute inset-0 w-full h-full object-contain" alt="Record" />
            <div className="relative z-10 text-center flex flex-col justify-center items-center h-full w-full px-2 pt-4">
              <h2 className="text-[#5d3a1a] text-[3vw] sm:text-lg md:text-2xl font-black uppercase leading-tight">
                Meilleur score
              </h2>
              <div className="text-[#8b5a2b] text-[6vw] sm:text-4xl md:text-6xl font-black my-1 md:my-4">
                {bestScores[difficulty]}
              </div>
              <div className="text-[#5d3a1a]/60 text-[2vw] sm:text-xs md:text-sm font-bold italic uppercase">
                Record
              </div>
            </div>
          </div>
        </div>

        {/* SECTION BOUTONS */}
        <div className="flex flex-row gap-4 w-full justify-center items-center px-4">
          <button
            onClick={onQuit}
            className="flex-1 max-w-[200px] bg-[#e6d2b5] border-2 md:border-[3px] border-[#8b5a2b] rounded-lg md:rounded-xl py-2 md:py-4 text-[#5d3a1a] text-xs sm:text-lg md:text-2xl font-black shadow-lg hover:scale-105 active:scale-95 transition-all uppercase"
          >
            Quitter
          </button>

          <button
            onClick={onNextLevel}
            className="flex-1 max-w-[250px] bg-[#e6d2b5] border-2 md:border-[3px] border-[#8b5a2b] rounded-lg md:rounded-xl py-2 md:py-4 text-[#5d3a1a] text-xs sm:text-lg md:text-2xl font-black shadow-lg hover:scale-105 active:scale-95 transition-all uppercase"
          >
            {currentScore > 0 ? "Continuer" : "Rejouer"}
          </button>
        </div>

      </div>
    </div>
  );
}
