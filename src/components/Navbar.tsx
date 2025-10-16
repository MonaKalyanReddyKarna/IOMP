export function Navbar() {
  return (
    <div
      className={`bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 z-50 fixed top-0 border-b border-blue-800/40 w-full h-20 flex justify-between items-center px-6 shadow-lg shadow-blue-900/20`}
    >
      <div className="text-2xl font-extrabold tracking-wide text-white hover:text-blue-100 transition-all duration-200 flex items-center gap-3">
        <a href="/" className="flex items-center gap-3">
          <div className="w-[3rem] h-[3rem] bg-gradient-to-br from-red-500 to-orange-500 rounded-lg flex items-center justify-center shadow-lg">
            <span className="text-white text-2xl font-bold">🚨</span>
          </div>
          <div className="flex flex-col">
            <span className="hidden sm:inline text-lg">Real-Time Disaster Aggregation Software</span>
            <span className="text-xs text-blue-200 hidden sm:inline">Emergency Response Platform</span>
          </div>
        </a>
      </div>
      <div className="flex items-center gap-6 text-blue-100">
        <NavLink href="/">Home</NavLink>
        <NavLink href="/statistics">Statistics</NavLink>
        <NavLink href="/configurations">Configurations</NavLink>
        <NavLink href="/add-report">Add Report</NavLink>
      </div>
    </div>
  );
}

function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      className="hover:text-gray-400 hover:underline relative text-xl font-[900] text-white transition-colors duration-300"
    >
      {children}
      <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-gray-900 transition-all duration-300 hover:w-full" />
    </a>
  );
}
