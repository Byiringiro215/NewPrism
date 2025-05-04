import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Building2, Briefcase, CheckCircle2, Clock, FileText, Star, Sparkles, TrendingUp, Target } from "lucide-react"
import ApplicantCharts from "@/components/dashboard/applicant/ApplicantCharts"
import InterviewCoach from "@/components/dashboard/applicant/InterviewCoach"
import SkillMatch from "@/components/dashboard/applicant/SkillMatch"
import InterviewActivity from "@/components/dashboard/applicant/InterviewActivity"
import DashboardLayout from "@/components/dashboard-layout"

export default function ApplicantDashboard() {
  return (
    <DashboardLayout userType="applicant">
      <div className="flex flex-col min-h-[calc(100vh-4rem)] gap-6 p-6">
        {/* Quick Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border-0 backdrop-blur-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-white/70">Profile Score</p>
                  <h3 className="text-2xl font-bold text-white mt-1">85%</h3>
                  <p className="text-xs text-white/50 mt-1">+5% this week</p>
                </div>
                <div className="p-3 bg-blue-500/20 rounded-xl">
                  <TrendingUp className="w-6 h-6 text-blue-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-0 backdrop-blur-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-white/70">Applications</p>
                  <h3 className="text-2xl font-bold text-white mt-1">12</h3>
                  <p className="text-xs text-white/50 mt-1">4 in review</p>
                </div>
                <div className="p-3 bg-green-500/20 rounded-xl">
                  <FileText className="w-6 h-6 text-green-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-0 backdrop-blur-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-white/70">Interviews</p>
                  <h3 className="text-2xl font-bold text-white mt-1">3</h3>
                  <p className="text-xs text-white/50 mt-1">Next: Tomorrow</p>
                </div>
                <div className="p-3 bg-purple-500/20 rounded-xl">
                  <Clock className="w-6 h-6 text-purple-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-500/10 to-red-500/10 border-0 backdrop-blur-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-white/70">Job Match</p>
                  <h3 className="text-2xl font-bold text-white mt-1">92%</h3>
                  <p className="text-xs text-white/50 mt-1">Top candidate</p>
                </div>
                <div className="p-3 bg-orange-500/20 rounded-xl">
                  <Target className="w-6 h-6 text-orange-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Activity & Progress */}
          <div className="space-y-6 lg:col-span-2">
            <Card className="border-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 backdrop-blur-sm">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-lg text-white">Weekly Activity</CardTitle>
                    <CardDescription className="text-white/70">Your job search progress this week</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ApplicantCharts />
              </CardContent>
            </Card>

            <Card className="border-0 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 backdrop-blur-sm">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-lg text-white">Latest Applications</CardTitle>
                    <CardDescription className="text-white/70">Track your recent job applications</CardDescription>
                  </div>
                  <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                    View All
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      role: "Senior Frontend Developer",
                      company: "TechCorp Inc.",
                      status: "In Review",
                      date: "2 days ago",
                      match: 95
                    },
                    {
                      role: "Full Stack Engineer",
                      company: "Innovation Labs",
                      status: "Interview",
                      date: "3 days ago",
                      match: 88
                    },
                    {
                      role: "UI/UX Developer",
                      company: "Design Studio",
                      status: "Applied",
                      date: "5 days ago",
                      match: 82
                    }
                  ].map((app, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer">
                      <div className="flex items-start gap-4">
                        <div className="p-2 bg-white/10 rounded">
                          <Building2 className="w-5 h-5 text-white/70" />
                        </div>
                        <div>
                          <h4 className="font-medium text-white">{app.role}</h4>
                          <p className="text-sm text-white/70">{app.company}</p>
                          <p className="text-xs text-white/50 mt-1">{app.date}</p>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <Badge className="bg-white/10 text-white hover:bg-white/20">
                          {app.status}
                        </Badge>
                        <span className="text-xs text-white/70">{app.match}% Match</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Interview Activity Calendar */}
            <InterviewActivity />
          </div>

          {/* Right Column - Skills & Coaching */}
          <div className="space-y-6">
            <SkillMatch />
            <InterviewCoach />
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
