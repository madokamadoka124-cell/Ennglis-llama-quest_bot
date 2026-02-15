// English Llama Quest - Complete Learning Database

export type CEFRLevel = "A1" | "A2" | "B1" | "B2" | "C1" | "C2"

export interface VocabWord {
  id: string
  english: string
  russian: string
  level: CEFRLevel
  theme: string
  example: string
  exampleRu: string
}

export interface Lesson {
  id: string
  level: CEFRLevel
  theme: string
  type: "word" | "grammar" | "dialogue" | "reading" | "idiom"
  title: string
  titleRu: string
  description: string
  descriptionRu: string
  content: string
  contentRu: string
  quiz: QuizQuestion[]
}

export interface QuizQuestion {
  id: string
  question: string
  questionRu: string
  options: string[]
  correctIndex: number
  explanation: string
  explanationRu: string
}

export interface Meme {
  id: string
  slug: string
  englishText: string
  russianTrans: string
  level: CEFRLevel
  category: "slang" | "idiom" | "fun"
  emoji: string
}

export interface Achievement {
  id: string
  slug: string
  nameRu: string
  nameEn: string
  descRu: string
  descEn: string
  emoji: string
  reward: { coins: number; xp: number }
  levelReq: CEFRLevel
}

export interface ShopItem {
  id: string
  nameRu: string
  nameEn: string
  priceCoins: number
  priceStars?: number
  type: "lessonPack" | "avatar" | "boost" | "theme"
  emoji: string
  description: string
  descriptionRu: string
}

