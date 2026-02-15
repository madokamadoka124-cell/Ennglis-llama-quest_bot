"use client"

import { useState } from "react"
import { Medal, Flame, Zap, Crown, TrendingUp } from "lucide-react"
import { useApp } from "@/lib/store"
import { t } from "@/lib/i18n"
import { leaderboardData, levelConfig } from "@/lib/data"

type LeaderboardTab = "global" | "weekly"

export function LeaderboardPage() {
  const { user } = useApp()
  const lang = user.lang
  const [tab, setTab] = useState<LeaderboardTab>("global")

  const sortedData = [...leaderboardData].sort((a, b) => b.xp - a.xp)

  // Insert current user at position 4
  const currentUserEntry = {
    id: "me",
    name: user.name,
    avatar: user.avatar,
    level: user.level,
    xp: user.xp,
    streak: user.streak,
  }

  const fullList = [
    ...sortedData.slice(0, 3),
    currentUserEntry,
    ...sortedData.slice(3),
  ]

  const podiumColors = ["hsl(var(--coins))", "#C0C0C0", "#CD7F32"]
  const podiumIcons = [Crown, Medal, Medal]

  return (
    <div className="no-scrollbar overflow-y-auto px-4 pb-24 pt-4">
      <h1 className="mb-1 text-xl font-bold text-foreground">{t("lead.title", lang)}</h1>
      <p className="mb-4 text-sm text-muted-foreground">
        {lang === "ru" ? "Соревнуйся с другими учениками!" : "Compete with other learners!"}
      </p>

      {/* Tabs */}
      <div className="mb-5 flex gap-2">
        {(["global", "weekly"] as const).map((tabId) => (
          <button
            key={tabId}
            onClick={() => setTab(tabId)}
            className={`rounded-full px-4 py-2 text-xs font-bold transition-all ${
              tab === tabId
                ? "bg-primary text-primary-foreground shadow-md"
                : "bg-card text-card-foreground shadow-sm"
            }`}
          >
            {tabId === "global" ? t("lead.global", lang) : t("lead.weekly", lang)}
          </button>
        ))}
      </div>

      {/* Top 3 Podium */}
      <div className="mb-6 flex items-end justify-center gap-3">
        {[1, 0, 2].map((podiumIdx) => {
          const entry = sortedData[podiumIdx]
          if (!entry) return null
          const isFirst = podiumIdx === 0
          const height = isFirst ? "h-28" : podiumIdx === 1 ? "h-24" : "h-20"
          const PodiumIcon = podiumIcons[podiumIdx]

          return (
            <div key={entry.id} className="flex flex-col items-center">
              <div className={`relative mb-2 ${isFirst ? "animate-bounce-gentle" : ""}`}>
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-card text-2xl shadow-md">
                  {entry.avatar}
                </div>
                <div
                  className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold text-card"
                  style={{ backgroundColor: podiumColors[podiumIdx] }}
                >
                  {podiumIdx + 1}
                </div>
              </div>
              <p className="text-xs font-bold text-card-foreground">{entry.name}</p>
              <p className="text-[10px] text-muted-foreground">{entry.xp} XP</p>
              <div
                className={`mt-2 w-20 rounded-t-xl ${height}`}
                style={{ backgroundColor: `${podiumColors[podiumIdx]}30` }}
              />
            </div>
          )
        })}
      </div>

      {/* Full List */}
      <div className="space-y-2">
        {fullList.map((entry, idx) => {
          const isMe = entry.id === "me"
          const rank = idx + 1
          const cfg = levelConfig[entry.level]

          return (
            <div
              key={entry.id + idx}
              className={`flex items-center gap-3 rounded-2xl p-3.5 transition-all ${
                isMe
                  ? "bg-primary/10 ring-2 ring-primary shadow-md"
                  : "bg-card shadow-sm"
              }`}
            >
              <span className={`w-7 text-center text-sm font-bold ${rank <= 3 ? "text-primary" : "text-muted-foreground"}`}>
                {rank <= 3 ? ["🥇", "🥈", "🥉"][rank - 1] : `#${rank}`}
              </span>
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-xl">
                {entry.avatar}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className={`text-sm font-bold ${isMe ? "text-primary" : "text-card-foreground"}`}>
                    {isMe ? (lang === "ru" ? "Вы" : "You") : entry.name}
                  </span>
                  <span
                    className="rounded-full px-1.5 py-0.5 text-[10px] font-bold text-primary-foreground"
                    style={{ backgroundColor: cfg.color }}
                  >
                    {entry.level}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="flex items-center gap-0.5 text-xs text-muted-foreground">
                    <Zap className="h-3 w-3 text-xp" /> {entry.xp}
                  </span>
                  <span className="flex items-center gap-0.5 text-xs text-muted-foreground">
                    <Flame className="h-3 w-3 text-streak" /> {entry.streak}
                  </span>
                </div>
              </div>
              {rank <= 3 && <TrendingUp className="h-4 w-4 text-success" />}
            </div>
          )
        })}
      </div>
    </div>
  )
}
