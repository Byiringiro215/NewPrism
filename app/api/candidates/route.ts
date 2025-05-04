import { NextResponse } from 'next/server';

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

// Mock data for candidates pushed to interview
const candidates: CandidateProfile[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    phone: "123-456-7890",
    location: "New York",
    avatar: "/placeholder-user.jpg",
    role: "Software Engineer",
    experience: 5,
    education: {
      degree: "Master's",
      school: "MIT",
      year: "2020",
    },
    skills: [
      { name: "JavaScript", level: 90 },
      { name: "React", level: 80 },
      { name: "Node.js", level: 70 },
    ],
    languages: [
      { name: "English", level: "Native" },
      { name: "Spanish", level: "Fluent" },
    ],
    certifications: ["AWS Certified Developer"],
    workHistory: [
      {
        company: "Google",
        role: "Frontend Engineer",
        duration: "2 years",
        achievements: ["Developed new features", "Improved performance"],
      },
    ],
    matchScore: 85,
  },
];

export async function GET() {
  return NextResponse.json(candidates);
}
