"use client"

import { useState } from "react"
import { ArrowLeft, Lock, CheckCircle2, Play, BookOpen } from "lucide-react"
import { useApp } from "@/lib/store"
import { t } from "@/lib/i18n"
import { lessons, levelConfig, type CEFRLevel, type Lesson } from "@/lib/data"

function LessonViewer({ lesson, onClose }: { lesson: Lesson; onClose: () => void }) {
  const { user, setUser } = useApp()
  const lang = user.lang
  const [step, setStep] = useState<"content" | "quiz" | "result">("content")
  const [currentQ, setCurrentQ] = useState(0)
  const [score, setScore] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showExplanation, setShowExplanation] = useState(false)

  const quiz = lesson.quiz

  function handleAnswer(index: number) {
    if (selectedAnswer !== null) return
    setSelectedAnswer(index)
    setShowExplanation(true)
    if (index === quiz[currentQ].correctIndex) {
      setScore(s => s + 1)
    }
  }

  function handleNext() {
    if (currentQ < quiz.length - 1) {
      setCurrentQ(c => c + 1)
      setSelectedAnswer(null)
      setShowExplanation(false)
    } else {
      setStep("result")
      setUser(prev => ({
        ...prev,
        lessonsDone: prev.lessonsDone + 1,
        xp: prev.xp + 20 + score * 10,
        coins: prev.coins + 5 + score * 3,
        dailyGoalDone: Math.min(prev.dailyGoalDone + 1, prev.dailyGoalTotal),
      }))
    }
  }

  return (
    <div className="no-scrollbar min-h-screen overflow-y-auto bg-background pb-24">
      {/* Header */}
      <div className="sticky top-0 z-10 flex items-center gap-3 bg-background/95 px-4 py-3 backdrop-blur-sm">
        <button onClick={onClose} className="rounded-full p-1.5 hover:bg-muted" aria-label={t("general.back", lang)}>
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div className="flex-1">
          <h2 className="text-sm font-bold">{lang === "ru" ? lesson.titleRu : lesson.title}</h2>
          <p className="text-xs text-muted-foreground">{lesson.level} - {lesson.theme}</p>
        </div>
        <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-bold text-primary">
          {step === "content" ? "1/2" : step === "quiz" ? `${currentQ + 1}/${quiz.length}` : ""}
        </span>
      </div>

      {step === "content" && (
        <div className="animate-fade-in space-y-4 px-4">
          <div className="rounded-2xl bg-card p-5 shadow-sm">
            <div className="mb-3 flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-primary" />
              <span className="text-sm font-bold text-card-foreground">
                {lang === "ru" ? "Содержание" : "Content"}
              </span>
            </div>
            <p className="text-sm leading-relaxed text-card-foreground">{lesson.content}</p>
          </div>
          <div className="rounded-2xl bg-muted/50 p-5">
            <p className="text-sm font-semibold text-muted-foreground">{lang === "ru" ? "Перевод:" : "Translation:"}</p>
            <p className="mt-1 text-sm leading-relaxed text-foreground">{lesson.contentRu}</p>
          </div>
          <button
            onClick={() => setStep("quiz")}
            className="w-full rounded-2xl bg-primary py-3.5 text-center text-sm font-bold text-primary-foreground shadow-md transition-transform active:scale-[0.98]"
          >
            {lang === "ru" ? "Перейти к тесту" : "Go to Quiz"} ({quiz.length} {lang === "ru" ? "вопросов" : "questions"})
          </button>
        </div>
      )}

      {step === "quiz" && quiz[currentQ] && (
        <div className="animate-slide-up space-y-4 px-4">
          {/* Progress bar */}
          <div className="h-1.5 overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-primary transition-all duration-500"
              style={{ width: `${((currentQ + 1) / quiz.length) * 100}%` }}
            />
          </div>

          <div className="rounded-2xl bg-card p-5 shadow-sm">
            <p className="text-base font-bold text-card-foreground">
              {lang === "ru" ? quiz[currentQ].questionRu : quiz[currentQ].question}
            </p>
          </div>

          <div className="space-y-2">
            {quiz[currentQ].options.map((opt, i) => {
              const isSelected = selectedAnswer === i
              const isCorrect = i === quiz[currentQ].correctIndex
              let optClass = "bg-card text-card-foreground border-2 border-transparent"
              if (showExplanation) {
                if (isCorrect) optClass = "bg-success/10 text-success border-2 border-success"
                else if (isSelected && !isCorrect) optClass = "bg-destructive/10 text-destructive border-2 border-destructive"
              } else if (isSelected) {
                optClass = "bg-primary/10 text-primary border-2 border-primary"
              }

              return (
                <button
                  key={i}
                  onClick={() => handleAnswer(i)}
                  disabled={selectedAnswer !== null}
                  className={`w-full rounded-xl p-3.5 text-left text-sm font-medium shadow-sm transition-all ${optClass} ${
                    selectedAnswer === null ? "active:scale-[0.98]" : ""
                  }`}
                >
                  <span className="mr-2 inline-flex h-6 w-6 items-center justify-center rounded-full bg-muted text-xs font-bold text-muted-foreground">
                    {String.fromCharCode(65 + i)}
                  </span>
                  {opt}
                </button>
              )
            })}
          </div>

          {showExplanation && (
            <div className="animate-slide-up rounded-2xl bg-muted/50 p-4">
              <p className="text-xs font-semibold text-muted-foreground">
                {selectedAnswer === quiz[currentQ].correctIndex ? (lang === "ru" ? "Правильно! " : "Correct! ") : (lang === "ru" ? "Неправильно. " : "Wrong. ")}
              </p>
              <p className="mt-1 text-sm text-foreground">
                {lang === "ru" ? quiz[currentQ].explanationRu : quiz[currentQ].explanation}
              </p>
            </div>
          )}

          {showExplanation && (
            <button
              onClick={handleNext}
              className="w-full rounded-2xl bg-primary py-3.5 text-center text-sm font-bold text-primary-foreground shadow-md transition-transform active:scale-[0.98]"
            >
              {currentQ < quiz.length - 1 ? t("quiz.next", lang) : t("quiz.finish", lang)}
            </button>
          )}
        </div>
      )}

      {step === "result" && (
        <div className="animate-scale-in flex flex-col items-center gap-5 px-4 pt-8">
          <div className="text-6xl">{score >= quiz.length * 0.7 ? "🎉" : "💪"}</div>
          <h2 className="text-2xl font-bold text-foreground">
            {score >= quiz.length * 0.7 ? t("quiz.great", lang) : t("quiz.keep_going", lang)}
          </h2>
          <div className="rounded-2xl bg-card p-6 text-center shadow-sm">
            <p className="text-4xl font-bold text-primary">{score}/{quiz.length}</p>
            <p className="mt-1 text-sm text-muted-foreground">{t("quiz.score", lang)}</p>
          </div>
          <div className="flex gap-3 text-center">
            <div className="rounded-xl bg-coins/10 px-4 py-2">
              <p className="text-lg font-bold text-foreground">+{5 + score * 3}</p>
              <p className="text-xs text-muted-foreground">{t("dash.coins", lang)}</p>
            </div>
            <div className="rounded-xl bg-xp/10 px-4 py-2">
              <p className="text-lg font-bold text-foreground">+{20 + score * 10}</p>
              <p className="text-xs text-muted-foreground">{t("dash.xp", lang)}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-full rounded-2xl bg-primary py-3.5 text-center text-sm font-bold text-primary-foreground shadow-md transition-transform active:scale-[0.98]"
          >
            {t("dash.continue", lang)}
          </button>
        </div>
      )}
    </div>
  )
}