// ==================== VOCABULARY DATABASE ====================
export const vocabulary: VocabWord[] = [
  // A1 - Basics (50 words sample)
  { id: "w1", english: "apple", russian: "яблоко", level: "A1", theme: "food", example: "I eat an apple every day.", exampleRu: "Я ем яблоко каждый день." },
  { id: "w2", english: "water", russian: "вода", level: "A1", theme: "food", example: "Can I have some water?", exampleRu: "Можно мне воды?" },
  { id: "w3", english: "house", russian: "дом", level: "A1", theme: "home", example: "This is my house.", exampleRu: "Это мой дом." },
  { id: "w4", english: "cat", russian: "кот / кошка", level: "A1", theme: "animals", example: "The cat is sleeping.", exampleRu: "Кот спит." },
  { id: "w5", english: "dog", russian: "собака", level: "A1", theme: "animals", example: "I love my dog.", exampleRu: "Я люблю свою собаку." },
  { id: "w6", english: "book", russian: "книга", level: "A1", theme: "education", example: "I read a book.", exampleRu: "Я читаю книгу." },
  { id: "w7", english: "friend", russian: "друг", level: "A1", theme: "people", example: "She is my friend.", exampleRu: "Она моя подруга." },
  { id: "w8", english: "school", russian: "школа", level: "A1", theme: "education", example: "I go to school.", exampleRu: "Я хожу в школу." },
  { id: "w9", english: "family", russian: "семья", level: "A1", theme: "people", example: "I love my family.", exampleRu: "Я люблю свою семью." },
  { id: "w10", english: "morning", russian: "утро", level: "A1", theme: "time", example: "Good morning!", exampleRu: "Доброе утро!" },
  { id: "w11", english: "beautiful", russian: "красивый", level: "A1", theme: "adjectives", example: "The flower is beautiful.", exampleRu: "Цветок красивый." },
  { id: "w12", english: "happy", russian: "счастливый", level: "A1", theme: "emotions", example: "I am happy today.", exampleRu: "Сегодня я счастлив." },
  { id: "w13", english: "thank you", russian: "спасибо", level: "A1", theme: "phrases", example: "Thank you for your help.", exampleRu: "Спасибо за помощь." },
  { id: "w14", english: "please", russian: "пожалуйста", level: "A1", theme: "phrases", example: "Please sit down.", exampleRu: "Пожалуйста, садитесь." },
  { id: "w15", english: "yes", russian: "да", level: "A1", theme: "phrases", example: "Yes, I agree.", exampleRu: "Да, я согласен." },
  { id: "w16", english: "no", russian: "нет", level: "A1", theme: "phrases", example: "No, thank you.", exampleRu: "Нет, спасибо." },
  { id: "w17", english: "hello", russian: "привет", level: "A1", theme: "phrases", example: "Hello! How are you?", exampleRu: "Привет! Как дела?" },
  { id: "w18", english: "goodbye", russian: "до свидания", level: "A1", theme: "phrases", example: "Goodbye, see you tomorrow.", exampleRu: "До свидания, увидимся завтра." },
  { id: "w19", english: "today", russian: "сегодня", level: "A1", theme: "time", example: "Today is Monday.", exampleRu: "Сегодня понедельник." },
  { id: "w20", english: "big", russian: "большой", level: "A1", theme: "adjectives", example: "This is a big car.", exampleRu: "Это большая машина." },

  // A2 - Daily Conversation
  { id: "w21", english: "appointment", russian: "встреча / приём", level: "A2", theme: "daily", example: "I have a doctor's appointment.", exampleRu: "У меня приём у врача." },
  { id: "w22", english: "neighborhood", russian: "район / соседство", level: "A2", theme: "city", example: "I live in a nice neighborhood.", exampleRu: "Я живу в хорошем районе." },
  { id: "w23", english: "expensive", russian: "дорогой", level: "A2", theme: "shopping", example: "This phone is too expensive.", exampleRu: "Этот телефон слишком дорогой." },
  { id: "w24", english: "recipe", russian: "рецепт", level: "A2", theme: "food", example: "Can you share this recipe?", exampleRu: "Можешь поделиться этим рецептом?" },
  { id: "w25", english: "weather", russian: "погода", level: "A2", theme: "nature", example: "The weather is nice today.", exampleRu: "Сегодня хорошая погода." },
  { id: "w26", english: "vacation", russian: "отпуск / каникулы", level: "A2", theme: "travel", example: "I'm going on vacation next week.", exampleRu: "На следующей неделе я еду в отпуск." },
  { id: "w27", english: "comfortable", russian: "удобный", level: "A2", theme: "adjectives", example: "This chair is very comfortable.", exampleRu: "Это кресло очень удобное." },
  { id: "w28", english: "decision", russian: "решение", level: "A2", theme: "abstract", example: "It was a difficult decision.", exampleRu: "Это было трудное решение." },
  { id: "w29", english: "hobby", russian: "хобби", level: "A2", theme: "lifestyle", example: "Reading is my favorite hobby.", exampleRu: "Чтение — моё любимое хобби." },
  { id: "w30", english: "suggestion", russian: "предложение / совет", level: "A2", theme: "communication", example: "Do you have any suggestions?", exampleRu: "У тебя есть какие-нибудь предложения?" },

  // B1 - Travel & Work
  { id: "w31", english: "compromise", russian: "компромисс", level: "B1", theme: "business", example: "We need to find a compromise.", exampleRu: "Нам нужно найти компромисс." },
  { id: "w32", english: "opportunity", russian: "возможность", level: "B1", theme: "business", example: "This is a great opportunity.", exampleRu: "Это отличная возможность." },
  { id: "w33", english: "responsibility", russian: "ответственность", level: "B1", theme: "work", example: "It's your responsibility.", exampleRu: "Это ваша ответственность." },
  { id: "w34", english: "experience", russian: "опыт / впечатление", level: "B1", theme: "work", example: "She has a lot of experience.", exampleRu: "У неё большой опыт." },
  { id: "w35", english: "environment", russian: "окружающая среда", level: "B1", theme: "nature", example: "We must protect the environment.", exampleRu: "Мы должны защищать окружающую среду." },
  { id: "w36", english: "achievement", russian: "достижение", level: "B1", theme: "success", example: "Winning the award was a great achievement.", exampleRu: "Выиграть награду — это большое достижение." },
  { id: "w37", english: "advantage", russian: "преимущество", level: "B1", theme: "business", example: "Being bilingual is a big advantage.", exampleRu: "Быть двуязычным — большое преимущество." },
  { id: "w38", english: "attitude", russian: "отношение / позиция", level: "B1", theme: "personality", example: "She has a positive attitude.", exampleRu: "У неё позитивный настрой." },
  { id: "w39", english: "confirm", russian: "подтвердить", level: "B1", theme: "communication", example: "Please confirm your reservation.", exampleRu: "Пожалуйста, подтвердите бронирование." },
  { id: "w40", english: "disappointed", russian: "разочарован", level: "B1", theme: "emotions", example: "I was disappointed with the results.", exampleRu: "Я был разочарован результатами." },

  // B2 - Opinions & Arguments
  { id: "w41", english: "nevertheless", russian: "тем не менее", level: "B2", theme: "linking", example: "It was raining; nevertheless, we went out.", exampleRu: "Шёл дождь; тем не менее мы вышли." },
  { id: "w42", english: "inevitable", russian: "неизбежный", level: "B2", theme: "abstract", example: "Change is inevitable.", exampleRu: "Перемены неизбежны." },
  { id: "w43", english: "perspective", russian: "перспектива / точка зрения", level: "B2", theme: "opinions", example: "Let's look at this from a different perspective.", exampleRu: "Давайте посмотрим на это с другой точки зрения." },
  { id: "w44", english: "substantial", russian: "существенный", level: "B2", theme: "academic", example: "We made substantial progress.", exampleRu: "Мы добились существенного прогресса." },
  { id: "w45", english: "controversy", russian: "противоречие / спор", level: "B2", theme: "society", example: "The topic caused much controversy.", exampleRu: "Тема вызвала много споров." },
  { id: "w46", english: "consequence", russian: "последствие", level: "B2", theme: "abstract", example: "Every action has consequences.", exampleRu: "Каждое действие имеет последствия." },
  { id: "w47", english: "adequate", russian: "достаточный / адекватный", level: "B2", theme: "academic", example: "The supply is not adequate.", exampleRu: "Запасы недостаточны." },
  { id: "w48", english: "innovative", russian: "инновационный", level: "B2", theme: "technology", example: "They developed an innovative solution.", exampleRu: "Они разработали инновационное решение." },
  { id: "w49", english: "contradictory", russian: "противоречивый", level: "B2", theme: "academic", example: "The evidence is contradictory.", exampleRu: "Доказательства противоречивы." },
  { id: "w50", english: "elaborate", russian: "подробный / разрабатывать", level: "B2", theme: "communication", example: "Could you elaborate on that point?", exampleRu: "Не могли бы вы подробнее рассказать об этом?" },

  // C1 - Nuance & Precision
  { id: "w51", english: "pragmatic", russian: "прагматичный", level: "C1", theme: "personality", example: "She takes a pragmatic approach.", exampleRu: "Она использует прагматичный подход." },
  { id: "w52", english: "exacerbate", russian: "усугублять", level: "C1", theme: "academic", example: "Stress can exacerbate health problems.", exampleRu: "Стресс может усугубить проблемы со здоровьем." },
  { id: "w53", english: "meticulous", russian: "скрупулёзный", level: "C1", theme: "personality", example: "She is meticulous in her work.", exampleRu: "Она скрупулёзна в своей работе." },
  { id: "w54", english: "unprecedented", russian: "беспрецедентный", level: "C1", theme: "news", example: "These are unprecedented times.", exampleRu: "Это беспрецедентные времена." },
  { id: "w55", english: "scrutinize", russian: "тщательно изучать", level: "C1", theme: "academic", example: "The report was scrutinized by experts.", exampleRu: "Отчёт был тщательно изучен экспертами." },

  // C2 - Mastery & Literature
  { id: "w56", english: "ubiquitous", russian: "вездесущий", level: "C2", theme: "academic", example: "Smartphones are ubiquitous in modern society.", exampleRu: "Смартфоны вездесущи в современном обществе." },
  { id: "w57", english: "ephemeral", russian: "эфемерный / мимолётный", level: "C2", theme: "literature", example: "Fame is often ephemeral.", exampleRu: "Слава часто мимолётна." },
  { id: "w58", english: "sycophant", russian: "подхалим / льстец", level: "C2", theme: "personality", example: "The king was surrounded by sycophants.", exampleRu: "Король был окружён подхалимами." },
  { id: "w59", english: "juxtaposition", russian: "сопоставление", level: "C2", theme: "literature", example: "The juxtaposition of wealth and poverty was striking.", exampleRu: "Сопоставление богатства и бедности было поразительным." },
  { id: "w60", english: "quintessential", russian: "типичный / квинтэссенция", level: "C2", theme: "academic", example: "She is the quintessential professional.", exampleRu: "Она — квинтэссенция профессионализма." },
]

