"use client"

import { useState, useCallback } from "react"
import { ArrowLeft, Volume2, RotateCcw, Zap, Trophy, Timer } from "lucide-react"
import { useApp } from "@/lib/store"
import { t } from "@/lib/i18n"
import { vocabulary, idioms, levelConfig, type CEFRLevel, type VocabWord } from "@/lib/data"
import { ProgressRing } from "./progress-ring"

type QuizMode = "menu" | "playing" | "result"

function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function generateQuizQuestions(level: CEFRLevel, count: number) {
  const allWords = [...vocabulary, ...idioms]
  const levelWords = allWords.filter(w => w.level === level)
  const nearbyLevels: CEFRLevel[] = ["A1", "A2", "B1", "B2", "C1", "C2"]
  const idx = nearbyLevels.indexOf(level)
  const pool = idx > 0
    ? [...levelWords, ...allWords.filter(w => w.level === nearbyLevels[idx - 1]).slice(0, 5)]
    : levelWords

  const selected = shuffleArray(pool).slice(0, count)

  return selected.map((word) => {
    const wrongAnswers = shuffleArray(allWords.filter(w => w.id !== word.id))
      .slice(0, 3)
      .map(w => w.russian)
    const options = shuffleArray([word.russian, ...wrongAnswers])
    return {
      word,
      options,
      correctIndex: options.indexOf(word.russian),
    }
  })
}

