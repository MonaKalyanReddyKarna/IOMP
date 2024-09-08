"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  AreaChart,
  Area,
  PieChart,
  Pie,
  XAxis,
  CartesianGrid,
  Legend,
} from "recharts";
import { AlertTriangle, Download } from "lucide-react";
import { data } from "@/data/dummy";
import { format } from "date-fns";
import { Disaster } from "@/types/disaster";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { getDisasterIcon } from "@/utils/disastericonmapping";

const chartConfig: ChartConfig = {
  frequency: {
    label: "Total Disasters",
  },
  disasters: {
    label: "Disasters",
  },
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
};

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#8884d8",
  "#82ca9d",
];

const SmallBarChart = ({ data, color }: { data: number[]; color: string }) => (
  <div className="flex items-end h-4 gap-[2px]">
    {data.map((value, index) => (
      <div
        key={index}
        className="w-1 bg-gray-200"
        style={{
          height: `${value * 100}%`,
          backgroundColor: index === data.length - 1 ? color : undefined,
        }}
      />
    ))}
  </div>
);

type DisasterFrequency = {
  name: string;
  frequency: number;
  fill: string;
};

function getDisasterTypesWithFrequency(data: Disaster[]): {
  frequencies: DisasterFrequency[];
  mostFrequent: DisasterFrequency;
} {
  const disasterTypeFrequency: Record<string, number> = data.reduce(
    (acc: Record<string, number>, event) => {
      const disasterType = event.disasterType;
      acc[disasterType] = (acc[disasterType] || 0) + 1;
      return acc;
    },
    {}
  );

  const frequencies: DisasterFrequency[] = Object.keys(
    disasterTypeFrequency
  ).map((disasterType, idx) => ({
    name: disasterType,
    frequency: disasterTypeFrequency[disasterType],
    fill: COLORS[idx % COLORS.length],
  }));

  let mostFrequent: DisasterFrequency = {
    name: "",
    frequency: 0,
    fill: COLORS[0],
  };
  for (const frequencyObj of frequencies) {
    if (frequencyObj.frequency > mostFrequent.frequency) {
      mostFrequent = frequencyObj;
    }
  }

  return { frequencies, mostFrequent };
}

function getDisastersByYear(data: Disaster[]) {
  const disasterByYear: Record<string, number> = data.reduce(
    (acc: Record<string, number>, event) => {
      const year = new Date(event.timestamp).getFullYear().toString();
      acc[year] = (acc[year] || 0) + 1;
      return acc;
    },
    {}
  );

  const disastersByYearArray = Object.keys(disasterByYear).map((year) => ({
    year,
    count: disasterByYear[year],
  }));

  return disastersByYearArray;
}

export default function StatisticsPage() {
  const disasters = data;
  const affected_people = "24,422";
  const { frequencies, mostFrequent } = getDisasterTypesWithFrequency(data);
  const mostFrequentPercentage = (
    (mostFrequent.frequency / data.length) *
    100
  ).toFixed(1);
  const disastersByYear = getDisastersByYear(data);

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Disaster Statistics</h1>
          <p className="text-muted-foreground">
            Overview of disaster events in India
          </p>
        </div>
        <div className="flex gap-2">
          <Button>
            Export <Download className="ml-2 size-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Disasters
            </CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{disasters.length}</div>
            <div className="text-xs text-muted-foreground flex w-full justify-between">
              Recorded major events
              <SmallBarChart
                data={[0.2, 0.6, 0.4, 1, 0.8]}
                color="rgb(239, 68, 68)"
              />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Affected People
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{affected_people}</div>

            <div className="text-xs text-muted-foreground flex w-full justify-between">
              Total affected individuals
              <SmallBarChart
                data={[0.2, 0.4, 1, 0.8, 0.6]}
                color="rgb(34, 197, 94)"
              />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Most Recent Disaster
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {disasters[1].disasterType}
            </div>

            <p className="text-xs text-muted-foreground flex w-full justify-between">
              {format(disasters[1].timestamp, "dd/mm/yyyy")}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Most Common Type
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mostFrequent.name}</div>
            <p className="text-xs text-muted-foreground">
              {mostFrequentPercentage}% of all disasters
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Disasters Timeline</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={chartConfig}
              className="aspect-auto h-[300px] w-full"
            >
              <AreaChart
                accessibilityLayer
                data={disastersByYear}
                margin={{
                  left: 12,
                  right: 12,
                }}
              >
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="year"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={10}
                />
                <ChartTooltip
                  cursor={false}
                  content={
                    <ChartTooltipContent indicator="line" nameKey="disasters" />
                  }
                />
                <Area
                  dataKey="count"
                  type="natural"
                  fill="var(--color-desktop)"
                  fillOpacity={0.4}
                  stroke="var(--color-desktop)"
                />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Disasters by Type</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={chartConfig}
              className="aspect-auto h-[300px] w-full"
            >
              <PieChart>
                <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                <Pie data={frequencies} dataKey="frequency" label />
                <Legend />
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Recent Disaster Events</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {disasters.slice(0, 10).map((disaster) => (
              <div
                key={disaster._id}
                className="flex items-center space-x-4 p-2 hover:bg-gray-100 rounded cursor-pointer"
              >
                <img
                  className="w-5 h-5"
                  src={getDisasterIcon(disaster.disasterType?.toLowerCase())}
                  alt="Icon"
                />
                <div>
                  <h3 className="font-semibold">
                    {disaster.disasterType} in {disaster.location}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {format(disaster.timestamp, "dd/mm/yyyy")}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
