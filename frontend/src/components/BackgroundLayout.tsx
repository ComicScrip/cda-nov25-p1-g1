type Props = {
  children: React.ReactNode;
  showLogo?: boolean;
};

export default function BackgroundLayout({ children, showLogo = true }: Props) {
  return (
    <main
      className="min-h-screen bg-cover bg-center flex flex-col items-center"
      style={{ backgroundImage: "url('/BgAccueil.png')" }}
    >
      {showLogo && (
        <img
          src="/LogoBg.png"
          alt="Word Battle"
          className="w-[250px] h-auto select-none pointer-events-none"
        />
      )}

      <div className="w-full flex-1 flex flex-col items-center">{children}</div>
    </main>
  );
}

export function SignupBackgroundLayout({ children, showLogo = true }: Props) {
  return (
    <main
      className="min-h-screen bg-cover bg-center flex flex-col items-center"
      style={{ backgroundImage: "url('/BgScrib.png')" }}
    >
      {showLogo && (
        <img
          src="/INSCRIPTIONLOGO.png"
          alt="Word Battle"
          className="w-[500px] h-auto select-none pointer-events-none"
        />
      )}

      <div className="w-full flex-1 flex flex-col items-center">{children}</div>
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
