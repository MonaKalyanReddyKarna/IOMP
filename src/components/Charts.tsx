"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ScatterChart,
  Scatter,
  ZAxis,
} from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "./ui/chart";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

const chartConfig = {
  affectedPeople: {
    label: "Affected People",
  },
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function Charts({ disasters }: { disasters: any }) {
  const [activePieIndex, setActivePieIndex] = useState(null);

  const disastersByType = disasters.reduce((acc, disaster) => {
    acc[disaster.type] = (acc[disaster.type] || 0) + 1;
    return acc;
  }, {});

  const barChartData = Object.entries(disastersByType).map(([type, count]) => ({
    type,
    count,
  }));

  const lineChartData = disasters
    .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp))
    .map((disaster) => ({
      date: new Date(disaster.timestamp).toLocaleDateString(),
      affectedPeople: disaster.affectedPeople,
    }));

  const pieChartData = disasters.reduce((acc, disaster) => {
    acc[disaster.severity] = (acc[disaster.severity] || 0) + 1;
    return acc;
  }, {});

  const pieChartDataArray = Object.entries(pieChartData).map(
    ([severity, count]) => ({ severity, count })
  );

  const stackedAreaChartData = disasters
    .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp))
    .reduce((acc, disaster) => {
      const date = new Date(disaster.timestamp).toLocaleDateString();
      const existingEntry = acc.find((entry) => entry.date === date);
      if (existingEntry) {
        existingEntry[disaster.type] =
          (existingEntry[disaster.type] || 0) + disaster.affectedPeople;
      } else {
        acc.push({ date, [disaster.type]: disaster.affectedPeople });
      }
      return acc;
    }, []);

  const scatterPlotData = disasters.map((disaster) => ({
    affectedPeople: disaster.affectedPeople,
    severity:
      ["Low", "Moderate", "High", "Severe"].indexOf(disaster.severity) + 1,
    type: disaster.type,
  }));

  const radarChartData = Object.entries(
    disasters.reduce((acc, disaster) => {
      if (!acc[disaster.type]) {
        acc[disaster.type] = {
          type: disaster.type,
          count: 0,
          totalSeverity: 0,
        };
      }
      acc[disaster.type].count++;
      acc[disaster.type].totalSeverity +=
        ["Low", "Moderate", "High", "Severe"].indexOf(disaster.severity) + 1;
      return acc;
    }, {})
  ).map(([type, data]) => ({
    type,
    averageSeverity: data.totalSeverity / data.count,
  }));
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Disasters by Type</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig}>
              <BarChart accessibilityLayer data={barChartData}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="type"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  tickFormatter={(value) => value}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Bar dataKey="count" fill="var(--color-desktop)" radius={8} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Affected People Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={chartConfig}
              className="aspect-auto h-[300px] w-full"
            >
              <LineChart
                accessibilityLayer
                data={lineChartData}
                margin={{
                  left: 12,
                  right: 12,
                }}
              >
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="date"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  minTickGap={32}
                  tickFormatter={(value) => {
                    const date = new Date(value);
                    return date.toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    });
                  }}
                />
                <ChartTooltip
                  content={
                    <ChartTooltipContent
                      className="w-[150px]"
                      nameKey="affectedPeople"
                      labelFormatter={(value) => {
                        return new Date(value).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        });
                      }}
                    />
                  }
                />
                <Line
                  dataKey="affectedPeople"
                  type="monotone"
                  stroke={`var(--color-desktop)`}
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Severity Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieChartDataArray}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="count"
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                  activeIndex={activePieIndex}
                  onMouseEnter={(_, index) => setActivePieIndex(index)}
                  onMouseLeave={() => setActivePieIndex(null)}
                >
                  {pieChartDataArray.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend
                  onClick={(data) => {
                    const index = pieChartDataArray.findIndex(
                      (item) => item.severity === data.value
                    );
                    setActivePieIndex(activePieIndex === index ? null : index);
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Cumulative Affected People by Disaster Type</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={stackedAreaChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                {[
                  "Earthquake",
                  "Hurricane",
                  "Flood",
                  "Wildfire",
                  "Tornado",
                ].map((type, index) => (
                  <Area
                    key={type}
                    type="monotone"
                    dataKey={type}
                    stackId="1"
                    stroke={COLORS[index]}
                    fill={COLORS[index]}
                  />
                ))}
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Average Severity by Disaster Type</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart outerRadius={90} data={radarChartData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="type" />
                <PolarRadiusAxis angle={30} domain={[0, 4]} />
                <Radar
                  name="Average Severity"
                  dataKey="averageSeverity"
                  stroke="#8884d8"
                  fill="#8884d8"
                  fillOpacity={0.6}
                />
                <Legend />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Affected People vs. Severity</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <ScatterChart
                margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
              >
                <CartesianGrid />
                <XAxis
                  type="number"
                  dataKey="affectedPeople"
                  name="Affected People"
                />
                <YAxis
                  type="number"
                  dataKey="severity"
                  name="Severity"
                  domain={[0, 5]}
                />
                <ZAxis type="category" dataKey="type" name="Disaster Type" />
                <Tooltip cursor={{ strokeDasharray: "3 3" }} />
                <Legend />
                <Scatter
                  name="Disasters"
                  data={scatterPlotData}
                  fill="#8884d8"
                />
              </ScatterChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