// ==================== IDIOMS & SLANG ====================
export const idioms: VocabWord[] = [
  { id: "i1", english: "break a leg", russian: "ни пуха ни пера", level: "B1", theme: "idiom", example: "Break a leg at your interview!", exampleRu: "Ни пуха ни пера на собеседовании!" },
  { id: "i2", english: "spill the tea", russian: "рассказать сплетни", level: "B2", theme: "slang", example: "Come on, spill the tea!", exampleRu: "Давай, рассказывай сплетни!" },
  { id: "i3", english: "hit the nail on the head", russian: "попасть в точку", level: "B1", theme: "idiom", example: "You hit the nail on the head.", exampleRu: "Ты попал в точку." },
  { id: "i4", english: "piece of cake", russian: "проще простого", level: "A2", theme: "idiom", example: "The test was a piece of cake.", exampleRu: "Тест был проще простого." },
  { id: "i5", english: "it's not rocket science", russian: "это не высшая математика", level: "B1", theme: "idiom", example: "Come on, it's not rocket science!", exampleRu: "Да ладно, это не высшая математика!" },
  { id: "i6", english: "once in a blue moon", russian: "раз в сто лет", level: "B2", theme: "idiom", example: "I eat fast food once in a blue moon.", exampleRu: "Я ем фастфуд раз в сто лет." },
  { id: "i7", english: "the ball is in your court", russian: "мяч на вашей стороне", level: "B2", theme: "idiom", example: "I made the offer. The ball is in your court.", exampleRu: "Я сделал предложение. Мяч на вашей стороне." },
  { id: "i8", english: "to be lit", russian: "быть крутым / зажигать", level: "B1", theme: "slang", example: "That party was lit!", exampleRu: "Та вечеринка была огонь!" },
  { id: "i9", english: "GOAT", russian: "лучший из лучших (Greatest Of All Time)", level: "B2", theme: "slang", example: "Messi is the GOAT.", exampleRu: "Месси — лучший из лучших." },
  { id: "i10", english: "no cap", russian: "без шуток / серьёзно", level: "B2", theme: "slang", example: "That movie was amazing, no cap.", exampleRu: "Тот фильм был потрясающий, без шуток." },
  { id: "i11", english: "a penny for your thoughts", russian: "о чём задумался?", level: "C1", theme: "idiom", example: "You look pensive. A penny for your thoughts?", exampleRu: "Ты выглядишь задумчивым. О чём думаешь?" },
  { id: "i12", english: "to beat around the bush", russian: "ходить вокруг да около", level: "B2", theme: "idiom", example: "Stop beating around the bush and tell me.", exampleRu: "Хватит ходить вокруг да около, говори прямо." },
  { id: "i13", english: "when pigs fly", russian: "когда рак на горе свистнет", level: "B1", theme: "idiom", example: "He'll clean his room when pigs fly.", exampleRu: "Он уберёт свою комнату, когда рак на горе свистнет." },
  { id: "i14", english: "to ghost someone", russian: "перестать отвечать / пропасть", level: "B2", theme: "slang", example: "He ghosted me after the first date.", exampleRu: "Он пропал после первого свидания." },
  { id: "i15", english: "to be on the same page", russian: "быть на одной волне", level: "B1", theme: "idiom", example: "Let's make sure we're on the same page.", exampleRu: "Давайте убедимся, что мы на одной волне." },
]

