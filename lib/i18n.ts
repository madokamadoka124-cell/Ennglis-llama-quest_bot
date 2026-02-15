// Internationalization - Russian (default) and English UI

export type Lang = "ru" | "en"

const translations = {
  // Navigation
  "nav.home": { ru: "Главная", en: "Home" },
  "nav.lessons": { ru: "Уроки", en: "Lessons" },
  "nav.quiz": { ru: "Тесты", en: "Quiz" },
  "nav.social": { ru: "Рейтинг", en: "Ranking" },
  "nav.profile": { ru: "Профиль", en: "Profile" },

  // Dashboard
  "dash.welcome": { ru: "Привет", en: "Hello" },
  "dash.streak": { ru: "Серия", en: "Streak" },
  "dash.days": { ru: "дней", en: "days" },
  "dash.coins": { ru: "Монеты", en: "Coins" },
  "dash.xp": { ru: "Опыт", en: "XP" },
  "dash.level": { ru: "Уровень", en: "Level" },
  "dash.daily_goal": { ru: "Цель на день", en: "Daily Goal" },
  "dash.continue": { ru: "Продолжить", en: "Continue" },
  "dash.meme_of_day": { ru: "Мем дня", en: "Meme of the Day" },
  "dash.start_lesson": { ru: "Начать урок", en: "Start Lesson" },
  "dash.recommended": { ru: "Рекомендуемые", en: "Recommended" },
  "dash.quick_quiz": { ru: "Быстрый тест", en: "Quick Quiz" },
  "dash.progress": { ru: "Прогресс", en: "Progress" },

  // Lessons
  "lessons.title": { ru: "Уроки", en: "Lessons" },
  "lessons.all_levels": { ru: "Все уровни", en: "All Levels" },
  "lessons.start": { ru: "Начать", en: "Start" },
  "lessons.locked": { ru: "Заблокировано", en: "Locked" },
  "lessons.complete": { ru: "Завершён", en: "Complete" },

  // Quiz
  "quiz.title": { ru: "Тест", en: "Quiz" },
  "quiz.correct": { ru: "Правильно!", en: "Correct!" },
  "quiz.wrong": { ru: "Неправильно!", en: "Wrong!" },
  "quiz.next": { ru: "Далее", en: "Next" },
  "quiz.finish": { ru: "Завершить", en: "Finish" },
  "quiz.score": { ru: "Результат", en: "Score" },
  "quiz.translate": { ru: "Переведите:", en: "Translate:" },
  "quiz.choose": { ru: "Выберите правильный ответ", en: "Choose the correct answer" },
  "quiz.again": { ru: "Ещё раз", en: "Try Again" },
  "quiz.great": { ru: "Отлично!", en: "Great!" },
  "quiz.keep_going": { ru: "Продолжай!", en: "Keep going!" },

  // Profile
  "profile.title": { ru: "Профиль", en: "Profile" },
  "profile.stats": { ru: "Статистика", en: "Statistics" },
  "profile.achievements": { ru: "Достижения", en: "Achievements" },
  "profile.settings": { ru: "Настройки", en: "Settings" },
  "profile.theme": { ru: "Тема", en: "Theme" },
  "profile.language": { ru: "Язык интерфейса", en: "UI Language" },
  "profile.dark": { ru: "Тёмная", en: "Dark" },
  "profile.light": { ru: "Светлая", en: "Light" },
  "profile.premium": { ru: "Премиум", en: "Premium" },
  "profile.free": { ru: "Бесплатный", en: "Free" },
  "profile.words_learned": { ru: "Слов изучено", en: "Words Learned" },
  "profile.lessons_done": { ru: "Уроков пройдено", en: "Lessons Done" },
  "profile.quizzes_done": { ru: "Тестов пройдено", en: "Quizzes Done" },
  "profile.accuracy": { ru: "Точность", en: "Accuracy" },

  // Shop
  "shop.title": { ru: "Магазин", en: "Shop" },
  "shop.buy": { ru: "Купить", en: "Buy" },
  "shop.owned": { ru: "Куплено", en: "Owned" },
  "shop.coins": { ru: "монет", en: "coins" },
  "shop.stars": { ru: "звёзд", en: "stars" },

  // Leaderboard
  "lead.title": { ru: "Рейтинг", en: "Leaderboard" },
  "lead.global": { ru: "Глобальный", en: "Global" },
  "lead.friends": { ru: "Друзья", en: "Friends" },
  "lead.weekly": { ru: "За неделю", en: "Weekly" },

  // General
  "general.loading": { ru: "Загрузка...", en: "Loading..." },
  "general.error": { ru: "Ошибка", en: "Error" },
  "general.back": { ru: "Назад", en: "Back" },
  "general.save": { ru: "Сохранить", en: "Save" },
  "general.cancel": { ru: "Отмена", en: "Cancel" },
} as const

type TranslationKey = keyof typeof translations

export function t(key: TranslationKey, lang: Lang): string {
  return translations[key]?.[lang] ?? key
}

export { translations }
