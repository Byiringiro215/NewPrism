"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Label } from "@/components/ui/label";
import DataTable from "@/components/dashboard/shared/DataTable";
import SearchBar from "@/components/dashboard/shared/SearchBar";
import { ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Bar } from "recharts";
import {
  Download,
  Mail,
  Calendar,
  CheckCircle,
  XCircle,
  Clock,
  Star,
  FileText,
  UserCheck,
  BarChart3,
  Brain,
  LineChart,
  Target,
  TrendingUp,
  Book,
  UserPlus,
  Users,
} from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CandidateProfileDrawer } from "./CandidateProfile";
import { useToast } from "@/components/ui/use-toast";

interface Candidate {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: string;
  experience: number;
  status: "pending" | "shortlisted" | "rejected" | "interviewing";
  matchScore: number;
  appliedDate: string;
  resume: string;
  skills: Array<{ name: string; level: number }>;
  phone: string;
  location: string;
  education: {
    degree: string;
    school: string;
    year: string;
  };
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
  evaluationResults?: {
    skillsMatch: number;
    experienceMatch: number;
    cultureFit: number;
    strengths: string[];
    developmentAreas: string[];
    diversity: {
      gender: string;
      ethnicity: string;
      veteranStatus: string;
    };
  };
}

interface SkillsAnalysis {
  name: string;
  required: number;
  candidates: number;
}

const mockCandidates: Candidate[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    avatar: "/placeholder-user.jpg",
    role: "Senior Frontend Developer",
    experience: 5,
    status: "shortlisted",
    matchScore: 92,
    appliedDate: "2025-04-15",
    resume: "/resumes/john-doe.pdf",
    skills: [
      { name: "React", level: 95 },
      { name: "TypeScript", level: 90 },
      { name: "Node.js", level: 85 },
    ],
    education: {
      degree: "BS Computer Science",
      school: "Stanford University",
      year: "2020",
    },
    languages: [
      { name: "English", level: "Native" },
      { name: "Spanish", level: "Professional" },
    ],
    certifications: ["AWS Certified Developer", "Google Cloud Professional"],
    workHistory: [
      {
        company: "Tech Corp",
        role: "Senior Developer",
        duration: "2020-2025",
        achievements: [
          "Led development of core product features",
          "Reduced build time by 40%",
          "Mentored junior developers",
        ],
      },
    ],
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    phone: "+1 (555) 234-5678",
    location: "New York, NY",
    avatar: "/placeholder-user.jpg",
    role: "Full Stack Engineer",
    experience: 4,
    status: "interviewing",
    matchScore: 88,
    appliedDate: "2025-04-14",
    resume: "/resumes/jane-smith.pdf",
    skills: [
      { name: "Python", level: 92 },
      { name: "Django", level: 88 },
      { name: "React", level: 85 },
    ],
    education: {
      degree: "MS Software Engineering",
      school: "MIT",
      year: "2021",
    },
    languages: [
      { name: "English", level: "Native" },
      { name: "Mandarin", level: "Conversational" },
    ],
    certifications: ["MongoDB Certified Developer", "Azure Fundamentals"],
    workHistory: [
      {
        company: "Data Systems Inc",
        role: "Full Stack Developer",
        duration: "2021-2025",
        achievements: [
          "Implemented real-time analytics dashboard",
          "Optimized database queries improving performance by 50%",
          "Led team of 5 developers",
        ],
      },
    ],
  },
  {
    id: "3",
    name: "Alice Johnson",
    email: "alice@example.com",
    phone: "+1 (555) 345-6789",
    location: "Chicago, IL",
    avatar: "/placeholder-user.jpg",
    role: "Backend Developer",
    experience: 6,
    status: "shortlisted",
    matchScore: 90,
    appliedDate: "2025-04-20",
    resume: "/resumes/alice-johnson.pdf",
    skills: [
      { name: "Java", level: 95 },
      { name: "Spring", level: 90 },
      { name: "SQL", level: 85 },
    ],
    education: {
      degree: "MS Computer Engineering",
      school: "University of Illinois",
      year: "2019",
    },
    languages: [
      { name: "English", level: "Native" },
      { name: "German", level: "Conversational" },
    ],
    certifications: ["Oracle Certified Professional", "AWS Certified Solutions Architect"],
    workHistory: [
      {
        company: "Software Solutions",
        role: "Senior Backend Developer",
        duration: "2019-2025",
        achievements: [
          "Designed and implemented RESTful APIs",
          "Improved database performance by 35%",
          "Led a team of 4 backend developers",
        ],
      },
    ],
  },
  {
    id: "4",
    name: "Bob Williams",
    email: "bob@example.com",
    phone: "+1 (555) 456-7890",
    location: "Austin, TX",
    avatar: "/placeholder-user.jpg",
    role: "Data Scientist",
    experience: 3,
    status: "pending",
    matchScore: 85,
    appliedDate: "2025-04-22",
    resume: "/resumes/bob-williams.pdf",
    skills: [
      { name: "Python", level: 90 },
      { name: "Machine Learning", level: 85 },
      { name: "Data Analysis", level: 80 },
    ],
    education: {
      degree: "BS Statistics",
      school: "University of Texas",
      year: "2022",
    },
    languages: [
      { name: "English", level: "Native" },
      { name: "French", level: "Basic" },
    ],
    certifications: ["Data Science Professional Certificate", "TensorFlow Developer"],
    workHistory: [
      {
        company: "Analytics Corp",
        role: "Data Scientist",
        duration: "2022-2025",
        achievements: [
          "Developed machine learning models for fraud detection",
          "Improved prediction accuracy by 20%",
          "Presented findings to stakeholders",
        ],
      },
    ],
  },
  {
    id: "5",
    name: "Carol Davis",
    email: "carol@example.com",
    phone: "+1 (555) 567-8901",
    location: "Seattle, WA",
    avatar: "/placeholder-user.jpg",
    role: "Product Manager",
    experience: 7,
    status: "interviewing",
    matchScore: 95,
    appliedDate: "2025-04-25",
    resume: "/resumes/carol-davis.pdf",
    skills: [
      { name: "Product Strategy", level: 95 },
      { name: "Market Analysis", level: 90 },
      { name: "Project Management", level: 85 },
    ],
    education: {
      degree: "MBA",
      school: "University of Washington",
      year: "2018",
    },
    languages: [
      { name: "English", level: "Native" },
      { name: "Japanese", level: "Professional" },
    ],
    certifications: ["Certified Product Manager", "Agile Project Management"],
    workHistory: [
      {
        company: "Innovation Inc",
        role: "Product Manager",
        duration: "2018-2025",
        achievements: [
          "Launched three successful products",
          "Increased user engagement by 40%",
          "Managed cross-functional teams",
        ],
      },
    ],
  },
];

