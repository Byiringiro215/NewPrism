'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar as CalendarIcon, Clock, Video, Users, FileText, Mic } from "lucide-react"
import { format } from "date-fns"

const interviews = [
  {
    id: 1,
    title: "Technical Interview",
    company: "TechCorp Inc.",
    type: "Video",
    date: "2024-03-20",
    time: "14:00",
    duration: "60 mins",
    interviewers: ["John Smith", "Sarah Johnson"],
    status: "Scheduled",
    preparation: {
      materials: ["Resume", "Portfolio", "Code Samples"],
      topics: ["React", "TypeScript", "System Design"],
    },
  },
  {
    id: 2,
    title: "Behavioral Interview",
    company: "InnovateTech",
    type: "In-Person",
    date: "2024-03-22",
    time: "10:30",
    duration: "45 mins",
    interviewers: ["Michael Brown"],
    status: "Upcoming",
    preparation: {
      materials: ["Resume"],
      topics: ["Teamwork", "Problem Solving", "Leadership"],
    },
  },
  {
    id: 3,
    title: "System Design Interview",
    company: "DataFlow Systems",
    type: "Video",
    date: "2024-03-25",
    time: "15:30",
    duration: "90 mins",
    interviewers: ["Emily Davis", "Robert Wilson"],
    status: "Upcoming",
    preparation: {
      materials: ["Whiteboard", "Notepad"],
      topics: ["System Architecture", "Scalability", "Database Design"],
    },
  },
]

const interviewTypeIcons = {
  Video: Video,
  "In-Person": Users,
  Phone: Mic,
}

export default function Interviews() {
  return (
    <Card className="card-gradient border-0 text-white">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Interviews</CardTitle>
            <CardDescription className="text-white/70">Manage your upcoming interviews</CardDescription>
          </div>
          <div className="flex items-center gap-4">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                  <CalendarIcon className="w-4 h-4 mr-2" />
                  View Calendar
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar mode="single" className="rounded-md border" />
              </PopoverContent>
            </Popover>
            <Button className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700">
              Schedule Interview
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {interviews.map((interview) => {
            const InterviewTypeIcon = interviewTypeIcons[interview.type as keyof typeof interviewTypeIcons]
            return (
              <div key={interview.id} className="p-4 bg-white/5 rounded-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium">{interview.title}</h4>
                    <p className="text-sm text-white/70">{interview.company}</p>
                  </div>
                  <Badge className="bg-purple-500/20 text-purple-500">
                    {interview.status}
                  </Badge>
                </div>
                <div className="flex items-center gap-4 mt-2">
                  <div className="flex items-center gap-2">
                    <InterviewTypeIcon className="w-4 h-4 text-white/70" />
                    <span className="text-sm text-white/70">{interview.type}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CalendarIcon className="w-4 h-4 text-white/70" />
                    <span className="text-sm text-white/70">
                      {format(new Date(interview.date), "MMM d, yyyy")} at {interview.time}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-white/70" />
                    <span className="text-sm text-white/70">{interview.duration}</span>
                  </div>
                </div>
                <div className="mt-4">
                  <h5 className="text-sm font-medium mb-2">Interviewers</h5>
                  <div className="flex flex-wrap gap-2">
                    {interview.interviewers.map((interviewer, index) => (
                      <Badge key={index} variant="secondary" className="bg-white/10 text-white">
                        {interviewer}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="mt-4">
                  <h5 className="text-sm font-medium mb-2">Preparation Materials</h5>
                  <div className="flex flex-wrap gap-2">
                    {interview.preparation.materials.map((material, index) => (
                      <Badge key={index} variant="secondary" className="bg-white/10 text-white">
                        <FileText className="w-3 h-3 mr-1" />
                        {material}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="mt-4">
                  <h5 className="text-sm font-medium mb-2">Topics to Prepare</h5>
                  <div className="flex flex-wrap gap-2">
                    {interview.preparation.topics.map((topic, index) => (
                      <Badge key={index} variant="secondary" className="bg-white/10 text-white">
                        {topic}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-4">
                  <Button size="sm" className="bg-purple-500 hover:bg-purple-600">
                    Join Interview
                  </Button>
                  <Button variant="outline" size="sm" className="border-white/20 text-white hover:bg-white/10">
                    Reschedule
                  </Button>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  );
} 