"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";

export function DisasterTable({ disasters }: { disasters: any }) {
  const [filter, setFilter] = useState("all");
  const [dateRange, setDateRange] = useState({ from: null, to: null });

  const filteredDisasters = disasters.filter(
    (disaster) =>
      (filter === "all" || disaster.type.toLowerCase() === filter) &&
      (!dateRange.from || new Date(disaster.timestamp) >= dateRange.from) &&
      (!dateRange.to || new Date(disaster.timestamp) <= dateRange.to)
  );
  return (
    <Card>
      <CardHeader>
        <CardTitle>Disaster Data</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex space-x-4 mb-4">
          <div className="w-1/3">
            <Label htmlFor="type">Disaster Type</Label>
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger id="type">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="earthquake">Earthquake</SelectItem>
                <SelectItem value="hurricane">Hurricane</SelectItem>
                <SelectItem value="flood">Flood</SelectItem>
                <SelectItem value="wildfire">Wildfire</SelectItem>
                <SelectItem value="tornado">Tornado</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="w-1/3">
            <Label>Date Range</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dateRange.from ? (
                    dateRange.to ? (
                      <>
                        {format(dateRange.from, "LLL dd, y")} -{" "}
                        {format(dateRange.to, "LLL dd, y")}
                      </>
                    ) : (
                      format(dateRange.from, "LLL dd, y")
                    )
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  initialFocus
                  mode="range"
                  defaultMonth={dateRange.from}
                  selected={dateRange}
                  onSelect={setDateRange}
                  numberOfMonths={2}
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Type</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Severity</TableHead>
              <TableHead>Affected People</TableHead>
              <TableHead>Timestamp</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredDisasters.map((disaster) => (
              <TableRow key={disaster.id}>
                <TableCell>{disaster.type}</TableCell>
                <TableCell>{disaster.location}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      disaster.severity === "High" ||
                      disaster.severity === "Severe"
                        ? "destructive"
                        : "secondary"
                    }
                  >
                    {disaster.severity}
                  </Badge>
                </TableCell>
                <TableCell>
                  {disaster.affectedPeople.toLocaleString()}
                </TableCell>
                <TableCell>
                  {new Date(disaster.timestamp).toLocaleString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
