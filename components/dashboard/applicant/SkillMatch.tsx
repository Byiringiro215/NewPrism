'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from "recharts"
import { BookOpen, Brain, Target, TrendingUp } from "lucide-react"

const skillData = [
  { skill: "React", level: 90, market: 95 },
  { skill: "TypeScript", level: 85, market: 90 },
  { skill: "Node.js", level: 75, market: 85 },
  { skill: "AWS", level: 65, market: 80 },
  { skill: "GraphQL", level: 70, market: 75 }
]

const recommendedSkills = [
  {
    skill: "Next.js",
    reason: "High demand in React ecosystem",
    resources: 3,
    trend: "+25%"
  },
  {
    skill: "Docker",
    reason: "Essential for DevOps roles",
    resources: 5,
    trend: "+18%"
  }
]

export default function SkillMatch() {
  return (
    <Card className="border-0 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 backdrop-blur-sm text-white">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">Skills Analysis</CardTitle>
            <CardDescription className="text-white/70">Your skills vs market demand</CardDescription>
          </div>
          <Target className="w-6 h-6 text-cyan-400" />
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Skills Radar Chart */}
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={skillData}>
              <PolarGrid stroke="rgba(255,255,255,0.1)" />
              <PolarAngleAxis
                dataKey="skill"
                tick={{ fill: "rgba(255,255,255,0.7)", fontSize: 12 }}
              />
              <PolarRadiusAxis
                angle={30}
                domain={[0, 100]}
                tick={{ fill: "rgba(255,255,255,0.7)" }}
              />
              <Radar
                name="Your Skills"
                dataKey="level"
                stroke="rgba(6,182,212,0.8)"
                fill="rgba(6,182,212,0.3)"
                fillOpacity={0.6}
              />
              <Radar
                name="Market Demand"
                dataKey="market"
                stroke="rgba(59,130,246,0.8)"
                fill="rgba(59,130,246,0.3)"
                fillOpacity={0.6}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white/5 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-2">
              <Brain className="w-4 h-4 text-cyan-400" />
              <span className="text-sm text-white/70">Skill Match</span>
            </div>
            <p className="text-xl font-bold">85%</p>
          </div>
          <div className="bg-white/5 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4 text-blue-400" />
              <span className="text-sm text-white/70">Growth</span>
            </div>
            <p className="text-xl font-bold">+15%</p>
          </div>
        </div>

        {/* Recommended Skills */}
        <div>
          <h4 className="text-sm font-medium mb-3">Recommended Skills</h4>
          <div className="space-y-3">
            {recommendedSkills.map((skill, index) => (
              <div key={index} className="bg-white/5 rounded-lg p-3">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-2">
                      <h5 className="font-medium">{skill.skill}</h5>
                      <Badge className="bg-blue-500/20 text-blue-300">{skill.trend}</Badge>
                    </div>
                    <p className="text-sm text-white/70 mt-1">{skill.reason}</p>
                  </div>
                  <Button variant="ghost" size="sm" className="h-8 text-cyan-400 hover:text-cyan-300 hover:bg-white/5">
                    <BookOpen className="w-4 h-4 mr-2" />
                    Learn
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}