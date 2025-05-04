'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Bot, Calendar, Clock, PlayCircle, Star, Trophy } from "lucide-react"

const practiceSessions = [
  {
    title: "Technical Interview",
    score: 85,
    duration: "45 min",
    date: "Yesterday",
    improvement: "+12%"
  },
  {
    title: "Behavioral Interview",
    score: 92,
    duration: "30 min",
    date: "3 days ago",
    improvement: "+8%"
  }
]

export default function InterviewCoach() {
  return (
    <Card className="border-0 bg-gradient-to-br from-violet-500/10 to-fuchsia-500/10 backdrop-blur-sm text-white">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">AI Interview Coach</CardTitle>
            <CardDescription className="text-white/70">Practice and improve your interview skills</CardDescription>
          </div>
          <Bot className="w-6 h-6 text-violet-400" />
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white/5 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-2">
              <Trophy className="w-4 h-4 text-yellow-500" />
              <span className="text-sm text-white/70">Best Score</span>
            </div>
            <p className="text-xl font-bold">92%</p>
          </div>
          <div className="bg-white/5 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="w-4 h-4 text-blue-400" />
              <span className="text-sm text-white/70">Practice Time</span>
            </div>
            <p className="text-xl font-bold">2.5h</p>
          </div>
        </div>

        {/* Recent Practice Sessions */}
        <div className="space-y-3">
          {practiceSessions.map((session, index) => (
            <div key={index} className="bg-white/5 rounded-lg p-3">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-medium">{session.title}</h4>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-white/50">{session.date}</span>
                    <span className="text-xs text-white/50">•</span>
                    <span className="text-xs text-white/50">{session.duration}</span>
                  </div>
                </div>
                <Badge className="bg-white/10 text-white">
                  {session.score}%
                </Badge>
              </div>
              <Progress value={session.score} className="h-1.5 mt-2" />
              <div className="mt-2 text-xs text-emerald-400">{session.improvement} improvement</div>
            </div>
          ))}
        </div>

        {/* Start Practice Button */}
        <Button className="w-full bg-violet-500/20 hover:bg-violet-500/30 text-white border-0">
          <PlayCircle className="w-4 h-4 mr-2" />
          Start Practice Interview
        </Button>

        {/* Next Scheduled Practice */}
        <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
          <div className="flex items-center gap-3">
            <Calendar className="w-5 h-5 text-violet-400" />
            <div>
              <p className="text-sm font-medium">Next Practice</p>
              <p className="text-xs text-white/70">System Design Interview</p>
            </div>
          </div>
          <Badge className="bg-violet-500/20 text-violet-300">Tomorrow 2PM</Badge>
        </div>
      </CardContent>
    </Card>
  )
}