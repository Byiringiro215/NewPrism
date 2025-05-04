"use client";

import DashboardLayout from "@/components/dashboard-layout";
import CompanyProfile from "@/components/dashboard/hirer/CompanyProfile";

export default function CompanyProfilePage() {
  return (
    <DashboardLayout userType="hirer">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Company Profile</h1>
          <p className="text-white/70">
            Manage your company information and employer branding
          </p>
        </div>

        <CompanyProfile />
      </div>
    </DashboardLayout>
  );
}