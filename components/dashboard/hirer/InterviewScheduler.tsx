"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import DataTable from "@/components/dashboard/shared/DataTable";
import { addDays, format, isSameDay } from "date-fns";
import { Clock, Calendar as CalendarIcon, Video, Users, Building, Plus } from "lucide-react";

interface CandidateProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  avatar: string;
  role: string;
  experience: number;
  education: {
    degree: string;
    school: string;
    year: string;
  };
  skills: Array<{
    name: string;
    level: number;
  }>;
  languages: Array<{
    name: string;
    level: string;
  }>;
  certifications: string[];
  workHistory: Array<{
    company: string;
    role: string;
    duration: string;
    achievements: string[];
  }>;
  matchScore: number;
}

interface Interview {
  id: string;
  candidateId: string;
  candidateName: string;
  candidateEmail: string;
  jobTitle: string;
  scheduledTime: string;
  duration: number;
  type: "onsite" | "video" | "phone";
  status: "scheduled" | "completed" | "canceled";
  participants: string[];
  location?: string;
  videoLink?: string;
  notes?: string;
}

const mockCandidates: CandidateProfile[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    phone: "123-456-7890",
    location: "New York",
    avatar: "/placeholder-user.jpg",
    role: "Software Engineer",
    experience: 5,
    education: {
      degree: "Master's",
      school: "MIT",
      year: "2020",
    },
    skills: [
      { name: "JavaScript", level: 90 },
      { name: "React", level: 80 },
      { name: "Node.js", level: 70 },
    ],
    languages: [
      { name: "English", level: "Native" },
      { name: "Spanish", level: "Fluent" },
    ],
    certifications: ["AWS Certified Developer"],
    workHistory: [
      {
        company: "Google",
        role: "Frontend Engineer",
        duration: "2 years",
        achievements: ["Developed new features", "Improved performance"],
      },
    ],
    matchScore: 85,
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    phone: "987-654-3210",
    location: "Los Angeles",
    avatar: "/placeholder-user.jpg",
    role: "Data Scientist",
    experience: 3,
    education: {
      degree: "Bachelor's",
      school: "Stanford",
      year: "2022",
    },
    skills: [
      { name: "Python", level: 95 },
      { name: "Machine Learning", level: 85 },
      { name: "Data Analysis", level: 80 },
    ],
    languages: [
      { name: "English", level: "Native" },
      { name: "French", level: "Intermediate" },
    ],
    certifications: ["Certified Data Scientist"],
    workHistory: [
      {
        company: "Amazon",
        role: "Data Analyst",
        duration: "1 year",
        achievements: ["Improved data accuracy", "Developed new insights"],
      },
    ],
    matchScore: 92,
  },
];

const mockInterviews: Interview[] = [
  {
    id: "1",
    candidateId: "1",
    candidateName: "John Doe",
    candidateEmail: "john@example.com",
    jobTitle: "Senior Frontend Developer",
    scheduledTime: "2025-05-05T10:00:00Z",
    duration: 60,
    type: "video",
    status: "scheduled",
    participants: ["Alice Johnson", "Bob Smith"],
    location: undefined,
    videoLink: "https://meet.google.com/abc-defg-hij",
    notes: undefined,
  },
  {
    id: "2",
    candidateId: "2",
    candidateName: "Jane Smith",
    candidateEmail: "jane@example.com",
    jobTitle: "Senior Data Scientist",
    scheduledTime: "2025-05-06T14:00:00Z",
    duration: 45,
    type: "video",
    status: "scheduled",
    participants: ["Alice Johnson", "Charlie Brown"],
    location: undefined,
    videoLink: "https://meet.google.com/xyz-uvwx-rst",
    notes: undefined,
  },
  {
    id: "3",
    candidateId: "1",
    candidateName: "John Doe",
    candidateEmail: "john@example.com",
    jobTitle: "Senior Frontend Developer",
    scheduledTime: "2025-05-07T11:00:00Z",
    duration: 60,
    type: "onsite",
    status: "scheduled",
    participants: ["Bob Smith", "David Lee"],
    location: "Company HQ",
    videoLink: undefined,
    notes: "Please bring your laptop.",
  },
  {
    id: "4",
    candidateId: "2",
    candidateName: "Jane Smith",
    candidateEmail: "jane@example.com",
    jobTitle: "Senior Data Scientist",
    scheduledTime: "2025-05-08T09:30:00Z",
    duration: 30,
    type: "phone",
    status: "scheduled",
    participants: ["Eve Williams"],
    location: undefined,
    videoLink: undefined,
    notes: undefined,
  },
];

