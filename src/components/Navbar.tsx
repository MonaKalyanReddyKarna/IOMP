export function Navbar() {
  return (
    <div
      className={`bg-white z-50 fixed top-0 border-b w-full h-20 flex justify-between items-center px-6 shadow-md `}
    >
      <div className="text-2xl font-bold tracking-wide text-gray-800 hover:text-gray-600 transition-all duration-200 flex items-center gap-2">
        <a target="_blank" href="https://www.ndrf.gov.in/">
          <img
            className="w-[5rem] h-[5rem]"
            src="/ndrf_logo.png"
            alt="ndrf_logo"
          />
        </a>
        <a href="/">The National Disaster Response Force (NDRF)</a>
      </div>
      <div className="flex items-center gap-8">
        <NavLink href="/statistics">Statistics</NavLink>
        <NavLink href="/configurations">Configurations</NavLink>
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
      className="hover:text-blue-500 hover:underline relative text-xl font-[900] text-gray-700 transition-colors duration-300"
    >
      {children}
      <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-gray-900 transition-all duration-300 hover:w-full" />
    </a>
  );
}
