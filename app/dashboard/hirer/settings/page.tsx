"use client";

import DashboardLayout from "@/components/dashboard-layout";
import { HirerSettings } from "@/components/dashboard/hirer/settings";

export default function SettingsPage() {
  return (
    <DashboardLayout userType="hirer">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Settings</h1>
          <p className="text-white/70">
            Manage your account settings
          </p>
        </div>
        <HirerSettings />
      </div>
    </DashboardLayout>
  );
}
