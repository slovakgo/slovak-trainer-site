
Татьяна, [09.11.2025 19:12]
/* === ThinkLevel Script === */

// Элементы
const preloader = document.getElementById("preloader");
const container = document.querySelector(".container");
const intro = document.getElementById("intro");
const quiz = document.getElementById("quiz");
const resultSection = document.getElementById("result");
const questionText = document.getElementById("question-text");
const answersContainer = document.getElementById("answers");
const emailForm = document.getElementById("emailForm");
const scoreText = document.getElementById("score");
const restartBtn = document.getElementById("restart");

// Звуковой эффект
const clickSound = new Audio("https://cdn.pixabay.com/download/audio/2022/03/15/audio_8763ec9b14.mp3?filename=click-124467.mp3");

// Примерные вопросы (можно менять)
const questions = [
  {
    question: "1. Что будет, если разделить 30 пополам и прибавить 10?",
    answers: ["25", "40", "30", "35"],
    correct: 2
  },
  {
    question: "2. Какое слово лишнее: Мозг, Мысль, Сознание, Апельсин?",
    answers: ["Сознание", "Мозг", "Апельсин", "Мысль"],
    correct: 2
  },
  {
    question: "3. Если все розы — цветы, а некоторые цветы — красные, значит ли это, что все розы красные?",
    answers: ["Да", "Нет"],
    correct: 1
  },
  {
    question: "4. Продолжи ряд: 2, 4, 8, 16, ...",
    answers: ["18", "24", "32", "36"],
    correct: 2
  },
  {
    question: "5. Найди закономерность: О, Д, Т, Ч, П, ...",
    answers: ["С", "Ш", "Ш", "С"],
    correct: 0
  },
  {
    question: "6. Сколько углов у трёх треугольников?",
    answers: ["6", "9", "3", "12"],
    correct: 1
  },
  {
    question: "7. Если вчера было завтра, то какой день сегодня?",
    answers: ["Понедельник", "Воскресенье", "Суббота", "Пятница"],
    correct: 1
  },
  {
    question: "8. Что тяжелее: 1 кг железа или 1 кг пуха?",
    answers: ["Железо", "Пух", "Одинаково", "Зависит от ветра"],
    correct: 2
  },
  {
    question: "9. Какое число лишнее: 3, 9, 27, 81, 243, 729, 1000?",
    answers: ["243", "1000", "27", "729"],
    correct: 1
  },
  {
    question: "10. Что получится, если к слову 'ум' добавить 'ник'?",
    answers: ["Умник", "Ничего", "Логика", "Мозг"],
    correct: 0
  }
];

let currentQuestion = 0;
let score = 0;
let userEmail = "";

// === Загрузка страницы ===
window.addEventListener("load", () => {
  setTimeout(() => {
    preloader.style.display = "none";
    container.classList.remove("hidden");
  }, 3000);
});

// === Старт по вводу email ===
emailForm.addEventListener("submit", (e) => {
  e.preventDefault();
  userEmail = document.getElementById("email").value;
  intro.classList.add("hidden");
  quiz.classList.remove("hidden");
  showQuestion();
});

// === Показ вопроса ===
function showQuestion() {
  const q = questions[currentQuestion];
  questionText.textContent = q.question;
  answersContainer.innerHTML = "";

  q.answers.forEach((ans, i) => {
    const btn = document.createElement("button");
    btn.textContent = ans;
    btn.addEventListener("click", () => {
      clickSound.play();
      handleAnswer(i);
    });
    answersContainer.appendChild(btn);
  });
}

// === Проверка ответа ===
function handleAnswer(i) {
  if (i === questions[currentQuestion].correct) score++;
  currentQuestion++;

  if (currentQuestion < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
}

// === Результат ===
function showResult() {
  quiz.classList.add("hidden");
  resultSection.classList.remove("hidden");
  scoreText.textContent = Ваш результат: ${score} из ${questions.length};

  // Отправка через Formspree
  fetch("https://formspree.io/f/mzzypjko", {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: userEmail,
      message: Результат теста ThinkLevel: ${score} из ${questions.length}
    })
  });
}

// === Сброс ===
restartBtn.addEventListener("click", () => {
  resultSection.classList.add("hidden");
  intro.classList.remove("hidden");
  currentQuestion = 0;
  score = 0;
});

