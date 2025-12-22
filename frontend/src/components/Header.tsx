import Link from "next/link";

export default function Header() {
  return (
    <header className="p-4 border-b border-gray-400">
      <Link href="/" className="w-max">
        <h1 className="text-2xl font-bold">My app</h1>
      </Link>
    </header>
  );
}
