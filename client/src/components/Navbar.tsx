interface NavbarProps {}

export default function Navbar({}: NavbarProps) {
  return (
    <nav className="w-full sticky top-0 h-16 py-2 px-4 bg-slate-300 shadow-lg flex items-center">
      <h3 className="font-bold text-3xl">Ugang Recker</h3>
    </nav>
  );
}