Татьяна, [09.11.2025 19:23]
<!doctype html>
<html lang="ru">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>ThinkLevel — тест эффективности мозга</title>
  <link rel="preload" href="images/neuron-bg.jpg" as="image">
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div class="parallax" aria-hidden="true"></div>

  <div id="app">

    <section id="loader" class="screen center">
      <h1 class="brand"><span class="emoji">🧠</span>ThinkLevel</h1>
      <p class="muted">запускается…</p>
    </section>

    <section id="intro" class="screen hidden">
      <h1 class="brand"><span class="emoji">🧠</span>ThinkLevel</h1>
      <p class="lead">Введите e-mail, чтобы начать. Результат покажем на экране и пришлём на почту автоматически.</p>

      <form id="emailForm" class="email-form" novalidate>
        <input type="email" id="email" name="email" placeholder="Ваш e-mail" required>
        <button type="submit" class="btn primary">Старт</button>
      </form>

      <p class="muted small">&gt; 1000 пользователей уже получили свои результаты</p>
    </section>

    <section id="quiz" class="screen hidden">
      <div class="meta">
        <div class="progress">
          <div class="bar" id="progressBar" style="width:0%"></div>
        </div>
        <div class="counter"><span id="qNum">Вопрос 1</span> из <span id="qTotal">25</span></div>
      </div>

      <h2 id="question" class="question"></h2>

      <div id="answers" class="answers"></div>

      <div id="checkpoint" class="checkpoint hidden">
        <div class="cp-title">Промежуточный прогресс</div>
        <div class="cp-grid" id="cpGrid"></div>
        <button id="continueBtn" class="btn ghost">Продолжить</button>
      </div>
    </section>

    <section id="result" class="screen hidden">
      <h1 class="brand"><span class="emoji">🧠</span>ThinkLevel</h1>
      <p id="resultText" class="lead"></p>
      <p class="muted">Результат отправлен на почту.</p>
      <button id="restart" class="btn ghost">Пройти заново</button>
    </section>

  </div>

  <script src="script.js"></script>
</body>
</html>

Татьяна, [09.11.2025 19:25]
const emailInput = document.getElementById('email');
const emailForm  = document.getElementById('emailForm');
const loader     = document.getElementById('loader');
const intro      = document.getElementById('intro');
const quiz       = document.getElementById('quiz');
const result     = document.getElementById('result');

const qNumEl = document.getElementById('qNum');
const qTotalEl = document.getElementById('qTotal');
const progressBar = document.getElementById('progressBar');
const questionEl = document.getElementById('question');
const answersEl = document.getElementById('answers');
const checkpointEl = document.getElementById('checkpoint');
const cpGrid = document.getElementById('cpGrid');
const continueBtn = document.getElementById('continueBtn');
const resultText = document.getElementById('resultText');
const restartBtn = document.getElementById('restart');

let current = 0;
let score = 0;
let email = '';
let sectionScores = { logic:0, patterns:0, math:0, memory:0 };
let sectionMap = [];

