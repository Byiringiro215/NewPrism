"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Bell,
  Briefcase,
  Building2,
  Calendar,
  ChevronDown,
  History,
  Home,
  Key,
  LogOut,
  Menu,
  MessageSquare,
  PanelLeft,
  PanelRight,
  PieChart,
  Search,
  Settings,
  User,
  Users,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface DashboardLayoutProps {
  children: React.ReactNode
  userType?: "hirer" | "applicant"
}

export default function DashboardLayout({ children, userType = "hirer" }: DashboardLayoutProps) {
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [isHovered, setIsHovered] = useState(false)

  const hirerNavItems = [
    { name: "Dashboard", href: "/dashboard/hirer", icon: Home, color: "text-blue-500" },
    { name: "Jobs", href: "/dashboard/hirer/jobs", icon: Briefcase, color: "text-green-500" },
    { name: "Candidates", href: "/dashboard/hirer/candidates", icon: Users, color: "text-purple-500" },
    { name: "Interviews", href: "/dashboard/hirer/interviews", icon: Calendar, color: "text-pink-500" },
    { name: "Messages", href: "/dashboard/hirer/messages", icon: MessageSquare, color: "text-cyan-500" },
    { name: "Company", href: "/dashboard/hirer/company", icon: Building2, color: "text-orange-500" },
    { name: "Settings", href: "/dashboard/hirer/settings", icon: Settings, color: "text-yellow-500" },
  ]

  const applicantNavItems = [
    { name: "Dashboard", href: "/dashboard/applicant", icon: Home, color: "text-blue-500" },
    { name: "My Profile", href: "/dashboard/applicant/profile", icon: User, color: "text-purple-500" },
    { name: "Job Search", href: "/dashboard/applicant/jobs", icon: Briefcase, color: "text-green-500" },
    { name: "Applications", href: "/dashboard/applicant/applications", icon: History, color: "text-orange-500" },
    { name: "Interviews", href: "/dashboard/applicant/interviews", icon: Calendar, color: "text-pink-500" },
    { name: "Messages", href: "/dashboard/applicant/messages", icon: MessageSquare, color: "text-cyan-500" },
  ]

  const navItems = userType === "hirer" ? hirerNavItems : applicantNavItems

  return (
    <div className="min-h-screen bg-dashboard flex">
      {/* Sidebar */}
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`fixed inset-y-0 left-0 z-50 bg-card/50 backdrop-blur-xl border-r border-white/10 
          transition-all duration-300 ease-in-out ${isHovered ? 'w-64' : 'w-20'}`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className={`p-6 transition-all duration-300 ${isHovered ? 'px-6' : 'px-4'}`}>
            {isHovered ? (
              <h1 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-indigo-500 bg-clip-text text-transparent">
                Prism
              </h1>
            ) : (
              <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-purple-400 to-indigo-500 flex items-center justify-center text-white font-bold text-xl">
                P
              </div>
            )}
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-3 py-2 space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`group relative flex items-center rounded-xl transition-all duration-200
                    ${isActive 
                      ? 'bg-white/10' 
                      : 'hover:bg-white/5'
                    }
                    ${isHovered ? 'px-4 py-3' : 'px-3 py-3 justify-center'}
                  `}
                >
                  <item.icon 
                    className={`h-6 w-6 transition-all duration-200
                      ${isActive ? item.color : 'text-white/70 group-hover:text-white'}
                      ${isHovered ? 'mr-3' : 'mr-0'}
                    `}
                  />
                  <span 
                    className={`whitespace-nowrap transition-all duration-200
                      ${isActive ? 'text-white' : 'text-white/70 group-hover:text-white'}
                      ${isHovered ? 'opacity-100' : 'opacity-0 w-0'}
                    `}
                  >
                    {item.name}
                  </span>
                  {!isHovered && isActive && (
                    <div className="absolute right-0 w-1 h-8 bg-gradient-to-b from-purple-400 to-indigo-500 rounded-l-full" />
                  )}
                </Link>
              )
            })}
          </nav>

          {/* Profile Section */}
          <div className={`p-4 border-t border-white/10 transition-all duration-300 ${isHovered ? 'px-4' : 'px-2'}`}>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className={`w-full gap-2 px-2 ${isHovered ? 'justify-start' : 'justify-center'}`}>
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder-user.jpg" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  {isHovered && (
                    <div className="flex flex-col items-start flex-1">
                      <span className="text-sm font-medium">John Doe</span>
                      <span className="text-xs text-white/70">john@example.com</span>
                    </div>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" sideOffset={5}>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className={`flex-1 transition-all duration-300 ${isHovered ? 'ml-64' : 'ml-20'}`}>
        <div className="h-16 border-b border-white/10 backdrop-blur-xl bg-card/50 sticky top-0 z-40 flex items-center justify-between px-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsHovered(!isHovered)}
            className="text-white/70 hover:text-white"
          >
            {isHovered ? <PanelLeft className="h-5 w-5" /> : <PanelRight className="h-5 w-5" />}
          </Button>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="text-white/70 hover:text-white">
              <Bell className="h-5 w-5" />
            </Button>
            <Input
              type="search"
              placeholder="Search..."
              className="w-64 bg-white/5 border-white/10 text-white placeholder:text-white/50"
            />
          </div>
        </div>
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
