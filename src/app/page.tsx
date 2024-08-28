import { QuickStats } from "@/components/QuickStats";
import { Charts } from "@/components/Charts";
import { DisasterTable } from "@/components/DisasterTable";

const generateDisasterData = (count: number) => {
  const types = ["Earthquake", "Hurricane", "Flood", "Wildfire", "Tornado"];
  const locations = [
    "Los Angeles, CA",
    "Miami, FL",
    "New Orleans, LA",
    "San Francisco, CA",
    "Oklahoma City, OK",
  ];
  const severities = ["Low", "Moderate", "High", "Severe"];

  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    type: types[Math.floor(Math.random() * types.length)],
    location: locations[Math.floor(Math.random() * locations.length)],
    severity: severities[Math.floor(Math.random() * severities.length)],
    affectedPeople: Math.floor(Math.random() * 100000),
    timestamp: new Date(
      Date.now() - Math.floor(Math.random() * 30 * 24 * 60 * 60 * 1000)
    ).toLocaleString("en", {
      hour12: true,
    }),
  }));
};

export default function Dashboard() {
  const initialDisasterData = generateDisasterData(50);

  return (
    <div className="flex h-screen bg-gray-100">
      <main className="flex-1 p-8 overflow-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800">
            Disaster Tracker
          </h2>
        </div>

        <QuickStats disasters={initialDisasterData} />
        <Charts disasters={initialDisasterData} />
        <DisasterTable disasters={initialDisasterData} />
      </main>
    </div>
  );
}
