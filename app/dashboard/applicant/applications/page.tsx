"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import Applications from "@/components/dashboard/applicant/Applications"
import DashboardLayout from "@/components/dashboard-layout"
import { Building2, Clock, CheckCircle2, XCircle } from "lucide-react"
import { supabase } from "@/lib/supabase/client"

interface ApplicationStats {
  total: number
  inReview: number
  accepted: number
  rejected: number
}

export default function ApplicationsPage() {
  const [stats, setStats] = useState<ApplicationStats>({
    total: 0,
    inReview: 0,
    accepted: 0,
    rejected: 0
  })

  useEffect(() => {
    loadStats()
  }, [])

  const loadStats = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const { data: applicantData } = await supabase
        .from("applicants")
        .select("id")
        .eq("user_id", user.id)
        .single()

      if (!applicantData) return

      const { data: applications } = await supabase
        .from("applications")
        .select("status")
        .eq("applicant_id", applicantData.id)

      if (!applications) return

      setStats({
        total: applications.length,
        inReview: applications.filter(app => app.status === "in_review").length,
        accepted: applications.filter(app => app.status === "accepted").length,
        rejected: applications.filter(app => app.status === "rejected").length
      })
    } catch (error) {
      console.error("Error loading stats:", error)
    }
  }

  return (
    <DashboardLayout userType="applicant">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Applications</h1>
          <p className="text-white/70">Track and manage your job applications</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-white/5 border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-white/70">Total Applications</p>
                  <h3 className="text-2xl font-bold text-white mt-1">{stats.total}</h3>
                </div>
                <div className="p-3 bg-blue-500/20 rounded-xl">
                  <Building2 className="w-6 h-6 text-blue-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/5 border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-white/70">In Review</p>
                  <h3 className="text-2xl font-bold text-white mt-1">{stats.inReview}</h3>
                </div>
                <div className="p-3 bg-yellow-500/20 rounded-xl">
                  <Clock className="w-6 h-6 text-yellow-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/5 border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-white/70">Accepted</p>
                  <h3 className="text-2xl font-bold text-white mt-1">{stats.accepted}</h3>
                </div>
                <div className="p-3 bg-green-500/20 rounded-xl">
                  <CheckCircle2 className="w-6 h-6 text-green-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/5 border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-white/70">Rejected</p>
                  <h3 className="text-2xl font-bold text-white mt-1">{stats.rejected}</h3>
                </div>
                <div className="p-3 bg-red-500/20 rounded-xl">
                  <XCircle className="w-6 h-6 text-red-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Applications />
      </div>
    </DashboardLayout>
  )
}