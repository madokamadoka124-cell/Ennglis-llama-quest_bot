"use client"

import { createContext, useContext } from "react"
import type { CEFRLevel } from "./data"
import type { Lang } from "./i18n"

export interface UserState {
  name: string
  avatar: string
  level: CEFRLevel
  xp: number
  coins: number
  streak: number
  wordsLearned: number
  lessonsDone: number
  quizzesDone: number
  accuracy: number
  lang: Lang
  theme: "light" | "dark"
  premium: "free" | "pro" | "mastery"
  unlockedAchievements: string[]
  dailyGoalDone: number
  dailyGoalTotal: number
}

export const defaultUser: UserState = {
  name: "Learner",
  avatar: "🦙",
  level: "A1",
  xp: 380,
  coins: 250,
  streak: 7,
  wordsLearned: 42,
  lessonsDone: 8,
  quizzesDone: 15,
  accuracy: 78,
  lang: "ru",
  theme: "light",
  premium: "free",
  unlockedAchievements: ["first-word", "streak-3", "streak-7"],
  dailyGoalDone: 2,
  dailyGoalTotal: 5,
}

export type Tab = "home" | "lessons" | "quiz" | "social" | "profile"

export interface AppContextType {
  user: UserState
  setUser: (u: UserState | ((prev: UserState) => UserState)) => void
  activeTab: Tab
  setActiveTab: (tab: Tab) => void
}

export const AppContext = createContext<AppContextType>({
  user: defaultUser,
  setUser: () => {},
  activeTab: "home",
  setActiveTab: () => {},
})

export function useApp() {
  return useContext(AppContext)
}
