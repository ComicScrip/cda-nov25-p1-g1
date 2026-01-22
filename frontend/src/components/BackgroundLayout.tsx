type Props = {
  children: React.ReactNode;
  showLogo?: boolean;
};

type ResultVariant = "win" | "lose";

type ResultLayoutProps = Props & {
  variant: ResultVariant;
};

const resultAssets: Record<
  ResultVariant,
  { background: string; logo: string; panel: string; panelAlt: string }
> = {
  win: {
    background: "/BgAccueil.png",
    logo: "/LOGO.png",
    panel: "/VictoryPanel.png",
    panelAlt: "Victoire",
  },
  lose: {
    background: "/DefeatBg.png",
    logo: "/LOGOHELL.png",
    panel: "/DefeatPanel.png",
    panelAlt: "Defaite",
  },
};

export default function BackgroundLayout({ children, showLogo = true }: Props) {
  return (
    <main
      className="min-h-screen bg-cover bg-center flex flex-col items-center"
      style={{ backgroundImage: "url('/BgAccueil.png')" }}
    >
      {showLogo && (
        <img
          src="/LOGO.png"
          alt="Word Battle"
          className="w-[500px] h-auto select-none pointer-events-none"
        />
      )}

      <div className="w-full flex-1 flex flex-col items-center font-aclonica ">{children}</div>
    </main>
  );
}

export function SignupBackgroundLayout({ children, showLogo = true }: Props) {
  return (
    <main
      className="min-h-screen bg-cover bg-center flex flex-col items-center"
      style={{ backgroundImage: "url('/BgAccueil.png')" }}
    >
      {showLogo && (
        <img
          src="/INSCRIPTIONLOGO.png"
          alt="Word Battle"
          className="w-[500px] h-auto select-none pointer-events-none"
        />
      )}

      <div className="w-full flex-1 flex flex-col items-center font-aclonica">{children}</div>
    </main>
  );
}

export function LoginBackgroundLayout({ children, showLogo = true }: Props) {
  return (
    <main
      className="min-h-screen bg-cover bg-center flex flex-col items-center"
      style={{ backgroundImage: "url('/BgScrib.png')" }}
    >
      {showLogo && (
        <img
          src="/CONNECTIONLOGO.png"
          alt="Word Battle"
          className="w-[500px] h-auto select-none pointer-events-none"
        />
      )}

      <div className="w-full flex-1 flex flex-col items-center font-aclonica">{children}</div>
    </main>
  );
}


export function HomeBackgroundLayout({ children, showLogo = true }: Props) {
  return (
    <main
      className="min-h-screen bg-cover bg-center flex flex-col items-center "
      style={{ backgroundImage: "url('/BgScrib.png')" }}
    >
      {showLogo && (
        <img
          src="/LOGO.png"
          alt="Word Battle"
          className="w-[500px] h-auto select-none pointer-events-none"
        />
      )}

      <div className="w-full flex-1 flex flex-col items-center font-aclonica">{children}</div>
    </main>
  );
}


export function GameBackgroundLayout({ children, showLogo = true }: Props) {
  return (
    <main
      className="min-h-screen bg-cover bg-center flex flex-col items-center "
      style={{ backgroundImage: "url('/guessBg.png')" }}
    >
      {showLogo && (
        <img
          src="/LOGO.png"
          alt="Word Battle"
          className="w-[500px] h-auto select-none pointer-events-none"
        />
      )}

      <div className="w-full flex-1 flex flex-col items-center font-aclonica">{children}</div>
    </main>
  );
}

export function ResultBackgroundLayout({
  children,
  showLogo = true,
  variant,
}: ResultLayoutProps) {
  const assets = resultAssets[variant];

  return (
    <main
      className="min-h-screen bg-cover bg-center relative flex flex-col items-center"
      style={{ backgroundImage: `url('${assets.background}')` }}
    >
      {showLogo && (
        <img
          src={assets.logo}
          alt="Word Battle"
          className="w-[320px] sm:w-[500px] h-auto select-none pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 z-0"
        />
      )}

      <div className="w-full flex-1 flex items-center justify-center px-4 pb-6 font-aclonica relative z-10">
        {children}
      </div>
    </main>
  );
}
