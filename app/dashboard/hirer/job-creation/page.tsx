"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/use-toast"
import DashboardLayout from "@/components/dashboard-layout"
import {
  AlertCircle,
  ArrowRight,
  Building2,
  CheckCircle2,
  Clock,
  DollarSign,
  Globe,
  Lightbulb,
  Loader2,
  MapPin,
  Plus,
  Sparkles,
} from "lucide-react"

export default function JobCreationPage() {
  const [skills, setSkills] = useState<string[]>(["React", "TypeScript", "Next.js", "Node.js", "GraphQL"])
  const [newSkill, setNewSkill] = useState("")
  const [currentTab, setCurrentTab] = useState("details")
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedText, setGeneratedText] = useState("")
  const router = useRouter()
  const { toast } = useToast()

  // Sample job description template
  const sampleDescription = `We are seeking a talented and passionate Software Developer to join our dynamic team. As a Software Developer, you will:

- Design, develop, and maintain high-quality software solutions
- Collaborate with cross-functional teams to define, design, and ship new features
- Write clean, maintainable, and efficient code
- Participate in code reviews and provide constructive feedback
- Stay up-to-date with emerging technologies and industry trends

The ideal candidate will have strong problem-solving abilities, excellent communication skills, and a passion for creating innovative solutions.`

  const generateAIDescription = async () => {
    setIsGenerating(true)
    setGeneratedText("")
    
    const words = sampleDescription.split(" ")
    
    for (let i = 0; i < words.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 50)) // Add 50ms delay between words
      setGeneratedText((prev) => prev + (prev ? " " : "") + words[i])
    }
    
    setIsGenerating(false)
  }

  const addSkill = () => {
    if (newSkill && !skills.includes(newSkill)) {
      setSkills([...skills, newSkill])
      setNewSkill("")
    }
  }

  const removeSkill = (skill: string) => {
    setSkills(skills.filter((s) => s !== skill))
  }

  const handleNext = (nextTab: string) => {
    setCurrentTab(nextTab)
  }

  const handlePublish = async () => {
    toast({
      title: "Job Posted Successfully! 🎉",
      description: (
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-full bg-green-500/20 flex items-center justify-center">
              <CheckCircle2 className="h-4 w-4 text-green-500" />
            </div>
            <span>Your job posting is now live and visible to candidates</span>
          </div>
          <p className="text-sm text-muted-foreground">
            We'll notify you when candidates apply for this position
          </p>
        </div>
      ),
      duration: 5000,
    })

    setTimeout(() => {
      router.push("/dashboard/hirer/jobs")
    }, 2000)
  }

  return (
    <DashboardLayout userType="hirer">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Create Job Posting</h1>
          <p className="text-white/70">Create a new job posting to find the perfect candidate</p>
        </div>

        <Tabs value={currentTab} onValueChange={setCurrentTab} className="space-y-6">
          <TabsList className="bg-white/5 p-1">
            <TabsTrigger value="details" className="data-[state=active]:bg-white/10">
              Job Details
            </TabsTrigger>
            <TabsTrigger value="requirements" className="data-[state=active]:bg-white/10">
              Requirements
            </TabsTrigger>
            <TabsTrigger value="benefits" className="data-[state=active]:bg-white/10">
              Benefits & Perks
            </TabsTrigger>
            <TabsTrigger value="preview" className="data-[state=active]:bg-white/10">
              Preview
            </TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="space-y-6">
            <Card className="card-gradient border-0 text-white">
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
                <CardDescription className="text-white/70">
                  Enter the basic details about the job position
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Job Title</Label>
                  <Input
                    id="title"
                    placeholder="e.g. Senior Frontend Developer"
                    className="bg-white/5 border-white/20 text-white"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="department">Department</Label>
                    <Select>
                      <SelectTrigger className="bg-white/5 border-white/20 text-white">
                        <SelectValue placeholder="Select department" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="engineering">Engineering</SelectItem>
                        <SelectItem value="design">Design</SelectItem>
                        <SelectItem value="product">Product</SelectItem>
                        <SelectItem value="marketing">Marketing</SelectItem>
                        <SelectItem value="sales">Sales</SelectItem>
                        <SelectItem value="hr">Human Resources</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="type">Job Type</Label>
                    <Select>
                      <SelectTrigger className="bg-white/5 border-white/20 text-white">
                        <SelectValue placeholder="Select job type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="full-time">Full-time</SelectItem>
                        <SelectItem value="part-time">Part-time</SelectItem>
                        <SelectItem value="contract">Contract</SelectItem>
                        <SelectItem value="freelance">Freelance</SelectItem>
                        <SelectItem value="internship">Internship</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Job Description</Label>
                  <div className="flex items-center gap-2 mb-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="border-white/20 text-white hover:bg-white/10"
                      onClick={generateAIDescription}
                      disabled={isGenerating}
                    >
                      {isGenerating ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-1 animate-spin" />
                          Generating...
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-4 h-4 mr-1" />
                          Generate with AI
                        </>
                      )}
                    </Button>
                    <span className="text-xs text-white/70">or write your own</span>
                  </div>
                  <Textarea
                    id="description"
                    placeholder="Describe the job role, responsibilities, and ideal candidate..."
                    className="bg-white/5 border-white/20 text-white min-h-32"
                    value={generatedText}
                    onChange={(e) => setGeneratedText(e.target.value)}
                    disabled={isGenerating}
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="card-gradient border-0 text-white">
              <CardHeader>
                <CardTitle>Location & Salary</CardTitle>
                <CardDescription className="text-white/70">
                  Specify where the job is located and the compensation details
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      placeholder="e.g. San Francisco, CA"
                      className="bg-white/5 border-white/20 text-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="remote">Remote Policy</Label>
                    <Select>
                      <SelectTrigger className="bg-white/5 border-white/20 text-white">
                        <SelectValue placeholder="Select remote policy" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="remote">Remote</SelectItem>
                        <SelectItem value="hybrid">Hybrid</SelectItem>
                        <SelectItem value="on-site">On-site</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Salary Range</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="min-salary" className="text-sm text-white/70">
                        Minimum
                      </Label>
                      <div className="relative">
                        <DollarSign className="absolute left-2 top-1/2 transform -translate-y-1/2 text-white/50 w-4 h-4" />
                        <Input
                          id="min-salary"
                          placeholder="e.g. 80,000"
                          className="bg-white/5 border-white/20 text-white pl-8"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="max-salary" className="text-sm text-white/70">
                        Maximum
                      </Label>
                      <div className="relative">
                        <DollarSign className="absolute left-2 top-1/2 transform -translate-y-1/2 text-white/50 w-4 h-4" />
                        <Input
                          id="max-salary"
                          placeholder="e.g. 120,000"
                          className="bg-white/5 border-white/20 text-white pl-8"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label htmlFor="show-salary" className="text-base">
                      Show Salary in Job Posting
                    </Label>
                    <p className="text-sm text-white/70">
                      Job postings with visible salary ranges get 30% more applications
                    </p>
                  </div>
                  <Switch id="show-salary" />
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end">
              <Button
                className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
                onClick={() => handleNext("requirements")}
              >
                Next: Requirements
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="requirements" className="space-y-6">
            <Card className="card-gradient border-0 text-white">
              <CardHeader>
                <CardTitle>Skills & Experience</CardTitle>
                <CardDescription className="text-white/70">
                  Define the skills and experience required for this position
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label>Required Skills</Label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {skills.map((skill) => (
                      <Badge key={skill} className="bg-white/10 hover:bg-white/20 text-white">
                        {skill}
                        <button className="ml-1 text-white/70 hover:text-white" onClick={() => removeSkill(skill)}>
                          ×
                        </button>
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Add a skill"
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                      className="bg-white/5 border-white/20 text-white"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault()
                          addSkill()
                        }
                      }}
                    />
                    <Button
                      variant="outline"
                      className="border-white/20 text-white hover:bg-white/10"
                      onClick={addSkill}
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                  <p className="text-xs text-white/70 mt-1">Press Enter to add a skill or click the plus button</p>
                </div>

                <div className="space-y-2">
                  <Label>Experience Level</Label>
                  <Select>
                    <SelectTrigger className="bg-white/5 border-white/20 text-white">
                      <SelectValue placeholder="Select experience level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="entry">Entry Level (0-2 years)</SelectItem>
                      <SelectItem value="mid">Mid Level (2-5 years)</SelectItem>
                      <SelectItem value="senior">Senior Level (5-8 years)</SelectItem>
                      <SelectItem value="lead">Lead/Principal (8+ years)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Education Requirements</Label>
                  <Select>
                    <SelectTrigger className="bg-white/5 border-white/20 text-white">
                      <SelectValue placeholder="Select education requirement" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">No specific requirement</SelectItem>
                      <SelectItem value="high-school">High School Diploma</SelectItem>
                      <SelectItem value="associate">Associate's Degree</SelectItem>
                      <SelectItem value="bachelor">Bachelor's Degree</SelectItem>
                      <SelectItem value="master">Master's Degree</SelectItem>
                      <SelectItem value="phd">PhD or Doctorate</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="additional-requirements">Additional Requirements</Label>
                  <Textarea
                    id="additional-requirements"
                    placeholder="List any additional qualifications, certifications, or requirements..."
                    className="bg-white/5 border-white/20 text-white min-h-24"
                  />
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-between">
              <Button
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10"
                onClick={() => handleNext("details")}
              >
                Back: Job Details
              </Button>
              <Button
                className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
                onClick={() => handleNext("benefits")}
              >
                Next: Benefits & Perks
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="benefits" className="space-y-6">
            <Card className="card-gradient border-0 text-white">
              <CardHeader>
                <CardTitle>Benefits & Perks</CardTitle>
                <CardDescription className="text-white/70">
                  Highlight the benefits and perks that come with this position
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <Label>Health & Wellness</Label>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Switch id="health-insurance" />
                        <Label htmlFor="health-insurance" className="font-normal">
                          Health Insurance
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch id="dental-insurance" />
                        <Label htmlFor="dental-insurance" className="font-normal">
                          Dental Insurance
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch id="vision-insurance" />
                        <Label htmlFor="vision-insurance" className="font-normal">
                          Vision Insurance
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch id="wellness-program" />
                        <Label htmlFor="wellness-program" className="font-normal">
                          Wellness Program
                        </Label>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Label>Financial Benefits</Label>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Switch id="401k" />
                        <Label htmlFor="401k" className="font-normal">
                          401(k) Plan
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch id="stock-options" />
                        <Label htmlFor="stock-options" className="font-normal">
                          Stock Options
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch id="bonus" />
                        <Label htmlFor="bonus" className="font-normal">
                          Performance Bonus
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch id="profit-sharing" />
                        <Label htmlFor="profit-sharing" className="font-normal">
                          Profit Sharing
                        </Label>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <Label>Time Off</Label>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Switch id="paid-vacation" />
                        <Label htmlFor="paid-vacation" className="font-normal">
                          Paid Vacation
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch id="paid-sick-leave" />
                        <Label htmlFor="paid-sick-leave" className="font-normal">
                          Paid Sick Leave
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch id="paid-holidays" />
                        <Label htmlFor="paid-holidays" className="font-normal">
                          Paid Holidays
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch id="parental-leave" />
                        <Label htmlFor="parental-leave" className="font-normal">
                          Parental Leave
                        </Label>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Label>Work Environment</Label>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Switch id="flexible-schedule" />
                        <Label htmlFor="flexible-schedule" className="font-normal">
                          Flexible Schedule
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch id="remote-work" />
                        <Label htmlFor="remote-work" className="font-normal">
                          Remote Work Options
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch id="professional-development" />
                        <Label htmlFor="professional-development" className="font-normal">
                          Professional Development
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch id="casual-dress" />
                        <Label htmlFor="casual-dress" className="font-normal">
                          Casual Dress Code
                        </Label>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="additional-benefits">Additional Benefits & Perks</Label>
                  <Textarea
                    id="additional-benefits"
                    placeholder="Describe any additional benefits or perks not listed above..."
                    className="bg-white/5 border-white/20 text-white min-h-24"
                  />
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-between">
              <Button
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10"
                onClick={() => handleNext("requirements")}
              >
                Back: Requirements
              </Button>
              <Button
                className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
                onClick={() => handleNext("preview")}
              >
                Next: Preview
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="preview" className="space-y-6">
            <Card className="card-gradient border-0 text-white">
              <CardHeader>
                <CardTitle>Job Posting Preview</CardTitle>
                <CardDescription className="text-white/70">Review your job posting before publishing</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border border-white/10 rounded-lg p-6 space-y-6">
                  <div className="space-y-2">
                    <h2 className="text-2xl font-bold">Senior Frontend Developer</h2>
                    <div className="flex flex-wrap gap-4 text-sm text-white/70">
                      <div className="flex items-center gap-1">
                        <Building2 className="w-4 h-4" />
                        <span>Acme Inc</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        <span>San Francisco, CA</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Globe className="w-4 h-4" />
                        <span>Remote</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>Full-time</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <DollarSign className="w-4 h-4" />
                        <span>$120,000 - $150,000</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">About the Role</h3>
                    <p className="text-white/80">
                      We are looking for a Senior Frontend Developer to join our team. You will be responsible for
                      building and maintaining our web applications, working closely with our design and backend teams
                      to deliver exceptional user experiences.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">Required Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      {skills.map((skill) => (
                        <Badge key={skill} className="bg-white/10 text-white">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">Benefits & Perks</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                        <span>Health Insurance</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                        <span>401(k) Plan</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                        <span>Flexible Schedule</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                        <span>Remote Work Options</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                        <span>Professional Development</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                        <span>Paid Time Off</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="card-gradient border-0 text-white">
              <CardHeader>
                <CardTitle>AI Suggestions</CardTitle>
                <CardDescription className="text-white/70">
                  Our AI has analyzed your job posting and has some suggestions
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3 p-3 border border-yellow-500/30 bg-yellow-500/10 rounded-lg">
                  <AlertCircle className="w-5 h-5 text-yellow-500 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-yellow-400">Salary Range</h4>
                    <p className="text-white/80 text-sm">
                      Your salary range is slightly below market average for this position in San Francisco. Consider
                      increasing the range to attract more qualified candidates.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 border border-purple-500/30 bg-purple-500/10 rounded-lg">
                  <Lightbulb className="w-5 h-5 text-purple-400 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-purple-300">Skills Enhancement</h4>
                    <p className="text-white/80 text-sm">
                      Consider adding "Redux" and "Testing (Jest/RTL)" to your required skills as they are commonly
                      paired with React and TypeScript in similar job postings.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-between">
              <Button
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10"
                onClick={() => handleNext("benefits")}
              >
                Back: Benefits & Perks
              </Button>
              <div className="flex gap-2">
                <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                  Save as Draft
                </Button>
                <Button
                  className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
                  onClick={handlePublish}
                >
                  Publish Job
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
