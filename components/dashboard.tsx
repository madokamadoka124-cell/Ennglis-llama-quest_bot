"use client"

import { Flame, Coins, Zap, ChevronRight, Sparkles, Star } from "lucide-react"
import { useApp } from "@/lib/store"
import { t } from "@/lib/i18n"
import { lessons, memes, levelConfig } from "@/lib/data"
import { LlamaMascot } from "./llama-mascot"
import { ProgressRing } from "./progress-ring"

export function Dashboard() {
  const { user, setUser, setActiveTab } = useApp()
  const lang = user.lang
  const levelInfo = levelConfig[user.level]
  const todayMeme = memes[Math.floor(Date.now() / 86400000) % memes.length]
  const recommendedLessons = lessons.filter(l => l.level === user.level).slice(0, 3)
  const dailyProgress = Math.round((user.dailyGoalDone / user.dailyGoalTotal) * 100)

  return (
    <div className="no-scrollbar space-y-5 overflow-y-auto px-4 pb-24 pt-4">
      {/* Stats Bar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 rounded-full bg-card px-3 py-1.5 shadow-sm">
          <Flame className="h-4 w-4 text-streak" />
          <span className="text-sm font-bold">{user.streak}</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 rounded-full bg-card px-3 py-1.5 shadow-sm">
            <Coins className="h-4 w-4 text-coins" />
            <span className="text-sm font-bold">{user.coins}</span>
          </div>
          <div className="flex items-center gap-1 rounded-full bg-card px-3 py-1.5 shadow-sm">
            <Zap className="h-4 w-4 text-xp" />
            <span className="text-sm font-bold">{user.xp}</span>
          </div>
        </div>
      </div>

      {/* Hero Card with Llama */}
      <div
        className="relative overflow-hidden rounded-3xl p-5 text-primary-foreground shadow-lg"
        style={{ background: `linear-gradient(135deg, ${levelInfo.color}, ${levelInfo.color}dd)` }}
      >
        <div className="absolute -right-4 -top-4 text-8xl opacity-20 select-none">🦙</div>
        <div className="relative z-10 flex items-start justify-between">
          <div className="space-y-2">
            <p className="text-sm font-medium opacity-90">
              {t("dash.level", lang)} {user.level}
            </p>
            <h2 className="text-xl font-bold">
              {t("dash.welcome", lang)}, {user.name}!
            </h2>
            <p className="text-sm opacity-80">
              {lang === "ru" ? levelInfo.nameRu : levelInfo.name}
            </p>
          </div>
          <ProgressRing
            progress={dailyProgress}
            size={64}
            strokeWidth={5}
            color="rgba(255,255,255,0.95)"
            bgColor="rgba(255,255,255,0.25)"
          >
            <span className="text-xs font-bold">{user.dailyGoalDone}/{user.dailyGoalTotal}</span>
          </ProgressRing>
        </div>
        <div className="relative z-10 mt-3">
          <div className="text-xs font-medium opacity-80">{t("dash.daily_goal", lang)}</div>
          <div className="mt-1 h-2 overflow-hidden rounded-full bg-primary-foreground/20">
            <div
              className="h-full rounded-full bg-primary-foreground/90 transition-all duration-700"
              style={{ width: `${dailyProgress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Llama Mascot */}
      <div className="flex justify-center py-1">
        <LlamaMascot size="sm" />
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={() => setActiveTab("lessons")}
          className="flex items-center gap-3 rounded-2xl bg-card p-4 shadow-sm transition-transform active:scale-[0.97]"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
            <Sparkles className="h-5 w-5 text-primary" />
          </div>
          <div className="text-left">
            <div className="text-sm font-bold text-card-foreground">{t("dash.start_lesson", lang)}</div>
            <div className="text-xs text-muted-foreground">{user.level}</div>
          </div>
        </button>
        <button
          onClick={() => setActiveTab("quiz")}
          className="flex items-center gap-3 rounded-2xl bg-card p-4 shadow-sm transition-transform active:scale-[0.97]"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary/10">
            <Star className="h-5 w-5 text-secondary" />
          </div>
          <div className="text-left">
            <div className="text-sm font-bold text-card-foreground">{t("dash.quick_quiz", lang)}</div>
            <div className="text-xs text-muted-foreground">{user.wordsLearned} {lang === "ru" ? "слов" : "words"}</div>
          </div>
        </button>
      </div>

      {/* Meme of the Day */}
      <div className="rounded-2xl bg-card p-4 shadow-sm">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-sm font-bold text-card-foreground">{t("dash.meme_of_day", lang)}</h3>
          <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary">{todayMeme.level}</span>
        </div>
        <div className="rounded-xl bg-muted p-4 text-center">
          <div className="mb-2 text-4xl">{todayMeme.emoji}</div>
          <p className="text-sm font-bold text-card-foreground">{todayMeme.englishText}</p>
          <p className="mt-1 text-xs text-muted-foreground">{todayMeme.russianTrans}</p>
        </div>
      </div>

      {/* Recommended Lessons */}
      <div>
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-sm font-bold text-foreground">{t("dash.recommended", lang)}</h3>
          <button
            onClick={() => setActiveTab("lessons")}
            className="flex items-center gap-1 text-xs font-semibold text-primary"
          >
            {lang === "ru" ? "Все" : "All"}
            <ChevronRight className="h-3 w-3" />
          </button>
        </div>
        <div className="space-y-2">
          {recommendedLessons.map((lesson) => (
            <button
              key={lesson.id}
              onClick={() => setActiveTab("lessons")}
              className="flex w-full items-center gap-3 rounded-2xl bg-card p-3.5 shadow-sm transition-transform active:scale-[0.98]"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-lg">
                {lesson.type === "word" ? "📝" : lesson.type === "grammar" ? "📐" : lesson.type === "dialogue" ? "💬" : lesson.type === "idiom" ? "🗣️" : "📖"}
              </div>
              <div className="flex-1 text-left">
                <div className="text-sm font-semibold text-card-foreground">{lang === "ru" ? lesson.titleRu : lesson.title}</div>
                <div className="text-xs text-muted-foreground">{lang === "ru" ? lesson.descriptionRu : lesson.description}</div>
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </button>
          ))}
        </div>
      </div>

      {/* Level Progress */}
      <div className="rounded-2xl bg-card p-4 shadow-sm">
        <h3 className="mb-3 text-sm font-bold text-card-foreground">{t("dash.progress", lang)}</h3>
        <div className="space-y-2.5">
          {(["A1", "A2", "B1", "B2", "C1", "C2"] as const).map((lvl) => {
            const cfg = levelConfig[lvl]
            const isActive = lvl === user.level
            const isPast = ["A1","A2","B1","B2","C1","C2"].indexOf(lvl) < ["A1","A2","B1","B2","C1","C2"].indexOf(user.level)
            const progress = isPast ? 100 : isActive ? Math.min(95, Math.round((user.xp / (cfg.minXp + 500)) * 100)) : 0
            return (
              <div key={lvl} className="flex items-center gap-3">
                <span className={`w-8 text-center text-xs font-bold ${isActive ? "text-primary" : isPast ? "text-success" : "text-muted-foreground"}`}>{lvl}</span>
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{
                      width: `${progress}%`,
                      backgroundColor: isPast ? "hsl(var(--success))" : isActive ? cfg.color : "transparent",
                    }}
                  />
                </div>
                <span className="text-xs text-muted-foreground">{cfg.emoji}</span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
