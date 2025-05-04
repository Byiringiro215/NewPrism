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
import { useToast } from "@/components/ui/use-toast"
import { CheckCircle, ChevronRight, Plus, X } from "lucide-react"

export default function ApplicantOnboarding() {
  const router = useRouter()
  const { toast } = useToast()
  const [step, setStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [skills, setSkills] = useState<string[]>([])
  const [newSkill, setNewSkill] = useState("")
  const [profile, setProfile] = useState({
    headline: "",
    bio: "",
    location: "",
    experience: [] as { title: string; company: string; startDate: string; endDate: string; description: string }[],
    education: [] as { school: string; degree: string; field: string; startDate: string; endDate: string }[],
  })

  const handleProfileChange = (field: string, value: any) => {
    setProfile((prev) => ({ ...prev, [field]: value }))
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

  const addExperience = () => {
    setProfile((prev) => ({
      ...prev,
      experience: [...prev.experience, { title: "", company: "", startDate: "", endDate: "", description: "" }],
    }))
  }

  const updateExperience = (index: number, field: string, value: string) => {
    setProfile((prev) => {
      const updatedExperience = [...prev.experience]
      updatedExperience[index] = { ...updatedExperience[index], [field]: value }
      return { ...prev, experience: updatedExperience }
    })
  }

  const removeExperience = (index: number) => {
    setProfile((prev) => {
      const updatedExperience = [...prev.experience]
      updatedExperience.splice(index, 1)
      return { ...prev, experience: updatedExperience }
    })
  }

  const addEducation = () => {
    setProfile((prev) => ({
      ...prev,
      education: [...prev.education, { school: "", degree: "", field: "", startDate: "", endDate: "" }],
    }))
  }

  const updateEducation = (index: number, field: string, value: string) => {
    setProfile((prev) => {
      const updatedEducation = [...prev.education]
      updatedEducation[index] = { ...updatedEducation[index], [field]: value }
      return { ...prev, education: updatedEducation }
    })
  }

  const removeEducation = (index: number) => {
    setProfile((prev) => {
      const updatedEducation = [...prev.education]
      updatedEducation.splice(index, 1)
      return { ...prev, education: updatedEducation }
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
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Profile completed",
        description: "Your profile has been successfully set up.",
      })

      // Redirect to dashboard
      router.push("/dashboard/applicant")
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "An error occurred while saving your profile.",
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
            <span className="text-white text-2xl font-bold">P</span>
          </div>
          <h1 className="text-3xl font-bold text-white">Set Up Your Profile</h1>
          <p className="text-white/70 mt-2">Let's create your professional profile to help you find the perfect job</p>
        </div>

        <div className="mb-8">
          <div className="flex justify-between mb-2">
            <span className="text-white/70">Step {step} of 4</span>
            <span className="text-white/70">{Math.round((step / 4) * 100)}% Complete</span>
          </div>
          <Progress value={(step / 4) * 100} className="h-2 bg-white/10" />
        </div>

        {step === 1 && (
          <Card className="border-0 bg-white/10 backdrop-blur-sm text-white">
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <CardDescription className="text-white/70">
                Let's start with some basic information about you
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="headline">Professional Headline</Label>
                <Input
                  id="headline"
                  placeholder="e.g. Senior Frontend Developer"
                  value={profile.headline}
                  onChange={(e) => handleProfileChange("headline", e.target.value)}
                  className="bg-white/5 border-white/20 text-white"
                />
                <p className="text-xs text-white/50">A brief headline that describes your professional identity</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Professional Summary</Label>
                <Textarea
                  id="bio"
                  placeholder="Tell us about your professional background, skills, and career goals..."
                  value={profile.bio}
                  onChange={(e) => handleProfileChange("bio", e.target.value)}
                  className="bg-white/5 border-white/20 text-white min-h-32"
                />
                <p className="text-xs text-white/50">
                  A brief summary of your professional experience, skills, and career goals
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  placeholder="e.g. San Francisco, CA"
                  value={profile.location}
                  onChange={(e) => handleProfileChange("location", e.target.value)}
                  className="bg-white/5 border-white/20 text-white"
                />
                <p className="text-xs text-white/50">Your current location or where you're willing to work</p>
              </div>

              <div className="flex justify-end">
                <Button onClick={handleNext} className="button-gradient">
                  Next: Skills
                  <ChevronRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {step === 2 && (
          <Card className="border-0 bg-white/10 backdrop-blur-sm text-white">
            <CardHeader>
              <CardTitle>Skills</CardTitle>
              <CardDescription className="text-white/70">
                Add your professional skills to help us match you with the right opportunities
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Your Skills</Label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {skills.map((skill) => (
                    <Badge key={skill} className="bg-white/10 hover:bg-white/20 text-white">
                      {skill}
                      <button className="ml-1 text-white/70 hover:text-white" onClick={() => removeSkill(skill)}>
                        <X className="w-3 h-3" />
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
                  <Button variant="outline" className="border-white/20 text-white hover:bg-white/10" onClick={addSkill}>
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                <p className="text-xs text-white/50">Press Enter to add a skill or click the plus button</p>
              </div>

              <div className="space-y-2">
                <Label>Recommended Skills</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {["JavaScript", "React", "TypeScript", "Node.js", "HTML/CSS", "UI/UX Design"].map((skill) => (
                    <Button
                      key={skill}
                      variant="outline"
                      className={`border-white/20 text-white hover:bg-white/10 justify-start ${
                        skills.includes(skill) ? "bg-white/10" : ""
                      }`}
                      onClick={() => {
                        if (!skills.includes(skill)) {
                          setSkills([...skills, skill])
                        } else {
                          removeSkill(skill)
                        }
                      }}
                    >
                      {skills.includes(skill) ? (
                        <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                      ) : (
                        <Plus className="w-4 h-4 mr-2" />
                      )}
                      {skill}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="flex justify-between">
                <Button variant="outline" className="border-white/20 text-white hover:bg-white/10" onClick={handleBack}>
                  Back
                </Button>
                <Button onClick={handleNext} className="button-gradient">
                  Next: Experience
                  <ChevronRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {step === 3 && (
          <Card className="border-0 bg-white/10 backdrop-blur-sm text-white">
            <CardHeader>
              <CardTitle>Work Experience</CardTitle>
              <CardDescription className="text-white/70">
                Add your work experience to showcase your professional background
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {profile.experience.length === 0 ? (
                <div className="text-center py-8 border border-dashed border-white/20 rounded-lg">
                  <p className="text-white/70 mb-4">No work experience added yet</p>
                  <Button
                    variant="outline"
                    className="border-white/20 text-white hover:bg-white/10"
                    onClick={addExperience}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Experience
                  </Button>
                </div>
              ) : (
                <div className="space-y-6">
                  {profile.experience.map((exp, index) => (
                    <div key={index} className="p-4 border border-white/20 rounded-lg space-y-4">
                      <div className="flex justify-between items-start">
                        <h3 className="font-medium">Experience {index + 1}</h3>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-white/70 hover:text-white hover:bg-white/10 h-8 w-8 p-0"
                          onClick={() => removeExperience(index)}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor={`title-${index}`}>Job Title</Label>
                          <Input
                            id={`title-${index}`}
                            value={exp.title}
                            onChange={(e) => updateExperience(index, "title", e.target.value)}
                            className="bg-white/5 border-white/20 text-white"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`company-${index}`}>Company</Label>
                          <Input
                            id={`company-${index}`}
                            value={exp.company}
                            onChange={(e) => updateExperience(index, "company", e.target.value)}
                            className="bg-white/5 border-white/20 text-white"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor={`startDate-${index}`}>Start Date</Label>
                          <Input
                            id={`startDate-${index}`}
                            type="month"
                            value={exp.startDate}
                            onChange={(e) => updateExperience(index, "startDate", e.target.value)}
                            className="bg-white/5 border-white/20 text-white"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`endDate-${index}`}>End Date</Label>
                          <Input
                            id={`endDate-${index}`}
                            type="month"
                            value={exp.endDate}
                            onChange={(e) => updateExperience(index, "endDate", e.target.value)}
                            className="bg-white/5 border-white/20 text-white"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`description-${index}`}>Description</Label>
                        <Textarea
                          id={`description-${index}`}
                          value={exp.description}
                          onChange={(e) => updateExperience(index, "description", e.target.value)}
                          className="bg-white/5 border-white/20 text-white min-h-24"
                        />
                      </div>
                    </div>
                  ))}
                  <Button
                    variant="outline"
                    className="border-white/20 text-white hover:bg-white/10 w-full"
                    onClick={addExperience}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Another Experience
                  </Button>
                </div>
              )}

              <div className="flex justify-between">
                <Button variant="outline" className="border-white/20 text-white hover:bg-white/10" onClick={handleBack}>
                  Back
                </Button>
                <Button onClick={handleNext} className="button-gradient">
                  Next: Education
                  <ChevronRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {step === 4 && (
          <Card className="border-0 bg-white/10 backdrop-blur-sm text-white">
            <CardHeader>
              <CardTitle>Education</CardTitle>
              <CardDescription className="text-white/70">
                Add your educational background to complete your profile
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {profile.education.length === 0 ? (
                <div className="text-center py-8 border border-dashed border-white/20 rounded-lg">
                  <p className="text-white/70 mb-4">No education added yet</p>
                  <Button
                    variant="outline"
                    className="border-white/20 text-white hover:bg-white/10"
                    onClick={addEducation}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Education
                  </Button>
                </div>
              ) : (
                <div className="space-y-6">
                  {profile.education.map((edu, index) => (
                    <div key={index} className="p-4 border border-white/20 rounded-lg space-y-4">
                      <div className="flex justify-between items-start">
                        <h3 className="font-medium">Education {index + 1}</h3>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-white/70 hover:text-white hover:bg-white/10 h-8 w-8 p-0"
                          onClick={() => removeEducation(index)}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor={`school-${index}`}>School</Label>
                          <Input
                            id={`school-${index}`}
                            value={edu.school}
                            onChange={(e) => updateEducation(index, "school", e.target.value)}
                            className="bg-white/5 border-white/20 text-white"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`degree-${index}`}>Degree</Label>
                          <Input
                            id={`degree-${index}`}
                            value={edu.degree}
                            onChange={(e) => updateEducation(index, "degree", e.target.value)}
                            className="bg-white/5 border-white/20 text-white"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`field-${index}`}>Field of Study</Label>
                        <Input
                          id={`field-${index}`}
                          value={edu.field}
                          onChange={(e) => updateEducation(index, "field", e.target.value)}
                          className="bg-white/5 border-white/20 text-white"
                        />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor={`eduStartDate-${index}`}>Start Date</Label>
                          <Input
                            id={`eduStartDate-${index}`}
                            type="month"
                            value={edu.startDate}
                            onChange={(e) => updateEducation(index, "startDate", e.target.value)}
                            className="bg-white/5 border-white/20 text-white"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`eduEndDate-${index}`}>End Date</Label>
                          <Input
                            id={`eduEndDate-${index}`}
                            type="month"
                            value={edu.endDate}
                            onChange={(e) => updateEducation(index, "endDate", e.target.value)}
                            className="bg-white/5 border-white/20 text-white"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                  <Button
                    variant="outline"
                    className="border-white/20 text-white hover:bg-white/10 w-full"
                    onClick={addEducation}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Another Education
                  </Button>
                </div>
              )}

              <div className="flex justify-between">
                <Button variant="outline" className="border-white/20 text-white hover:bg-white/10" onClick={handleBack}>
                  Back
                </Button>
                <Button onClick={handleSubmit} className="button-gradient" disabled={isLoading}>
                  {isLoading ? "Saving..." : "Complete Profile"}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
