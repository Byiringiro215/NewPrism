import Interviews from "@/components/dashboard/applicant/Interviews"
import DashboardLayout from "@/components/dashboard-layout"

export default function InterviewsPage() {
  return (
    <DashboardLayout userType="applicant">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Interviews</h1>
          <p className="text-white/70">Manage your upcoming interviews</p>
        </div>
        <Interviews />
      </div>
    </DashboardLayout>
  )
} 