export function LessonsPage() {
  const { user } = useApp()
  const lang = user.lang
  const [selectedLevel, setSelectedLevel] = useState<CEFRLevel | "all">("all")
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null)
  const levels: CEFRLevel[] = ["A1", "A2", "B1", "B2", "C1", "C2"]
  const currentLevelIdx = levels.indexOf(user.level)

  const filteredLessons = selectedLevel === "all"
    ? lessons
    : lessons.filter(l => l.level === selectedLevel)

  if (activeLesson) {
    return <LessonViewer lesson={activeLesson} onClose={() => setActiveLesson(null)} />
  }

  return (
    <div className="no-scrollbar overflow-y-auto px-4 pb-24 pt-4">
      <h1 className="mb-4 text-xl font-bold text-foreground">{t("lessons.title", lang)}</h1>

      {/* Level Filter */}
      <div className="no-scrollbar mb-4 flex gap-2 overflow-x-auto">
        <button
          onClick={() => setSelectedLevel("all")}
          className={`flex-shrink-0 rounded-full px-3.5 py-1.5 text-xs font-bold transition-all ${
            selectedLevel === "all" ? "bg-primary text-primary-foreground" : "bg-card text-card-foreground shadow-sm"
          }`}
        >
          {t("lessons.all_levels", lang)}
        </button>
        {levels.map((lvl) => {
          const cfg = levelConfig[lvl]
          const isLocked = levels.indexOf(lvl) > currentLevelIdx + 1
          return (
            <button
              key={lvl}
              onClick={() => !isLocked && setSelectedLevel(lvl)}
              disabled={isLocked}
              className={`flex flex-shrink-0 items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-bold transition-all ${
                selectedLevel === lvl
                  ? "text-primary-foreground shadow-md"
                  : isLocked
                  ? "bg-muted text-muted-foreground opacity-50"
                  : "bg-card text-card-foreground shadow-sm"
              }`}
              style={selectedLevel === lvl ? { backgroundColor: cfg.color } : undefined}
            >
              {isLocked && <Lock className="h-3 w-3" />}
              {cfg.emoji} {lvl}
            </button>
          )
        })}
      </div>

      {/* Lessons List */}
      <div className="space-y-2.5">
        {filteredLessons.map((lesson) => {
          const cfg = levelConfig[lesson.level]
          const isLocked = levels.indexOf(lesson.level) > currentLevelIdx + 1
          const isDone = Math.random() > 0.7 // demo: random completion state

          return (
            <button
              key={lesson.id}
              onClick={() => !isLocked && setActiveLesson(lesson)}
              disabled={isLocked}
              className={`flex w-full items-center gap-3 rounded-2xl bg-card p-4 text-left shadow-sm transition-all ${
                isLocked ? "opacity-50" : "active:scale-[0.98]"
              }`}
            >
              <div
                className="flex h-11 w-11 items-center justify-center rounded-xl text-lg"
                style={{ backgroundColor: `${cfg.color}20` }}
              >
                {isLocked ? <Lock className="h-5 w-5 text-muted-foreground" /> :
                  lesson.type === "word" ? "📝" : lesson.type === "grammar" ? "📐" : lesson.type === "dialogue" ? "💬" : lesson.type === "idiom" ? "🗣️" : "📖"}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-card-foreground">
                    {lang === "ru" ? lesson.titleRu : lesson.title}
                  </span>
                  <span
                    className="rounded-full px-1.5 py-0.5 text-[10px] font-bold text-primary-foreground"
                    style={{ backgroundColor: cfg.color }}
                  >
                    {lesson.level}
                  </span>
                </div>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {lang === "ru" ? lesson.descriptionRu : lesson.description}
                </p>
              </div>
              {isDone ? (
                <CheckCircle2 className="h-5 w-5 text-success" />
              ) : !isLocked ? (
                <Play className="h-5 w-5 text-primary" />
              ) : null}
            </button>
          )
        })}
      </div>
    </div>
  )
}
