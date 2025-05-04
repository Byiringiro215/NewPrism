"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/components/ui/use-toast"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import DashboardLayout from "@/components/dashboard-layout"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Textarea } from "@/components/ui/textarea"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
  import { Loader2, Send, Paperclip, Sparkles, Check } from "lucide-react"
import {
  Building2,
  Filter,
  MapPin,
  Search,
  Briefcase,
  Clock,
  Calendar,
  DollarSign,
  ArrowUpRight,
} from "lucide-react"

interface Job {
  id: string
  title: string
  company: {
    name: string
    logo_url?: string
    industry: string
    location: string
  }
  location: string
  remote_policy: string
  job_type: string
  experience_level: string
  salary_range: {
    min: number
    max: number
    currency: string
  }
  requirements: {
    skills: string[]
    experience?: string
    education?: string
  }
  deadline?: string
  posted_at: string
  match_score?: number
  description: string
  benefits?: {
    items: string[]
  }
}

// Mock data
const MOCK_JOBS: Job[] = [
  {
    id: "1",
    title: "Senior Software Engineer",
    company: {
      name: "Google",
      logo_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/2008px-Google_%22G%22_Logo.svg.png",
      industry: "Technology",
      location: "Mountain View, CA"
    },
    description: "Join our team to work on cutting-edge technology solutions that impact billions of users.",
    location: "Mountain View, CA",
    remote_policy: "Hybrid",
    job_type: "Full-time",
    experience_level: "Senior",
    salary_range: {
      min: 180000,
      max: 280000,
      currency: "USD"
    },
    requirements: {
      skills: ["Java", "Python", "Distributed Systems", "Algorithm Design"],
      experience: "5+ years",
      education: "BS/MS in Computer Science or related field"
    },
    deadline: "2025-07-01",
    posted_at: "2025-05-01",
    match_score: 92,
    benefits: {
      items: [
        "Competitive salary",
        "Stock options",
        "Health insurance",
        "Flexible work hours",
        "Professional development budget"
      ]
    }
  },
  {
    id: "2",
    title: "Cloud Solutions Architect",
    company: {
      name: "Microsoft",
      logo_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/2048px-Microsoft_logo.svg.png",
      industry: "Technology",
      location: "Redmond, WA"
    },
    description: "Design and implement Azure cloud solutions for enterprise customers.",
    location: "Redmond, WA",
    remote_policy: "Remote",
    job_type: "Full-time",
    experience_level: "Senior",
    salary_range: {
      min: 160000,
      max: 250000,
      currency: "USD"
    },
    requirements: {
      skills: ["Azure", "Cloud Architecture", "DevOps", "Solution Design"],
      experience: "7+ years",
      education: "BS/MS in Computer Science or equivalent"
    },
    deadline: "2025-06-15",
    posted_at: "2025-05-02",
    match_score: 85,
    benefits: {
      items: [
        "Comprehensive benefits",
        "401(k) matching",
        "Remote work",
        "Annual bonus"
      ]
    }
  },
  {
    id: "3",
    title: "Machine Learning Engineer",
    company: {
      name: "Meta",
      logo_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Meta_Platforms_Inc._logo.svg/2560px-Meta_Platforms_Inc._logo.svg.png",
      industry: "Technology",
      location: "Menlo Park, CA"
    },
    description: "Work on AI/ML solutions for Meta's family of apps.",
    location: "Menlo Park, CA",
    remote_policy: "Hybrid",
    job_type: "Full-time",
    experience_level: "Senior",
    salary_range: {
      min: 170000,
      max: 260000,
      currency: "USD"
    },
    requirements: {
      skills: ["Python", "PyTorch", "Deep Learning", "Machine Learning"],
      experience: "4+ years",
      education: "MS/PhD in Computer Science, Machine Learning, or related field"
    },
    deadline: "2025-07-15",
    posted_at: "2025-05-03",
    match_score: 88,
    benefits: {
      items: [
        "Competitive compensation",
        "Health coverage",
        "Unlimited PTO",
        "Wellness programs"
      ]
    }
  },
  {
    id: "4",
    title: "iOS Developer",
    company: {
      name: "Apple",
      logo_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/1667px-Apple_logo_black.svg.png",
      industry: "Technology",
      location: "Cupertino, CA"
    },
    description: "Create innovative mobile applications for Apple's ecosystem.",
    location: "Cupertino, CA",
    remote_policy: "On-site",
    job_type: "Full-time",
    experience_level: "Mid",
    salary_range: {
      min: 140000,
      max: 220000,
      currency: "USD"
    },
    requirements: {
      skills: ["Swift", "iOS SDK", "UIKit", "SwiftUI"],
      experience: "3+ years",
      education: "Bachelor's degree in Computer Science or related field"
    },
    deadline: "2025-06-30",
    posted_at: "2025-05-01",
    match_score: 75,
    benefits: {
      items: [
        "Medical and dental coverage",
        "Stock purchase program",
        "Fitness center access",
        "Product discounts"
      ]
    }
  },
  {
    id: "5",
    title: "Full Stack Developer",
    company: {
      name: "Netflix",
      logo_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png",
      industry: "Entertainment/Technology",
      location: "Los Gatos, CA"
    },
    description: "Develop features for Netflix's streaming platform.",
    location: "Los Gatos, CA",
    remote_policy: "Remote",
    job_type: "Full-time",
    experience_level: "Senior",
    salary_range: {
      min: 180000,
      max: 300000,
      currency: "USD"
    },
    requirements: {
      skills: ["JavaScript", "React", "Node.js", "Java"],
      experience: "5+ years",
      education: "BS in Computer Science or equivalent"
    },
    deadline: "2025-07-30",
    posted_at: "2025-05-02",
    match_score: 82,
    benefits: {
      items: [
        "Unlimited vacation",
        "Stock options",
        "Premium healthcare",
        "Home office setup"
      ]
    }
  },
  {
    id: "6",
    title: "Frontend Developer",
    company: {
      name: "Adobe",
      logo_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Adobe_Corporate_Logo.png/1280px-Adobe_Corporate_Logo.png",
      industry: "Technology",
      location: "San Jose, CA"
    },
    description: "Build exceptional user experiences for Creative Cloud products.",
    location: "San Jose, CA",
    remote_policy: "Hybrid",
    job_type: "Full-time",
    experience_level: "Mid",
    salary_range: {
      min: 130000,
      max: 200000,
      currency: "USD"
    },
    requirements: {
      skills: ["JavaScript", "React", "TypeScript", "HTML/CSS"],
      experience: "3+ years",
      education: "Bachelor's degree in Computer Science or related field"
    },
    deadline: "2025-06-30",
    posted_at: "2025-05-03",
    match_score: 95,
    benefits: {
      items: [
        "Creative Cloud subscription",
        "Health coverage",
        "401(k) matching",
        "Flexible schedule"
      ]
    }
  },
  {
    id: "7",
    title: "Software Development Engineer II",
    company: {
      name: "Amazon",
      logo_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/2560px-Amazon_logo.svg.png",
      industry: "Technology/Retail",
      location: "Seattle, WA"
    },
    description: "Build scalable systems for Amazon's e-commerce platform.",
    location: "Seattle, WA",
    remote_policy: "Hybrid",
    job_type: "Full-time",
    experience_level: "Mid",
    salary_range: {
      min: 150000,
      max: 230000,
      currency: "USD"
    },
    requirements: {
      skills: ["Java", "AWS", "Microservices", "Distributed Systems"],
      experience: "3+ years",
      education: "Bachelor's degree in Computer Science"
    },
    deadline: "2025-06-30",
    posted_at: "2025-05-01",
    match_score: 78,
    benefits: {
      items: [
        "Sign-on bonus",
        "RSU grants",
        "Health benefits",
        "401(k) with match"
      ]
    }
  },
  {
    id: "8",
    title: "Blockchain Developer",
    company: {
      name: "JPMorgan Chase",
      logo_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/JPMorgan_Chase_Logo_2008_1.svg/2560px-JPMorgan_Chase_Logo_2008_1.svg.png",
      industry: "Financial Services",
      location: "New York, NY"
    },
    description: "Develop blockchain solutions for financial services.",
    location: "New York, NY",
    remote_policy: "Hybrid",
    job_type: "Full-time",
    experience_level: "Mid",
    salary_range: {
      min: 140000,
      max: 200000,
      currency: "USD"
    },
    requirements: {
      skills: ["Solidity", "Ethereum", "Smart Contracts", "Web3.js"],
      experience: "3+ years",
      education: "Bachelor's degree in Computer Science"
    },
    deadline: "2025-07-01",
    posted_at: "2025-05-02",
    match_score: 68,
    benefits: {
      items: [
        "Competitive salary",
        "Annual bonus",
        "Health benefits",
        "Retirement plans"
      ]
    }
  },
  {
    id: "9",
    title: "Data Scientist",
    company: {
      name: "Tesla",
      logo_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Tesla_Motors.svg/1200px-Tesla_Motors.svg.png",
      industry: "Automotive/Technology",
      location: "Austin, TX"
    },
    description: "Work on machine learning solutions for autonomous vehicles.",
    location: "Austin, TX",
    remote_policy: "On-site",
    job_type: "Full-time",
    experience_level: "Senior",
    salary_range: {
      min: 160000,
      max: 250000,
      currency: "USD"
    },
    requirements: {
      skills: ["Python", "Machine Learning", "Computer Vision", "Deep Learning"],
      experience: "5+ years",
      education: "MS/PhD in Computer Science or related field"
    },
    deadline: "2025-07-15",
    posted_at: "2025-05-03",
    match_score: 85,
    benefits: {
      items: [
        "Health insurance",
        "Stock purchase plan",
        "Electric vehicle discount",
        "Onsite gym"
      ]
    }
  }
]

