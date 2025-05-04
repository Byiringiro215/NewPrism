"use client";

import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerFooter } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, Mail, Phone, MapPin, Briefcase, Award, User2, CheckCircle2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast"

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

interface CandidateProfileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  candidate: CandidateProfile;
  onPushToInterview: (candidateId: string) => void;
}

export function CandidateProfileDrawer({ isOpen, onClose, candidate, onPushToInterview }: CandidateProfileDrawerProps) {
  const { toast } = useToast()

  return (
    <Drawer open={isOpen} onOpenChange={onClose}>
      <DrawerContent className="h-[85vh] glass border-white/10 max-w-md mx-auto">
        <DrawerHeader>
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={candidate?.avatar} />
              <AvatarFallback>{candidate?.name?.[0]}</AvatarFallback>
            </Avatar>
            <div>
              <DrawerTitle className="text-2xl">{candidate?.name}</DrawerTitle>
              <DrawerDescription>{candidate?.role}</DrawerDescription>
            </div>
          </div>
        </DrawerHeader>

        <div className="overflow-y-auto px-4 pb-8">
          {/* Contact Information */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="flex items-center gap-2 text-sm">
              <Mail className="w-4 h-4 opacity-70" />
              <span>{candidate?.email}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Phone className="w-4 h-4 opacity-70" />
              <span>{candidate?.phone}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <MapPin className="w-4 h-4 opacity-70" />
              <span>{candidate?.location}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Briefcase className="w-4 h-4 opacity-70" />
              <span>{candidate?.experience} years experience</span>
            </div>
          </div>

          {/* Match Score */}
          <Card className="mb-6 glass">
            <CardContent className="pt-6">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Match Score</span>
                  <span className="text-sm font-medium">{candidate?.matchScore}%</span>
                </div>
                <Progress value={candidate?.matchScore} className="h-2" />
              </div>
            </CardContent>
          </Card>

          {/* Skills */}
          <Card className="mb-6 glass">
            <CardHeader>
              <CardTitle className="text-base">Skills & Expertise</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {candidate?.skills?.map((skill) => (
                  <div key={skill.name} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>{skill.name}</span>
                      <span>{skill.level}%</span>
                    </div>
                    <Progress value={skill.level} className="h-1" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Work History */}
          <Card className="mb-6 glass">
            <CardHeader>
              <CardTitle className="text-base">Work History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {candidate?.workHistory?.map((work, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between">
                      <div>
                        <h4 className="font-medium">{work.role}</h4>
                        <p className="text-sm opacity-70">{work.company}</p>
                      </div>
                      <span className="text-sm opacity-70">{work.duration}</span>
                    </div>
                    <ul className="space-y-1">
                      {work.achievements.map((achievement, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm">
                          <CheckCircle2 className="w-4 h-4 mt-1 text-green-500" />
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Education & Certifications */}
          <Card className="mb-6 glass">
            <CardHeader>
              <CardTitle className="text-base">Education & Certifications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <User2 className="w-4 h-4 mt-1 opacity-70" />
                  <div>
                    <h4 className="font-medium">{candidate?.education?.degree}</h4>
                    <p className="text-sm opacity-70">{candidate?.education?.school}</p>
                    <p className="text-sm opacity-70">{candidate?.education?.year}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Award className="w-4 h-4 mt-1 opacity-70" />
                  <div className="flex flex-wrap gap-2">
                    {candidate?.certifications?.map((cert, index) => (
                      <Badge key={index} variant="secondary">
                        {cert}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Languages */}
          <Card className="glass">
            <CardHeader>
              <CardTitle className="text-base">Languages</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {candidate?.languages?.map((lang) => (
                  <Badge key={lang.name} variant="outline">
                    {lang.name} - {lang.level}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <DrawerFooter>
          <Button 
            size="lg" 
            className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
            onClick={() => {
              onPushToInterview(candidate.id);
              toast({
                title: "Success",
                description: "Candidate pushed to interview.",
              })
            }}
          >
            Push to Interview
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
