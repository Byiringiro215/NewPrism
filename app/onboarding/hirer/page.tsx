"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { Building2, ChevronRight, ImagePlus, Plus, Upload, X } from "lucide-react"

type ButtonProps = React.ComponentProps<typeof Button>

export default function HirerOnboarding() {
  const router = useRouter()
  const { toast } = useToast()
  const [step, setStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [benefits, setBenefits] = useState<string[]>([])
  const [newBenefit, setNewBenefit] = useState("")
  const [company, setCompany] = useState({
    name: "",
    description: "",
    website: "",
    industry: "",
    size: "",
    location: "",
    culture: "",
    founded: "",
    logo: null as File | null,
  })
  
  const [jobPreferences, setJobPreferences] = useState({
    hiringGoals: "",
    remotePolicy: "",
    hiringBudget: "",
    hiringTimeframe: "",
    preferredSkills: [] as string[],
    positions: [] as { title: string; department: string; type: string }[],
  })

  const [teamInfo, setTeamInfo] = useState({
    hiringTeam: [] as { name: string; position: string; email: string }[],
    interviewProcess: "",
    evaluationCriteria: "",
  })

  const handleCompanyChange = (field: string, value: any) => {
    setCompany((prev) => ({ ...prev, [field]: value }))
  }

  const handleJobPreferencesChange = (field: string, value: any) => {
    setJobPreferences((prev) => ({ ...prev, [field]: value }))
  }

  const handleTeamInfoChange = (field: string, value: any) => {
    setTeamInfo((prev) => ({ ...prev, [field]: value }))
  }

  const addBenefit = () => {
    if (newBenefit && !benefits.includes(newBenefit)) {
      setBenefits([...benefits, newBenefit])
      setNewBenefit("")
    }
  }

  const removeBenefit = (benefit: string) => {
    setBenefits(benefits.filter((b) => b !== benefit))
  }

  const addPosition = () => {
    setJobPreferences((prev) => ({
      ...prev,
      positions: [...prev.positions, { title: "", department: "", type: "" }],
    }))
  }

  const updatePosition = (index: number, field: string, value: string) => {
    setJobPreferences((prev) => {
      const updatedPositions = [...prev.positions]
      updatedPositions[index] = { ...updatedPositions[index], [field]: value }
      return { ...prev, positions: updatedPositions }
    })
  }

  const removePosition = (index: number) => {
    setJobPreferences((prev) => {
      const updatedPositions = [...prev.positions]
      updatedPositions.splice(index, 1)
      return { ...prev, positions: updatedPositions }
    })
  }

  const addTeamMember = () => {
    setTeamInfo((prev) => ({
      ...prev,
      hiringTeam: [...prev.hiringTeam, { name: "", position: "", email: "" }],
    }))
  }

  const updateTeamMember = (index: number, field: string, value: string) => {
    setTeamInfo((prev) => {
      const updatedTeam = [...prev.hiringTeam]
      updatedTeam[index] = { ...updatedTeam[index], [field]: value }
      return { ...prev, hiringTeam: updatedTeam }
    })
  }

  const removeTeamMember = (index: number) => {
    setTeamInfo((prev) => {
      const updatedTeam = [...prev.hiringTeam]
      updatedTeam.splice(index, 1)
      return { ...prev, hiringTeam: updatedTeam }
    })
  }

  const handleNext = () => {
    setStep(step + 1)
  }

  const handleBack = () => {
    setStep(step - 1)
  }

  const handleSubmit = async () => {
    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      toast({
        title: "Setup completed!",
        description: "Welcome to Prism. Let's start hiring great talent.",
      })

      router.push("/dashboard/hirer")
    } catch (error: any) {
      toast({
        title: "Error completing setup",
        description: error.message,
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen auth-gradient">
      <div className="max-w-4xl mx-auto p-4 py-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 mb-4">
            <Building2 className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white">Set Up Your Company Profile</h1>
          <p className="text-white/70 mt-2">Let's create your company profile to help you find the perfect candidates</p>
        </div>

        <div className="mb-8">
          <div className="flex justify-between mb-2">
            <span className="text-white/70">Step {step} of 3</span>
            <span className="text-white/70">{Math.round((step / 3) * 100)}% Complete</span>
          </div>
          <Progress value={(step / 3) * 100} className="h-2 bg-white/10" />
        </div>

        {step === 1 && (
          <Card className="border-0 bg-white/10 backdrop-blur-sm text-white">
            <CardHeader>
              <CardTitle>Company Information</CardTitle>
              <CardDescription className="text-white/70">
                Tell us about your company to help candidates learn more about you
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Company Name</Label>
                <Input
                  id="name"
                  placeholder="e.g. Acme Corporation"
                  value={company.name}
                  onChange={(e) => handleCompanyChange("name", e.target.value)}
                  className="bg-white/5 border-white/20 text-white"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Company Description</Label>
                <Textarea
                  id="description"
                  placeholder="Tell us about your company's mission, values, and what makes you unique..."
                  value={company.description}
                  onChange={(e) => handleCompanyChange("description", e.target.value)}
                  className="bg-white/5 border-white/20 text-white min-h-32"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="website">Company Website</Label>
                  <Input
                    id="website"
                    placeholder="e.g. https://www.acme.com"
                    value={company.website}
                    onChange={(e) => handleCompanyChange("website", e.target.value)}
                    className="bg-white/5 border-white/20 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="founded">Founded Year</Label>
                  <Input
                    id="founded"
                    type="number"
                    placeholder="e.g. 2020"
                    value={company.founded}
                    onChange={(e) => handleCompanyChange("founded", e.target.value)}
                    className="bg-white/5 border-white/20 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="industry">Industry</Label>
                  <Select value={company.industry} onValueChange={(value) => handleCompanyChange("industry", value)}>
                    <SelectTrigger className="bg-white/5 border-white/20 text-white">
                      <SelectValue placeholder="Select industry" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="technology">Technology</SelectItem>
                      <SelectItem value="healthcare">Healthcare</SelectItem>
                      <SelectItem value="finance">Finance</SelectItem>
                      <SelectItem value="education">Education</SelectItem>
                      <SelectItem value="retail">Retail</SelectItem>
                      <SelectItem value="manufacturing">Manufacturing</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="size">Company Size</Label>
                  <Select value={company.size} onValueChange={(value) => handleCompanyChange("size", value)}>
                    <SelectTrigger className="bg-white/5 border-white/20 text-white">
                      <SelectValue placeholder="Select company size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-10">1-10 employees</SelectItem>
                      <SelectItem value="11-50">11-50 employees</SelectItem>
                      <SelectItem value="51-200">51-200 employees</SelectItem>
                      <SelectItem value="201-500">201-500 employees</SelectItem>
                      <SelectItem value="501-1000">501-1000 employees</SelectItem>
                      <SelectItem value="1001+">1001+ employees</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Company Location</Label>
                <Input
                  id="location"
                  placeholder="e.g. San Francisco, CA"
                  value={company.location}
                  onChange={(e) => handleCompanyChange("location", e.target.value)}
                  className="bg-white/5 border-white/20 text-white"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="culture">Company Culture</Label>
                <Textarea
                  id="culture"
                  placeholder="Describe your company culture, values, and work environment..."
                  value={company.culture}
                  onChange={(e) => handleCompanyChange("culture", e.target.value)}
                  className="bg-white/5 border-white/20 text-white min-h-24"
                />
              </div>

              <div className="space-y-2">
                <Label>Company Logo</Label>
                <div className="border border-dashed border-white/20 rounded-lg p-6 text-center">
                  <div className="mx-auto w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
                    <ImagePlus className="w-8 h-8 text-white/50" />
                  </div>
                  <p className="text-sm text-white/70 mb-2">Drag and drop your company logo here or click to browse</p>
                  <Button className="border-white/20 text-white hover:bg-white/10" variant="outline">
                    Upload Logo
                  </Button>
                  <p className="text-xs text-white/50 mt-2">Recommended: 400x400px, PNG or JPG</p>
                </div>
              </div>

              <div className="flex justify-end">
                <Button onClick={handleNext} className="button-gradient">
                  Next: Job Preferences
                  <ChevronRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {step === 2 && (
          <Card className="border-0 bg-white/10 backdrop-blur-sm text-white">
            <CardHeader>
              <CardTitle>Job Preferences</CardTitle>
              <CardDescription className="text-white/70">
                Tell us about your hiring needs and preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="hiringGoals">Hiring Goals</Label>
                <Textarea
                  id="hiringGoals"
                  placeholder="What are your main hiring objectives and talent needs?"
                  value={jobPreferences.hiringGoals}
                  onChange={(e) => handleJobPreferencesChange("hiringGoals", e.target.value)}
                  className="bg-white/5 border-white/20 text-white min-h-24"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="remotePolicy">Remote Work Policy</Label>
                  <Select
                    value={jobPreferences.remotePolicy}
                    onValueChange={(value) => handleJobPreferencesChange("remotePolicy", value)}
                  >
                    <SelectTrigger className="bg-white/5 border-white/20 text-white">
                      <SelectValue placeholder="Select remote policy" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="remote">Fully Remote</SelectItem>
                      <SelectItem value="hybrid">Hybrid</SelectItem>
                      <SelectItem value="onsite">On-site Only</SelectItem>
                      <SelectItem value="flexible">Flexible</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="hiringTimeframe">Hiring Timeframe</Label>
                  <Select
                    value={jobPreferences.hiringTimeframe}
                    onValueChange={(value) => handleJobPreferencesChange("hiringTimeframe", value)}
                  >
                    <SelectTrigger className="bg-white/5 border-white/20 text-white">
                      <SelectValue placeholder="Select timeframe" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="immediate">Immediate</SelectItem>
                      <SelectItem value="1month">Within 1 month</SelectItem>
                      <SelectItem value="3months">Within 3 months</SelectItem>
                      <SelectItem value="6months">Within 6 months</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Company Benefits</Label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {benefits.map((benefit) => (
                    <Badge key={benefit} className="bg-white/10 hover:bg-white/20 text-white">
                      {benefit}
                      <button className="ml-1 text-white/70 hover:text-white" onClick={() => removeBenefit(benefit)}>
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input
                    placeholder="Add a benefit"
                    value={newBenefit}
                    onChange={(e) => setNewBenefit(e.target.value)}
                    className="bg-white/5 border-white/20 text-white"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault()
                        addBenefit()
                      }
                    }}
                  />
                  <Button variant="outline" className="border-white/20 text-white hover:bg-white/10" onClick={addBenefit}>
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                <Label>Open Positions</Label>
                {jobPreferences.positions.length === 0 ? (
                  <div className="text-center py-8 border border-dashed border-white/20 rounded-lg">
                    <p className="text-white/70 mb-4">No positions added yet</p>
                    <Button variant="outline" className="border-white/20 text-white hover:bg-white/10" onClick={addPosition}>
                      <Plus className="w-4 h-4 mr-2" />
                      Add Position
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {jobPreferences.positions.map((position, index) => (
                      <div key={index} className="p-4 border border-white/20 rounded-lg space-y-4">
                        <div className="flex justify-between items-start">
                          <h3 className="font-medium">Position {index + 1}</h3>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-white/70 hover:text-white hover:bg-white/10 h-8 w-8 p-0"
                            onClick={() => removePosition(index)}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor={`title-${index}`}>Job Title</Label>
                            <Input
                              id={`title-${index}`}
                              value={position.title}
                              onChange={(e) => updatePosition(index, "title", e.target.value)}
                              className="bg-white/5 border-white/20 text-white"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor={`department-${index}`}>Department</Label>
                            <Input
                              id={`department-${index}`}
                              value={position.department}
                              onChange={(e) => updatePosition(index, "department", e.target.value)}
                              className="bg-white/5 border-white/20 text-white"
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`type-${index}`}>Employment Type</Label>
                          <Select value={position.type} onValueChange={(value) => updatePosition(index, "type", value)}>
                            <SelectTrigger className="bg-white/5 border-white/20 text-white">
                              <SelectValue placeholder="Select employment type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="full-time">Full-time</SelectItem>
                              <SelectItem value="part-time">Part-time</SelectItem>
                              <SelectItem value="contract">Contract</SelectItem>
                              <SelectItem value="internship">Internship</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    ))}
                    <Button
                      variant="outline"
                      className="border-white/20 text-white hover:bg-white/10 w-full"
                      onClick={addPosition}
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add Another Position
                    </Button>
                  </div>
                )}
              </div>

              <div className="flex justify-between">
                <Button variant="outline" className="border-white/20 text-white hover:bg-white/10" onClick={handleBack}>
                  Back
                </Button>
                <Button onClick={handleNext} className="button-gradient">
                  Next: Team Setup
                  <ChevronRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {step === 3 && (
          <Card className="border-0 bg-white/10 backdrop-blur-sm text-white">
            <CardHeader>
              <CardTitle>Team Setup</CardTitle>
              <CardDescription className="text-white/70">Set up your hiring team and interview process</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <Label>Hiring Team Members</Label>
                {teamInfo.hiringTeam.length === 0 ? (
                  <div className="text-center py-8 border border-dashed border-white/20 rounded-lg">
                    <p className="text-white/70 mb-4">No team members added yet</p>
                    <Button
                      variant="outline"
                      className="border-white/20 text-white hover:bg-white/10"
                      onClick={addTeamMember}
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add Team Member
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {teamInfo.hiringTeam.map((member, index) => (
                      <div key={index} className="p-4 border border-white/20 rounded-lg space-y-4">
                        <div className="flex justify-between items-start">
                          <h3 className="font-medium">Team Member {index + 1}</h3>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-white/70 hover:text-white hover:bg-white/10 h-8 w-8 p-0"
                            onClick={() => removeTeamMember(index)}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor={`name-${index}`}>Name</Label>
                            <Input
                              id={`name-${index}`}
                              value={member.name}
                              onChange={(e) => updateTeamMember(index, "name", e.target.value)}
                              className="bg-white/5 border-white/20 text-white"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor={`position-${index}`}>Position</Label>
                            <Input
                              id={`position-${index}`}
                              value={member.position}
                              onChange={(e) => updateTeamMember(index, "position", e.target.value)}
                              className="bg-white/5 border-white/20 text-white"
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`email-${index}`}>Email</Label>
                          <Input
                            id={`email-${index}`}
                            type="email"
                            value={member.email}
                            onChange={(e) => updateTeamMember(index, "email", e.target.value)}
                            className="bg-white/5 border-white/20 text-white"
                          />
                        </div>
                      </div>
                    ))}
                    <Button
                      variant="outline"
                      className="border-white/20 text-white hover:bg-white/10 w-full"
                      onClick={addTeamMember}
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add Another Team Member
                    </Button>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="interviewProcess">Interview Process</Label>
                <Textarea
                  id="interviewProcess"
                  placeholder="Describe your typical interview process and stages..."
                  value={teamInfo.interviewProcess}
                  onChange={(e) => handleTeamInfoChange("interviewProcess", e.target.value)}
                  className="bg-white/5 border-white/20 text-white min-h-24"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="evaluationCriteria">Evaluation Criteria</Label>
                <Textarea
                  id="evaluationCriteria"
                  placeholder="What are the key criteria you use to evaluate candidates?"
                  value={teamInfo.evaluationCriteria}
                  onChange={(e) => handleTeamInfoChange("evaluationCriteria", e.target.value)}
                  className="bg-white/5 border-white/20 text-white min-h-24"
                />
              </div>

              <div className="flex justify-between">
                <Button variant="outline" className="border-white/20 text-white hover:bg-white/10" onClick={handleBack}>
                  Back
                </Button>
                <Button onClick={handleSubmit} className="button-gradient" disabled={isLoading}>
                  {isLoading ? "Completing Setup..." : "Complete Setup"}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
