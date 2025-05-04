export const companies = [
  {
    name: "Google",
    description: "A leading technology company specializing in internet-related services and products.",
    website: "https://google.com",
    logo_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/2008px-Google_%22G%22_Logo.svg.png",
    industry: "Technology",
    size: "100000+",
    location: "Mountain View, CA"
  },
  {
    name: "Microsoft",
    description: "Global technology corporation that develops and supports software, services, devices, and solutions.",
    website: "https://microsoft.com",
    logo_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/2048px-Microsoft_logo.svg.png",
    industry: "Technology",
    size: "100000+",
    location: "Redmond, WA"
  },
  {
    name: "Apple",
    description: "Technology company that designs, develops, and sells consumer electronics, software, and services.",
    website: "https://apple.com",
    logo_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/1667px-Apple_logo_black.svg.png",
    industry: "Technology",
    size: "100000+",
    location: "Cupertino, CA"
  },
  {
    name: "Amazon",
    description: "Global technology and e-commerce company.",
    website: "https://amazon.com",
    logo_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/2560px-Amazon_logo.svg.png",
    industry: "Technology/Retail",
    size: "100000+",
    location: "Seattle, WA"
  },
  {
    name: "Meta",
    description: "Technology company focusing on social networking and virtual reality.",
    website: "https://meta.com",
    logo_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Meta_Platforms_Inc._logo.svg/2560px-Meta_Platforms_Inc._logo.svg.png",
    industry: "Technology",
    size: "50000+",
    location: "Menlo Park, CA"
  },
  {
    name: "Netflix",
    description: "Streaming media and video-on-demand provider.",
    website: "https://netflix.com",
    logo_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png",
    industry: "Entertainment/Technology",
    size: "10000+",
    location: "Los Gatos, CA"
  },
  {
    name: "Tesla",
    description: "Electric vehicle and clean energy company.",
    website: "https://tesla.com",
    logo_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Tesla_Motors.svg/1200px-Tesla_Motors.svg.png",
    industry: "Automotive/Technology",
    size: "50000+",
    location: "Austin, TX"
  },
  {
    name: "JPMorgan Chase",
    description: "Global financial services firm and banking institution.",
    website: "https://jpmorganchase.com",
    logo_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/JPMorgan_Chase_Logo_2008_1.svg/2560px-JPMorgan_Chase_Logo_2008_1.svg.png",
    industry: "Financial Services",
    size: "100000+",
    location: "New York, NY"
  },
  {
    name: "Adobe",
    description: "Software company focusing on creative and multimedia products.",
    website: "https://adobe.com",
    logo_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Adobe_Corporate_Logo.png/1280px-Adobe_Corporate_Logo.png",
    industry: "Technology",
    size: "25000+",
    location: "San Jose, CA"
  }
]

