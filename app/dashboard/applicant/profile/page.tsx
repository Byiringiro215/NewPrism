"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase/client"
import { useToast } from "@/components/ui/use-toast"
import DashboardLayout from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Download,
  Mail,
  MapPin,
  Phone,
  Calendar,
  Linkedin,
  Github,
  Twitter,
  Globe,
  Plus,
  Briefcase,
  Award,
  Book,
} from "lucide-react"

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      duration: 0.5,
    },
  },
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
}

interface ProfileData {
  firstName: string
  lastName: string
  headline: string
  bio: string
  location: string
  email: string
  phone: string
  availability: string
  skills: { name: string; level: number }[]
  softSkills: string[]
  experience: {
    title: string
    company: string
    location: string
    type: string
    period: string
    description: string
  }[]
  certifications: {
    name: string
    issuer: string
    date: string
    url?: string
  }[]
  socials: {
    linkedin?: string
    github?: string
    twitter?: string
    website?: string
  }
}

export default function ApplicantProfilePage() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(true)
  const [isEditMode, setIsEditMode] = useState(false)
  const [profile, setProfile] = useState<ProfileData>({
    firstName: "Don",
    lastName: "Durkheim",
    headline: "Senior Sociologist | Research Methods Specialist | Data Analytics Expert",
    bio: "Experienced sociologist with expertise in quantitative and qualitative research methods. Specializing in organizational behavior and social structures analysis. Passionate about leveraging data analytics to understand complex social phenomena.",
    location: "Boston, MA",
    email: "don.durkheim@email.com",
    phone: "(617) 555-0123",
    availability: "Open to opportunities",
    skills: [
      { name: "Research Methods", level: 95 },
      { name: "Data Analysis", level: 90 },
      { name: "Statistical Software (R, SPSS)", level: 85 },
      { name: "Survey Design", level: 88 },
      { name: "Ethnographic Research", level: 92 }
    ],
    softSkills: [
      "Critical Thinking",
      "Research Leadership",
      "Communication",
      "Project Management",
      "Cross-cultural Awareness"
    ],
    experience: [
      {
        title: "Lead Research Sociologist",
        company: "Social Research Institute",
        location: "Boston, MA",
        type: "Full-time",
        period: "2020 - Present",
        description: "Leading quantitative and qualitative research projects on organizational behavior and social structures. Managing a team of 5 researchers and coordinating with international research partners."
      },
      {
        title: "Research Associate",
        company: "Urban Studies Center",
        location: "Cambridge, MA",
        type: "Full-time",
        period: "2017 - 2020",
        description: "Conducted mixed-methods research on urban social patterns and community development. Published 8 peer-reviewed papers and presented at major conferences."
      }
    ],
    certifications: [
      {
        name: "Advanced Research Methods Certification",
        issuer: "American Sociological Association",
        date: "2023",
        url: "https://asa.org/certifications/arm-2023"
      },
      {
        name: "Data Science for Social Research",
        issuer: "Harvard Extension School",
        date: "2022",
        url: "https://extension.harvard.edu/certificates/ds-2022"
      }
    ],
    socials: {
      linkedin: "https://linkedin.com/in/don-durkheim",
      twitter: "https://twitter.com/dondurkheim",
      website: "https://dondurkheim.academia.edu"
    }
  })

  useEffect(() => {
    loadProfile()
  }, [])

  const loadProfile = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error("Not authenticated")

      const { data: userData, error: userError } = await supabase
        .from("users")
        .select("*")
        .eq("id", user.id)
        .single()

      if (userError) throw userError

      const { data: applicantData, error: applicantError } = await supabase
        .from("applicants")
        .select("*")
        .eq("user_id", user.id)
        .single()

      if (applicantError) throw applicantError

      setProfile({
        firstName: userData.first_name,
        lastName: userData.last_name,
        headline: applicantData.headline,
        bio: applicantData.bio,
        location: applicantData.location,
        email: userData.email,
        phone: applicantData.phone || "",
        availability: applicantData.availability || "",
        skills: applicantData.skills || [],
        softSkills: applicantData.soft_skills || [],
        experience: applicantData.experience || [],
        certifications: applicantData.certifications || [],
        socials: applicantData.socials || {},
      })
    } catch (error: any) {
      toast({
        title: "Error loading profile",
        description: error.message,
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <DashboardLayout userType="applicant">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="space-y-6"
      >
        <motion.div
          variants={itemVariants}
          className="flex justify-between items-center"
        >
          <div>
            <h1 className="text-2xl font-bold text-white">My Profile</h1>
            <p className="text-white/70">Manage your professional profile</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
              <Download className="w-4 h-4 mr-2" />
              Export Profile
            </Button>
            <Button onClick={() => setIsEditMode(true)}>Edit Profile</Button>
          </div>
        </motion.div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="bg-white/5 border-white/20">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="experience">Experience</TabsTrigger>
            <TabsTrigger value="skills">Skills</TabsTrigger>
            <TabsTrigger value="education">Education</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <Card className="border-white/20 bg-white/5 backdrop-blur-sm">
              <CardContent className="p-6">
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-8"
                >
                  <motion.div variants={itemVariants} className="space-y-6">
                    <div className="aspect-square rounded-lg bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center text-4xl font-bold text-white">
                      {profile.firstName?.[0]}{profile.lastName?.[0]}
                    </div>

                    <div className="space-y-2">
                      <h2 className="text-2xl font-bold">{profile.firstName} {profile.lastName}</h2>
                      <p className="text-lg text-white/80">{profile.headline}</p>
                    </div>

                    <motion.div
                      variants={itemVariants}
                      className="flex flex-wrap gap-2"
                    >
                      <Badge
                        className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                      >
                        {profile.availability}
                      </Badge>
                      <Badge variant="outline" className="border-white/20 text-white">
                        Remote
                      </Badge>
                      <Badge variant="outline" className="border-white/20 text-white">
                        Full-time
                      </Badge>
                    </motion.div>

                    <motion.div variants={itemVariants} className="space-y-3 text-sm">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-white/70" />
                        <span>{profile.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-white/70" />
                        <span>{profile.email}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-white/70" />
                        <span>{profile.phone}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-white/70" />
                        <span>{profile.availability}</span>
                      </div>
                    </motion.div>

                    <motion.div variants={itemVariants} className="flex gap-2">
                      {profile.socials?.linkedin && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="rounded-full text-white/70 hover:text-white hover:bg-white/10"
                          onClick={() => window.open(profile.socials.linkedin, '_blank')}
                        >
                          <Linkedin className="w-5 h-5" />
                        </Button>
                      )}
                      {profile.socials?.github && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="rounded-full text-white/70 hover:text-white hover:bg-white/10"
                          onClick={() => window.open(profile.socials.github, '_blank')}
                        >
                          <Github className="w-5 h-5" />
                        </Button>
                      )}
                      {profile.socials?.twitter && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="rounded-full text-white/70 hover:text-white hover:bg-white/10"
                          onClick={() => window.open(profile.socials.twitter, '_blank')}
                        >
                          <Twitter className="w-5 h-5" />
                        </Button>
                      )}
                      {profile.socials?.website && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="rounded-full text-white/70 hover:text-white hover:bg-white/10"
                          onClick={() => window.open(profile.socials.website, '_blank')}
                        >
                          <Globe className="w-5 h-5" />
                        </Button>
                      )}
                    </motion.div>
                  </motion.div>

                  <motion.div variants={containerVariants} className="space-y-8">
                    <motion.div variants={itemVariants}>
                      <h3 className="text-xl font-semibold mb-4">About Me</h3>
                      <p className="text-white/80 leading-relaxed">{profile.bio}</p>
                    </motion.div>

                    <motion.div variants={itemVariants}>
                      <h3 className="text-xl font-semibold mb-4">Top Skills</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {profile.skills.slice(0, 6).map((skill, index) => (
                          <motion.div
                            key={index}
                            initial={{ width: 0 }}
                            animate={{ width: "100%" }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                          >
                            <div className="flex justify-between mb-1">
                              <span className="text-sm font-medium">{skill.name}</span>
                              <span className="text-sm text-white/70">{skill.level}%</span>
                            </div>
                            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                              <motion.div
                                className="h-full bg-gradient-to-r from-purple-600 to-blue-600"
                                initial={{ width: 0 }}
                                animate={{ width: `${skill.level}%` }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                              />
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>

                    <motion.div variants={itemVariants}>
                      <h3 className="text-xl font-semibold mb-4">Latest Experience</h3>
                      {profile.experience.slice(0, 2).map((exp, index) => (
                        <motion.div
                          key={index}
                          variants={itemVariants}
                          className="mb-4 p-4 rounded-lg bg-white/5 border border-white/10"
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-medium">{exp.title}</h4>
                              <p className="text-white/70">{exp.company}</p>
                            </div>
                            <Badge variant="outline" className="border-white/20">
                              {exp.type}
                            </Badge>
                          </div>
                          <p className="text-sm text-white/60 mt-1">{exp.period}</p>
                          <p className="text-sm mt-2">{exp.description}</p>
                        </motion.div>
                      ))}
                    </motion.div>
                  </motion.div>
                </motion.div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="skills">
            <Card className="border-white/20 bg-white/5 backdrop-blur-sm">
              <CardContent className="p-6">
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="space-y-8"
                >
                  <motion.div variants={itemVariants}>
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-xl font-semibold">Technical Skills</h3>
                      <Button variant="outline" className="border-white/20" onClick={() => setIsEditMode(true)}>
                        <Plus className="w-4 h-4 mr-2" />
                        Add Skill
                      </Button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {profile.skills.map((skill, index) => (
                        <motion.div
                          key={index}
                          variants={itemVariants}
                          className="p-4 rounded-lg bg-white/5 border border-white/10"
                        >
                          <div className="flex justify-between mb-2">
                            <h4 className="font-medium">{skill.name}</h4>
                            <span className="text-sm text-white/70">{skill.level}%</span>
                          </div>
                          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                            <motion.div
                              className="h-full bg-gradient-to-r from-purple-600 to-blue-600"
                              initial={{ width: 0 }}
                              animate={{ width: `${skill.level}%` }}
                              transition={{ duration: 0.8, ease: "easeOut" }}
                            />
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <h3 className="text-xl font-semibold mb-4">Soft Skills</h3>
                    <motion.div 
                      className="flex flex-wrap gap-2"
                      variants={containerVariants}
                    >
                      {profile.softSkills.map((skill, index) => (
                        <motion.div
                          key={index}
                          variants={itemVariants}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Badge 
                            className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 hover:from-purple-600 hover:to-blue-600 transition-colors"
                          >
                            {skill}
                          </Badge>
                        </motion.div>
                      ))}
                    </motion.div>
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <h3 className="text-xl font-semibold mb-4">Certifications</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {profile.certifications.map((cert, index) => (
                        <motion.div
                          key={index}
                          variants={itemVariants}
                          whileHover={{ y: -5 }}
                          className="p-4 rounded-lg bg-white/5 border border-white/10"
                        >
                          <Award className="w-8 h-8 text-purple-500 mb-2" />
                          <h4 className="font-medium">{cert.name}</h4>
                          <p className="text-sm text-white/70">{cert.issuer}</p>
                          <p className="text-xs text-white/50 mt-1">{cert.date}</p>
                          {cert.url && (
                            <Button
                              variant="link"
                              className="text-xs mt-2 h-auto p-0"
                              onClick={() => window.open(cert.url, '_blank')}
                            >
                              View Certificate
                            </Button>
                          )}
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </motion.div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="experience">
            <Card className="border-white/20 bg-white/5 backdrop-blur-sm">
              <CardContent className="p-6">
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="space-y-6"
                >
                  <motion.div variants={itemVariants} className="flex justify-between items-center">
                    <h3 className="text-xl font-semibold">Work Experience</h3>
                    <Button variant="outline" className="border-white/20" onClick={() => setIsEditMode(true)}>
                      <Plus className="w-4 h-4 mr-2" />
                      Add Experience
                    </Button>
                  </motion.div>

                  <motion.div variants={containerVariants} className="space-y-6">
                    {profile.experience.map((exp, index) => (
                      <motion.div
                        key={index}
                        variants={itemVariants}
                        className="relative pl-8 pb-8 last:pb-0"
                      >
                        <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-purple-600 to-blue-600" />
                        <div className="absolute left-[-4px] top-2 w-2 h-2 rounded-full bg-white" />
                        
                        <div className="p-6 rounded-lg bg-white/5 border border-white/10">
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <h4 className="text-lg font-semibold">{exp.title}</h4>
                              <p className="text-white/70">{exp.company}</p>
                              <div className="flex items-center gap-2 mt-1 text-sm text-white/50">
                                <MapPin className="w-3 h-3" />
                                {exp.location}
                              </div>
                            </div>
                            <Badge variant="outline" className="border-white/20">
                              {exp.type}
                            </Badge>
                          </div>
                          
                          <div className="flex items-center gap-2 mb-4">
                            <Calendar className="w-4 h-4 text-white/50" />
                            <span className="text-sm text-white/70">{exp.period}</span>
                          </div>
                          
                          <p className="text-white/80 leading-relaxed">
                            {exp.description}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                </motion.div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </DashboardLayout>
  )
}
