"use client"

import { useApp } from "@/lib/store"
import { levelConfig } from "@/lib/data"

interface LlamaMascotProps {
  size?: "sm" | "md" | "lg"
  message?: string
  animate?: boolean
}

const greetings: Record<string, { ru: string; en: string }> = {
  A1: { ru: "Привет! Давай учить английский!", en: "Hello! Let's learn English!" },
  A2: { ru: "Отлично! Ты уже знаешь основы!", en: "Great! You know the basics!" },
  B1: { ru: "Молодец! Время говорить свободнее!", en: "Well done! Time to speak more freely!" },
  B2: { ru: "Впечатляет! Ты почти свободно говоришь!", en: "Impressive! You're almost fluent!" },
  C1: { ru: "Вау! Shall we discuss quantum llamas?", en: "Wow! Shall we discuss quantum llamas?" },
  C2: { ru: "Мастер! Indubitably, you're a polyglot!", en: "Master! Indubitably, you're a polyglot!" },
}

export function LlamaMascot({ size = "md", message, animate = true }: LlamaMascotProps) {
  const { user } = useApp()
  const levelInfo = levelConfig[user.level]
  const greeting = greetings[user.level]?.[user.lang] ?? greetings.A1[user.lang]

  const sizeClasses = {
    sm: "text-4xl",
    md: "text-6xl",
    lg: "text-8xl",
  }

  return (
    <div className="flex flex-col items-center gap-2">
      <div className={`${sizeClasses[size]} ${animate ? "animate-float" : ""} select-none`}>
        {levelInfo.emoji === "🌱" ? "🦙" : "🦙"}
      </div>
      {(message || greeting) && (
        <div
          className="relative rounded-2xl bg-card px-4 py-2 text-center text-sm font-medium text-card-foreground shadow-md"
          style={{ maxWidth: "260px" }}
        >
          <div
            className="absolute -top-2 left-1/2 h-0 w-0 -translate-x-1/2 border-x-8 border-b-8 border-x-transparent border-b-card"
            aria-hidden="true"
          />
          {message || greeting}
        </div>
      )}
    </div>
  )
}