function QuizGame({ level, onBack }: { level: CEFRLevel; onBack: () => void }) {
  const { user, setUser } = useApp()
  const lang = user.lang
  const [questions] = useState(() => generateQuizQuestions(level, 10))
  const [currentQ, setCurrentQ] = useState(0)
  const [score, setScore] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [isFinished, setIsFinished] = useState(false)
  const [streak, setStreak] = useState(0)
  const [maxStreak, setMaxStreak] = useState(0)

  const q = questions[currentQ]

  const handleAnswer = useCallback((index: number) => {
    if (selectedAnswer !== null) return
    setSelectedAnswer(index)
    setShowResult(true)
    if (index === q.correctIndex) {
      setScore(s => s + 1)
      setStreak(s => {
        const newS = s + 1
        setMaxStreak(m => Math.max(m, newS))
        return newS
      })
    } else {
      setStreak(0)
    }
  }, [selectedAnswer, q])

  function handleNext() {
    if (currentQ < questions.length - 1) {
      setCurrentQ(c => c + 1)
      setSelectedAnswer(null)
      setShowResult(false)
    } else {
      setIsFinished(true)
      const earnedXp = score * 12 + maxStreak * 5
      const earnedCoins = score * 4
      setUser(prev => ({
        ...prev,
        xp: prev.xp + earnedXp,
        coins: prev.coins + earnedCoins,
        quizzesDone: prev.quizzesDone + 1,
        wordsLearned: prev.wordsLearned + Math.ceil(score / 2),
        accuracy: Math.round((prev.accuracy * prev.quizzesDone + (score / questions.length) * 100) / (prev.quizzesDone + 1)),
        dailyGoalDone: Math.min(prev.dailyGoalDone + 1, prev.dailyGoalTotal),
      }))
    }
  }

  if (isFinished) {
    const percentage = Math.round((score / questions.length) * 100)
    const earnedXp = score * 12 + maxStreak * 5
    const earnedCoins = score * 4
    return (
      <div className="no-scrollbar min-h-screen overflow-y-auto bg-background pb-24">
        <div className="sticky top-0 z-10 flex items-center gap-3 bg-background/95 px-4 py-3 backdrop-blur-sm">
          <button onClick={onBack} className="rounded-full p-1.5 hover:bg-muted">
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h2 className="text-sm font-bold">{t("quiz.score", lang)}</h2>
        </div>
        <div className="animate-scale-in flex flex-col items-center gap-5 px-4 pt-6">
          <div className="text-6xl">{percentage >= 80 ? "🏆" : percentage >= 50 ? "💪" : "📚"}</div>
          <h2 className="text-2xl font-bold text-foreground">
            {percentage >= 80 ? (lang === "ru" ? "Великолепно!" : "Magnificent!") :
              percentage >= 50 ? (lang === "ru" ? "Хорошая работа!" : "Good job!") :
              (lang === "ru" ? "Нужно больше практики" : "Need more practice")}
          </h2>
          <ProgressRing progress={percentage} size={120} strokeWidth={8} color={percentage >= 80 ? "hsl(var(--success))" : percentage >= 50 ? "hsl(var(--primary))" : "hsl(var(--warning))"}>
            <span className="text-2xl font-bold">{percentage}%</span>
          </ProgressRing>
          <div className="grid w-full grid-cols-3 gap-3">
            <div className="rounded-xl bg-card p-3 text-center shadow-sm">
              <p className="text-xl font-bold text-primary">{score}/{questions.length}</p>
              <p className="text-[10px] text-muted-foreground">{lang === "ru" ? "Правильных" : "Correct"}</p>
            </div>
            <div className="rounded-xl bg-card p-3 text-center shadow-sm">
              <p className="text-xl font-bold text-streak">{maxStreak}</p>
              <p className="text-[10px] text-muted-foreground">{lang === "ru" ? "Макс серия" : "Max streak"}</p>
            </div>
            <div className="rounded-xl bg-card p-3 text-center shadow-sm">
              <p className="text-xl font-bold text-xp">+{earnedXp}</p>
              <p className="text-[10px] text-muted-foreground">XP</p>
            </div>
          </div>
          <div className="flex w-full gap-3">
            <button onClick={onBack} className="flex-1 rounded-2xl bg-muted py-3 text-center text-sm font-bold text-foreground transition-transform active:scale-[0.98]">
              {t("general.back", lang)}
            </button>
            <button onClick={() => { setCurrentQ(0); setScore(0); setSelectedAnswer(null); setShowResult(false); setIsFinished(false); setStreak(0); setMaxStreak(0) }} className="flex-1 rounded-2xl bg-primary py-3 text-center text-sm font-bold text-primary-foreground shadow-md transition-transform active:scale-[0.98]">
              <RotateCcw className="mr-1 inline h-4 w-4" />{t("quiz.again", lang)}
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (!q) return null

  return (
    <div className="no-scrollbar min-h-screen overflow-y-auto bg-background pb-24">
      <div className="sticky top-0 z-10 bg-background/95 px-4 py-3 backdrop-blur-sm">
        <div className="flex items-center justify-between">
          <button onClick={onBack} className="rounded-full p-1.5 hover:bg-muted">
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div className="flex items-center gap-2">
            {streak >= 3 && (
              <span className="animate-bounce-gentle rounded-full bg-streak/10 px-2 py-0.5 text-xs font-bold text-streak">
                {streak}x
              </span>
            )}
            <span className="text-xs font-bold text-muted-foreground">{currentQ + 1}/{questions.length}</span>
          </div>
        </div>
        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-muted">
          <div className="h-full rounded-full bg-primary transition-all duration-500" style={{ width: `${((currentQ + 1) / questions.length) * 100}%` }} />
        </div>
      </div>

      <div className="animate-slide-up space-y-5 px-4 pt-4">
        <div className="rounded-2xl bg-card p-5 text-center shadow-sm">
          <span className="mb-2 inline-block rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-bold text-primary">{q.word.level}</span>
          <p className="mt-2 text-2xl font-bold text-card-foreground">{q.word.english}</p>
          <p className="mt-1 text-xs text-muted-foreground italic">{q.word.example}</p>
        </div>

        <p className="text-center text-sm font-semibold text-muted-foreground">
          {t("quiz.choose", lang)}
        </p>

        <div className="space-y-2.5">
          {q.options.map((opt, i) => {
            let cls = "bg-card text-card-foreground border-2 border-transparent shadow-sm"
            if (showResult) {
              if (i === q.correctIndex) cls = "bg-success/10 text-success border-2 border-success shadow-sm"
              else if (selectedAnswer === i) cls = "bg-destructive/10 text-destructive border-2 border-destructive shadow-sm"
            }
            return (
              <button
                key={i}
                onClick={() => handleAnswer(i)}
                disabled={selectedAnswer !== null}
                className={`w-full rounded-xl p-4 text-left text-sm font-medium transition-all ${cls} ${
                  selectedAnswer === null ? "active:scale-[0.98]" : ""
                }`}
              >
                <span className="mr-3 inline-flex h-7 w-7 items-center justify-center rounded-full bg-muted text-xs font-bold text-muted-foreground">
                  {String.fromCharCode(65 + i)}
                </span>
                {opt}
              </button>
            )
          })}
        </div>

        {showResult && (
          <div className="animate-slide-up space-y-3">
            <div className={`rounded-2xl p-4 ${selectedAnswer === q.correctIndex ? "bg-success/10" : "bg-destructive/10"}`}>
              <p className="text-sm font-bold">
                {selectedAnswer === q.correctIndex ? (lang === "ru" ? "Правильно!" : "Correct!") : (lang === "ru" ? "Неправильно" : "Wrong")}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                {q.word.english} = {q.word.russian}
              </p>
            </div>
            <button
              onClick={handleNext}
              className="w-full rounded-2xl bg-primary py-3.5 text-center text-sm font-bold text-primary-foreground shadow-md transition-transform active:scale-[0.98]"
            >
              {currentQ < questions.length - 1 ? t("quiz.next", lang) : t("quiz.finish", lang)}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export function QuizPage() {
  const { user } = useApp()
  const lang = user.lang
  const [mode, setMode] = useState<QuizMode>("menu")
  const [selectedLevel, setSelectedLevel] = useState<CEFRLevel>(user.level)
  const levels: CEFRLevel[] = ["A1", "A2", "B1", "B2", "C1", "C2"]
  const currentLevelIdx = levels.indexOf(user.level)

  if (mode === "playing") {
    return <QuizGame level={selectedLevel} onBack={() => setMode("menu")} />
  }

  return (
    <div className="no-scrollbar overflow-y-auto px-4 pb-24 pt-4">
      <h1 className="mb-1 text-xl font-bold text-foreground">{t("quiz.title", lang)}</h1>
      <p className="mb-5 text-sm text-muted-foreground">
        {lang === "ru" ? "Проверь свои знания и заработай XP!" : "Test your knowledge and earn XP!"}
      </p>

      {/* Daily Challenge */}
      <button
        onClick={() => { setSelectedLevel(user.level); setMode("playing") }}
        className="mb-5 flex w-full items-center gap-4 rounded-2xl bg-primary p-4 text-left text-primary-foreground shadow-lg transition-transform active:scale-[0.98]"
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-foreground/20 text-2xl">
          <Zap className="h-6 w-6" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-bold">{lang === "ru" ? "Ежедневный тест" : "Daily Challenge"}</p>
          <p className="text-xs opacity-80">{user.level} - 10 {lang === "ru" ? "вопросов" : "questions"}</p>
        </div>
        <div className="rounded-full bg-primary-foreground/20 px-3 py-1 text-xs font-bold">+120 XP</div>
      </button>

      {/* Level Select */}
      <h2 className="mb-3 text-sm font-bold text-foreground">{lang === "ru" ? "Выбери уровень" : "Choose Level"}</h2>
      <div className="space-y-2.5">
        {levels.map((lvl) => {
          const cfg = levelConfig[lvl]
          const isLocked = levels.indexOf(lvl) > currentLevelIdx + 1
          const wordCount = vocabulary.filter(w => w.level === lvl).length + idioms.filter(w => w.level === lvl).length
          return (
            <button
              key={lvl}
              onClick={() => {
                if (!isLocked) {
                  setSelectedLevel(lvl)
                  setMode("playing")
                }
              }}
              disabled={isLocked}
              className={`flex w-full items-center gap-3 rounded-2xl bg-card p-4 text-left shadow-sm transition-all ${
                isLocked ? "opacity-40" : "active:scale-[0.98]"
              }`}
            >
              <div
                className="flex h-11 w-11 items-center justify-center rounded-xl text-xl"
                style={{ backgroundColor: `${cfg.color}20` }}
              >
                {cfg.emoji}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-card-foreground">{lvl}</span>
                  <span className="text-xs text-muted-foreground">{lang === "ru" ? cfg.nameRu : cfg.name}</span>
                </div>
                <p className="text-xs text-muted-foreground">{wordCount} {lang === "ru" ? "слов" : "words"}</p>
              </div>
              {lvl === user.level && (
                <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-bold text-primary">
                  {lang === "ru" ? "Текущий" : "Current"}
                </span>
              )}
              {isLocked && <span className="text-xs text-muted-foreground">🔒</span>}
            </button>
          )
        })}
      </div>

      {/* Stats */}
      <div className="mt-5 grid grid-cols-2 gap-3">
        <div className="rounded-2xl bg-card p-4 text-center shadow-sm">
          <Trophy className="mx-auto h-5 w-5 text-coins" />
          <p className="mt-1 text-xl font-bold text-card-foreground">{user.quizzesDone}</p>
          <p className="text-xs text-muted-foreground">{t("profile.quizzes_done", lang)}</p>
        </div>
        <div className="rounded-2xl bg-card p-4 text-center shadow-sm">
          <Timer className="mx-auto h-5 w-5 text-primary" />
          <p className="mt-1 text-xl font-bold text-card-foreground">{user.accuracy}%</p>
          <p className="text-xs text-muted-foreground">{t("profile.accuracy", lang)}</p>
        </div>
      </div>
    </div>
  )
}
