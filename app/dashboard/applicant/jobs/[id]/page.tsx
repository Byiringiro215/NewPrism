"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
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
  GraduationCap,
  ListChecks,
  Gift,
  Send,
  ArrowLeft,
  Loader2,
} from "lucide-react"
import { supabase } from "@/lib/supabase/client"

interface Job {
  id: string
  title: string
  description: string
  location: string
  remote_policy: string
  job_type: string
  experience_level: string
  deadline?: string
  status: string
  created_at: string
  updated_at: string
}

interface JobDetails extends Job {
  company: {
    name: string
    logo_url?: string
    industry: string
    website?: string
    description?: string
  }
  requirements: {
    skills: string[]
    experience?: string
    education?: string
    additional?: string[]
  }
  benefits: {
    salary_range: {
      min: number
      max: number
      currency: string
    }
    perks: string[]
  }
  hirer: {
    position: string
    user: {
      first_name: string
      last_name: string
    }
  }
}

export default function JobDetailsPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(true)
  const [isApplying, setIsApplying] = useState(false)
  const [showApplyDialog, setShowApplyDialog] = useState(false)
  const [coverLetter, setCoverLetter] = useState("")
  const [job, setJob] = useState<JobDetails | null>(null)
  const [matchScore, setMatchScore] = useState<number>(0)

  useEffect(() => {
    loadJobDetails()
  }, [params.id])

  const loadJobDetails = async () => {
    try {
      setIsLoading(true)
      
      // Get current user's skills for matching
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error("Not authenticated")

      const { data: applicantData, error: applicantError } = await supabase
        .from("applicants")
        .select("skills")
        .eq("user_id", user.id)
        .single()

      if (applicantError) throw applicantError

      // Get job details
      const { data: jobData, error: jobError } = await supabase
        .from("jobs")
        .select(`
          *,
          companies (
            name,
            logo_url,
            industry,
            location,
            website,
            description
          ),
          hirers (
            position,
            users (
              first_name,
              last_name
            )
          )
        `)
        .eq("id", params.id)
        .single()

      if (jobError) throw jobError

      setJob(jobData as JobDetails)

      // Calculate match score
      if (applicantData.skills && jobData.requirements.skills) {
        const applicantSkills = new Set(applicantData.skills.map((s: { name: string }) => s.name.toLowerCase()))
        const jobSkills = new Set(jobData.requirements.skills.map((s: string) => s.toLowerCase()))

        if (applicantSkills.size > 0 && jobSkills.size > 0) {
          const matchingSkills = [...jobSkills].filter(skill => applicantSkills.has(skill))
          setMatchScore(Math.round((matchingSkills.length / jobSkills.size) * 100))
        }
      }
    } catch (error: any) {
      toast({
        title: "Error loading job details",
        description: error.message,
        variant: "destructive"
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleApply = async () => {
    try {
      setIsApplying(true)

      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error("Not authenticated")

      // Get applicant profile
      const { data: applicantData, error: applicantError } = await supabase
        .from("applicants")
        .select("id")
        .eq("user_id", user.id)
        .single()

      if (applicantError) throw applicantError

      // Create application
      const { error: applicationError } = await supabase
        .from("applications")
        .insert({
          job_id: params.id,
          applicant_id: applicantData.id,
          cover_letter: coverLetter,
          status: "pending",
          match_score: matchScore
        })

      if (applicationError) throw applicationError

      toast({
        title: "Application submitted",
        description: "Your application has been submitted successfully.",
      })

      setShowApplyDialog(false)
      router.push("/dashboard/applicant/applications")
    } catch (error: any) {
      toast({
        title: "Error submitting application",
        description: error.message,
        variant: "destructive"
      })
    } finally {
      setIsApplying(false)
    }
  }

  if (isLoading || !job) {
    return (
      <DashboardLayout userType="applicant">
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-white/70">Loading job details...</div>
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
            Back to Jobs
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
                      {job.company.name.charAt(0)}
                    </div>
                    <div>
                      <h1 className="text-2xl font-bold">{job.title}</h1>
                      <div className="flex items-center gap-2 text-white/70 text-sm mt-2">
                        <Building2 className="w-4 h-4" />
                        <span>{job.company.name}</span>
                        <span>•</span>
                        <MapPin className="w-4 h-4" />
                        <span>{job.location}</span>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-3">
                        <Badge variant="outline" className="border-white/20 text-white">
                          <Briefcase className="w-3 h-3 mr-1" />
                          {job.job_type}
                        </Badge>
                        <Badge variant="outline" className="border-white/20 text-white">
                          <Clock className="w-3 h-3 mr-1" />
                          {job.remote_policy}
                        </Badge>
                        <Badge variant="outline" className="border-white/20 text-white">
                          <DollarSign className="w-3 h-3 mr-1" />
                          {job.benefits.salary_range.min.toLocaleString()} - {job.benefits.salary_range.max.toLocaleString()}
                        </Badge>
                        {job.deadline && (
                          <Badge variant="outline" className="border-white/20 text-white">
                            <Calendar className="w-3 h-3 mr-1" />
                            Closes {new Date(job.deadline).toLocaleDateString()}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-3">
                    <Badge
                      className={matchScore >= 80 ? "bg-green-500" : 
                        matchScore >= 60 ? "bg-yellow-500" : "bg-white/20"}
                    >
                      {matchScore}% Match
                    </Badge>
                    <Button
                      className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
                      onClick={() => setShowApplyDialog(true)}
                    >
                      <Send className="w-4 h-4 mr-2" />
                      Apply Now
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Tabs defaultValue="description" className="space-y-6">
              <TabsList className="bg-white/5 p-1">
                <TabsTrigger value="description" className="data-[state=active]:bg-white/10">
                  Description
                </TabsTrigger>
                <TabsTrigger value="requirements" className="data-[state=active]:bg-white/10">
                  Requirements
                </TabsTrigger>
                <TabsTrigger value="benefits" className="data-[state=active]:bg-white/10">
                  Benefits
                </TabsTrigger>
              </TabsList>

              <TabsContent value="description">
                <Card className="card-gradient border-0 text-white">
                  <CardHeader>
                    <CardTitle>Job Description</CardTitle>
                  </CardHeader>
                  <CardContent className="prose prose-invert">
                    <div dangerouslySetInnerHTML={{ __html: job.description }} />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="requirements">
                <Card className="card-gradient border-0 text-white">
                  <CardHeader>
                    <CardTitle>Requirements</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-3 flex items-center gap-2">
                        <Users className="w-5 h-5" />
                        Experience
                      </h3>
                      <p className="text-white/80">{job.requirements.experience}</p>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium mb-3 flex items-center gap-2">
                        <GraduationCap className="w-5 h-5" />
                        Education
                      </h3>
                      <p className="text-white/80">{job.requirements.education}</p>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium mb-3 flex items-center gap-2">
                        <ListChecks className="w-5 h-5" />
                        Required Skills
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {job.requirements.skills.map((skill, index) => (
                          <Badge key={index} variant="outline" className="border-white/20 text-white py-1.5 px-3">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {job.requirements.additional && (
                      <div>
                        <h3 className="text-lg font-medium mb-3">Additional Requirements</h3>
                        <ul className="list-disc list-inside text-white/80 space-y-2">
                          {job.requirements.additional.map((req, index) => (
                            <li key={index}>{req}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="benefits">
                <Card className="card-gradient border-0 text-white">
                  <CardHeader>
                    <CardTitle>Benefits & Perks</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div>
                      <h3 className="text-lg font-medium mb-3 flex items-center gap-2">
                        <Gift className="w-5 h-5" />
                        What We Offer
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {job.benefits.perks.map((perk, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <Badge variant="outline" className="border-white/20 text-white">
                              {perk}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="card-gradient border-0 text-white">
              <CardHeader>
                <CardTitle>About the Company</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="bg-white/10 h-12 w-12 rounded-md flex items-center justify-center text-lg font-bold">
                    {job.company.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-medium">{job.company.name}</h3>
                    <p className="text-sm text-white/70">{job.company.industry}</p>
                  </div>
                </div>
                {job.company.description && (
                  <p className="text-white/80 text-sm">{job.company.description}</p>
                )}
                {job.company.website && (
                  <Button
                    variant="outline"
                    className="w-full border-white/20 text-white hover:bg-white/10"
                    onClick={() => window.open(job.company.website, "_blank")}
                  >
                    Visit Website
                  </Button>
                )}
              </CardContent>
            </Card>

            <Card className="card-gradient border-0 text-white">
              <CardHeader>
                <CardTitle>Hiring Manager</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="bg-white/10 h-12 w-12 rounded-full flex items-center justify-center text-lg font-bold">
                    {job.hirer.user.first_name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-medium">
                      {job.hirer.user.first_name} {job.hirer.user.last_name}
                    </h3>
                    <p className="text-sm text-white/70">{job.hirer.position}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Dialog open={showApplyDialog} onOpenChange={setShowApplyDialog}>
        <DialogContent className="max-w-2xl bg-white/10 backdrop-blur-sm text-white border-white/20">
          <DialogHeader>
            <DialogTitle>Apply for {job.title}</DialogTitle>
            <DialogDescription className="text-white/70">
              Submit your application for {job.title} at {job.company.name}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Cover Letter</label>
              <Textarea
                value={coverLetter}
                onChange={(e) => setCoverLetter(e.target.value)}
                className="min-h-[200px] bg-white/5 border-white/20 text-white"
                placeholder="Tell us why you're interested in this role and what makes you a great fit..."
              />
            </div>
          </div>
          <div className="flex justify-end gap-4 mt-6">
            <Button
              variant="outline"
              onClick={() => setShowApplyDialog(false)}
              className="border-white/20 text-white hover:bg-white/10"
            >
              Cancel
            </Button>
            <Button
              onClick={handleApply}
              disabled={isApplying || !coverLetter.trim()}
              className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
            >
              {isApplying ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Submit Application
                </>
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  )
}