"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useToast } from "@/components/ui/use-toast"
import { simulatedAuth, simulatedDb } from "@/lib/auth/simulated-auth"

export default function RegisterPage() {
  const searchParams = useSearchParams()
  const defaultType = searchParams.get("type") || "applicant"
  const router = useRouter()
  const { toast } = useToast()

  const [userType, setUserType] = useState<"applicant" | "hirer">(defaultType === "hirer" ? "hirer" : "applicant")
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const handleEmailSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Sign up with simulated auth
      const { data: authData, error: authError } = await simulatedAuth.signUp(formData.email, formData.password, {
        first_name: formData.firstName,
        last_name: formData.lastName,
        user_type: userType,
      })

      if (authError) throw authError

      // Create user record in our simulated users table
      const { error: userError } = await simulatedDb.insert("users", [
        {
          id: authData.user?.id,
          email: formData.email,
          first_name: formData.firstName,
          last_name: formData.lastName,
          user_type: userType,
        },
      ])

      if (userError) throw userError

      // If user is a hirer, create a placeholder company
      if (userType === "hirer") {
        const { data: companyData, error: companyError } = await simulatedDb.insert("companies", [
          {
            name: `${formData.firstName}'s Company`,
            description: "Company description pending...",
          },
        ])

        if (companyError) throw companyError

        // Create hirer record
        if (companyData && companyData[0]) {
          const { error: hirerError } = await simulatedDb.insert("hirers", [
            {
              user_id: authData.user?.id,
              company_id: companyData[0].id,
              position: "Account Owner",
            },
          ])

          if (hirerError) throw hirerError
        }
      } else {
        // Create applicant record
        const { error: applicantError } = await simulatedDb.insert("applicants", [
          {
            user_id: authData.user?.id,
            headline: `${formData.firstName} ${formData.lastName}`,
          },
        ])

        if (applicantError) throw applicantError
      }

      toast({
        title: "Registration successful",
        description: "Your account has been created successfully!",
      })

      // Redirect to onboarding
      setTimeout(() => {
        router.push(`/onboarding/${userType}`)
      }, 1000)
    } catch (error: any) {
      toast({
        title: "Registration failed",
        description: error.message || "An error occurred during registration.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleSignUp = async () => {
    setIsLoading(true)

    try {
      await simulatedAuth.signInWithOAuth("google")

      toast({
        title: "Registration successful",
        description: "Your account has been created with Google!",
      })

      // Redirect to onboarding
      setTimeout(() => {
        router.push(`/onboarding/${userType}`)
      }, 1000)
    } catch (error: any) {
      toast({
        title: "Sign up failed",
        description: error.message || "An error occurred during Google sign up.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen auth-gradient flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 mb-4">
            <span className="text-white text-2xl font-bold">P</span>
          </div>
          <h1 className="text-3xl font-bold text-white">Create your account</h1>
          <p className="text-white/70 mt-2">Join Prism and start your journey</p>
        </div>

        <Card className="border-0 bg-white/10 backdrop-blur-sm text-white">
          <CardHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>I am...</Label>
                <RadioGroup
                  defaultValue={userType}
                  onValueChange={(value) => setUserType(value as "applicant" | "hirer")}
                  className="grid grid-cols-2 gap-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="applicant" id="applicant" className="border-white/20" />
                    <Label htmlFor="applicant" className="cursor-pointer">
                      Looking for Work
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="hirer" id="hirer" className="border-white/20" />
                    <Label htmlFor="hirer" className="cursor-pointer">
                      Hiring
                    </Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="email" className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-white/5">
                <TabsTrigger value="email" className="data-[state=active]:bg-white/10">
                  Email
                </TabsTrigger>
                <TabsTrigger value="google" className="data-[state=active]:bg-white/10">
                  Google
                </TabsTrigger>
              </TabsList>

              <TabsContent value="email" className="mt-4">
                <form onSubmit={handleEmailSignUp}>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First name</Label>
                        <Input
                          id="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          required
                          className="bg-white/5 border-white/20 text-white"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last name</Label>
                        <Input
                          id="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          required
                          className="bg-white/5 border-white/20 text-white"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="bg-white/5 border-white/20 text-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <Input
                        id="password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        className="bg-white/5 border-white/20 text-white"
                      />
                    </div>
                    <Button type="submit" className="w-full button-gradient" disabled={isLoading}>
                      {isLoading ? "Creating account..." : "Create account"}
                    </Button>
                  </div>
                </form>
              </TabsContent>

              <TabsContent value="google" className="mt-4">
                <div className="text-center py-6">
                  <Button
                    variant="outline"
                    className="w-full border-white/20 text-white hover:bg-white/10"
                    onClick={handleGoogleSignUp}
                    disabled={isLoading}
                  >
                    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                      <path
                        fill="currentColor"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="currentColor"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                    Sign up with Google
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="flex justify-center">
            <p className="text-sm text-white/70">
              Already have an account?{" "}
              <Link href="/login" className="text-purple-300 hover:text-purple-200">
                Sign in
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
