"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Star, Mail, Calendar, FileText, User, CheckCircle2, Clock, XCircle } from "lucide-react";

interface Candidate {
  id: string;
  name: string;
  jobTitle: string;
  email: string;
  matchScore: number;
  status: "pending" | "reviewing" | "interviewed" | "accepted" | "rejected";
  appliedDate: string;
  avatar: string;
}

const mockCandidates: Candidate[] = [
  {
    id: "1",
    name: "John Doe",
    jobTitle: "Senior Frontend Developer",
    email: "john@example.com",
    matchScore: 92,
    status: "reviewing",
    appliedDate: "2025-04-15",
    avatar: "/placeholder-user.jpg"
  },
  {
    id: "2",
    name: "Jane Smith",
    jobTitle: "Product Manager",
    email: "jane@example.com",
    matchScore: 88,
    status: "pending",
    appliedDate: "2025-04-14",
    avatar: "/placeholder-user.jpg"
  },
  {
    id: "3",
    name: "Mike Johnson",
    jobTitle: "UX Designer",
    email: "mike@example.com",
    matchScore: 95,
    status: "interviewed",
    appliedDate: "2025-04-13",
    avatar: "/placeholder-user.jpg"
  }
];

export default function CandidateManagement() {
  const [candidates, setCandidates] = useState<Candidate[]>(mockCandidates);

  const getStatusColor = (status: Candidate["status"]) => {
    switch (status) {
      case "pending":
        return "bg-yellow-500/20 text-yellow-400";
      case "reviewing":
        return "bg-blue-500/20 text-blue-400";
      case "interviewed":
        return "bg-purple-500/20 text-purple-400";
      case "accepted":
        return "bg-green-500/20 text-green-400";
      case "rejected":
        return "bg-red-500/20 text-red-400";
    }
  };

  const getStatusIcon = (status: Candidate["status"]) => {
    switch (status) {
      case "pending":
        return Clock;
      case "reviewing":
        return FileText;
      case "interviewed":
        return Calendar;
      case "accepted":
        return CheckCircle2;
      case "rejected":
        return XCircle;
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-400";
    if (score >= 70) return "text-yellow-400";
    return "text-red-400";
  };

  return (
    <Card className="bg-card/50 backdrop-blur-xl border-white/10">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-white">Candidate Management</CardTitle>
        <CardDescription>Review and manage job applicants</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="all" className="space-y-4">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="reviewing">Reviewing</TabsTrigger>
            <TabsTrigger value="interviewed">Interviewed</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            {candidates.map(candidate => (
              <div key={candidate.id} className="flex items-center gap-4 p-4 rounded-lg bg-white/5">
                <Avatar className="w-12 h-12">
                  <AvatarImage src={candidate.avatar} alt={candidate.name} />
                  <AvatarFallback>{candidate.name[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-medium text-white">{candidate.name}</h3>
                    <Badge variant="outline" className={getStatusColor(candidate.status)}>
                      {candidate.status}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 mt-1 text-sm text-white/70">
                    <div className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      {candidate.jobTitle}
                    </div>
                    <div className="flex items-center gap-1">
                      <Mail className="w-4 h-4" />
                      {candidate.email}
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className={`w-4 h-4 ${getScoreColor(candidate.matchScore)}`} />
                      {candidate.matchScore}% match
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">Profile</Button>
                  <Button variant="outline" size="sm">Interview</Button>
                </div>
              </div>
            ))}
          </TabsContent>

          {["pending", "reviewing", "interviewed"].map(status => (
            <TabsContent key={status} value={status} className="space-y-4">
              {candidates
                .filter(c => c.status === status)
                .map(candidate => (
                  <div key={candidate.id} className="flex items-center gap-4 p-4 rounded-lg bg-white/5">
                    {/* Same structure as above */}
                  </div>
                ))}
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
}