// ==================== MEMES DATABASE ====================
export const memes: Meme[] = [
  { id: "m1", slug: "spill-tea", englishText: "When someone says 'spill the tea'", russianTrans: "Когда кто-то говорит 'расскажи сплетни', а лама уже с самоваром", level: "B2", category: "slang", emoji: "🫖" },
  { id: "m2", slug: "goat-llama", englishText: "GOAT? No, GOAT-Llama!", russianTrans: "GOAT? Нет, КОЗО-Лама! Лучший из лучших!", level: "B2", category: "slang", emoji: "🐐" },
  { id: "m3", slug: "lit-newyear", englishText: "When the party is LIT", russianTrans: "Когда вечеринка — огонь! Зажёг как Новый год!", level: "B1", category: "slang", emoji: "🔥" },
  { id: "m4", slug: "rocket-science", englishText: "It's not rocket science!", russianTrans: "Это не высшая математика! Даже лама разберётся!", level: "B1", category: "idiom", emoji: "🚀" },
  { id: "m5", slug: "piece-cake", englishText: "English is a piece of cake!", russianTrans: "Английский — проще простого! (лама ест торт)", level: "A2", category: "idiom", emoji: "🍰" },
  { id: "m6", slug: "to-be-or-llama", englishText: "To be or not to llama?", russianTrans: "Быть или не быть ламой? Вот в чём вопрос!", level: "C2", category: "fun", emoji: "🎭" },
  { id: "m7", slug: "break-leg", englishText: "Break a leg! (not literally, llama)", russianTrans: "Ни пуха ни пера! (Лама аккуратно ступает)", level: "B1", category: "idiom", emoji: "🦵" },
  { id: "m8", slug: "matryoshka", englishText: "Llama in a Matryoshka", russianTrans: "Лама в матрёшке: уровень вложенности — C2!", level: "A1", category: "fun", emoji: "🪆" },
  { id: "m9", slug: "no-cap", englishText: "No cap, this app is fire", russianTrans: "Без шуток, это приложение — огонь!", level: "B2", category: "slang", emoji: "🧢" },
  { id: "m10", slug: "blue-moon", englishText: "Once in a blue moon...", russianTrans: "Раз в сто лет... лама учит русский!", level: "B2", category: "idiom", emoji: "🌙" },
  { id: "m11", slug: "ghost-llama", englishText: "When they ghost you", russianTrans: "Когда тебя игнорируют... лама-призрак!", level: "B2", category: "slang", emoji: "👻" },
  { id: "m12", slug: "same-page", englishText: "Are we on the same page?", russianTrans: "Мы на одной волне? Лама читает ту же книгу!", level: "B1", category: "idiom", emoji: "📖" },
]

