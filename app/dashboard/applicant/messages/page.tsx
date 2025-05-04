import Messages from "@/components/dashboard/applicant/Messages"
import DashboardLayout from "@/components/dashboard-layout"

export default function MessagesPage() {
  return (
    <DashboardLayout userType="applicant">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Messages</h1>
          <p className="text-white/70">Communicate with recruiters and interviewers</p>
        </div>
        <Messages />
      </div>
    </DashboardLayout>
  )
} 