// Application form schema
const applicationSchema = z.object({
  coverLetter: z.string().min(100, "Cover letter must be at least 100 characters"),
  resume: z.any().optional()
})

type FormValues = z.infer<typeof applicationSchema>

export default function JobsPage() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(true)
  const [jobs, setJobs] = useState<Job[]>([])
  const [selectedJob, setSelectedJob] = useState<Job | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showApplicationForm, setShowApplicationForm] = useState(false)
  const [isGeneratingCoverLetter, setIsGeneratingCoverLetter] = useState(false)
  const [generatedText, setGeneratedText] = useState("")
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [filters, setFilters] = useState({
    search: "",
    jobType: "",
    experienceLevel: "",
    remotePolicy: "",
    location: "",
    minSalary: 0,
    maxDistance: 50,
    showMatchingOnly: true,
  })

  // Initialize form
  const form = useForm<FormValues>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      coverLetter: "",
    },
  })

  // Simulated AI cover letter generation
  const generateCoverLetter = async () => {
    setIsGeneratingCoverLetter(true)
    const mockCoverLetter = `Dear Hiring Manager,

I am writing to express my strong interest in the ${selectedJob?.title} position at ${selectedJob?.company.name}. With my background in ${selectedJob?.requirements.skills.slice(0, 3).join(", ")}, I believe I would be an excellent addition to your team.

My technical expertise aligns perfectly with your requirements, and I am particularly excited about the opportunity to contribute to ${selectedJob?.company.name}'s innovative work in ${selectedJob?.company.industry}.

I am impressed by ${selectedJob?.company.name}'s commitment to excellence and its position as a leader in the industry. The prospect of working on challenging projects while contributing to your company's continued success is truly exciting.

Thank you for considering my application. I look forward to discussing how I can contribute to ${selectedJob?.company.name}'s continued success.

Best regards,
[Your name]`

    // Simulate word-by-word generation
    setGeneratedText("")
    const words = mockCoverLetter.split(" ")
    for (let i = 0; i < words.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 50)) // 50ms delay between words
      setGeneratedText(prev => prev + (i === 0 ? "" : " ") + words[i])
    }
    
    form.setValue("coverLetter", mockCoverLetter)
    setIsGeneratingCoverLetter(false)
  }

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0])
    }
  }

  // Handle application submission
  const onSubmit = async (data: z.infer<typeof applicationSchema>) => {
    if (!selectedJob) return
    
    setIsSubmitting(true)
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      toast({
        title: "Application Submitted! 🎉",
        description: (
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 rounded-full bg-green-500/20 flex items-center justify-center">
                <Check className="h-4 w-4 text-green-500" />
              </div>
              <span>Your application has been sent to {selectedJob.company.name}</span>
            </div>
            <p className="text-sm text-muted-foreground">
              We'll notify you when the hiring team reviews your application
            </p>
          </div>
        ),
        duration: 5000,
      })
      
      // Reset everything
      setSelectedJob(null)
      setShowApplicationForm(false)
      form.reset()
      setSelectedFile(null)
      
    } catch (error: any) {
      toast({
        title: "Error submitting application",
        description: error.message,
        variant: "destructive",
        duration: 5000,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  useEffect(() => {
    loadJobs()
  }, [filters])

  const loadJobs = () => {
    setIsLoading(true)
    
    // Filter jobs based on criteria
    let filteredJobs = MOCK_JOBS.filter(job => {
      if (filters.search && !job.title.toLowerCase().includes(filters.search.toLowerCase()) &&
          !job.company.name.toLowerCase().includes(filters.search.toLowerCase()) &&
          !job.description.toLowerCase().includes(filters.search.toLowerCase())) {
        return false
      }
      
      if (filters.jobType && job.job_type !== filters.jobType) {
        return false
      }
      
      if (filters.experienceLevel && job.experience_level !== filters.experienceLevel) {
        return false
      }
      
      if (filters.remotePolicy && job.remote_policy !== filters.remotePolicy) {
        return false
      }
      
      if (filters.location && !job.location.toLowerCase().includes(filters.location.toLowerCase())) {
        return false
      }
      
      if (filters.minSalary > 0 && job.salary_range.min < filters.minSalary) {
        return false
      }
      
      if (filters.showMatchingOnly && (job.match_score || 0) < 60) {
        return false
      }
      
      return true
    })

    // Sort by match score
    filteredJobs = filteredJobs.sort((a, b) => (b.match_score || 0) - (a.match_score || 0))
    
    setJobs(filteredJobs)
    setIsLoading(false)
  }

  return (
    <DashboardLayout userType="applicant">
      <AnimatePresence>
        {selectedJob && (
          <Dialog open={!!selectedJob} onOpenChange={(open) => {
            if (!open) {
              setSelectedJob(null)
              setShowApplicationForm(false)
              form.reset()
              setSelectedFile(null)
            }
          }}>
            <DialogContent className="max-w-4xl w-[95vw] h-[85vh] bg-white/10 backdrop-blur-xl border border-white/20 p-0">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="relative h-full flex flex-col"
              >
                {/* Background gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-indigo-600/20 z-0" />
                
                {!showApplicationForm ? (
                  <>
                    {/* Job Details View */}
                    <div className="relative z-10 flex flex-col h-full">
                      {/* Header */}
                      <div className="flex-none p-6 border-b border-white/10 bg-black/20 backdrop-blur-sm">
                        <div className="flex items-start gap-6">
                          <div className="flex-shrink-0 w-16 h-16 bg-white/10 rounded-lg flex items-center justify-center text-2xl font-bold">
                            {selectedJob.company.name.charAt(0)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h2 className="text-2xl font-bold truncate text-white">{selectedJob.title}</h2>
                            <div className="flex items-center gap-2 text-white/70 mt-2 flex-wrap">
                              <Building2 className="w-4 h-4 flex-shrink-0" />
                              <span className="truncate">{selectedJob.company.name}</span>
                              <span>•</span>
                              <MapPin className="w-4 h-4 flex-shrink-0" />
                              <span className="truncate">{selectedJob.location}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Scrollable Content */}
                      <div className="flex-1 overflow-y-auto">
                        <div className="p-6 space-y-6">
                          {/* Quick Info */}
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-white/5 rounded-lg p-4">
                            <div>
                              <div className="text-white/50 text-sm">Salary Range</div>
                              <div className="font-medium mt-1 text-white">
                                ${selectedJob.salary_range.min.toLocaleString()} - ${selectedJob.salary_range.max.toLocaleString()}
                              </div>
                            </div>
                            <div>
                              <div className="text-white/50 text-sm">Experience</div>
                              <div className="font-medium mt-1 text-white">{selectedJob.requirements.experience}</div>
                            </div>
                            <div>
                              <div className="text-white/50 text-sm">Education</div>
                              <div className="font-medium mt-1 text-white">{selectedJob.requirements.education}</div>
                            </div>
                            <div>
                              <div className="text-white/50 text-sm">Level</div>
                              <div className="font-medium mt-1 text-white">{selectedJob.experience_level}</div>
                            </div>
                          </div>

                          {/* Description */}
                          <div>
                            <h3 className="text-lg font-semibold mb-2 text-white">About the Role</h3>
                            <p className="text-white/70 leading-relaxed">{selectedJob.description}</p>
                          </div>

                          {/* Required Skills */}
                          <div>
                            <h3 className="text-lg font-semibold mb-3 text-white">Required Skills</h3>
                            <div className="flex flex-wrap gap-2">
                              {selectedJob.requirements.skills.map((skill) => (
                                <Badge key={skill} variant="outline" className="border-white/20">
                                  {skill}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          {/* Benefits */}
                          {selectedJob.benefits && (
                            <div>
                              <h3 className="text-lg font-semibold mb-3 text-white">Benefits</h3>
                              <ul className="grid grid-cols-2 gap-3">
                                {selectedJob.benefits.items.map((benefit) => (
                                  <li key={benefit} className="flex items-center gap-2 text-white/70">
                                    <div className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                                    {benefit}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {/* Company Info */}
                          <div>
                            <h3 className="text-lg font-semibold mb-3 text-white">About {selectedJob.company.name}</h3>
                            <div className="space-y-2 text-white/70">
                              <div className="flex items-center gap-2">
                                <Building2 className="w-4 h-4" />
                                <span>Industry: {selectedJob.company.industry}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <MapPin className="w-4 h-4" />
                                <span>Headquarters: {selectedJob.company.location}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Footer */}
                      <div className="flex-none p-6 border-t border-white/10 bg-black/40 backdrop-blur-md">
                        <div className="flex items-center justify-between">
                          <div className="text-white/70">
                            <Calendar className="w-4 h-4 inline-block mr-2" />
                            Apply before {new Date(selectedJob.deadline!).toLocaleDateString()}
                          </div>
                          <div className="flex gap-3">
                            <Button 
                              variant="outline" 
                              className="border-white/20 text-white hover:bg-white/10" 
                              onClick={() => setSelectedJob(null)}
                            >
                              Close
                            </Button>
                            <Button 
                              className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
                              onClick={() => setShowApplicationForm(true)}
                            >
                              Apply Now
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    {/* Application Form View */}
                    <div className="relative z-10 flex flex-col h-full">
                      {/* Header */}
                      <div className="flex-none p-6 border-b border-white/10 bg-black/20 backdrop-blur-sm">
                        <h2 className="text-2xl font-bold text-white">Apply for {selectedJob.title}</h2>
                        <p className="text-white/70 mt-2">Complete your application for {selectedJob.company.name}</p>
                      </div>

                      {/* Application Form */}
                      <div className="flex-1 overflow-y-auto">
                        <div className="p-6">
                          <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                              <FormField
                                control={form.control}
                                name="coverLetter"
                                render={({ field }) => (
                                  <FormItem>
                                    <div className="flex items-center justify-between">
                                      <FormLabel className="text-white text-lg">Cover Letter</FormLabel>
                                      <Button
                                        type="button"
                                        variant="outline"
                                        className="border-white/20 text-white hover:bg-white/10"
                                        onClick={generateCoverLetter}
                                        disabled={isGeneratingCoverLetter}
                                      >
                                        {isGeneratingCoverLetter ? (
                                          <>
                                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                            Generating...
                                          </>
                                        ) : (
                                          <>
                                            <Sparkles className="w-4 h-4 mr-2" />
                                            Generate with AI
                                          </>
                                        )}
                                      </Button>
                                    </div>
                                    <FormControl>
                                      <Textarea
                                        placeholder="Write a compelling cover letter explaining why you're a great fit for this role..."
                                        className="min-h-[300px] bg-white/5 border-white/20 text-white resize-none"
                                        value={isGeneratingCoverLetter ? generatedText : field.value}
                                        onChange={field.onChange}
                                      />
                                    </FormControl>
                                    <FormDescription className="text-white/70">
                                      Your cover letter should highlight your relevant experience and skills
                                    </FormDescription>
                                    <FormMessage className="text-red-400" />
                                  </FormItem>
                                )}
                              />

                              {/* Resume Upload */}
                              <div className="space-y-4">
                                <label className="text-lg font-medium text-white">Resume</label>
                                <div className="flex items-center justify-center w-full">
                                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-white/20 border-dashed rounded-lg cursor-pointer bg-white/5 hover:bg-white/10 transition-colors">
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                      <Paperclip className="w-8 h-8 mb-3 text-white/70" />
                                      {selectedFile ? (
                                        <p className="text-sm text-white/70">{selectedFile.name}</p>
                                      ) : (
                                        <>
                                          <p className="mb-2 text-sm text-white/70">
                                            <span className="font-semibold">Click to upload</span> or drag and drop
                                          </p>
                                          <p className="text-xs text-white/50">PDF or DOCX (max. 10MB)</p>
                                        </>
                                      )}
                                    </div>
                                    <input
                                      type="file"
                                      className="hidden"
                                      accept=".pdf,.docx"
                                      onChange={handleFileChange}
                                    />
                                  </label>
                                </div>
                              </div>
                            </form>
                          </Form>
                        </div>
                      </div>

                      {/* Footer */}
                      <div className="flex-none p-6 border-t border-white/10 bg-black/40 backdrop-blur-md">
                        <div className="flex justify-end gap-3">
                          <Button 
                            variant="outline" 
                            className="border-white/20 text-white hover:bg-white/10" 
                            onClick={() => setShowApplicationForm(false)}
                          >
                            Back
                          </Button>
                          <Button 
                            className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
                            onClick={form.handleSubmit(onSubmit)}
                            disabled={isSubmitting}
                          >
                            {isSubmitting ? (
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
                      </div>
                    </div>
                  </>
                )}
              </motion.div>
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>

      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-white">Find Your Next Role</h1>
            <p className="text-white/70">Browse and apply to jobs that match your skills and experience</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filters */}
          <Card className="lg:col-span-1 card-gradient border-0 text-white h-fit">
            <CardHeader>
              <CardTitle>Filters</CardTitle>
              <CardDescription className="text-white/70">Refine your job search</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="search" className="text-sm font-medium">Search</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/50" />
                  <Input
                    id="search"
                    placeholder="Job title or keyword"
                    value={filters.search}
                    onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                    className="pl-9 bg-white/5 border-white/20 text-white"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="jobType" className="text-sm font-medium">Job Type</label>
                <Select value={filters.jobType} onValueChange={(value) => setFilters({ ...filters, jobType: value })}>
                  <SelectTrigger className="bg-white/5 border-white/20 text-white">
                    <SelectValue placeholder="All types" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All types</SelectItem>
                    <SelectItem value="Full-time">Full-time</SelectItem>
                    <SelectItem value="Part-time">Part-time</SelectItem>
                    <SelectItem value="Contract">Contract</SelectItem>
                    <SelectItem value="Freelance">Freelance</SelectItem>
                    <SelectItem value="Internship">Internship</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label htmlFor="experienceLevel" className="text-sm font-medium">Experience Level</label>
                <Select
                  value={filters.experienceLevel}
                  onValueChange={(value) => setFilters({ ...filters, experienceLevel: value })}
                >
                  <SelectTrigger className="bg-white/5 border-white/20 text-white">
                    <SelectValue placeholder="All levels" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All levels</SelectItem>
                    <SelectItem value="Entry">Entry Level</SelectItem>
                    <SelectItem value="Mid">Mid Level</SelectItem>
                    <SelectItem value="Senior">Senior Level</SelectItem>
                    <SelectItem value="Lead">Lead</SelectItem>
                    <SelectItem value="Executive">Executive</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label htmlFor="remotePolicy" className="text-sm font-medium">Remote Policy</label>
                <Select
                  value={filters.remotePolicy}
                  onValueChange={(value) => setFilters({ ...filters, remotePolicy: value })}
                >
                  <SelectTrigger className="bg-white/5 border-white/20 text-white">
                    <SelectValue placeholder="Any" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any</SelectItem>
                    <SelectItem value="Remote">Remote</SelectItem>
                    <SelectItem value="Hybrid">Hybrid</SelectItem>
                    <SelectItem value="On-site">On-site</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label htmlFor="location" className="text-sm font-medium">Location</label>
                <Input
                  id="location"
                  placeholder="City or region"
                  value={filters.location}
                  onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                  className="bg-white/5 border-white/20 text-white"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="maxDistance" className="text-sm font-medium">Max Distance</label>
                <div className="flex items-center gap-4">
                  <Slider
                    id="maxDistance"
                    min={0}
                    max={100}
                    step={10}
                    value={[filters.maxDistance]}
                    onValueChange={([value]) => setFilters({ ...filters, maxDistance: value })}
                    className="flex-1"
                  />
                  <span className="text-sm">{filters.maxDistance} mi</span>
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="minSalary" className="text-sm font-medium">Minimum Salary</label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/50" />
                  <Input
                    id="minSalary"
                    type="number"
                    placeholder="Minimum salary"
                    value={filters.minSalary || ""}
                    onChange={(e) => setFilters({ ...filters, minSalary: parseInt(e.target.value) || 0 })}
                    className="pl-9 bg-white/5 border-white/20 text-white"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label htmlFor="matchingOnly" className="text-sm font-medium">Show matching jobs only</label>
                <Switch
                  id="matchingOnly"
                  checked={filters.showMatchingOnly}
                  onCheckedChange={(checked) => setFilters({ ...filters, showMatchingOnly: checked })}
                />
              </div>

              <Button className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700">
                <Filter className="w-4 h-4 mr-2" />
                Apply Filters
              </Button>
            </CardContent>
          </Card>

          {/* Job Listings */}
          <div className="lg:col-span-3 space-y-6">
            <Card className="card-gradient border-0 text-white">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Available Jobs</CardTitle>
                    <CardDescription className="text-white/70">
                      {jobs.length} jobs matching your criteria
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {isLoading ? (
                  <div className="text-center py-8 text-white/70">Loading jobs...</div>
                ) : jobs.length === 0 ? (
                  <div className="text-center py-8 text-white/70">No jobs found matching your criteria</div>
                ) : (
                  jobs.map((job) => (
                    <div
                      key={job.id}
                      className="border border-white/10 rounded-lg p-5 hover:bg-white/5 transition-colors"
                    >
                      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                        <div className="flex gap-4">
                          <div className="bg-white/10 h-12 w-12 rounded-md flex items-center justify-center text-lg font-bold">
                            {job.company.name.charAt(0)}
                          </div>
                          <div>
                            <h3 className="font-medium text-lg">{job.title}</h3>
                            <div className="flex items-center gap-2 text-white/70 text-sm mt-1">
                              <Building2 className="w-4 h-4" />
                              <span>{job.company.name}</span>
                              <span>•</span>
                              <MapPin className="w-4 h-4" />
                              <span>{job.location}</span>
                            </div>
                            <div className="flex flex-wrap gap-2 mt-2">
                              <Badge variant="outline" className="border-white/20 text-white">
                                <Briefcase className="w-3 h-3 mr-1" />
                                {job.job_type}
                              </Badge>
                              <Badge variant="outline" className="border-white/20 text-white">
                                <Clock className="w-3 h-3 mr-1" />
                                {job.remote_policy}
                              </Badge>
                              {job.salary_range && (
                                <Badge variant="outline" className="border-white/20 text-white">
                                  <DollarSign className="w-3 h-3 mr-1" />
                                  {job.salary_range.min.toLocaleString()} - {job.salary_range.max.toLocaleString()}
                                </Badge>
                              )}
                              {job.deadline && (
                                <Badge variant="outline" className="border-white/20 text-white">
                                  <Calendar className="w-3 h-3 mr-1" />
                                  Closes {new Date(job.deadline).toLocaleDateString()}
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <Badge
                            className={(job.match_score || 0) >= 80 ? "bg-green-500" : 
                              (job.match_score || 0) >= 60 ? "bg-yellow-500" : "bg-white/20"}
                          >
                            {job.match_score || 0}% Match
                          </Badge>
                          <Button 
                            className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
                            onClick={() => setSelectedJob(job)}
                          >
                            View Job
                            <ArrowUpRight className="w-4 h-4 ml-2" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
