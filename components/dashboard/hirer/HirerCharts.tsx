"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, PieChart, Pie, Cell } from "recharts";

const areaData = [
  { name: "Week 1", applications: 40, interviews: 5 },
  { name: "Week 2", applications: 55, interviews: 8 },
  { name: "Week 3", applications: 75, interviews: 12 },
  { name: "Week 4", applications: 65, interviews: 10 },
];

const qualificationData = [
  { name: "Perfect Match", value: 35, color: "#0088FE" },
  { name: "Good Match", value: 45, color: "#00C49F" },
  { name: "Partial Match", value: 15, color: "#FFBB28" },
  { name: "Low Match", value: 5, color: "#FF8042" },
];

export default function HirerCharts() {
  return (
    <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
      <Card className="bg-card/50 backdrop-blur-xl border-white/10">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-white">Application Trends</CardTitle>
          <CardDescription>Weekly application and interview statistics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={areaData}>
                <defs>
                  <linearGradient id="applications" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0088FE" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#0088FE" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="interviews" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00C49F" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#00C49F" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" stroke="#888888" />
                <YAxis stroke="#888888" />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="applications"
                  stroke="#0088FE"
                  fillOpacity={1}
                  fill="url(#applications)"
                />
                <Area
                  type="monotone"
                  dataKey="interviews"
                  stroke="#00C49F"
                  fillOpacity={1}
                  fill="url(#interviews)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card/50 backdrop-blur-xl border-white/10">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-white">Candidate Qualification</CardTitle>
          <CardDescription>Distribution of candidate matches</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={qualificationData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                >
                  {qualificationData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 gap-4 mt-4">
              {qualificationData.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-sm text-white/70">{item.name}: {item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}