// ==================== LESSONS DATABASE ====================
export const lessons: Lesson[] = [
  {
    id: "l1",
    level: "A1",
    theme: "greetings",
    type: "dialogue",
    title: "Hello & Goodbye",
    titleRu: "Приветствия и прощания",
    description: "Learn basic greetings in English",
    descriptionRu: "Изучите базовые приветствия на английском",
    content: "Hello! My name is Anna. — Hi Anna! My name is Max. — Nice to meet you! — Nice to meet you too! — Goodbye! — See you later!",
    contentRu: "Привет! Меня зовут Анна. — Привет, Анна! Меня зовут Макс. — Приятно познакомиться! — Мне тоже! — До свидания! — Увидимся!",
    quiz: [
      { id: "q1", question: "How do you say 'Привет' in English?", questionRu: "Как сказать 'Привет' по-английски?", options: ["Hello", "Goodbye", "Thank you", "Please"], correctIndex: 0, explanation: "'Hello' is the most common greeting.", explanationRu: "'Hello' — самое распространённое приветствие." },
      { id: "q2", question: "What does 'Nice to meet you' mean?", questionRu: "Что значит 'Nice to meet you'?", options: ["Приятно познакомиться", "До свидания", "Спасибо", "Пожалуйста"], correctIndex: 0, explanation: "This phrase is used when meeting someone for the first time.", explanationRu: "Эту фразу используют при первом знакомстве." },
    ]
  },
  {
    id: "l2",
    level: "A1",
    theme: "food",
    type: "word",
    title: "Food & Drinks",
    titleRu: "Еда и напитки",
    description: "Essential food vocabulary",
    descriptionRu: "Основные слова о еде",
    content: "apple, bread, water, milk, coffee, tea, rice, chicken, fish, salad",
    contentRu: "яблоко, хлеб, вода, молоко, кофе, чай, рис, курица, рыба, салат",
    quiz: [
      { id: "q3", question: "What is 'хлеб' in English?", questionRu: "Как будет 'хлеб' по-английски?", options: ["Bread", "Water", "Rice", "Milk"], correctIndex: 0, explanation: "'Bread' is хлеб.", explanationRu: "'Bread' — это хлеб." },
      { id: "q4", question: "What is 'рыба' in English?", questionRu: "Как будет 'рыба' по-английски?", options: ["Chicken", "Fish", "Salad", "Rice"], correctIndex: 1, explanation: "'Fish' is рыба.", explanationRu: "'Fish' — это рыба." },
    ]
  },
  {
    id: "l3",
    level: "A1",
    theme: "numbers",
    type: "grammar",
    title: "Numbers 1-100",
    titleRu: "Числа от 1 до 100",
    description: "Learn to count in English",
    descriptionRu: "Научитесь считать по-английски",
    content: "1-one, 2-two, 3-three, 4-four, 5-five, 10-ten, 20-twenty, 50-fifty, 100-one hundred",
    contentRu: "1-один, 2-два, 3-три, 4-четыре, 5-пять, 10-десять, 20-двадцать, 50-пятьдесят, 100-сто",
    quiz: [
      { id: "q5", question: "How do you say '5' in English?", questionRu: "Как сказать '5' по-английски?", options: ["Four", "Five", "Six", "Three"], correctIndex: 1, explanation: "5 is 'five'.", explanationRu: "5 — это 'five'." },
    ]
  },
  {
    id: "l4",
    level: "A2",
    theme: "travel",
    type: "dialogue",
    title: "At the Airport",
    titleRu: "В аэропорту",
    description: "Useful phrases for traveling",
    descriptionRu: "Полезные фразы для путешествий",
    content: "Excuse me, where is gate 5? — It's down the hall, on the left. — Thank you! Can I see your boarding pass? — Here it is. — Have a nice flight!",
    contentRu: "Извините, где выход 5? — Он в конце зала, слева. — Спасибо! Можно ваш посадочный талон? — Вот он. — Хорошего полёта!",
    quiz: [
      { id: "q6", question: "What is a 'boarding pass'?", questionRu: "Что такое 'boarding pass'?", options: ["Посадочный талон", "Паспорт", "Билет на поезд", "Виза"], correctIndex: 0, explanation: "A boarding pass is the document you need to board a plane.", explanationRu: "Boarding pass — документ для посадки в самолёт." },
    ]
  },
  {
    id: "l5",
    level: "A2",
    theme: "shopping",
    type: "dialogue",
    title: "Shopping for Clothes",
    titleRu: "Покупка одежды",
    description: "Learn to shop in English",
    descriptionRu: "Научитесь делать покупки на английском",
    content: "Can I try this on? — Sure, the fitting room is over there. — Do you have this in a medium? — Let me check. Yes, here you go! — How much is it? — It's 29.99.",
    contentRu: "Можно это примерить? — Конечно, примерочная вон там. — У вас есть это в размере M? — Дайте проверю. Да, вот! — Сколько стоит? — 29.99.",
    quiz: [
      { id: "q7", question: "What does 'How much is it?' mean?", questionRu: "Что означает 'How much is it?'", options: ["Сколько это стоит?", "Где это?", "Можно примерить?", "Какой размер?"], correctIndex: 0, explanation: "'How much is it?' asks about the price.", explanationRu: "'How much is it?' — вопрос о цене." },
    ]
  },
  {
    id: "l6",
    level: "B1",
    theme: "business",
    type: "dialogue",
    title: "Job Interview",
    titleRu: "Собеседование",
    description: "Prepare for job interviews in English",
    descriptionRu: "Подготовьтесь к собеседованию на английском",
    content: "Tell me about yourself. — I have 3 years of experience in marketing. I'm passionate about digital campaigns. — What are your strengths? — I'm a quick learner and a team player. — Where do you see yourself in 5 years?",
    contentRu: "Расскажите о себе. — У меня 3 года опыта в маркетинге. Я увлечён цифровыми кампаниями. — Каковы ваши сильные стороны? — Я быстро учусь и умею работать в команде. — Кем вы видите себя через 5 лет?",
    quiz: [
      { id: "q8", question: "What does 'team player' mean?", questionRu: "Что значит 'team player'?", options: ["Командный игрок", "Капитан команды", "Тренер", "Один игрок"], correctIndex: 0, explanation: "A team player works well with others.", explanationRu: "Team player — тот, кто хорошо работает в команде." },
    ]
  },
  {
    id: "l7",
    level: "B1",
    theme: "grammar",
    type: "grammar",
    title: "Present Perfect vs Past Simple",
    titleRu: "Present Perfect и Past Simple",
    description: "Master these important tenses",
    descriptionRu: "Освойте эти важные времена",
    content: "Present Perfect: I have visited Paris. (experience, no specific time) Past Simple: I visited Paris last year. (specific time) Key: 'have/has + past participle' vs 'V2/ed'",
    contentRu: "Present Perfect: I have visited Paris. (опыт, нет точного времени) Past Simple: I visited Paris last year. (точное время) Ключ: 'have/has + причастие' vs 'V2/ed'",
    quiz: [
      { id: "q9", question: "Which is correct: 'I have visited Paris ___'", questionRu: "Что правильно: 'I have visited Paris ___'", options: ["(no time marker)", "last year", "yesterday", "in 2020"], correctIndex: 0, explanation: "Present Perfect doesn't use specific time markers.", explanationRu: "Present Perfect не используется с конкретными маркерами времени." },
    ]
  },
  {
    id: "l8",
    level: "B2",
    theme: "idioms",
    type: "idiom",
    title: "Business Idioms",
    titleRu: "Бизнес-идиомы",
    description: "Essential idioms for the workplace",
    descriptionRu: "Важные идиомы для работы",
    content: "Think outside the box - be creative. Get the ball rolling - start something. Back to the drawing board - start over. Cut corners - do cheaply. The bottom line - the most important point.",
    contentRu: "Think outside the box - мыслить нестандартно. Get the ball rolling - начать дело. Back to the drawing board - начать сначала. Cut corners - экономить. The bottom line - суть дела.",
    quiz: [
      { id: "q10", question: "What does 'think outside the box' mean?", questionRu: "Что значит 'think outside the box'?", options: ["Мыслить нестандартно", "Думать в коробке", "Быть скучным", "Работать дома"], correctIndex: 0, explanation: "It means to think creatively.", explanationRu: "Значит мыслить творчески, нестандартно." },
    ]
  },
  {
    id: "l9",
    level: "C1",
    theme: "debate",
    type: "reading",
    title: "The Art of Persuasion",
    titleRu: "Искусство убеждения",
    description: "Advanced rhetoric and argumentation",
    descriptionRu: "Продвинутая риторика и аргументация",
    content: "Effective persuasion relies on three pillars: ethos (credibility), pathos (emotional appeal), and logos (logical reasoning). A compelling argument weaves all three seamlessly.",
    contentRu: "Эффективное убеждение опирается на три столпа: этос (доверие), пафос (эмоциональный призыв) и логос (логическое рассуждение). Убедительный аргумент сочетает все три.",
    quiz: [
      { id: "q11", question: "What is 'pathos' in persuasion?", questionRu: "Что такое 'пафос' в убеждении?", options: ["Emotional appeal", "Logical reasoning", "Credibility", "Statistics"], correctIndex: 0, explanation: "Pathos appeals to emotions.", explanationRu: "Пафос обращается к эмоциям." },
    ]
  },
  {
    id: "l10",
    level: "C2",
    theme: "literature",
    type: "reading",
    title: "Shakespeare's Legacy",
    titleRu: "Наследие Шекспира",
    description: "Explore advanced English through literature",
    descriptionRu: "Изучите продвинутый английский через литературу",
    content: "Shakespeare coined over 1,700 words still in use: 'eyeball', 'lonely', 'generous'. His mastery of iambic pentameter and dramatic irony transformed English literature irrevocably.",
    contentRu: "Шекспир создал более 1700 слов, которые используются до сих пор: 'eyeball', 'lonely', 'generous'. Его мастерство пятистопного ямба и драматической иронии навсегда изменило английскую литературу.",
    quiz: [
      { id: "q12", question: "How many words did Shakespeare coin?", questionRu: "Сколько слов создал Шекспир?", options: ["Over 1,700", "About 500", "Exactly 1,000", "Over 5,000"], correctIndex: 0, explanation: "Shakespeare invented over 1,700 English words.", explanationRu: "Шекспир придумал более 1700 английских слов." },
    ]
  },
]

