"use client"

import { Card } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export function HirerSettings() {
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    applications: true,
    messages: true,
    updates: false,
  })

  return (
    <div className="space-y-6">
      <Card className="p-6 bg-gray-900 border-gray-700">
        <h2 className="text-xl font-semibold mb-4 text-gold-500">Notification Settings</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="email-notifications" className="text-gray-300">Email Notifications</Label>
            <Switch
              id="email-notifications"
              checked={notifications.email}
              onCheckedChange={(checked) =>
                setNotifications((prev) => ({ ...prev, email: checked }))
              }
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="push-notifications" className="text-gray-300">Push Notifications</Label>
            <Switch
              id="push-notifications"
              checked={notifications.push}
              onCheckedChange={(checked) =>
                setNotifications((prev) => ({ ...prev, push: checked }))
              }
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="application-notifications" className="text-gray-300">New Applications</Label>
            <Switch
              id="application-notifications"
              checked={notifications.applications}
              onCheckedChange={(checked) =>
                setNotifications((prev) => ({ ...prev, applications: checked }))
              }
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="message-notifications" className="text-gray-300">Messages</Label>
            <Switch
              id="message-notifications"
              checked={notifications.messages}
              onCheckedChange={(checked) =>
                setNotifications((prev) => ({ ...prev, messages: checked }))
              }
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="update-notifications" className="text-gray-300">Platform Updates</Label>
            <Switch
              id="update-notifications"
              checked={notifications.updates}
              onCheckedChange={(checked) =>
                setNotifications((prev) => ({ ...prev, updates: checked }))
              }
            />
          </div>
        </div>
      </Card>

      <Card className="p-6 bg-gray-900 border-gray-700">
        <h2 className="text-xl font-semibold mb-4 text-gold-500">Account Settings</h2>
        <div className="space-y-4">
          <Button variant="destructive" className="w-full">
            Delete Account
          </Button>
        </div>
      </Card>
    </div>
  )
}
