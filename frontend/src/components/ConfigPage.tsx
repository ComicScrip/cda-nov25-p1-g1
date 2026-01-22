import { useEffect, useState } from "react";
import { HomeBackgroundLayout } from "@/components/BackgroundLayout";

type Difficulty = "FACILE" | "MOYEN" | "DIFFICILE";

interface ConfigProps {
  pseudo: string;
  onStart: (pseudo: string, diff: Difficulty) => void;
}

export default function ConfigPage({ onStart, pseudo }: ConfigProps) {
  const [difficulte, setDifficulte] = useState<Difficulty>("FACILE");
  const [showDescription, setShowDescription] = useState(false);
  const [descriptionTrigger, setDescriptionTrigger] = useState(0);

  const descriptions: Record<Difficulty, string> = {
    FACILE: "6 erreurs autorisées.\nParfait pour les jeunes scribes.",
    MOYEN: "4 erreurs autorisées.\nUn défi digne d'un architecte royal.",
    DIFFICILE: "2 erreurs seulement.\nSeul le Pharaon peut triompher !",
  };

  useEffect(() => {
    if (descriptionTrigger === 0) return;
    setShowDescription(true);
    const timeoutId = window.setTimeout(() => {
      setShowDescription(false);
    }, 3250);

    return () => window.clearTimeout(timeoutId);
  }, [descriptionTrigger]);

  const handleDifficultySelect = (level: Difficulty) => {
    setDifficulte(level);
    setDescriptionTrigger((prev) => prev + 1);
  };

  return (
    <HomeBackgroundLayout>
      <div
        className="w-full bg-cover bg-center bg-no-repeat relative flex flex-col items-center justify-start font-alconica p-4 pb-6">

        {/* Container principal */}
        <div className="relative z-10 w-full max-w-4xl -mt-16 md:-mt-22 min-h-[70dvh] flex flex-col items-center gap-4 md:gap-6 py-2 md:py-4">

          {/* 1. BLOC PSEUDO (Style Bulle Beige) */}
          <div className="w-full max-w-[280px] sm:max-w-[350px] md:max-w-[450px] bg-[#e6d2b5] border-[3px] border-[#8b5a2b] rounded-2xl shadow-lg px-4 py-2 md:py-4">
            <input
              type="text"
              placeholder="Pseudo"
              value={"Bonjour " + pseudo + " !"}
              tabIndex={-1}
              readOnly
              className="w-full bg-transparent text-center text-lg sm:text-xl md:text-3xl font-black text-[#5d3a1a] outline-none placeholder:text-[#5d3a1a]/40 pointer-events-none select-none cursor-default"
            />
          </div>

          {/* 2. TITRE "CHOISIR LA DIFFICULTÉ" */}
          <div className="w-full max-w-[90%] sm:max-w-[600px] bg-[#e6d2b5] border-[3px] border-[#8b5a2b] rounded-2xl py-3 px-4 flex items-center justify-center shadow-md">
            <h2 className="text-[#5d3a1a] text-base sm:text-xl md:text-4xl font-black tracking-tight text-center uppercase leading-none">
              Choisir la difficulté
            </h2>
          </div>

          {/* 3. LES BOUTONS DE DIFFICULTÉ */}
          <div className="w-full flex flex-col sm:flex-row justify-center items-stretch sm:items-center gap-3 md:gap-6 px-4">
            {(["FACILE", "MOYEN", "DIFFICILE"] as const).map((level) => (
              <button
                key={level}
                type="button"
                onClick={() => handleDifficultySelect(level)}
                className={`flex-1 px-4 py-3 md:py-4 rounded-xl border-[3px] text-sm sm:text-base md:text-xl font-black transition-all transform active:scale-95
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
          <div className="w-full max-w-[90%] sm:max-w-[80%] min-h-[80px] flex items-center justify-center px-4">
            <div
              aria-hidden={!showDescription}
              className={`w-full max-w-[560px] rounded-2xl border-[3px] border-[#8b5a2b] bg-[#e6d2b5]/70 backdrop-blur-sm px-4 py-2 text-[#5d3a1a] font-bold italic text-sm sm:text-lg md:text-xl text-center drop-shadow-sm leading-tight transition-opacity duration-700 pointer-events-none whitespace-pre-line ${showDescription ? "opacity-100" : "opacity-0"
                }`}
            >
              {descriptions[difficulte]}
            </div>
          </div>

          {/* 5. BOUTON COMMENCER */}
          <div className="w-full flex items-center justify-center mt-auto pt-4 pb-6">
            <button
              type="button"
              onClick={() => onStart(pseudo, difficulte)}
              className="group inline-flex h-56 w-145 items-center justify-center bg-[url('/parcheminH2.png')] bg-size-[100%_100%] bg-center bg-no-repeat transition-all duration-300 transform px-6 py-3 hover:scale-110 active:scale-95 bg-white/20 md:bg-transparent"
            >
              <span className="text-[#422a12] text-xl sm:text-3xl md:text-5xl font-black uppercase tracking-tighter drop-shadow-xl text-center block">
                Commencer
              </span>
            </button>
          </div>

        </div>
      </div>
    </HomeBackgroundLayout>
  );
}
