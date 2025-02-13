import logo from "../assets/eva.avif";

export default function Header() {
  return (
    <header className="relative h-16 flex items-center">
      <div className="px-4 py-2">
        <img src={logo} alt="Eva Logo" className="h-8" />
      </div>
      <div className="absolute bottom-0 w-full h-1 bg-gradient-to-r from-blue-400 via-purple-400 to-orange-400" />
    </header>
  );
}