// ==================== ACHIEVEMENTS ====================
export const achievements: Achievement[] = [
  { id: "a1", slug: "first-word", nameRu: "Первое слово", nameEn: "First Word", descRu: "Выучи первое слово", descEn: "Learn your first word", emoji: "🎉", reward: { coins: 10, xp: 5 }, levelReq: "A1" },
  { id: "a2", slug: "streak-3", nameRu: "3 дня подряд", nameEn: "3-Day Streak", descRu: "Занимайся 3 дня подряд", descEn: "Practice 3 days in a row", emoji: "🔥", reward: { coins: 25, xp: 15 }, levelReq: "A1" },
  { id: "a3", slug: "streak-7", nameRu: "Неделя силы", nameEn: "Power Week", descRu: "Занимайся 7 дней подряд", descEn: "Practice 7 days in a row", emoji: "💪", reward: { coins: 50, xp: 30 }, levelReq: "A1" },
  { id: "a4", slug: "streak-30", nameRu: "Месяц мастерства", nameEn: "Month of Mastery", descRu: "Занимайся 30 дней подряд", descEn: "Practice 30 days in a row", emoji: "👑", reward: { coins: 200, xp: 100 }, levelReq: "A2" },
  { id: "a5", slug: "quiz-master", nameRu: "Мастер тестов", nameEn: "Quiz Master", descRu: "Пройди 50 тестов", descEn: "Complete 50 quizzes", emoji: "🧠", reward: { coins: 100, xp: 50 }, levelReq: "A2" },
  { id: "a6", slug: "word-collector-100", nameRu: "Собиратель слов", nameEn: "Word Collector", descRu: "Выучи 100 слов", descEn: "Learn 100 words", emoji: "📚", reward: { coins: 75, xp: 40 }, levelReq: "A2" },
  { id: "a7", slug: "b1-reached", nameRu: "Путешественник", nameEn: "Traveler", descRu: "Достигни уровня B1", descEn: "Reach B1 level", emoji: "✈️", reward: { coins: 150, xp: 80 }, levelReq: "B1" },
  { id: "a8", slug: "idiom-fan", nameRu: "Любитель идиом", nameEn: "Idiom Fan", descRu: "Выучи 20 идиом", descEn: "Learn 20 idioms", emoji: "🗣️", reward: { coins: 80, xp: 45 }, levelReq: "B1" },
  { id: "a9", slug: "b2-reached", nameRu: "Дебатёр", nameEn: "Debater", descRu: "Достигни уровня B2", descEn: "Reach B2 level", emoji: "🎤", reward: { coins: 200, xp: 100 }, levelReq: "B2" },
  { id: "a10", slug: "c1-reached", nameRu: "Профессионал", nameEn: "Professional", descRu: "Достигни уровня C1", descEn: "Reach C1 level", emoji: "🏆", reward: { coins: 300, xp: 150 }, levelReq: "C1" },
  { id: "a11", slug: "c2-conqueror", nameRu: "Покоритель C2", nameEn: "C2 Conqueror", descRu: "Достигни уровня C2!", descEn: "Reach C2 mastery!", emoji: "🌟", reward: { coins: 500, xp: 250 }, levelReq: "C2" },
  { id: "a12", slug: "social-butterfly", nameRu: "Душа компании", nameEn: "Social Butterfly", descRu: "Добавь 5 друзей", descEn: "Add 5 friends", emoji: "🦋", reward: { coins: 60, xp: 30 }, levelReq: "A1" },
]