const questions = [
  {t:'Какое число продолжит ряд: 3, 6, 18, 72, ?', a:['144','216','288','360'], c:1, s:'patterns'},
  {t:'Если все воробьи — птицы, а некоторые птицы не умеют летать, можно ли заключить, что некоторые воробьи не умеют летать?', a:['Да','Нет'], c:1, s:'logic'},
  {t:'Найдите значение: (12×7 − 18) ÷ 6', a:['9','10','11','12'], c:2, s:'math'},
  {t:'Вы запомнили код 5-2-9-5-2. Сколько различных трёхзначных фрагментов можно извлечь с сохранением порядка?', a:['3','4','5','6'], c:2, s:'memory'},
  {t:'Сколько прямых можно провести через 4 точки, если никакие три из них не лежат на одной прямой?', a:['4','5','6','7'], c:2, s:'logic'},

  {t:'Выберите лишнее: книга, тетрадь, карандаш, ручка', a:['Книга','Тетрадь','Карандаш','Ручка'], c:0, s:'patterns'},
  {t:'Если X=2^a и Y=2^b, чему равно X·Y?', a:['2^(a+b)','2^(ab)','2^(a−b)','2^(a/b)'], c:0, s:'math'},
  {t:'Слово «ВЕТКА». Какая буква будет третьей справа?', a:['В','Е','Т','К'], c:3, s:'memory'},
  {t:'Сколько единиц в двоичной записи числа 255?', a:['7','8','9','10'], c:1, s:'logic'},
  {t:'В ряду A, C, F, J, O, ? какая буква далее?', a:['T','U','V','W'], c:0, s:'patterns'},

  {t:'Решите уравнение: 3x + 2 = 20', a:['5','6','7','8'], c:2, s:'math'},
  {t:'Запомните: 9, 4, 1, 7, 3. Какое число было вторым?', a:['9','4','1','7'], c:1, s:'memory'},
  {t:'Если неверно, что «все А — B», то верно, что:', a:['некоторые А не B','никакие А не B','все А — не B','все B — A'], c:0, s:'logic'},
  {t:'Какое число продолжит ряд: 2, 5, 11, 23, ?', a:['35','41','47','49'], c:1, s:'patterns'},
  {t:'Чему равна сумма углов треугольника в радианах?', a:['π','2π','π/2','3π/2'], c:0, s:'math'},

  {t:'Запомните слово: КОРИДОР. Какая буква была 5-й?', a:['И','Д','О','Р'], c:1, s:'memory'},
  {t:'Если сегодня среда, какой день будет через 100 дней?', a:['Понедельник','Вторник','Среда','Четверг'], c:3, s:'logic'},
  {t:'Какое число продолжит: 1, 1, 2, 3, 5, 8, ?', a:['11','12','13','14'], c:2, s:'patterns'},
  {t:'Найдите корень: x² − 9x + 18 = 0', a:['2 и 9','3 и 6','1 и 18','−3 и −6'], c:1, s:'math'},
  {t:'Запомните: ♦ ◼ △ ◼ ♦. Какая фигура была третьей?', a:['♦','◼','△','○'], c:2, s:'memory'},

  {t:'Какое число продолжит ряд: 4, 6, 9, 13, 18, ?', a:['22','24','25','27'], c:3, s:'patterns'},
  {t:'Если ни один P не является Q, а некоторые Q — R, верно ли, что некоторые R не P?', a:['Да','Нет'], c:0, s:'logic'},
  {t:'Чему равна 15% от 480?', a:['62','72','78','84'], c:1, s:'math'},
  {t:'Запомните: 7A, 9B, 4C, 7A, ?. Что дальше?', a:['9B','4C','7A','8D'], c:1, s:'memory'},
  {t:'Какой следующий узор: ⬜⬛⬛, ⬜⬜⬛, ⬜⬜⬜, ?', a:['⬛⬜⬜','⬜⬛⬜','⬜⬜⬛','⬛⬛⬜'], c:1, s:'patterns'},
];

qTotalEl.textContent = questions.length;

setTimeout(()=>{ loader.classList.add('hidden'); intro.classList.remove('hidden'); }, 600);

emailForm?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const v = (emailInput.value || '').trim();
  if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) { emailInput.focus(); return; }
  email = v;
  intro.classList.add('hidden');
  quiz.classList.remove('hidden');
Татьяна, [09.11.2025 19:12]
/* === ThinkLevel Script === */

// Элементы
const preloader = document.getElementById("preloader");
const container = document.querySelector(".container");
const intro = document.getElementById("intro");
const quiz = document.getElementById("quiz");
const resultSection = document.getElementById("result");
const questionText = document.getElementById("question-text");
const answersContainer = document.getElementById("answers");
const emailForm = document.getElementById("emailForm");
const scoreText = document.getElementById("score");
const restartBtn = document.getElementById("restart");

// Звуковой эффект
const clickSound = new Audio("https://cdn.pixabay.com/download/audio/2022/03/15/audio_8763ec9b14.mp3?filename=click-124467.mp3");

// Примерные вопросы (можно менять)
const questions = [
  {
    question: "1. Что будет, если разделить 30 пополам и прибавить 10?",
    answers: ["25", "40", "30", "35"],
    correct: 2
  },
  {
    question: "2. Какое слово лишнее: Мозг, Мысль, Сознание, Апельсин?",
    answers: ["Сознание", "Мозг", "Апельсин", "Мысль"],
    correct: 2
  },
  {
    question: "3. Если все розы — цветы, а некоторые цветы — красные, значит ли это, что все розы красные?",
    answers: ["Да", "Нет"],
    correct: 1
  },
  {
    question: "4. Продолжи ряд: 2, 4, 8, 16, ...",
    answers: ["18", "24", "32", "36"],
    correct: 2
  },
  {
    question: "5. Найди закономерность: О, Д, Т, Ч, П, ...",
    answers: ["С", "Ш", "Ш", "С"],
    correct: 0
  },
  {
    question: "6. Сколько углов у трёх треугольников?",
    answers: ["6", "9", "3", "12"],
    correct: 1
  },
  {
    question: "7. Если вчера было завтра, то какой день сегодня?",
    answers: ["Понедельник", "Воскресенье", "Суббота", "Пятница"],
    correct: 1
  },
  {
    question: "8. Что тяжелее: 1 кг железа или 1 кг пуха?",
    answers: ["Железо", "Пух", "Одинаково", "Зависит от ветра"],
    correct: 2
  },
  {
    question: "9. Какое число лишнее: 3, 9, 27, 81, 243, 729, 1000?",
    answers: ["243", "1000", "27", "729"],
    correct: 1
  },
  {
    question: "10. Что получится, если к слову 'ум' добавить 'ник'?",
    answers: ["Умник", "Ничего", "Логика", "Мозг"],
    correct: 0
  }
];

