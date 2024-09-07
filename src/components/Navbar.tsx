export function Navbar() {
  return (
    <div className="bg-gray-100 z-50 fixed top-0 border-b w-full h-20 flex justify-between items-center px-6">
      <a href="/" className="text-xl font-[700]">
        Disaster Management
      </a>
      <div className="flex items-center gap-4">
        <a>Statistics</a>
        <a href="/configurations">Configurations</a>
      </div>
    </div>
  )
}