const skillsAnalysisData: SkillsAnalysis[] = [
  { name: "React", required: 95, candidates: 85 },
  { name: "TypeScript", required: 90, candidates: 75 },
  { name: "Node.js", required: 85, candidates: 80 },
  { name: "GraphQL", required: 75, candidates: 60 },
  { name: "AWS", required: 70, candidates: 55 },
];

const filterOptions = [
  {
    id: "status",
    label: "Status",
    options: [
      { value: "pending", label: "Pending Review" },
      { value: "shortlisted", label: "Shortlisted" },
      { value: "rejected", label: "Rejected" },
      { value: "interviewing", label: "Interviewing" },
    ],
  },
  {
    id: "experience",
    label: "Experience",
    options: [
      { value: "0-2", label: "0-2 years" },
      { value: "3-5", label: "3-5 years" },
      { value: "5-8", label: "5-8 years" },
      { value: "8+", label: "8+ years" },
    ],
  },
];

const getStatusColor = (status: Candidate["status"]) => {
  switch (status) {
    case "pending":
      return "bg-yellow-500/20 text-yellow-400";
    case "shortlisted":
      return "bg-green-500/20 text-green-400";
    case "rejected":
      return "bg-red-500/20 text-red-400";
    case "interviewing":
      return "bg-blue-500/20 text-blue-400";
  }
};

const getMatchScoreColor = (score: number) => {
  if (score >= 90) {
    return "linear-gradient(to right, #00ff00, #00cc00)";
  } else if (score >= 80) {
    return "linear-gradient(to right, #0000ff, #0000cc)";
  } else {
    return "linear-gradient(to right, #ffff00, #cccc00)";
  }
};