let currentQuestion = 0;
let score = 0;
let userEmail = "";

// === Загрузка страницы ===
window.addEventListener("load", () => {
  setTimeout(() => {
    preloader.style.display = "none";
    container.classList.remove("hidden");
  }, 3000);
});

// === Старт по вводу email ===
emailForm.addEventListener("submit", (e) => {
  e.preventDefault();
  userEmail = document.getElementById("email").value;
  intro.classList.add("hidden");
  quiz.classList.remove("hidden");
  showQuestion();
});

// === Показ вопроса ===
function showQuestion() {
  const q = questions[currentQuestion];
  questionText.textContent = q.question;
  answersContainer.innerHTML = "";

  q.answers.forEach((ans, i) => {
    const btn = document.createElement("button");
    btn.textContent = ans;
    btn.addEventListener("click", () => {
      clickSound.play();
      handleAnswer(i);
    });
    answersContainer.appendChild(btn);
  });
}

// === Проверка ответа ===
function handleAnswer(i) {
  if (i === questions[currentQuestion].correct) score++;
  currentQuestion++;

  if (currentQuestion < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
}

// === Результат ===
function showResult() {
  quiz.classList.add("hidden");
  resultSection.classList.remove("hidden");
  scoreText.textContent = Ваш результат: ${score} из ${questions.length};

  // Отправка через Formspree
  fetch("https://formspree.io/f/mzzypjko", {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: userEmail,
      message: Результат теста ThinkLevel: ${score} из ${questions.length}
    })
  });
}

// === Сброс ===
restartBtn.addEventListener("click", () => {
  resultSection.classList.add("hidden");
  intro.classList.remove("hidden");
  currentQuestion = 0;
  score = 0;
});

Татьяна, [09.11.2025 19:23]
<!doctype html>
<html lang="ru">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>ThinkLevel — тест эффективности мозга</title>
  <link rel="preload" href="images/neuron-bg.jpg" as="image">
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div class="parallax" aria-hidden="true"></div>

  <div id="app">

    <section id="loader" class="screen center">
      <h1 class="brand"><span class="emoji">🧠</span>ThinkLevel</h1>
      <p class="muted">запускается…</p>
    </section>

    <section id="intro" class="screen hidden">
      <h1 class="brand"><span class="emoji">🧠</span>ThinkLevel</h1>
      <p class="lead">Введите e-mail, чтобы начать. Результат покажем на экране и пришлём на почту автоматически.</p>

      <form id="emailForm" class="email-form" novalidate>
        <input type="email" id="email" name="email" placeholder="Ваш e-mail" required>
        <button type="submit" class="btn primary">Старт</button>
      </form>

      <p class="muted small">&gt; 1000 пользователей уже получили свои результаты</p>
    </section>

    <section id="quiz" class="screen hidden">
      <div class="meta">
        <div class="progress">
          <div class="bar" id="progressBar" style="width:0%"></div>
        </div>
        <div class="counter"><span id="qNum">Вопрос 1</span> из <span id="qTotal">25</span></div>
      </div>

      <h2 id="question" class="question"></h2>

      <div id="answers" class="answers"></div>

      <div id="checkpoint" class="checkpoint hidden">
        <div class="cp-title">Промежуточный прогресс</div>
        <div class="cp-grid" id="cpGrid"></div>
        <button id="continueBtn" class="btn ghost">Продолжить</button>
      </div>
    </section>

    <section id="result" class="screen hidden">
      <h1 class="brand"><span class="emoji">🧠</span>ThinkLevel</h1>
      <p id="resultText" class="lead"></p>
      <p class="muted">Результат отправлен на почту.</p>
      <button id="restart" class="btn ghost">Пройти заново</button>
    </section>

  </div>

  <script src="script.js"></script>
</body>
</html>

Татьяна, [09.11.2025 19:25]
const emailInput = document.getElementById('email');
const emailForm  = document.getElementById('emailForm');
const loader     = document.getElementById('loader');
const intro      = document.getElementById('intro');
const quiz       = document.getElementById('quiz');
const result     = document.getElementById('result');

const qNumEl = document.getElementById('qNum');
const qTotalEl = document.getElementById('qTotal');
const progressBar = document.getElementById('progressBar');
const questionEl = document.getElementById('question');
const answersEl = document.getElementById('answers');
const checkpointEl = document.getElementById('checkpoint');
const cpGrid = document.getElementById('cpGrid');
const continueBtn = document.getElementById('continueBtn');
const resultText = document.getElementById('resultText');
const restartBtn = document.getElementById('restart');

