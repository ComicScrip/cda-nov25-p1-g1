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
      className="min-h-screen w-full bg-cover bg-center no-repeat relative overflow-y-auto flex items-center justify-center font-sans p-4"
      style={{ backgroundImage: "url('/Config.PNG')" }} 
    >
      {/* Overlay flou */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

      {/* Container Principal */}
      <div className="relative z-10 w-full max-w-6xl flex flex-col items-center justify-center gap-6 md:gap-10">
        
        {/* SECTION PARCHEMINS : Colonne sur mobile, Ligne sur Desktop */}
        <div className="flex flex-col md:flex-row w-full justify-center items-center gap-6 md:gap-4 lg:gap-12">
          
          {/* PARCHEMIN GAUCHE : VOTRE SCORE */}
          <div className="relative w-full max-w-[280px] sm:max-w-[320px] md:w-[35%] aspect-[3/4] flex flex-col items-center pt-12 sm:pt-16 md:pt-20 px-6 sm:px-10">
            <img src="/parchemin.png" className="absolute inset-0 w-full h-full object-contain" alt="Parchemin Score" />
            
            <div className="relative z-10 text-center">
              <h2 className="text-[#5d3a1a] text-xl sm:text-2xl md:text-3xl font-black uppercase tracking-tighter">
                Votre score
              </h2>
              <div className="text-[#8b5a2b] text-4xl sm:text-5xl md:text-6xl font-black mt-4 md:mt-10">
                {currentScore}
              </div>
              <div className="text-[#5d3a1a]/60 text-xs sm:text-sm md:text-base font-bold italic mt-2 md:mt-4">
                Niveau : {difficulty}
              </div>
            </div>
          </div>

          {/* PERSONNAGE CENTRAL (Caché sur très petits écrans pour gagner de la place) */}
          <div className="hidden sm:flex w-[100px] md:w-[15%] justify-center items-center order-last md:order-none">
             <img src="/pharaon-enfant.png" className="w-full h-auto drop-shadow-2xl" alt="Pharaon" />
          </div>

          {/* PARCHEMIN DROITE : MEILLEUR SCORE */}
          <div className="relative w-full max-w-[280px] sm:max-w-[320px] md:w-[35%] aspect-[3/4] flex flex-col items-center pt-12 sm:pt-16 md:pt-20 px-6 sm:px-10">
            <img src="/parchemin.png" className="absolute inset-0 w-full h-full object-contain" alt="Parchemin Meilleur Score" />
            
            <div className="relative z-10 text-center">
              <h2 className="text-[#5d3a1a] text-xl sm:text-2xl md:text-3xl font-black uppercase tracking-tighter">
                Meilleur score
              </h2>
              <div className="text-[#8b5a2b] text-4xl sm:text-5xl md:text-6xl font-black mt-4 md:mt-10">
                {bestScores[difficulty]}
              </div>
              <div className="text-[#5d3a1a]/60 text-xs sm:text-sm md:text-base font-bold italic mt-2 md:mt-4 uppercase">
                Record {difficulty}
              </div>
            </div>
          </div>

        </div>

        {/* SECTION BOUTONS : Adaptée pour le tactile */}
        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md md:max-w-none md:justify-center md:gap-20 pb-6">
          <button 
            onClick={onQuit}
            className="w-full md:w-auto bg-[#e6d2b5] border-[3px] border-[#8b5a2b] rounded-xl px-8 md:px-12 py-3 md:py-4 text-[#5d3a1a] text-xl md:text-2xl font-black shadow-lg hover:scale-105 active:scale-95 transition-transform"
          >
            Quitter
          </button>

          <button 
            onClick={onNextLevel}
            className="w-full md:w-auto bg-[#e6d2b5] border-[3px] border-[#8b5a2b] rounded-xl px-8 md:px-12 py-3 md:py-4 text-[#5d3a1a] text-xl md:text-2xl font-black shadow-lg hover:scale-105 active:scale-95 transition-transform"
          >
            {currentScore > 0 ? "Prochaine Partie" : "Recommencer"}
          </button>
        </div>

      </div>
    </div>
  );
}