export const jobs = [
  {
    company_name: "Google",
    title: "Senior Software Engineer",
    description: "Join our team to work on cutting-edge technology solutions that impact billions of users.",
    requirements: {
      skills: ["Java", "Python", "Distributed Systems", "Algorithm Design"],
      experience: "5+ years",
      education: "BS/MS in Computer Science or related field"
    },
    benefits: {
      items: [
        "Competitive salary",
        "Stock options",
        "Health insurance",
        "Flexible work hours",
        "Professional development budget"
      ]
    },
    location: "Mountain View, CA",
    remote_policy: "Hybrid",
    job_type: "Full-time",
    experience_level: "Senior",
    salary_range: {
      min: 180000,
      max: 280000,
      currency: "USD"
    },
    deadline: "2025-07-01"
  },
  {
    company_name: "Microsoft",
    title: "Cloud Solutions Architect",
    description: "Design and implement Azure cloud solutions for enterprise customers.",
    requirements: {
      skills: ["Azure", "Cloud Architecture", "DevOps", "Solution Design"],
      experience: "7+ years",
      education: "BS/MS in Computer Science or equivalent experience"
    },
    benefits: {
      items: [
        "Comprehensive benefits package",
        "401(k) matching",
        "Remote work options",
        "Annual bonus"
      ]
    },
    location: "Redmond, WA",
    remote_policy: "Remote",
    job_type: "Full-time",
    experience_level: "Senior",
    salary_range: {
      min: 160000,
      max: 250000,
      currency: "USD"
    },
    deadline: "2025-06-15"
  },
  {
    company_name: "Apple",
    title: "iOS Developer",
    description: "Create innovative mobile applications for Apple's ecosystem.",
    requirements: {
      skills: ["Swift", "iOS SDK", "UIKit", "SwiftUI"],
      experience: "3+ years",
      education: "Bachelor's degree in Computer Science or related field"
    },
    benefits: {
      items: [
        "Medical and dental coverage",
        "Stock purchase program",
        "Fitness center access",
        "Product discounts"
      ]
    },
    location: "Cupertino, CA",
    remote_policy: "On-site",
    job_type: "Full-time",
    experience_level: "Mid",
    salary_range: {
      min: 140000,
      max: 220000,
      currency: "USD"
    },
    deadline: "2025-06-30"
  },
  {
    company_name: "Meta",
    title: "Machine Learning Engineer",
    description: "Work on AI/ML solutions for Meta's family of apps.",
    requirements: {
      skills: ["Python", "PyTorch", "Deep Learning", "Machine Learning"],
      experience: "4+ years",
      education: "MS/PhD in Computer Science, Machine Learning, or related field"
    },
    benefits: {
      items: [
        "Competitive compensation",
        "Health coverage",
        "Unlimited PTO",
        "Wellness programs"
      ]
    },
    location: "Menlo Park, CA",
    remote_policy: "Hybrid",
    job_type: "Full-time",
    experience_level: "Senior",
    salary_range: {
      min: 170000,
      max: 260000,
      currency: "USD"
    },
    deadline: "2025-07-15"
  },
  {
    company_name: "Amazon",
    title: "Software Development Engineer II",
    description: "Build scalable systems for Amazon's e-commerce platform.",
    requirements: {
      skills: ["Java", "AWS", "Microservices", "Distributed Systems"],
      experience: "3+ years",
      education: "Bachelor's degree in Computer Science or related field"
    },
    benefits: {
      items: [
        "Sign-on bonus",
        "RSU grants",
        "Health benefits",
        "401(k) with match"
      ]
    },
    location: "Seattle, WA",
    remote_policy: "Hybrid",
    job_type: "Full-time",
    experience_level: "Mid",
    salary_range: {
      min: 150000,
      max: 230000,
      currency: "USD"
    },
    deadline: "2025-06-30"
  },
  {
    company_name: "Netflix",
    title: "Full Stack Engineer",
    description: "Develop features for Netflix's streaming platform.",
    requirements: {
      skills: ["JavaScript", "React", "Node.js", "Java"],
      experience: "5+ years",
      education: "BS in Computer Science or equivalent experience"
    },
    benefits: {
      items: [
        "Unlimited vacation",
        "Stock options",
        "Premium healthcare",
        "Home office setup"
      ]
    },
    location: "Los Gatos, CA",
    remote_policy: "Remote",
    job_type: "Full-time",
    experience_level: "Senior",
    salary_range: {
      min: 180000,
      max: 300000,
      currency: "USD"
    },
    deadline: "2025-07-30"
  },
  {
    company_name: "Tesla",
    title: "Autopilot Engineer",
    description: "Work on autonomous driving technology for Tesla vehicles.",
    requirements: {
      skills: ["C++", "Computer Vision", "Machine Learning", "CUDA"],
      experience: "4+ years",
      education: "MS/PhD in Computer Science, Robotics, or related field"
    },
    benefits: {
      items: [
        "Health insurance",
        "Stock purchase plan",
        "Free charging",
        "Vehicle discount"
      ]
    },
    location: "Austin, TX",
    remote_policy: "On-site",
    job_type: "Full-time",
    experience_level: "Senior",
    salary_range: {
      min: 160000,
      max: 250000,
      currency: "USD"
    },
    deadline: "2025-08-15"
  },
  {
    company_name: "JPMorgan Chase",
    title: "Blockchain Developer",
    description: "Develop blockchain solutions for financial services.",
    requirements: {
      skills: ["Solidity", "Ethereum", "Smart Contracts", "Web3.js"],
      experience: "3+ years",
      education: "Bachelor's degree in Computer Science or related field"
    },
    benefits: {
      items: [
        "Competitive salary",
        "Annual bonus",
        "Health benefits",
        "Retirement plans"
      ]
    },
    location: "New York, NY",
    remote_policy: "Hybrid",
    job_type: "Full-time",
    experience_level: "Mid",
    salary_range: {
      min: 140000,
      max: 200000,
      currency: "USD"
    },
    deadline: "2025-07-01"
  },
  {
    company_name: "Adobe",
    title: "Senior Product Designer",
    description: "Design user experiences for Adobe's Creative Cloud suite.",
    requirements: {
      skills: ["UI/UX Design", "Figma", "Adobe XD", "Design Systems"],
      experience: "5+ years",
      education: "Bachelor's degree in Design or related field"
    },
    benefits: {
      items: [
        "Creative Cloud subscription",
        "Health coverage",
        "401(k) matching",
        "Flexible schedule"
      ]
    },
    location: "San Jose, CA",
    remote_policy: "Hybrid",
    job_type: "Full-time",
    experience_level: "Senior",
    salary_range: {
      min: 150000,
      max: 220000,
      currency: "USD"
    },
    deadline: "2025-06-30"
  }
]