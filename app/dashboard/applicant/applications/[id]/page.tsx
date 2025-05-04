"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import DashboardLayout from "@/components/dashboard-layout"
import {
  Building2,
  MapPin,
  Briefcase,
  Clock,
  Calendar,
  DollarSign,
  Users,
  MessageSquare,
  FileText,
  VideoIcon,
  History,
  ArrowLeft,
  Loader2,
} from "lucide-react"
import { supabase } from "@/lib/supabase/client"

interface Application {
  id: string
  job_id: string
  status: string
  cover_letter: string
  video_url?: string
  ai_score?: number
  ai_feedback?: {
    strengths: string[]
    improvements: string[]
    next_steps: string[]
  }
  created_at: string
  updated_at: string
  job: {
    title: string
    description: string
    location: string
    remote_policy: string
    job_type: string
    experience_level: string
    salary_range: {
      min: number
      max: number
      currency: string
    }
    company: {
      name: string
      logo_url?: string
      industry: string
    }
  }
  interviews: {
    id: string
    scheduled_time: string
    duration: number
    status: string
  }[]
  status_history: {
    status: string
    notes?: string
    created_at: string
  }[]
}

const statusColors = {
  "pending": "bg-yellow-500/20 text-yellow-500",
  "in_review": "bg-blue-500/20 text-blue-500",
  "interview_scheduled": "bg-green-500/20 text-green-500",
  "rejected": "bg-red-500/20 text-red-500",
  "accepted": "bg-purple-500/20 text-purple-500"
}

const statusLabels = {
  "pending": "Pending",
  "in_review": "In Review",
  "interview_scheduled": "Interview Scheduled",
  "rejected": "Rejected",
  "accepted": "Accepted"
}

