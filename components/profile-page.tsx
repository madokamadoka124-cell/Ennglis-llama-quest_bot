"use client"

import { useState } from "react"
import { Settings, Moon, Sun, Globe, Crown, BookOpen, Brain, Target, Flame, Zap, Coins, ChevronRight, ShoppingBag, Star, Lock, Check } from "lucide-react"
import { useApp } from "@/lib/store"
import { t } from "@/lib/i18n"
import { achievements, shopItems, levelConfig } from "@/lib/data"
import { ProgressRing } from "./progress-ring"

type ProfileView = "main" | "achievements" | "shop" | "settings"

function AchievementsView({ onBack }: { onBack: () => void }) {
  const { user } = useApp()
  const lang = user.lang

  return (
    <div className="no-scrollbar overflow-y-auto px-4 pb-24 pt-4">
      <button onClick={onBack} className="mb-4 flex items-center gap-1 text-sm font-semibold text-primary">
        {"<"} {t("general.back", lang)}
      </button>
      <h1 className="mb-4 text-xl font-bold text-foreground">{t("profile.achievements", lang)}</h1>
      <div className="space-y-2.5">
        {achievements.map((ach) => {
          const unlocked = user.unlockedAchievements.includes(ach.slug)
          return (
            <div
              key={ach.id}
              className={`flex items-center gap-3 rounded-2xl p-4 ${
                unlocked ? "bg-card shadow-sm" : "bg-muted/50 opacity-60"
              }`}
            >
              <div className={`flex h-12 w-12 items-center justify-center rounded-xl text-2xl ${unlocked ? "bg-primary/10" : "bg-muted"}`}>
                {unlocked ? ach.emoji : "🔒"}
              </div>
              <div className="flex-1">
                <p className={`text-sm font-bold ${unlocked ? "text-card-foreground" : "text-muted-foreground"}`}>
                  {lang === "ru" ? ach.nameRu : ach.nameEn}
                </p>
                <p className="text-xs text-muted-foreground">{lang === "ru" ? ach.descRu : ach.descEn}</p>
              </div>
              {unlocked && (
                <div className="flex flex-col items-end gap-0.5">
                  <span className="flex items-center gap-0.5 text-xs font-bold text-coins">
                    <Coins className="h-3 w-3" /> +{ach.reward.coins}
                  </span>
                  <span className="flex items-center gap-0.5 text-xs font-bold text-xp">
                    <Zap className="h-3 w-3" /> +{ach.reward.xp}
                  </span>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

function ShopView({ onBack }: { onBack: () => void }) {
  const { user, setUser } = useApp()
  const lang = user.lang
  const [purchased, setPurchased] = useState<string[]>([])

  function handleBuy(item: typeof shopItems[0]) {
    if (user.coins >= item.priceCoins && !purchased.includes(item.id)) {
      setUser(prev => ({ ...prev, coins: prev.coins - item.priceCoins }))
      setPurchased(prev => [...prev, item.id])
    }
  }

  return (
    <div className="no-scrollbar overflow-y-auto px-4 pb-24 pt-4">
      <button onClick={onBack} className="mb-4 flex items-center gap-1 text-sm font-semibold text-primary">
        {"<"} {t("general.back", lang)}
      </button>
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-xl font-bold text-foreground">{t("shop.title", lang)}</h1>
        <div className="flex items-center gap-1 rounded-full bg-coins/10 px-3 py-1.5">
          <Coins className="h-4 w-4 text-coins" />
          <span className="text-sm font-bold text-foreground">{user.coins}</span>
        </div>
      </div>
      <div className="space-y-2.5">
        {shopItems.map((item) => {
          const owned = purchased.includes(item.id)
          const canAfford = user.coins >= item.priceCoins
          return (
            <div key={item.id} className="flex items-center gap-3 rounded-2xl bg-card p-4 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-2xl">
                {item.emoji}
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold text-card-foreground">{lang === "ru" ? item.nameRu : item.nameEn}</p>
                <p className="text-xs text-muted-foreground">{lang === "ru" ? item.descriptionRu : item.description}</p>
                <div className="mt-1 flex items-center gap-2">
                  <span className="flex items-center gap-0.5 text-xs font-bold text-coins">
                    <Coins className="h-3 w-3" /> {item.priceCoins}
                  </span>
                  {item.priceStars && (
                    <span className="flex items-center gap-0.5 text-xs font-bold text-primary">
                      <Star className="h-3 w-3" /> {item.priceStars}
                    </span>
                  )}
                </div>
              </div>
              <button
                onClick={() => handleBuy(item)}
                disabled={owned || !canAfford}
                className={`rounded-xl px-3 py-2 text-xs font-bold transition-all ${
                  owned
                    ? "bg-success/10 text-success"
                    : canAfford
                    ? "bg-primary text-primary-foreground shadow-sm active:scale-95"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {owned ? (
                  <><Check className="mr-0.5 inline h-3 w-3" />{t("shop.owned", lang)}</>
                ) : (
                  t("shop.buy", lang)
                )}
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function SettingsView({ onBack }: { onBack: () => void }) {
  const { user, setUser } = useApp()
  const lang = user.lang

  return (
    <div className="no-scrollbar overflow-y-auto px-4 pb-24 pt-4">
      <button onClick={onBack} className="mb-4 flex items-center gap-1 text-sm font-semibold text-primary">
        {"<"} {t("general.back", lang)}
      </button>
      <h1 className="mb-4 text-xl font-bold text-foreground">{t("profile.settings", lang)}</h1>
      <div className="space-y-3">
        {/* Theme */}
        <div className="flex items-center justify-between rounded-2xl bg-card p-4 shadow-sm">
          <div className="flex items-center gap-3">
            {user.theme === "dark" ? <Moon className="h-5 w-5 text-primary" /> : <Sun className="h-5 w-5 text-primary" />}
            <span className="text-sm font-semibold text-card-foreground">{t("profile.theme", lang)}</span>
          </div>
          <button
            onClick={() => setUser(prev => ({
              ...prev,
              theme: prev.theme === "light" ? "dark" : "light",
            }))}
            className="rounded-full bg-muted px-3 py-1.5 text-xs font-bold text-foreground"
          >
            {user.theme === "light" ? t("profile.light", lang) : t("profile.dark", lang)}
          </button>
        </div>

        {/* Language */}
        <div className="flex items-center justify-between rounded-2xl bg-card p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <Globe className="h-5 w-5 text-primary" />
            <span className="text-sm font-semibold text-card-foreground">{t("profile.language", lang)}</span>
          </div>
          <button
            onClick={() => setUser(prev => ({
              ...prev,
              lang: prev.lang === "ru" ? "en" : "ru",
            }))}
            className="rounded-full bg-muted px-3 py-1.5 text-xs font-bold text-foreground"
          >
            {user.lang === "ru" ? "RU" : "EN"}
          </button>
        </div>

        {/* Name */}
        <div className="rounded-2xl bg-card p-4 shadow-sm">
          <p className="mb-2 text-sm font-semibold text-card-foreground">{lang === "ru" ? "Имя" : "Name"}</p>
          <input
            type="text"
            value={user.name}
            onChange={(e) => setUser(prev => ({ ...prev, name: e.target.value }))}
            className="w-full rounded-xl bg-muted px-3 py-2 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* Premium */}
        <div className="rounded-2xl bg-card p-4 shadow-sm">
          <div className="mb-2 flex items-center gap-2">
            <Crown className="h-5 w-5 text-coins" />
            <span className="text-sm font-bold text-card-foreground">{t("profile.premium", lang)}</span>
          </div>
          <div className="space-y-2">
            {(["free", "pro", "mastery"] as const).map(tier => (
              <button
                key={tier}
                onClick={() => setUser(prev => ({ ...prev, premium: tier }))}
                className={`flex w-full items-center justify-between rounded-xl p-3 transition-all ${
                  user.premium === tier ? "bg-primary/10 ring-1 ring-primary" : "bg-muted"
                }`}
              >
                <div>
                  <p className="text-sm font-bold text-foreground capitalize">{tier}</p>
                  <p className="text-xs text-muted-foreground">
                    {tier === "free" ? (lang === "ru" ? "A1-B1 доступ" : "A1-B1 access") :
                      tier === "pro" ? (lang === "ru" ? "Полный B2-C1 доступ" : "Full B2-C1 access") :
                      (lang === "ru" ? "C2 + коучинг + NFT" : "C2 + coaching + NFT")}
                  </p>
                </div>
                {user.premium === tier && <Check className="h-4 w-4 text-primary" />}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export function ProfilePage() {
  const { user } = useApp()
  const lang = user.lang
  const [view, setView] = useState<ProfileView>("main")
  const levelInfo = levelConfig[user.level]
  const unlockedCount = user.unlockedAchievements.length

  if (view === "achievements") return <AchievementsView onBack={() => setView("main")} />
  if (view === "shop") return <ShopView onBack={() => setView("main")} />
  if (view === "settings") return <SettingsView onBack={() => setView("main")} />

  return (
    <div className="no-scrollbar overflow-y-auto px-4 pb-24 pt-4">
      {/* Profile Header */}
      <div className="mb-5 flex flex-col items-center">
        <div className="relative mb-3">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-card text-4xl shadow-lg">
            {user.avatar}
          </div>
          {user.premium !== "free" && (
            <div className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full bg-coins text-xs shadow-md">
              <Crown className="h-4 w-4 text-warning-foreground" />
            </div>
          )}
        </div>
        <h2 className="text-lg font-bold text-foreground">{user.name}</h2>
        <div className="mt-1 flex items-center gap-2">
          <span
            className="rounded-full px-2.5 py-0.5 text-xs font-bold text-primary-foreground"
            style={{ backgroundColor: levelInfo.color }}
          >
            {user.level} - {lang === "ru" ? levelInfo.nameRu : levelInfo.name}
          </span>
          {user.premium !== "free" && (
            <span className="rounded-full bg-coins/10 px-2 py-0.5 text-xs font-bold text-foreground capitalize">
              {user.premium}
            </span>
          )}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="mb-5 grid grid-cols-2 gap-3">
        <div className="flex items-center gap-3 rounded-2xl bg-card p-3.5 shadow-sm">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-streak/10">
            <Flame className="h-5 w-5 text-streak" />
          </div>
          <div>
            <p className="text-lg font-bold text-card-foreground">{user.streak}</p>
            <p className="text-[10px] text-muted-foreground">{t("dash.streak", lang)}</p>
          </div>
        </div>
        <div className="flex items-center gap-3 rounded-2xl bg-card p-3.5 shadow-sm">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-xp/10">
            <Zap className="h-5 w-5 text-xp" />
          </div>
          <div>
            <p className="text-lg font-bold text-card-foreground">{user.xp}</p>
            <p className="text-[10px] text-muted-foreground">{t("dash.xp", lang)}</p>
          </div>
        </div>
        <div className="flex items-center gap-3 rounded-2xl bg-card p-3.5 shadow-sm">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
            <BookOpen className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="text-lg font-bold text-card-foreground">{user.wordsLearned}</p>
            <p className="text-[10px] text-muted-foreground">{t("profile.words_learned", lang)}</p>
          </div>
        </div>
        <div className="flex items-center gap-3 rounded-2xl bg-card p-3.5 shadow-sm">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary/10">
            <Target className="h-5 w-5 text-secondary" />
          </div>
          <div>
            <p className="text-lg font-bold text-card-foreground">{user.accuracy}%</p>
            <p className="text-[10px] text-muted-foreground">{t("profile.accuracy", lang)}</p>
          </div>
        </div>
      </div>

      {/* Progress Ring */}
      <div className="mb-5 flex items-center justify-center gap-6 rounded-2xl bg-card p-5 shadow-sm">
        <ProgressRing progress={Math.min(100, Math.round((user.xp / 500) * 100))} size={90} strokeWidth={7} color={levelInfo.color}>
          <div className="text-center">
            <p className="text-lg font-bold text-card-foreground">{user.level}</p>
            <p className="text-[10px] text-muted-foreground">{user.xp} XP</p>
          </div>
        </ProgressRing>
        <div className="space-y-1">
          <p className="text-sm font-bold text-card-foreground">{t("dash.progress", lang)}</p>
          <p className="text-xs text-muted-foreground">
            {lang === "ru" ? `${user.lessonsDone} уроков` : `${user.lessonsDone} lessons`}
          </p>
          <p className="text-xs text-muted-foreground">
            {lang === "ru" ? `${user.quizzesDone} тестов` : `${user.quizzesDone} quizzes`}
          </p>
        </div>
      </div>

      {/* Menu Items */}
      <div className="space-y-2">
        {[
          { view: "achievements" as const, icon: Star, label: t("profile.achievements", lang), badge: `${unlockedCount}/${achievements.length}` },
          { view: "shop" as const, icon: ShoppingBag, label: t("shop.title", lang), badge: "" },
          { view: "settings" as const, icon: Settings, label: t("profile.settings", lang), badge: "" },
        ].map(item => (
          <button
            key={item.view}
            onClick={() => setView(item.view)}
            className="flex w-full items-center gap-3 rounded-2xl bg-card p-4 shadow-sm transition-transform active:scale-[0.98]"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
              <item.icon className="h-5 w-5 text-primary" />
            </div>
            <span className="flex-1 text-left text-sm font-semibold text-card-foreground">{item.label}</span>
            {item.badge && <span className="text-xs text-muted-foreground">{item.badge}</span>}
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          </button>
        ))}
      </div>
    </div>
  )
}
