'use client';
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import DashboardLayout from "@/components/dashboard-layout";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis } from "recharts";
import { Building2, Users2, FileCheck2, Calendar, TrendingUp, Briefcase, CheckCircle2, Clock, Target } from "lucide-react";
import { supabase } from "@/lib/supabase/client";

interface DashboardStats {
  activeJobs: number;
  totalApplications: number;
  scheduledInterviews: number;
  totalHires: number;
}

const applicationData = [
  { name: "Pending", value: 30, color: "#0088FE" },
  { name: "Reviewed", value: 45, color: "#00C49F" },
  { name: "Interviewed", value: 15, color: "#FFBB28" },
  { name: "Hired", value: 10, color: "#FF8042" },
];

const monthlyStats = [
  { name: "Jan", applications: 65, hires: 4 },
  { name: "Feb", applications: 85, hires: 6 },
  { name: "Mar", applications: 120, hires: 8 },
  { name: "Apr", applications: 90, hires: 5 },
];

export default function HirerDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    activeJobs: 5,
    totalApplications: 1200,
    scheduledInterviews: 17,
    totalHires: 2,
  });

  useEffect(() => {
    loadDashboardStats();
  }, []);

  const loadDashboardStats = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Load stats from Supabase - this is a placeholder, implement actual queries
      setStats({
        activeJobs: 12,
        totalApplications: 156,
        scheduledInterviews: 8,
        totalHires: 24,
      });
    } catch (error) {
      console.error("Error loading dashboard stats:", error);
    }
  };

  return (
    <DashboardLayout userType="hirer">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Dashboard</h1>
          <p className="text-white/70">Welcome back to your Prism dashboard</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border-0">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-white/70">Active Jobs</p>
                  <h3 className="text-2xl font-bold text-white mt-1">{stats.activeJobs}</h3>
                </div>
                <div className="p-3 bg-blue-500/20 rounded-xl">
                  <Briefcase className="w-6 h-6 text-blue-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-0">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-white/70">Total Applications</p>
                  <h3 className="text-2xl font-bold text-white mt-1">{stats.totalApplications}</h3>
                </div>
                <div className="p-3 bg-green-500/20 rounded-xl">
                  <FileCheck2 className="w-6 h-6 text-green-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border-0">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-white/70">Scheduled Interviews</p>
                  <h3 className="text-2xl font-bold text-white mt-1">{stats.scheduledInterviews}</h3>
                </div>
                <div className="p-3 bg-yellow-500/20 rounded-xl">
                  <Calendar className="w-6 h-6 text-yellow-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-0">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-white/70">Total Hires</p>
                  <h3 className="text-2xl font-bold text-white mt-1">{stats.totalHires}</h3>
                </div>
                <div className="p-3 bg-purple-500/20 rounded-xl">
                  <Users2 className="w-6 h-6 text-purple-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-card/50 backdrop-blur-xl border-white/10">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-white">Application Status</CardTitle>
              <CardDescription>Distribution of current applications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full">
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
                    >
                      {applicationData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="grid grid-cols-2 gap-4 mt-4">
                  {applicationData.map((item, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="text-sm text-white/70">{item.name}: {item.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/50 backdrop-blur-xl border-white/10">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-white">Monthly Activity</CardTitle>
              <CardDescription>Applications and hires over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={monthlyStats}>
                    <XAxis dataKey="name" stroke="#888888" />
                    <YAxis stroke="#888888" />
                    <Tooltip />
                    <Bar dataKey="applications" fill="#0088FE" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="hires" fill="#00C49F" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activities */}
        <Card className="bg-card/50 backdrop-blur-xl border-white/10">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-white">Recent Activities</CardTitle>
            <CardDescription>Latest updates from your job postings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-3 rounded-lg bg-white/5">
                <div className="p-2 rounded-full bg-blue-500/20">
                  <FileCheck2 className="w-4 h-4 text-blue-400" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-white">New application received for <span className="font-medium">Senior Frontend Developer</span></p>
                  <p className="text-xs text-white/70">2 minutes ago</p>
                </div>
                <Button variant="ghost" size="sm">View</Button>
              </div>

              <div className="flex items-center gap-4 p-3 rounded-lg bg-white/5">
                <div className="p-2 rounded-full bg-green-500/20">
                  <Calendar className="w-4 h-4 text-green-400" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-white">Interview scheduled with <span className="font-medium">John Doe</span></p>
                  <p className="text-xs text-white/70">1 hour ago</p>
                </div>
                <Button variant="ghost" size="sm">Details</Button>
              </div>

              <div className="flex items-center gap-4 p-3 rounded-lg bg-white/5">
                <div className="p-2 rounded-full bg-yellow-500/20">
                  <Target className="w-4 h-4 text-yellow-400" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-white">Job posting reached <span className="font-medium">100 views</span></p>
                  <p className="text-xs text-white/70">3 hours ago</p>
                </div>
                <Button variant="ghost" size="sm">Analytics</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
