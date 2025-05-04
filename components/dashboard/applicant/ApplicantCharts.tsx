'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Area, AreaChart } from "recharts"

const matchData = [
  { name: "Web Dev", score: 95 },
  { name: "UI/UX", score: 85 },
  { name: "Backend", score: 75 },
  { name: "DevOps", score: 65 },
  { name: "Mobile", score: 55 },
]

const applicationData = [
  { name: "Applied", value: 12 },
  { name: "Interviewing", value: 3 },
  { name: "Offers", value: 1 },
  { name: "Rejected", value: 5 },
]

const weeklyData = [
  { day: "Mon", applications: 3, interviews: 1, matches: 8 },
  { day: "Tue", applications: 2, interviews: 2, matches: 5 },
  { day: "Wed", applications: 4, interviews: 1, matches: 10 },
  { day: "Thu", applications: 1, interviews: 3, matches: 7 },
  { day: "Fri", applications: 5, interviews: 0, matches: 12 },
  { day: "Sat", applications: 2, interviews: 0, matches: 4 },
  { day: "Sun", applications: 1, interviews: 0, matches: 6 }
]

const activityData = [
  { month: "Jan", activity: 65 },
  { month: "Feb", activity: 72 },
  { month: "Mar", activity: 85 },
  { month: "Apr", activity: 78 },
  { month: "May", activity: 90 }
]

const COLORS = ["#4ade80", "#a855f7", "#3b82f6", "#f87171"]

export default function ApplicantCharts() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="card-gradient border-0 text-white">
          <CardHeader>
            <CardTitle>Skill Match Scores</CardTitle>
            <CardDescription className="text-white/70">How your skills match with job market demand</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={matchData}
                  layout="vertical"
                  margin={{
                    top: 20,
                    right: 30,
                    left: 40,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis type="number" domain={[0, 100]} stroke="rgba(255,255,255,0.7)" />
                  <YAxis dataKey="name" type="category" stroke="rgba(255,255,255,0.7)" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(23, 23, 50, 0.8)",
                      borderColor: "rgba(255, 255, 255, 0.2)",
                      color: "white",
                    }}
                  />
                  <Bar dataKey="score" fill="#a855f7" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="card-gradient border-0 text-white">
          <CardHeader>
            <CardTitle>Application Status</CardTitle>
            <CardDescription className="text-white/70">Current status of your job applications</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={applicationData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                    label
                  >
                    {applicationData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(23, 23, 50, 0.8)",
                      borderColor: "rgba(255, 255, 255, 0.2)",
                      color: "white",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Weekly Activity Chart */}
      <div className="h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={weeklyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis 
              dataKey="day" 
              stroke="rgba(255,255,255,0.5)"
              tick={{ fill: "rgba(255,255,255,0.7)" }}
            />
            <YAxis 
              stroke="rgba(255,255,255,0.5)"
              tick={{ fill: "rgba(255,255,255,0.7)" }}
            />
            <Tooltip 
              contentStyle={{ 
                background: "rgba(0,0,0,0.8)", 
                border: "none",
                borderRadius: "8px",
                color: "white"
              }}
            />
            <Bar 
              dataKey="applications" 
              fill="rgba(99,102,241,0.8)" 
              radius={[4, 4, 0, 0]}
              name="Applications"
            />
            <Bar 
              dataKey="interviews" 
              fill="rgba(168,85,247,0.8)" 
              radius={[4, 4, 0, 0]}
              name="Interviews"
            />
            <Bar 
              dataKey="matches" 
              fill="rgba(59,130,246,0.8)" 
              radius={[4, 4, 0, 0]}
              name="Job Matches"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Monthly Progress Chart */}
      <div className="h-[120px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={activityData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="activityGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="rgba(99,102,241,0.5)" />
                <stop offset="100%" stopColor="rgba(99,102,241,0)" />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis 
              dataKey="month" 
              stroke="rgba(255,255,255,0.5)"
              tick={{ fill: "rgba(255,255,255,0.7)" }}
            />
            <YAxis 
              stroke="rgba(255,255,255,0.5)"
              tick={{ fill: "rgba(255,255,255,0.7)" }}
            />
            <Tooltip
              contentStyle={{ 
                background: "rgba(0,0,0,0.8)", 
                border: "none",
                borderRadius: "8px",
                color: "white"
              }}
            />
            <Area
              type="monotone"
              dataKey="activity"
              stroke="rgba(99,102,241,0.8)"
              fill="url(#activityGradient)"
              name="Overall Activity"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}