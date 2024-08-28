import { BarChart3, FileText, Home, MapPin } from "lucide-react";

export function Sidebar() {
  return (
    <aside className="w-64 bg-white shadow-md">
      <div className="p-4">
        <h1 className="text-2xl font-bold text-gray-800">Disaster Response</h1>
      </div>
      <nav className="mt-4">
        <a
          href="#"
          className="flex items-center px-4 py-2 text-gray-700 bg-gray-200"
        >
          <Home className="mr-2" size={20} />
          Dashboard
        </a>
        <a
          href="#"
          className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200"
        >
          <MapPin className="mr-2" size={20} />
          Map View
        </a>
        <a
          href="#"
          className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200"
        >
          <FileText className="mr-2" size={20} />
          Reports
        </a>
        <a
          href="#"
          className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200"
        >
          <BarChart3 className="mr-2" size={20} />
          Analytics
        </a>
      </nav>
    </aside>
  );
}
