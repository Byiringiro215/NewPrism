"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { Bell, Mail, Shield, User } from "lucide-react";

interface NotificationSettings {
  newApplications: boolean;
  interviewReminders: boolean;
  applicationUpdates: boolean;
  messages: boolean;
  marketingEmails: boolean;
  weeklyDigest: boolean;
}

interface SecuritySettings {
  twoFactorAuth: boolean;
  sessionTimeout: number;
  loginNotifications: boolean;
}

export default function HirerSettings() {
  const { toast } = useToast();
  const [notifications, setNotifications] = useState<NotificationSettings>({
    newApplications: true,
    interviewReminders: true,
    applicationUpdates: true,
    messages: true,
    marketingEmails: false,
    weeklyDigest: true,
  });

  const [security, setSecurity] = useState<SecuritySettings>({
    twoFactorAuth: false,
    sessionTimeout: 30,
    loginNotifications: true,
  });

  const handleNotificationChange = (key: keyof NotificationSettings) => {
    setNotifications((prev) => {
      const updated = { ...prev, [key]: !prev[key] };
      // In a real app, this would make an API call
      return updated;
    });

    toast({
      title: "Settings updated",
      description: "Your notification preferences have been saved.",
    });
  };

  const handleSecurityChange = (key: keyof SecuritySettings, value: boolean | number) => {
    setSecurity((prev) => {
      const updated = { ...prev, [key]: value };
      // In a real app, this would make an API call
      return updated;
    });

    toast({
      title: "Settings updated",
      description: "Your security settings have been saved.",
    });
  };

  return (
    <Tabs defaultValue="profile" className="space-y-6">
      <TabsList>
        <TabsTrigger value="profile" className="gap-2">
          <User className="w-4 h-4" />
          Profile
        </TabsTrigger>
        <TabsTrigger value="notifications" className="gap-2">
          <Bell className="w-4 h-4" />
          Notifications
        </TabsTrigger>
        <TabsTrigger value="security" className="gap-2">
          <Shield className="w-4 h-4" />
          Security
        </TabsTrigger>
      </TabsList>

      <TabsContent value="profile">
        <Card className="bg-card/50 backdrop-blur-xl border-white/10">
          <CardHeader>
            <CardTitle>Profile Settings</CardTitle>
            <CardDescription>
              Manage your account information and preferences
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Full Name</Label>
                <Input placeholder="John Doe" />
              </div>
              <div className="space-y-2">
                <Label>Email</Label>
                <Input type="email" placeholder="john@company.com" />
              </div>
              <div className="space-y-2">
                <Label>Phone</Label>
                <Input type="tel" placeholder="+1 (555) 000-0000" />
              </div>
              <div className="space-y-2">
                <Label>Job Title</Label>
                <Input placeholder="Hiring Manager" />
              </div>
            </div>
            <Button>Save Changes</Button>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="notifications">
        <Card className="bg-card/50 backdrop-blur-xl border-white/10">
          <CardHeader>
            <CardTitle>Notification Preferences</CardTitle>
            <CardDescription>
              Choose what notifications you want to receive
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>New Applications</Label>
                  <p className="text-sm text-white/70">
                    Receive notifications when candidates apply to your jobs
                  </p>
                </div>
                <Switch
                  checked={notifications.newApplications}
                  onCheckedChange={() => handleNotificationChange("newApplications")}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Interview Reminders</Label>
                  <p className="text-sm text-white/70">
                    Get reminded about upcoming interviews
                  </p>
                </div>
                <Switch
                  checked={notifications.interviewReminders}
                  onCheckedChange={() => handleNotificationChange("interviewReminders")}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Application Updates</Label>
                  <p className="text-sm text-white/70">
                    Stay informed about changes to applications
                  </p>
                </div>
                <Switch
                  checked={notifications.applicationUpdates}
                  onCheckedChange={() => handleNotificationChange("applicationUpdates")}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Messages</Label>
                  <p className="text-sm text-white/70">
                    Get notified about new messages from candidates
                  </p>
                </div>
                <Switch
                  checked={notifications.messages}
                  onCheckedChange={() => handleNotificationChange("messages")}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Marketing Emails</Label>
                  <p className="text-sm text-white/70">
                    Receive updates about new features and promotions
                  </p>
                </div>
                <Switch
                  checked={notifications.marketingEmails}
                  onCheckedChange={() => handleNotificationChange("marketingEmails")}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Weekly Digest</Label>
                  <p className="text-sm text-white/70">
                    Get a summary of your hiring activity every week
                  </p>
                </div>
                <Switch
                  checked={notifications.weeklyDigest}
                  onCheckedChange={() => handleNotificationChange("weeklyDigest")}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="security">
        <Card className="bg-card/50 backdrop-blur-xl border-white/10">
          <CardHeader>
            <CardTitle>Security Settings</CardTitle>
            <CardDescription>
              Manage your account security preferences
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Two-Factor Authentication</Label>
                  <p className="text-sm text-white/70">
                    Add an extra layer of security to your account
                  </p>
                </div>
                <Switch
                  checked={security.twoFactorAuth}
                  onCheckedChange={(checked) => 
                    handleSecurityChange("twoFactorAuth", checked)
                  }
                />
              </div>

              <div className="space-y-2">
                <Label>Session Timeout (minutes)</Label>
                <Input
                  type="number"
                  min={5}
                  max={120}
                  value={security.sessionTimeout}
                  onChange={(e) => 
                    handleSecurityChange("sessionTimeout", parseInt(e.target.value))
                  }
                />
                <p className="text-sm text-white/70">
                  Automatically log out after period of inactivity
                </p>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Login Notifications</Label>
                  <p className="text-sm text-white/70">
                    Get notified of new logins to your account
                  </p>
                </div>
                <Switch
                  checked={security.loginNotifications}
                  onCheckedChange={(checked) => 
                    handleSecurityChange("loginNotifications", checked)
                  }
                />
              </div>

              <div className="pt-4">
                <Button variant="destructive" type="button">
                  Delete Account
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}