export default function ApplicationDetailsPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(true)
  const [application, setApplication] = useState<Application | null>(null)

  useEffect(() => {
    loadApplicationDetails()
  }, [params.id])

  const loadApplicationDetails = async () => {
    try {
      setIsLoading(true)
      
      const { data: applicationData, error: applicationError } = await supabase
        .from("applications")
        .select(`
          *,
          job:jobs (
            title,
            description,
            location,
            remote_policy,
            job_type,
            experience_level,
            salary_range,
            company:companies (
              name,
              logo_url,
              industry
            )
          ),
          interviews (
            id,
            scheduled_time,
            duration,
            status
          ),
          status_history (
            status,
            notes,
            created_at
          )
        `)
        .eq("id", params.id)
        .single()

      if (applicationError) throw applicationError

      setApplication(applicationData)
    } catch (error: any) {
      toast({
        title: "Error loading application details",
        description: error.message,
        variant: "destructive"
      })
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading || !application) {
    return (
      <DashboardLayout userType="applicant">
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-white/70">Loading application details...</div>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout userType="applicant">
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            className="text-white/70 hover:text-white hover:bg-white/10"
            onClick={() => router.back()}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Applications
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="card-gradient border-0 text-white">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                  <div className="flex gap-4">
                    <div className="bg-white/10 h-16 w-16 rounded-md flex items-center justify-center text-2xl font-bold">
                      {application.job.company.name.charAt(0)}
                    </div>
                    <div>
                      <h1 className="text-2xl font-bold">{application.job.title}</h1>
                      <div className="flex items-center gap-2 text-white/70 text-sm mt-2">
                        <Building2 className="w-4 h-4" />
                        <span>{application.job.company.name}</span>
                        <span>•</span>
                        <MapPin className="w-4 h-4" />
                        <span>{application.job.location}</span>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-3">
                        <Badge variant="outline" className="border-white/20 text-white">
                          <Briefcase className="w-3 h-3 mr-1" />
                          {application.job.job_type}
                        </Badge>
                        <Badge variant="outline" className="border-white/20 text-white">
                          <Clock className="w-3 h-3 mr-1" />
                          {application.job.remote_policy}
                        </Badge>
                        <Badge variant="outline" className="border-white/20 text-white">
                          <DollarSign className="w-3 h-3 mr-1" />
                          {application.job.salary_range.min.toLocaleString()} - {application.job.salary_range.max.toLocaleString()}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-3">
                    <Badge className={statusColors[application.status as keyof typeof statusColors]}>
                      {statusLabels[application.status as keyof typeof statusLabels]}
                    </Badge>
                    {application.ai_score && (
                      <div className="flex flex-col items-end gap-1">
                        <div className="text-sm text-white/70">AI Match Score</div>
                        <Progress value={application.ai_score} className="w-32 h-2" />
                        <div className="text-sm font-medium">{application.ai_score}%</div>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Tabs defaultValue="overview" className="space-y-6">
              <TabsList className="bg-white/5 p-1">
                <TabsTrigger value="overview" className="data-[state=active]:bg-white/10">
                  Overview
                </TabsTrigger>
                <TabsTrigger value="documents" className="data-[state=active]:bg-white/10">
                  Documents
                </TabsTrigger>
                <TabsTrigger value="feedback" className="data-[state=active]:bg-white/10">
                  AI Feedback
                </TabsTrigger>
              </TabsList>

              <TabsContent value="overview">
                <div className="space-y-6">
                  <Card className="card-gradient border-0 text-white">
                    <CardHeader>
                      <CardTitle>Application Timeline</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {application.status_history.map((event, index) => (
                        <div key={index} className="flex gap-4">
                          <div className="flex-none">
                            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                              <History className="w-4 h-4" />
                            </div>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <Badge className={statusColors[event.status as keyof typeof statusColors]}>
                                {statusLabels[event.status as keyof typeof statusLabels]}
                              </Badge>
                              <span className="text-sm text-white/70">
                                {new Date(event.created_at).toLocaleDateString()}
                              </span>
                            </div>
                            {event.notes && (
                              <p className="mt-2 text-sm text-white/80">{event.notes}</p>
                            )}
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  {application.interviews.length > 0 && (
                    <Card className="card-gradient border-0 text-white">
                      <CardHeader>
                        <CardTitle>Interviews</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {application.interviews.map((interview) => (
                          <div key={interview.id} className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                            <div className="flex items-center gap-4">
                              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                                <Users className="w-5 h-5" />
                              </div>
                              <div>
                                <div className="font-medium">{new Date(interview.scheduled_time).toLocaleString()}</div>
                                <div className="text-sm text-white/70">{interview.duration} minutes</div>
                              </div>
                            </div>
                            <Badge className={`bg-${interview.status === 'completed' ? 'green' : 'blue'}-500/20 text-${interview.status === 'completed' ? 'green' : 'blue'}-500`}>
                              {interview.status === 'completed' ? 'Completed' : 'Scheduled'}
                            </Badge>
                          </div>
                        ))}
                      </CardContent>
                    </Card>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="documents">
                <Card className="card-gradient border-0 text-white">
                  <CardHeader>
                    <CardTitle>Application Documents</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-3 flex items-center gap-2">
                        <FileText className="w-5 h-5" />
                        Cover Letter
                      </h3>
                      <div className="p-4 bg-white/5 rounded-lg">
                        <p className="whitespace-pre-wrap text-white/80">{application.cover_letter}</p>
                      </div>
                    </div>

                    {application.video_url && (
                      <div>
                        <h3 className="text-lg font-medium mb-3 flex items-center gap-2">
                          <VideoIcon className="w-5 h-5" />
                          Video Introduction
                        </h3>
                        <div className="aspect-video rounded-lg overflow-hidden bg-white/5">
                          <video
                            src={application.video_url}
                            controls
                            className="w-full h-full"
                          />
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="feedback">
                <Card className="card-gradient border-0 text-white">
                  <CardHeader>
                    <CardTitle>AI Application Feedback</CardTitle>
                    <CardDescription className="text-white/70">
                      AI-powered analysis of your application and suggestions for improvement
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {application.ai_feedback ? (
                      <>
                        <div>
                          <h3 className="text-lg font-medium mb-3">Strengths</h3>
                          <ul className="space-y-2">
                            {application.ai_feedback.strengths.map((strength, index) => (
                              <li key={index} className="flex items-start gap-2 text-white/80">
                                <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center flex-none mt-0.5">
                                  <Users className="w-3 h-3 text-green-500" />
                                </div>
                                {strength}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h3 className="text-lg font-medium mb-3">Areas for Improvement</h3>
                          <ul className="space-y-2">
                            {application.ai_feedback.improvements.map((improvement, index) => (
                              <li key={index} className="flex items-start gap-2 text-white/80">
                                <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center flex-none mt-0.5">
                                  <MessageSquare className="w-3 h-3 text-blue-500" />
                                </div>
                                {improvement}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h3 className="text-lg font-medium mb-3">Recommended Next Steps</h3>
                          <ul className="space-y-2">
                            {application.ai_feedback.next_steps.map((step, index) => (
                              <li key={index} className="flex items-start gap-2 text-white/80">
                                <div className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center flex-none mt-0.5">
                                  <ArrowLeft className="w-3 h-3 text-purple-500" />
                                </div>
                                {step}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </>
                    ) : (
                      <div className="text-center py-8 text-white/70">
                        AI feedback is still being generated for this application
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="card-gradient border-0 text-white">
              <CardHeader>
                <CardTitle>Application Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="bg-white/10 h-12 w-12 rounded-full flex items-center justify-center">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-sm text-white/70">Current Status</div>
                    <Badge className={statusColors[application.status as keyof typeof statusColors]}>
                      {statusLabels[application.status as keyof typeof statusLabels]}
                    </Badge>
                  </div>
                </div>

                <div>
                  <div className="text-sm text-white/70 mb-2">Application Timeline</div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-white/70">Submitted</span>
                      <span>{new Date(application.created_at).toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-white/70">Last Updated</span>
                      <span>{new Date(application.updated_at).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="card-gradient border-0 text-white">
              <CardHeader>
                <CardTitle>About the Company</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="bg-white/10 h-12 w-12 rounded-md flex items-center justify-center text-lg font-bold">
                    {application.job.company.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-medium">{application.job.company.name}</h3>
                    <p className="text-sm text-white/70">{application.job.company.industry}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}