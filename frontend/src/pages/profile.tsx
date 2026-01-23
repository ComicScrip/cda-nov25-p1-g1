import { useMyProfileQuery } from "@/graphql/generated/schema"; // Import réel
import { useRouter } from "next/router";

const RANKS = [
  { name: "Scribe Novice", min: 0, max: 500, emoji: "🪶", color: "text-[#5d3a1a]" },
  { name: "Architecte Royal", min: 500, max: 1500, emoji: "📐", color: "text-[#b45309]" },
  { name: "Garde du Pharaon", min: 1500, max: 3500, emoji: "🛡️", color: "text-[#166534]" },
  { name: "Grand Prêtre", min: 3500, max: 7000, emoji: "⚖️", color: "text-[#1e40af]" },
  { name: "Pharaon", min: 7000, max: 100000, emoji: "👑", color: "text-[#854d0e]" },
];

export default function Profile() {
  const router = useRouter();
  const { data, loading, error } = useMyProfileQuery({ 
    fetchPolicy: "network-only" 
  });

  // 1. Gestion du Chargement
  if (loading) return (
    <div className="min-h-screen bg-[#dcc9af] flex items-center justify-center font-black text-[#5d3a1a]">
      📜 LECTURE DES HIÉROGLYPHES...
    </div>
  );
  
  // 2. Si l'utilisateur n'est pas trouvé (session expirée)
  if (!data?.myProfile && !error) {
    return (
      <div className="min-h-screen bg-[#2c1a10] flex flex-col items-center justify-center p-8 text-center">
        <div className="bg-[#f2e2ba] p-8 border-4 border-[#8b5a2b] rounded-xl shadow-2xl">
          <h2 className="text-2xl font-black text-[#5d3a1a] mb-4 uppercase">Identité Inconnue</h2>
          <p className="text-[#8b5a2b] mb-6 italic">Voyageur, tu dois t'identifier avant d'entrer dans le temple.</p>
          <button 
            onClick={() => router.push('/')}
            className="bg-[#5d3a1a] text-[#f2e2ba] px-6 py-3 rounded-lg font-bold hover:scale-105 transition-transform"
          >
            RETOURNER À L'ENTRÉE
          </button>
        </div>
      </div>
    );
  }

  // 3. Si il y a une vraie erreur technique
  if (error) {
    return (
      <div className="min-h-screen bg-[#dcc9af] flex flex-center justify-center text-red-800 font-black">
        ⚠️ ERREUR SACRÉE : {error.message}
      </div>
    );
  }

  // ... le reste de ton code (const user = data.myProfile, etc.)

  const user = data?.myProfile;
  const totalScore = user?.totalScore || 0;

  const currentRank = RANKS.find(r => totalScore >= r.min && totalScore < r.max) || RANKS[0];
  const nextRank = RANKS[RANKS.indexOf(currentRank) + 1];
  const progress = nextRank 
    ? Math.floor(((totalScore - currentRank.min) / (currentRank.max - currentRank.min)) * 100)
    : 100;

  return (
    <div className="min-h-screen bg-[#2c1a10] p-4 md:p-8 flex justify-center items-center font-serif">
      {/* CONTENEUR PARCHEMIN */}
      <div className="relative w-full max-w-2xl bg-[#f2e2ba] rounded-sm shadow-[20px_20px_60px_rgba(0,0,0,0.5)] border-l-[15px] border-r-[15px] border-[#8b5a2b] overflow-hidden"
           style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/paper.png')" }}>
        
        {/* BOUTON RETOUR */}
        <button 
          onClick={() => router.push('/')}
          className="absolute top-4 left-6 bg-[#5d3a1a] text-[#f2e2ba] px-4 py-1 rounded shadow-md hover:bg-[#3d2311] transition-colors text-xs font-bold uppercase z-20"
        >
          ← Retour
        </button>

        {/* HEADER STYLE TEMPLE */}
        <div className="relative pt-12 pb-8 px-8 text-center border-b-4 border-double border-[#5d3a1a]">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-amber-600 via-yellow-400 to-amber-600"></div>
          <div className="text-7xl mb-2 filter drop-shadow-md">{currentRank.emoji}</div>
          <h1 className="text-4xl font-black text-[#3d2311] uppercase tracking-tighter italic">
            {user?.username}
          </h1>
          <div className={`mt-2 inline-block px-8 py-1 bg-[#3d2311] text-[#f2e2ba] font-bold text-sm skew-x-[-10deg] shadow-lg`}>
            {currentRank.name.toUpperCase()}
          </div>
        </div>

        {/* PROGRESSION XP */}
        <div className="p-8 bg-[#3d2311]/5">
          <div className="flex justify-between items-end mb-3">
            <span className="text-[11px] font-bold text-[#5d3a1a] uppercase tracking-widest italic">Niveau suivant : {nextRank?.name || "LÉGENDE"}</span>
            <span className="text-sm font-black text-[#8b5a2b]">{totalScore} DEBENS</span>
          </div>
          <div className="w-full h-6 bg-[#dcc9af] border-2 border-[#5d3a1a] p-1 shadow-inner">
            <div 
              className="h-full bg-gradient-to-r from-[#8b5a2b] via-[#c4a484] to-[#8b5a2b] relative transition-all duration-1000"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute inset-0 opacity-30 bg-[url('https://www.transparenttextures.com/patterns/pyramid.png')]"></div>
            </div>
          </div>
        </div>

        {/* STATS DANS DES CARTOUCHES */}
        <div className="grid grid-cols-2 gap-4 p-8 pt-0">
          <Cartouche label="Quêtes Finies" value={user?.gamesPlayed} />
          <Cartouche label="Triomphes" value={user?.gamesWon} />
          <Cartouche label="Précision" value={`${user?.gamesPlayed ? Math.round((user.gamesWon/user.gamesPlayed)*100) : 0}%`} />
          <Cartouche label="Record" value={user?.bestScore} />
        </div>

        {/* HISTORIQUE / DERNIERS MOTS */}
        <div className="px-8 pb-12">
          <h2 className="text-xl font-black text-[#3d2311] mb-4 uppercase flex items-center gap-2">
             <span className="h-px flex-1 bg-[#5d3a1a]/30"></span>
             Dernières Inscriptions
             <span className="h-px flex-1 bg-[#5d3a1a]/30"></span>
          </h2>
          <div className="space-y-3">
            {user?.games.slice(0, 5).map((game: any) => (
              <div key={game.idGame} className="flex justify-between items-center p-4 bg-[#e9d8b3] border-b-2 border-[#5d3a1a]/20 hover:border-[#5d3a1a] transition-all group">
                <div className="flex flex-col">
                  <span className="font-black text-[#3d2311] text-lg uppercase tracking-tight">{game.word.label}</span>
                  <span className="text-[10px] font-bold uppercase text-[#8b5a2b]">{game.word.difficulty}</span>
                </div>
                <div className="text-right">
                    <span className={`text-xl font-black ${game.status === 'WON' ? 'text-[#166534]' : 'text-[#991b1b]'}`}>
                      {game.status === 'WON' ? `+${game.score}` : 'ÉCHEC'}
                    </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* PIED DU PARCHEMIN */}
        <div className="h-4 bg-gradient-to-b from-transparent to-[#8b5a2b]/20"></div>
      </div>
    </div>
  );
}

function Cartouche({ label, value }: { label: string; value: any }) {
  return (
    <div className="bg-[#e9d8b3] border-2 border-[#5d3a1a] p-4 text-center shadow-[4px_4px_0px_#5d3a1a] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all">
      <p className="text-[10px] font-bold text-[#8b5a2b] uppercase mb-1 tracking-tighter">{label}</p>
      <p className="text-2xl font-black text-[#3d2311]">{value}</p>
    </div>
  );
}