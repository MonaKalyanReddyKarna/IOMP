import { Charts } from "@/components/Charts";
import { DisasterTable } from "@/components/DisasterTable";
import { DUMMY } from "@/data/dummy";

export default function Dashboard() {
  const initialDisasterData = DUMMY;

  return (
    <div className="flex h-screen bg-gray-100">
      <main className="flex-1 flex p-8 overflow-auto flex-col gap-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800">Disaster Tracker</h2>
        </div>

        <Charts disasters={initialDisasterData} />
        <DisasterTable disasters={initialDisasterData} />
      </main>
    </div>
  );
}
