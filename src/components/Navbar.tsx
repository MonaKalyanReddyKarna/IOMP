export function Navbar() {
  return (
    <div className="bg-gray-100 z-50 fixed top-0 border-b w-full h-20 flex justify-between items-center px-6">
      <h1 className="text-xl font-[700]">
        Disaster Management
      </h1>
      <div className="flex items-center gap-4"> 
        <button>Statistics</button>
        <button>Configuration</button>
      </div>
    </div>
  )
}
