import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, Globe, Sparkles, Users } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen landing-gradient flex flex-col">
      {/* Navigation */}
      <header className="w-full py-4 px-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-8 h-8 rounded bg-gradient-to-br from-purple-500 to-pink-500">
            <span className="text-white font-bold">P</span>
          </div>
          <span className="text-white font-medium text-xl">prism</span>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/login" className="text-white/80 hover:text-white">
            Log in
          </Link>
          <Button asChild className="button-gradient">
            <Link href="/register">Sign up</Link>
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="flex-1 flex flex-col items-center justify-center p-4 text-white">
        <div className="max-w-4xl text-center space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            <span className="text-gradient">Refracting Talents.</span>
            <br />
            <span className="text-gradient">Perfect Matches.</span>
          </h1>
          <p className="text-xl md:text-2xl font-light">Make AI a job creator — not a job taker.</p>
          <p className="text-lg opacity-80 max-w-2xl mx-auto">
            Prism is an AI-powered job matching platform that connects employers with talent through intelligent
            matching and streamlined hiring processes.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Button asChild size="lg" className="button-gradient">
              <Link href="/register?type=applicant">I'm Looking for Work</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="button-gradient-outline">
              <Link href="/register?type=hirer">I'm Hiring</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-indigo-950/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">Powered by AI, Built for People</h2>
            <p className="text-white/70 max-w-2xl mx-auto">
              Our platform uses advanced AI to create perfect matches between talent and opportunity, while keeping the
              human touch at the center of the hiring process.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Sparkles,
                title: "AI-Powered Matching",
                description:
                  "Our intelligent algorithms analyze skills, experience, and culture fit to create perfect matches.",
              },
              {
                icon: Users,
                title: "Streamlined Hiring",
                description:
                  "From application to onboarding, our platform simplifies and accelerates the entire hiring process.",
              },
              {
                icon: Globe,
                title: "Global Talent Pool",
                description:
                  "Connect with the best talent from around the world, regardless of location or background.",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10 hover:border-purple-500/50 transition-colors"
              >
                <div className="bg-gradient-to-br from-purple-500 to-pink-500 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-white/70">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">How Prism Works</h2>
            <p className="text-white/70 max-w-2xl mx-auto">
              Our platform makes finding the perfect job or candidate simple, efficient, and effective.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div className="space-y-12">
              <h3 className="text-2xl font-bold text-gradient">For Job Seekers</h3>
              <div className="space-y-8">
                {[
                  {
                    step: "1",
                    title: "Create Your Profile",
                    description:
                      "Upload your resume or build your profile from scratch. Our AI will help highlight your skills and experience.",
                  },
                  {
                    step: "2",
                    title: "Discover Opportunities",
                    description:
                      "Browse job listings tailored to your skills and preferences, with real-time compatibility scores.",
                  },
                  {
                    step: "3",
                    title: "Apply with Confidence",
                    description:
                      "Submit applications with AI-enhanced materials and prepare for interviews with our coaching tools.",
                  },
                ].map((step, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="bg-gradient-to-br from-purple-500 to-pink-500 w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold">{step.step}</span>
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-white">{step.title}</h4>
                      <p className="text-white/70 mt-1">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Button asChild className="button-gradient">
                <Link href="/register?type=applicant">
                  Find Your Next Opportunity <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            </div>

            <div className="space-y-12">
              <h3 className="text-2xl font-bold text-gradient">For Employers</h3>
              <div className="space-y-8">
                {[
                  {
                    step: "1",
                    title: "Create Company Profile",
                    description:
                      "Set up your company profile and define what makes your workplace unique to attract the right talent.",
                  },
                  {
                    step: "2",
                    title: "Post Job Openings",
                    description:
                      "Create detailed job listings with our AI-powered description builder to find the perfect candidates.",
                  },
                  {
                    step: "3",
                    title: "Screen & Interview",
                    description:
                      "Review AI-screened applications, schedule interviews, and make data-driven hiring decisions.",
                  },
                ].map((step, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="bg-gradient-to-br from-purple-500 to-pink-500 w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold">{step.step}</span>
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-white">{step.title}</h4>
                      <p className="text-white/70 mt-1">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Button asChild className="button-gradient">
                <Link href="/register?type=hirer">
                  Find Your Next Hire <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-6 bg-indigo-950/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">Success Stories</h2>
            <p className="text-white/70 max-w-2xl mx-auto">
              See how Prism has helped companies and job seekers find their perfect match.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote:
                  "Prism helped me find a job that perfectly matches my skills and career goals. The AI interview coach was a game-changer for my preparation.",
                name: "Alex Johnson",
                role: "Frontend Developer",
                company: "TechCorp",
              },
              {
                quote:
                  "We've reduced our hiring time by 60% and found candidates who are not just qualified, but truly align with our company culture.",
                name: "Sarah Williams",
                role: "HR Director",
                company: "Innovate Inc",
              },
              {
                quote:
                  "The AI-powered matching algorithm found me candidates I might have overlooked using traditional hiring methods. Our team is stronger for it.",
                name: "Michael Chen",
                role: "CTO",
                company: "StartupVision",
              },
            ].map((testimonial, index) => (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10 hover:border-purple-500/50 transition-colors"
              >
                <div className="flex-1">
                  <p className="text-white/90 italic mb-6">"{testimonial.quote}"</p>
                  <div>
                    <p className="font-medium text-white">{testimonial.name}</p>
                    <p className="text-white/70 text-sm">
                      {testimonial.role}, {testimonial.company}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Transform Your Hiring Process?</h2>
          <p className="text-white/70 max-w-2xl mx-auto mb-8">
            Join thousands of companies and job seekers who have found their perfect match with Prism.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="button-gradient">
              <Link href="/register?type=applicant">I'm Looking for Work</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="button-gradient-outline">
              <Link href="/register?type=hirer">I'm Hiring</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-indigo-950/80 border-t border-white/10">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center justify-center w-8 h-8 rounded bg-gradient-to-br from-purple-500 to-pink-500">
                  <span className="text-white font-bold">P</span>
                </div>
                <span className="text-white font-medium text-xl">prism</span>
              </div>
              <p className="text-white/70">Refracting Talents. Perfect Matches.</p>
            </div>
            <div>
              <h3 className="text-white font-bold mb-4">Platform</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-white/70 hover:text-white">
                    For Job Seekers
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-white/70 hover:text-white">
                    For Employers
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-white/70 hover:text-white">
                    Pricing
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-bold mb-4">Company</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-white/70 hover:text-white">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-white/70 hover:text-white">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-white/70 hover:text-white">
                    Careers
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-bold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-white/70 hover:text-white">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-white/70 hover:text-white">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-white/70 hover:text-white">
                    Cookie Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 mt-12 pt-8 text-center text-white/50 text-sm">
            &copy; {new Date().getFullYear()} Prism. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}
