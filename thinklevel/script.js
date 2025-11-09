const intro = document.getElementById('intro');
const quiz = document.getElementById('quiz');
const result = document.getElementById('result');
const emailForm = document.getElementById('emailForm');
const emailInput = document.getElementById('email');
const qText = document.getElementById('qText');
const answers = document.getElementById('answers');
const bar = document.getElementById('bar');
const qIdx = document.getElementById('qIdx');
const qTotal = document.getElementById('qTotal');
const resultText = document.getElementById('resultText');
const restart = document.getElementById('restart');
const questions = [
  {
    question: "Какое число продолжит ряд: 3, 6, 18, 72, ?",
    answers: ["144", "216", "288", "324"],
    correct: 1
  },
  {
    question: "Найдите лишнее слово: апельсин, яблоко, банан, картофель",
    answers: ["апельсин", "яблоко", "банан", "картофель"],
    correct: 3
  },
  {
    question: "Продолжите ряд: ПН, ВТ, СР, ЧТ, ...",
    answers: ["ПТ", "СБ", "ВС", "ПН"],
    correct: 0
  },
  {
    question: "Если все розы — цветы, а некоторые цветы быстро вянут, то:",
    answers: [
      "Все розы быстро вянут",
      "Некоторые розы быстро вянут",
      "Никакие розы не вянут",
      "Розы не цветы"
    ],
    correct: 1
  },
  {
    question: "Что тяжелее: 1 кг железа или 1 кг ваты?",
    answers: ["Железо", "Вата", "Одинаково", "Невозможно определить"],
    correct: 2
  },
  {
    question: "В комнате 3 кошки. Каждая видит 3 кошки. Сколько всего кошек?",
    answers: ["3", "4", "6", "9"],
    correct: 1
  },
  {
    question: "Если два карандаша стоят 10 центов, сколько стоят 10 карандашей?",
    answers: ["40 центов", "50 центов", "1 доллар", "1 евро"],
    correct: 1
  },
  {
    question: "Продолжите последовательность: 2, 4, 8, 16, ...",
    answers: ["20", "24", "30", "32"],
    correct: 3
  },
  {
    question: "Если завтра после завтра — суббота, то какой сегодня день?",
    answers: ["Среда", "Четверг", "Пятница", "Суббота"],
    correct: 0
  },
  {
    question: "Сколько углов у пятиугольника?",
    answers: ["4", "5", "6", "8"],
    correct: 1
  },
  {
    question: "Если квадрат имеет сторону 4 см, чему равна его площадь?",
    answers: ["8", "12", "16", "20"],
    correct: 2
  },
  {
    question: "Что идёт после числа 99?",
    answers: ["100", "101", "999", "0"],
    correct: 0
  },
  {
    question: "Кто старше: дедушка твоего отца или отец твоего дедушки?",
    answers: ["Дедушка отца", "Отец дедушки", "Оба ровесники", "Невозможно сказать"],
    correct: 1
  },
  {
    question: "Если одно яйцо варится 5 минут, то сколько будут вариться 5 яиц?",
    answers: ["5 минут", "10 минут", "25 минут", "1 час"],
    correct: 0
  },
  {
    question: "Найдите лишнее число: 2, 4, 8, 16, 24, 32",
    answers: ["2", "4", "8", "24"],
    correct: 3
  },
  {
    question: "Продолжите логический ряд: 1, 1, 2, 3, 5, 8, ...",
    answers: ["11", "12", "13", "15"],
    correct: 2
  },
  {
    question: "Какое слово будет третьим, если слова упорядочить по алфавиту: дом, ананас, ёж, борщ?",
    answers: ["борщ", "дом", "ёж", "ананас"],
    correct: 0
  },
  {
    question: "Если все студенты читают книги, а Иван студент, то:",
    answers: ["Иван не читает книги", "Иван читает книги", "Иван не студент", "Неизвестно"],
    correct: 1
  },
  {
    question: "Продолжите последовательность: А, Б, В, Г, ...",
    answers: ["Е", "Ж", "Д", "З"],
    correct: 2
  },
  {
    question: "Какое из слов не относится к остальным: луна, солнце, звезда, планета?",
    answers: ["луна", "солнце", "звезда", "планета"],
    correct: 3
  },
  {
    question: "Сколько минут в 3 часах?",
    answers: ["120", "150", "180", "240"],
    correct: 2
  },
  {
    question: "Какое число следующее после 11, если считать только нечётные?",
    answers: ["12", "13", "15", "17"],
    correct: 1
  },
  {
    question: "Если кошка ловит 1 мышь за 3 минуты, то за 15 минут поймает:",
    answers: ["3", "4", "5", "6"],
    correct: 3
  },
  {
    question: "Что получится, если смешать жёлтый и синий цвета?",
    answers: ["Оранжевый", "Зелёный", "Фиолетовый", "Красный"],
    correct: 1
  },
  {
    question: "Сколько будет 9 × 9?",
    answers: ["72", "81", "99", "108"],
    correct: 1
  }
];

qTotal.textContent = questions.length;

let current = 0, score = 0, email = "";

emailForm.addEventListener('submit', e => {
  e.preventDefault();
  email = emailInput.value;
  intro.classList.add('hidden');
  quiz.classList.remove('hidden');
  showQuestion();
});

function showQuestion(){
  const q = questions[current];
  qText.textContent = q.q;
  answers.innerHTML = "";
  qIdx.textContent = current+1;
  bar.style.width = (current/questions.length)*100 + "%";
  q.a.forEach((ans, i)=>{
    const btn = document.createElement('button');
    btn.className = "btn ghost";
    btn.textContent = ans;
    btn.onclick = ()=>check(i);
    answers.appendChild(btn);
  });
}
function check(i){
  if(i === questions[current].c) score++;
  current++;
  if(current < questions.length) showQuestion();
  else finish();
}
function finish(){
  quiz.classList.add('hidden');
  result.classList.remove('hidden');
  resultText.textContent = "Результат отправлен на почту.";
  fetch("https://formspree.io/f/mzzypjko", {
    method: "POST",
    headers: {"Accept": "application/json"},
    body: new FormData(emailForm)
  });
}
restart.addEventListener('click', ()=>{
  result.classList.add('hidden');
  intro.classList.remove('hidden');
  current=0; score=0;
});