// ==================== SHOP ====================
export const shopItems: ShopItem[] = [
  { id: "s1", nameRu: "Набор A2 слов", nameEn: "A2 Word Pack", priceCoins: 100, priceStars: 50, type: "lessonPack", emoji: "📦", description: "Unlock 200 extra A2 words", descriptionRu: "Открой 200 дополнительных слов уровня A2" },
  { id: "s2", nameRu: "Полный набор B2", nameEn: "Full B2 Bundle", priceCoins: 500, priceStars: 200, type: "lessonPack", emoji: "🎁", description: "All B2 lessons & idioms", descriptionRu: "Все уроки и идиомы уровня B2" },
  { id: "s3", nameRu: "Набор C2 мастера", nameEn: "C2 Mastery Pack", priceCoins: 1000, priceStars: 500, type: "lessonPack", emoji: "👑", description: "Advanced C2 content & coaching", descriptionRu: "Продвинутый контент C2 и коучинг" },
  { id: "s4", nameRu: "Аватар: Космо-лама", nameEn: "Avatar: Space Llama", priceCoins: 150, type: "avatar", emoji: "🚀", description: "Llama astronaut avatar", descriptionRu: "Аватар ламы-космонавта" },
  { id: "s5", nameRu: "Аватар: Бизнес-лама", nameEn: "Avatar: Business Llama", priceCoins: 150, type: "avatar", emoji: "💼", description: "Llama in a suit avatar", descriptionRu: "Аватар ламы в костюме" },
  { id: "s6", nameRu: "Двойной XP (24ч)", nameEn: "Double XP (24h)", priceCoins: 200, priceStars: 100, type: "boost", emoji: "⚡", description: "Double XP for 24 hours", descriptionRu: "Двойной XP на 24 часа" },
  { id: "s7", nameRu: "Защита серии", nameEn: "Streak Shield", priceCoins: 300, priceStars: 150, type: "boost", emoji: "🛡️", description: "Protect your streak for 1 day", descriptionRu: "Защити серию на 1 день" },
  { id: "s8", nameRu: "Тема: Ночная лама", nameEn: "Theme: Night Llama", priceCoins: 250, type: "theme", emoji: "🌙", description: "Exclusive dark theme variant", descriptionRu: "Эксклюзивный вариант тёмной темы" },
]

