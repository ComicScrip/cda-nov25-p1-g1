import { useMyProfileQuery } from "@/graphql/generated/schema";
import { useRouter } from "next/router";

const RANKS = [
  { name: "Scribe Novice", min: 0, max: 500, emoji: "🪶" },
  { name: "Architecte Royal", min: 500, max: 1500, emoji: "📐" },
  { name: "Garde du Pharaon", min: 1500, max: 3500, emoji: "🛡️" },
  { name: "Grand Prêtre", min: 3500, max: 7000, emoji: "⚖️" },
  { name: "Pharaon", min: 7000, max: 100000, emoji: "👑" },
];

export default function Profile() {
  const router = useRouter();
  const { data, loading, error } = useMyProfileQuery({
    fetchPolicy: "network-only",
  });

  if (loading) return (
    <div className="min-h-screen bg-[#dcc9af] flex items-center justify-center font-black text-[#5d3a1a] animate-pulse">
      📜 LECTURE DES HIÉROGLYPHES...
    </div>
  );

  if (error || !data?.myProfile) {
    return (
      <div className="min-h-screen bg-[#2c1a10] flex flex-col items-center justify-center p-8 text-center">
        <div className="bg-[#f2e2ba] p-8 border-4 border-[#8b5a2b] rounded-xl shadow-2xl">
          <h2 className="text-2xl font-black text-[#5d3a1a] mb-4 uppercase">Identité Perdue</h2>
          <button onClick={() => router.push('/')} className="bg-[#5d3a1a] text-[#f2e2ba] px-6 py-3 rounded-lg font-bold">
            RETOUR À L'ENTRÉE
          </button>
        </div>
      </div>
    );
  }

  const user = data.myProfile;
  const totalScore = user.totalScore || 0;
  const currentRank = RANKS.find(r => totalScore >= r.min && totalScore < r.max) || RANKS[0];
  const nextRank = RANKS[RANKS.indexOf(currentRank) + 1];
  const progress = nextRank
    ? Math.min(100, Math.floor(((totalScore - currentRank.min) / (currentRank.max - currentRank.min)) * 100))
    : 100;

  // --- LOGIQUE MODIFIÉE SANS SUPPRESSION ---
  // On s'assure de récupérer TOUS les jeux sans exception et on trie par ID décroissant (le plus récent en haut)
  const sortedGames = [...(user.games || [])].sort((a, b) => {
    const idA = a.idGame;
    const idB = b.idGame;
    return idB - idA;
  });

  return (
    <div className="min-h-screen bg-[url('/corridorProfile.png')] bg-cover bg-center p-4 md:p-8 flex justify-center items-center font-serif relative overflow-hidden">
      <img
        src="/kidexploring.png"
        alt=""
        aria-hidden="true"
        className="absolute left-[clamp(60px,12vw,320px)] bottom-0 w-[200px] sm:w-[260px] md:w-[320px] lg:w-[420px] h-auto select-none pointer-events-none z-0"
      />
      <div className="relative z-10 w-full max-w-2xl bg-[#f2e2ba] rounded-sm shadow-[20px_20px_60px_rgba(0,0,0,0.5)] border-x-[15px] border-[#8b5a2b] flex flex-col max-h-[95vh]"
        style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/paper.png')" }}>

        <div className="relative pt-12 pb-6 px-8 text-center border-b-4 border-double border-[#5d3a1a]">
          <button onClick={() => router.push('/')} className="absolute top-4 left-4 bg-[#5d3a1a] text-[#f2e2ba] px-3 py-1 rounded text-xs font-bold uppercase hover:scale-105 transition-transform z-30">
            ← Retour
          </button>
          <div className="text-6xl mb-2 drop-shadow-md">{currentRank.emoji}</div>
          <h1 className="text-4xl font-black text-[#3d2311] uppercase tracking-tighter italic">{user.username}</h1>
          <div className="mt-2 inline-block px-8 py-1 bg-[#3d2311] text-[#f2e2ba] font-bold text-sm skew-x-[-10deg]">{currentRank.name.toUpperCase()}</div>
        </div>

        {/* ZONE SCROLLABLE : Permet de voir TOUS les mots sans casser le design */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          <div className="p-8 bg-[#3d2311]/5">
            <div className="flex justify-between items-end mb-3">
              <span className="text-[10px] font-bold text-[#5d3a1a] uppercase tracking-widest italic">Suivant : {nextRank?.name || "LÉGENDE"}</span>
              <span className="text-sm font-black text-[#8b5a2b]">{totalScore} DEBENS</span>
            </div>
            <div className="w-full h-4 bg-[#dcc9af] border-2 border-[#5d3a1a] p-0.5 shadow-inner">
              <div className="h-full bg-gradient-to-r from-[#8b5a2b] to-[#c4a484] transition-all duration-1000" style={{ width: `${progress}%` }} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 px-8 pb-8">
            <Cartouche label="Quêtes Finies" value={user.gamesPlayed} />
            <Cartouche label="Triomphes" value={user.gamesWon} />
            <Cartouche label="Précision" value={`${user.gamesPlayed ? Math.round((user.gamesWon / user.gamesPlayed) * 100) : 0}%`} />
            <Cartouche label="Record" value={user.bestScore} />
          </div>

          <div className="px-8 pb-8">
            <h2 className="text-lg font-black text-[#3d2311] mb-4 uppercase flex items-center gap-2">
              <span className="h-px flex-1 bg-[#5d3a1a]/30"></span>
              Annales des Mots
              <span className="h-px flex-1 bg-[#5d3a1a]/30"></span>
            </h2>
            <div className="space-y-2">
              {/* L'utilisation de sortedGames ici garantit l'affichage de la totalité sans slice */}
              {sortedGames.map((game: any) => (
                <div key={game.idGame} className="flex justify-between items-center p-3 bg-[#e9d8b3] border-b-2 border-[#5d3a1a]/10 hover:bg-[#e2ce9f] transition-colors">
                  <div className="flex flex-col">
                    <span className="font-black text-[#3d2311] text-md uppercase">{game.word.label}</span>
                    <span className="text-[9px] font-bold uppercase text-[#8b5a2b] opacity-75">{game.word.difficulty}</span>
                  </div>
                  <div className={`font-black text-lg ${game.status === 'WON' ? 'text-green-800' : 'text-red-800'}`}>
                    {game.status === 'WON' ? `+${game.score}` : '✘'}
                  </div>
                </div>
              ))}
              {sortedGames.length === 0 && (
                <p className="text-center italic text-[#8b5a2b] py-4">Aucun mot n'a encore été déchiffré...</p>
              )}
            </div>
          </div>
        </div>

        <div className="h-6 bg-gradient-to-t from-[#8b5a2b]/20 to-transparent border-t border-[#5d3a1a]/10"></div>
      </div>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar { width: 5px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #8b5a2b; border-radius: 5px; }
      `}</style>
    </div>
  );
}

function Cartouche({ label, value }: { label: string; value: any }) {
  return (
    <div className="bg-[#e9d8b3] border-2 border-[#5d3a1a] p-3 text-center shadow-[3px_3px_0px_#5d3a1a]">
      <p className="text-[9px] font-bold text-[#8b5a2b] uppercase mb-1">{label}</p>
      <p className="text-xl font-black text-[#3d2311]">{value}</p>
    </div>
  );
}
