"use client"

import { Home, BookOpen, Brain, Trophy, User } from "lucide-react"
import { useApp, type Tab } from "@/lib/store"
import { t } from "@/lib/i18n"

const tabs: { id: Tab; icon: typeof Home; labelKey: "nav.home" | "nav.lessons" | "nav.quiz" | "nav.social" | "nav.profile" }[] = [
  { id: "home", icon: Home, labelKey: "nav.home" },
  { id: "lessons", icon: BookOpen, labelKey: "nav.lessons" },
  { id: "quiz", icon: Brain, labelKey: "nav.quiz" },
  { id: "social", icon: Trophy, labelKey: "nav.social" },
  { id: "profile", icon: User, labelKey: "nav.profile" },
]

export function BottomNav() {
  const { activeTab, setActiveTab, user } = useApp()

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-50 border-t bg-card/95 backdrop-blur-md"
      role="tablist"
      aria-label="Main navigation"
    >
      <div className="mx-auto flex max-w-md items-center justify-around py-1.5 pb-[max(0.375rem,env(safe-area-inset-bottom))]">
        {tabs.map(({ id, icon: Icon, labelKey }) => {
          const isActive = activeTab === id
          return (
            <button
              key={id}
              role="tab"
              aria-selected={isActive}
              aria-label={t(labelKey, user.lang)}
              onClick={() => setActiveTab(id)}
              className={`flex flex-col items-center gap-0.5 rounded-xl px-3 py-1.5 transition-all duration-200 ${
                isActive
                  ? "text-primary scale-105"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Icon className={`h-5 w-5 ${isActive ? "stroke-[2.5px]" : ""}`} />
              <span className="text-[10px] font-semibold leading-none">
                {t(labelKey, user.lang)}
              </span>
              {isActive && (
                <div className="h-1 w-1 rounded-full bg-primary" />
              )}
            </button>
          )
        })}
      </div>
    </nav>
  )
}