// ==================== LEADERBOARD DATA ====================
export interface LeaderboardEntry {
  id: string
  name: string
  avatar: string
  level: CEFRLevel
  xp: number
  streak: number
}

export const leaderboardData: LeaderboardEntry[] = [
  { id: "u1", name: "Алексей", avatar: "🧑‍💻", level: "B2", xp: 12450, streak: 45 },
  { id: "u2", name: "Мария", avatar: "👩‍🎓", level: "C1", xp: 11200, streak: 32 },
  { id: "u3", name: "Дмитрий", avatar: "🧔", level: "B1", xp: 9800, streak: 28 },
  { id: "u4", name: "Анна", avatar: "👩‍🔬", level: "B2", xp: 8900, streak: 21 },
  { id: "u5", name: "Иван", avatar: "🧑‍🚀", level: "A2", xp: 7600, streak: 15 },
  { id: "u6", name: "Елена", avatar: "👩‍💼", level: "B1", xp: 6800, streak: 19 },
  { id: "u7", name: "Сергей", avatar: "🧑‍🎨", level: "C2", xp: 15200, streak: 67 },
  { id: "u8", name: "Ольга", avatar: "👩‍🏫", level: "B2", xp: 10100, streak: 24 },
  { id: "u9", name: "Николай", avatar: "🧑‍🔧", level: "A1", xp: 3200, streak: 8 },
  { id: "u10", name: "Татьяна", avatar: "👩‍⚕️", level: "B1", xp: 7200, streak: 17 },
]

// ==================== LEVEL CONFIG ====================
export const levelConfig: Record<CEFRLevel, { name: string; nameRu: string; color: string; minXp: number; emoji: string }> = {
  A1: { name: "Beginner", nameRu: "Начинающий", color: "#FFB347", minXp: 0, emoji: "🌱" },
  A2: { name: "Elementary", nameRu: "Элементарный", color: "#87CEEB", minXp: 500, emoji: "🌿" },
  B1: { name: "Intermediate", nameRu: "Средний", color: "#77DD77", minXp: 1500, emoji: "🌳" },
  B2: { name: "Upper-Intermediate", nameRu: "Выше среднего", color: "#6495ED", minXp: 3500, emoji: "🏔️" },
  C1: { name: "Advanced", nameRu: "Продвинутый", color: "#9370DB", minXp: 6000, emoji: "🌟" },
  C2: { name: "Mastery", nameRu: "Мастерство", color: "#1a1a5e", minXp: 10000, emoji: "👑" },
}

// Helper to get words by level
export function getWordsByLevel(level: CEFRLevel): VocabWord[] {
  return vocabulary.filter(w => w.level === level)
}

export function getLessonsByLevel(level: CEFRLevel): Lesson[] {
  return lessons.filter(l => l.level === level)
}

export function getMemesByLevel(level: CEFRLevel): Meme[] {
  return memes.filter(m => m.level === level)
}