const timeSlots = [
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "13:00", "13:30", "14:00", "14:30", "15:00", "15:30",
  "16:00", "16:30", "17:00"
];

export default function InterviewScheduler() {
  const [interviews, setInterviews] = useState<Interview[]>(mockInterviews);
  const [candidates, setCandidates] = useState<CandidateProfile[]>(mockCandidates);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [showScheduleDialog, setShowScheduleDialog] = useState(false);
  const [newInterview, setNewInterview] = useState({
    type: "video" as "video" | "onsite" | "phone",
    duration: 60,
    participants: [],
    candidateId: "1",
  });

  const handleScheduleInterview = (data: Partial<Interview>) => {
    // In a real app, this would make an API call
    const candidate = mockCandidates.find(c => c.id === newInterview.candidateId);
    if (!candidate) {
      console.error("Candidate not found");
      return;
    }

    const interview: Interview = {
      id: Math.random().toString(),
      candidateId: candidate.id,
      candidateName: candidate.name,
      candidateEmail: candidate.email,
      jobTitle: candidate.role,
      ...data,
      status: "scheduled",
    } as Interview;

    setInterviews([...interviews, interview]);
    setShowScheduleDialog(false);
  };

  const columns = [
    {
      key: "candidate",
      header: "Candidate",
      cell: (row: Interview) => {
        const candidate = mockCandidates.find(c => c.id === row.candidateId);
        return (
          <div className="flex items-center gap-2">
            <div className="font-medium text-white">{candidate?.name}</div>
            <div className="text-sm text-white/70">({candidate?.role})</div>
          </div>
        );
      },
    },
    {
      key: "schedule",
      header: "Schedule",
      cell: (row: Interview) => (
        <div className="flex items-center gap-2">
          <CalendarIcon className="w-4 h-4 text-white/70" />
          <div className="text-sm text-white">
            {format(new Date(row.scheduledTime), "MMM d, yyyy h:mm a")}
            {" • "}
            {row.duration} min
          </div>
        </div>
      ),
    },
    {
      key: "type",
      header: "Type",
      cell: (row: Interview) => (
        <Badge
          variant="secondary"
          className={
            row.type === "video"
              ? "bg-blue-500/20 text-blue-400"
              : row.type === "onsite"
              ? "bg-green-500/20 text-green-400"
              : row.type === "phone"
              ? "bg-yellow-500/20 text-yellow-400"
              : ""
          }
        >
          {row.type === "video" && <Video className="w-3 h-3 mr-1" />}
          {row.type === "onsite" && <Building className="w-3 h-3 mr-1" />}
          {row.type.charAt(0).toUpperCase() + row.type.slice(1)}
        </Badge>
      ),
    },
    {
      key: "participants",
      header: "Participants",
      cell: (row: Interview) => (
        <div className="flex items-center gap-1">
          <Users className="w-4 h-4 text-white/70" />
          <span className="text-sm text-white/70">
            {row.participants.length} interviewers
          </span>
        </div>
      ),
    },
    {
      key: "status",
      header: "Status",
      cell: (row: Interview) => (
        <Badge
          variant="outline"
          className={
            row.status === "scheduled"
              ? "border-blue-500/50 text-blue-400"
              : row.status === "completed"
              ? "border-green-500/50 text-green-400"
              : row.status === "canceled"
              ? "border-red-500/50 text-red-400"
              : ""
          }
        >
          {row.status.charAt(0).toUpperCase() + row.status.slice(1)}
        </Badge>
      ),
    },
  ];

  const actions = [
    {
      label: "View Details",
      onClick: (interview: Interview) => {
        // Handle viewing interview details
      },
    },
    {
      label: "Send Reminder",
      onClick: (interview: Interview) => {
        // Handle sending reminder
      },
    },
    {
      label: "Cancel Interview",
      onClick: (interview: Interview) => {
        // Handle canceling interview
      },
    },
  ];

 const todayInterviews = interviews.filter((interview) =>
    selectedDate &&
    isSameDay(new Date(interview.scheduledTime), selectedDate) &&
    interview.status === "scheduled"
  );

  return (
    <div className="space-y-4 p-2 w-full max-w-5xl mx-auto bg-gray-900 text-white">
      <div className="grid gap-6 md:grid-cols-[300px,1fr]">
        {/* Calendar */}
        <Card className="bg-gradient-to-br from-gray-800 to-gray-900/70 backdrop-blur-xl border-white/10 text-white">
          <CardHeader>
            <CardTitle>Calendar</CardTitle>
            <CardDescription>Select a date to view interviews</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-sm">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="rounded-md border border-white/10 w-full"
              />
            </div>
          </CardContent>
        </Card>

        {/* Schedule */}
        <Card className="bg-gradient-to-br from-gray-800 to-gray-900/70 backdrop-blur-xl border-white/10">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>
                  {selectedDate
                    ? format(selectedDate, "MMMM d, yyyy")
                    : "No date selected"}
                </CardTitle>
                <CardDescription>
                  {todayInterviews.length} interviews scheduled
                </CardDescription>
              </div>
              <Dialog open={showScheduleDialog} onOpenChange={setShowScheduleDialog}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Schedule Interview
                  </Button>
                </DialogTrigger>
                <DialogContent className="w-full max-w-md space-y-2 overflow-y-auto p-3 pt-5" >
                  <DialogHeader>
                    <DialogTitle>Schedule New Interview</DialogTitle>
                    <DialogDescription>
                      Set up an interview with a candidate
                    </DialogDescription>
                  </DialogHeader>

                  <div className="space-y-2 py-2">
                    <div className="space-y-1">
                      <Label>Candidate</Label>
                      <Select
                        onValueChange={(value) =>
                          setNewInterview({ ...newInterview, candidateId: value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a candidate" />
                        </SelectTrigger>
                        <SelectContent>
                          {mockCandidates.map((candidate) => (
                            <SelectItem key={candidate.id} value={candidate.id}>
                              {candidate.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Interview Type</Label>
                      <Select
                        onValueChange={(value) =>
                          setNewInterview({ ...newInterview, type: value as "video" | "onsite" | "phone" })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select interview type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="video">Video Call</SelectItem>
                          <SelectItem value="onsite">On-site</SelectItem>
                          <SelectItem value="phone">Phone</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Date</Label>
                      <Input
                        type="date"
                        min={format(new Date(), "yyyy-MM-dd")}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Time</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select time slot" />
                        </SelectTrigger>
                        <SelectContent>
                          {timeSlots.map((slot) => (
                            <SelectItem key={slot} value={slot}>
                              {slot}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Duration (minutes)</Label>
                      <Select
                        defaultValue="60"
                        onValueChange={(value) =>
                          setNewInterview({
                            ...newInterview,
                            duration: parseInt(value),
                          })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="30">30 minutes</SelectItem>
                          <SelectItem value="45">45 minutes</SelectItem>
                          <SelectItem value="60">1 hour</SelectItem>
                          <SelectItem value="90">1.5 hours</SelectItem>
                          <SelectItem value="120">2 hours</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                

                    <div className="space-y-2">
                      <Label>Notes</Label>
                      <Textarea
                        placeholder="Add any additional notes or instructions..."
                        rows={3}
                      />
                    </div>
                    <Button className="bg-gradient-to-r from-purple-600 to-indigo-600" onClick={() => handleScheduleInterview(newInterview as Partial<Interview>)}>
                      Schedule Interview
                    </Button>
                  </div>

                  <DialogFooter>
                    <Button
                      variant="outline"
                      onClick={() => setShowScheduleDialog(false)}
                    >
                      Cancel
                    </Button>
                    
                    
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
          <CardContent className="glass">
            <DataTable
              data={todayInterviews}
              columns={columns}
              actions={actions}
              pageSize={5}
            />
          </CardContent>
        </Card>
      </div>

    </div>
  );
}
