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