export default function CandidateScreening() {
  const [selectedTab, setSelectedTab] = useState("all");
  const [showAIEvaluation, setShowAIEvaluation] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState<Candidate | null>(null);
  const { toast } = useToast();

  const [candidates, setCandidates] = useState<Candidate[]>([...mockCandidates].sort((a, b) => b.matchScore - a.matchScore));

  const handleSearch = (query: string, filters: Record<string, string>) => {
    console.log("Search:", query, filters);
  };

  const handleStatusChange = (candidateId: string, newStatus: Candidate["status"]) => {
    setCandidates((prev) =>
      prev.map((c) =>
        c.id === candidateId ? { ...c, status: newStatus } : c
      )
    );
  };

  const handleAIEvaluation = async (candidate: Candidate) => {
    setSelectedCandidate(candidate);
    setShowAIEvaluation(true);
    setIsEvaluating(true);

    await new Promise((resolve) => setTimeout(resolve, 2000));

    setCandidates((prev) =>
      prev.map((c) =>
        c.id === candidate.id
          ? {
              ...c,
              evaluationResults: {
                skillsMatch: Math.round(Math.random() * 30 + 70),
                experienceMatch: Math.round(Math.random() * 30 + 65),
                cultureFit: Math.round(Math.random() * 20 + 75),
                strengths: [
                  "Strong problem-solving skills",
                  "Excellent team collaboration",
                  "Advanced technical expertise",
                ],
                developmentAreas: [
                  "Leadership experience",
                  "Public speaking",
                ],
                diversity: {
                  gender: "Balanced team representation",
                  ethnicity: "Adds to team diversity",
                  veteranStatus: "Protected veteran",
                },
              },
            }
          : c
      )
    );

    setIsEvaluating(false);
  };

  const handlePushToInterview = (candidateId: string) => {
    handleStatusChange(candidateId, "interviewing");
    setSelectedProfile(null);
    toast({
      title: "Interview Scheduled",
      description: "Candidate has been moved to the interview stage.",
      duration: 3000,
      className: "glass-toast",
    });
  };

  const columns = [
    {
      key: "candidate",
      header: "Candidate",
      cell: (row: Candidate) => (
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src={row.avatar} />
            <AvatarFallback>{row.name[0]}</AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium text-white">{row.name}</div>
            <div className="text-sm text-white/70">{row.role}</div>
          </div>
        </div>
      ),
    },
    {
      key: "matchScore",
      header: "Match",
      cell: (row: Candidate) => (
        <div className="w-32">
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm font-medium text-white">{row.matchScore}%</span>
          </div>
          <Progress
            value={row.matchScore}
            className="h-2 rounded-full"
            style={{backgroundColor: getMatchScoreColor(row.matchScore)}}
          />
        </div>
      ),
    },
    {
      key: "skills",
      header: "Skills",
      cell: (row: Candidate) => (
        <div className="flex flex-wrap gap-1">
          {row.skills.map((skill) => (
            <Badge key={skill.name} variant="secondary" className="text-xs">
              {skill.name}
              </Badge>
          ))}
        </div>
      ),
    },
    {
      key: "status",
      header: "Status",
      cell: (row: Candidate) => (
        <Badge variant="outline" className={getStatusColor(row.status)}>
          {row.status.charAt(0).toUpperCase() + row.status.slice(1)}
        </Badge>
      ),
    },
    {
      key: "appliedDate",
      header: "Applied",
      cell: (row: Candidate) => (
        <div className="flex items-center text-sm text-white/70">
          <Calendar className="w-4 h-4 mr-2" />
          {new Date(row.appliedDate).toLocaleDateString()}
        </div>
      ),
    },
    {
      key: "actions",
      header: "",
      cell: (row: Candidate) => (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setSelectedProfile(row)}
          className="text-blue-500 hover:text-blue-600"
        >
          View Profile
        </Button>
      ),
    },
  ];

  const actions = [
    {
      label: "View Resume",
      icon: FileText,
      onClick: (candidate: Candidate) => {
        window.open(candidate.resume, "_blank");
      },
    },
    {
      label: "Send Email",
      icon: Mail,
      onClick: (candidate: Candidate) => {
        window.location.href = `mailto:${candidate.email}`;
      },
    },
    {
      label: "Shortlist",
      icon: Star,
      onClick: (candidate: Candidate) => {
        handleStatusChange(candidate.id, "shortlisted");
      },
    },
    {
      label: "Schedule Interview",
      icon: Calendar,
      onClick: (candidate: Candidate) => {
        // Handle interview scheduling
      },
    },
    {
      label: "AI Evaluation",
      icon: Brain,
      onClick: handleAIEvaluation,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-card/50 backdrop-blur-xl border-white/10">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-blue-500/10">
                <Clock className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <div className="text-sm text-white/70">Pending Review</div>
                <div className="text-2xl font-semibold text-white">
                  {candidates.filter((c) => c.status === "pending").length}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur-xl border-white/10">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-yellow-500/10">
                <Star className="w-6 h-6 text-yellow-400" />
              </div>
              <div>
                <div className="text-sm text-white/70">Shortlisted</div>
                <div className="text-2xl font-semibold text-white">
                  {candidates.filter((c) => c.status === "shortlisted").length}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur-xl border-white/10">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-green-500/10">
                <UserCheck className="w-6 h-6 text-green-400" />
              </div>
              <div>
                <div className="text-sm text-white/70">Interviewing</div>
                <div className="text-2xl font-semibold text-white">
                  {candidates.filter((c) => c.status === "interviewing").length}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur-xl border-white/10">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-red-500/10">
                <XCircle className="w-6 h-6 text-red-400" />
              </div>
              <div>
                <div className="text-sm text-white/70">Rejected</div>
                <div className="text-2xl font-semibold text-white">
                  {candidates.filter((c) => c.status === "rejected").length}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <Card className="bg-card/50 backdrop-blur-xl border-white/10">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Candidate Screening</CardTitle>
              <CardDescription>
                Review and manage job applications
              </CardDescription>
            </div>
            <Button>
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <SearchBar
              placeholder="Search candidates..."
              filters={filterOptions}
              onSearch={handleSearch}
            />

            <Tabs value={selectedTab} onValueChange={setSelectedTab}>
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="pending">Pending</TabsTrigger>
                <TabsTrigger value="shortlisted">Shortlisted</TabsTrigger>
                <TabsTrigger value="interviewing">Interviewing</TabsTrigger>
                <TabsTrigger value="rejected">Rejected</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="mt-4">
                <DataTable
                  data={candidates}
                  columns={columns}
                  actions={actions}
                  pageSize={8}
                />
              </TabsContent>

              <TabsContent value="pending" className="mt-4">
                <DataTable
                  data={candidates.filter((c) => c.status === "pending")}
                  columns={columns}
                  actions={actions}
                  pageSize={8}
                />
              </TabsContent>

              {/* Add similar TabsContent for other statuses */}
            </Tabs>
          </div>
        </CardContent>
      </Card>

      <Dialog open={showAIEvaluation} onOpenChange={setShowAIEvaluation}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>AI Evaluation Results</DialogTitle>
            <DialogDescription>
              Comprehensive analysis of candidate profile and fit
            </DialogDescription>
          </DialogHeader>

          {isEvaluating ? (
            <div className="flex flex-col items-center justify-center py-8">
              <Brain className="w-12 h-12 text-purple-500 animate-pulse mb-4" />
              <p className="text-lg font-medium">Analyzing candidate profile...</p>
            </div>
          ) : (
            selectedCandidate?.evaluationResults && (
              <ScrollArea className="max-h-[600px]">
                <div className="space-y-6 p-4">
                  {/* Match Scores */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Target className="w-4 h-4 text-blue-500" />
                        <span className="text-sm font-medium">Skills Match</span>
                      </div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-2xl font-bold">{selectedCandidate.evaluationResults.skillsMatch}%</span>
                      </div>
                      <Progress value={selectedCandidate.evaluationResults.skillsMatch} />
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Book className="w-4 h-4 text-green-500" />
                        <span className="text-sm font-medium">Experience Match</span>
                      </div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-2xl font-bold">{selectedCandidate.evaluationResults.experienceMatch}%</span>
                      </div>
                      <Progress value={selectedCandidate.evaluationResults.experienceMatch} />
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-purple-500" />
                        <span className="text-sm font-medium">Culture Fit</span>
                      </div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-2xl font-bold">{selectedCandidate.evaluationResults.cultureFit}%</span>
                      </div>
                      <Progress value={selectedCandidate.evaluationResults.cultureFit} />
                    </div>
                  </div>

                  {/* Strengths & Development Areas */}
                  <div className="grid grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">Key Strengths</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {selectedCandidate.evaluationResults.strengths.map((strength, i) => (
                            <li key={i} className="flex items-center gap-2">
                              <CheckCircle className="w-4 h-4 text-green-500" />
                              <span>{strength}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">Development Areas</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {selectedCandidate.evaluationResults.developmentAreas.map((area, i) => (
                            <li key={i} className="flex items-center gap-2">
                              <TrendingUp className="w-4 h-4 text-blue-500" />
                              <span>{area}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Diversity Analysis */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Diversity Analysis</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="space-y-1">
                          <Label>Gender Distribution</Label>
                          <p className="text-sm">{selectedCandidate.evaluationResults.diversity.gender}</p>
                        </div>
                        <div className="space-y-1">
                          <Label>Ethnic Diversity</Label>
                          <p className="text-sm">{selectedCandidate.evaluationResults.diversity.ethnicity}</p>
                        </div>
                        <div className="space-y-1">
                          <Label>Veteran Status</Label>
                          <p className="text-sm">{selectedCandidate.evaluationResults.diversity.veteranStatus}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Skills Analysis Chart */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Skills Analysis</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={skillsAnalysisData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="required" name="Required Level" fill="#4f46e5" />
                            <Bar dataKey="candidates" name="Candidate Level" fill="#a855f7" />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </ScrollArea>
            )
          )}
        </DialogContent>
      </Dialog>

      <CandidateProfileDrawer
        isOpen={!!selectedProfile}
        onClose={() => setSelectedProfile(null)}
        candidate={selectedProfile!}
        onPushToInterview={handlePushToInterview}
      />
    </div>
  );
}
