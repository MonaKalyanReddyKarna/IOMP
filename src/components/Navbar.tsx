export function Navbar() {
  return (
    <div className="bg-white z-50 fixed top-0 border-b w-full h-20 flex justify-between items-center px-6 shadow-sm">
      <a href="/" className="text-2xl font-bold tracking-wide text-gray-800 hover:text-gray-600 transition-all duration-200">
        Disaster Management
      </a>
      <div className="flex items-center gap-8">
        <NavLink href="/">Statistics</NavLink>
        <NavLink href="/configurations">Configurations</NavLink>
      </div>
    </div>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      className="hover:text-blue-500 hover:underline relative text-lg font-semibold text-gray-700 transition-colors duration-300"
    >
      {children}
      <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-gray-900 transition-all duration-300 hover:w-full" />
    </a>
  );
}