let current = 0;
let score = 0;
let email = '';
let sectionScores = { logic:0, patterns:0, math:0, memory:0 };
let sectionMap = [];

const questions = [
  {t:'Какое число продолжит ряд: 3, 6, 18, 72, ?', a:['144','216','288','360'], c:1, s:'patterns'},
  {t:'Если все воробьи — птицы, а некоторые птицы не умеют летать, можно ли заключить, что некоторые воробьи не умеют летать?', a:['Да','Нет'], c:1, s:'logic'},
  {t:'Найдите значение: (12×7 − 18) ÷ 6', a:['9','10','11','12'], c:2, s:'math'},
  {t:'Вы запомнили код 5-2-9-5-2. Сколько различных трёхзначных фрагментов можно извлечь с сохранением порядка?', a:['3','4','5','6'], c:2, s:'memory'},
  {t:'Сколько прямых можно провести через 4 точки, если никакие три из них не лежат на одной прямой?', a:['4','5','6','7'], c:2, s:'logic'},

  {t:'Выберите лишнее: книга, тетрадь, карандаш, ручка', a:['Книга','Тетрадь','Карандаш','Ручка'], c:0, s:'patterns'},
  {t:'Если X=2^a и Y=2^b, чему равно X·Y?', a:['2^(a+b)','2^(ab)','2^(a−b)','2^(a/b)'], c:0, s:'math'},
  {t:'Слово «ВЕТКА». Какая буква будет третьей справа?', a:['В','Е','Т','К'], c:3, s:'memory'},
  {t:'Сколько единиц в двоичной записи числа 255?', a:['7','8','9','10'], c:1, s:'logic'},
  {t:'В ряду A, C, F, J, O, ? какая буква далее?', a:['T','U','V','W'], c:0, s:'patterns'},

  {t:'Решите уравнение: 3x + 2 = 20', a:['5','6','7','8'], c:2, s:'math'},
  {t:'Запомните: 9, 4, 1, 7, 3. Какое число было вторым?', a:['9','4','1','7'], c:1, s:'memory'},
  {t:'Если неверно, что «все А — B», то верно, что:', a:['некоторые А не B','никакие А не B','все А — не B','все B — A'], c:0, s:'logic'},
  {t:'Какое число продолжит ряд: 2, 5, 11, 23, ?', a:['35','41','47','49'], c:1, s:'patterns'},
  {t:'Чему равна сумма углов треугольника в радианах?', a:['π','2π','π/2','3π/2'], c:0, s:'math'},

  {t:'Запомните слово: КОРИДОР. Какая буква была 5-й?', a:['И','Д','О','Р'], c:1, s:'memory'},
  {t:'Если сегодня среда, какой день будет через 100 дней?', a:['Понедельник','Вторник','Среда','Четверг'], c:3, s:'logic'},
  {t:'Какое число продолжит: 1, 1, 2, 3, 5, 8, ?', a:['11','12','13','14'], c:2, s:'patterns'},
  {t:'Найдите корень: x² − 9x + 18 = 0', a:['2 и 9','3 и 6','1 и 18','−3 и −6'], c:1, s:'math'},
  {t:'Запомните: ♦ ◼ △ ◼ ♦. Какая фигура была третьей?', a:['♦','◼','△','○'], c:2, s:'memory'},

  {t:'Какое число продолжит ряд: 4, 6, 9, 13, 18, ?', a:['22','24','25','27'], c:3, s:'patterns'},
  {t:'Если ни один P не является Q, а некоторые Q — R, верно ли, что некоторые R не P?', a:['Да','Нет'], c:0, s:'logic'},
  {t:'Чему равна 15% от 480?', a:['62','72','78','84'], c:1, s:'math'},
  {t:'Запомните: 7A, 9B, 4C, 7A, ?. Что дальше?', a:['9B','4C','7A','8D'], c:1, s:'memory'},
  {t:'Какой следующий узор: ⬜⬛⬛, ⬜⬜⬛, ⬜⬜⬜, ?', a:['⬛⬜⬜','⬜⬛⬜','⬜⬜⬛','⬛⬛⬜'], c:1, s:'patterns'},
];

qTotalEl.textContent = questions.length;

setTimeout(()=>{ loader.classList.add('hidden'); intro.classList.remove('hidden'); }, 600);

emailForm?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const v = (emailInput.value || '').trim();
  if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) { emailInput.focus(); return; }
  email = v;
  intro.classList.add('hidden');
  quiz.classList.remove('hidden');