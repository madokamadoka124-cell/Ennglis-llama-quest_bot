"use client"

import { useState, useEffect } from "react"
import { AppContext, defaultUser, type UserState, type Tab } from "@/lib/store"
import { BottomNav } from "./bottom-nav"
import { Dashboard } from "./dashboard"
import { LessonsPage } from "./lessons-page"
import { QuizPage } from "./quiz-page"
import { LeaderboardPage } from "./leaderboard-page"
import { ProfilePage } from "./profile-page"

export function AppShell() {
  const [user, setUser] = useState<UserState>(defaultUser)
  const [activeTab, setActiveTab] = useState<Tab>("home")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Apply dark mode to html element
  useEffect(() => {
    if (user.theme === "dark") {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [user.theme])

  if (!mounted) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="animate-bounce-gentle text-center">
          <div className="text-6xl">🦙</div>
          <p className="mt-3 text-sm font-bold text-muted-foreground">English Llama Quest</p>
        </div>
      </div>
    )
  }

  return (
    <AppContext value={{ user, setUser, activeTab, setActiveTab }}>
      <div className="relative mx-auto min-h-screen max-w-md bg-background">
        <main>
          {activeTab === "home" && <Dashboard />}
          {activeTab === "lessons" && <LessonsPage />}
          {activeTab === "quiz" && <QuizPage />}
          {activeTab === "social" && <LeaderboardPage />}
          {activeTab === "profile" && <ProfilePage />}
        </main>
        <BottomNav />
      </div>
    </AppContext>
  )
}
