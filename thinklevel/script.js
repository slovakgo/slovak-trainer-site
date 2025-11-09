// === Элементы
const preloader = null;
const container = document.querySelector(".container");
const intro = document.getElementById("intro");
const quiz = document.getElementById("quiz");
const resultSection = document.getElementById("result");
const qText = document.getElementById("qText");
const answersContainer = document.getElementById("answers");
const emailForm = document.getElementById("emailForm");
const emailInput = document.getElementById("email");
const bar = document.getElementById("bar");
const qIdxEl = document.getElementById("qIdx");
const qTotalEl = document.getElementById("qTotal");
const resultText = document.getElementById("resultText");
const restartBtn = document.getElementById("restart");
const startBtn = document.getElementById("start");

let current = 0;
let score = 0;

// Счётчики разделов (если понадобится красивое письмо)
let logicCorrect=0, patternsCorrect=0, mathCorrect=0, memoryCorrect=0;

// === Вопросы (25) ===
const questions = [
  {q:"Какое число продолжит ряд: 3, 6, 18, 72, ?", a:["144","216","288","360"], c:1, cat:"math"},
  {q:"Что лишнее: книга, тетрадь, карандаш, ручка?", a:["Книга","Тетрадь","Карандаш","Ручка"], c:0, cat:"patterns"},
  {q:"Если вчера было завтра, то какой день сегодня?", a:["Понедельник","Среда","Пятница","Воскресенье"], c:3, cat:"logic"},
  {q:"Продолжи ряд: 2, 4, 8, 16, ...", a:["18","24","32","36"], c:2, cat:"math"},
  {q:"Сколько углов у трёх треугольников?", a:["6","9","3","12"], c:1, cat:"logic"},
  {q:"Найдите закономерность: О, Д, Т, Ч, П, ...", a:["С","Ш","Щ","С'"], c:0, cat:"patterns"},
  {q:"Если вчера было завтра, то какой день сегодня? (вариант)", a:["Вторник","Четверг","Воскресенье","Суббота"], c:2, cat:"logic"},
  {q:"Какое число лишнее: 3, 9, 27, 81, 243, 729, 1000?", a:["81","1000","243","729"], c:1, cat:"patterns"},
  {q:"Сколько десятков в числе 500?", a:["50","10","5","500"], c:0, cat:"math"},
  {q:"Если 5 машин за 5 минут делают 5 деталей, то сколько деталей сделают 100 машин за 100 минут?", a:["100","200","500","2000"], c:2, cat:"logic"},
  // память — вспышка, затем вопрос
  {q:"Запомните: 4A9B. Какой код был?", a:["4A9B","4B9A","49AB","A49B"], c:0, cat:"memory"},
  {q:"Запомните: 7, 2, 9, 4. Число на третьей позиции?", a:["7","2","9","4"], c:2, cat:"memory"},
  {q:"Сколько дней в невисокосном году?", a:["365","366","364","360"], c:0, cat:"math"},
  {q:"Что лишнее: март, июнь, август, ноябрь?", a:["Март","Июнь","Август","Ноябрь"], c:1, cat:"patterns"},
  {q:"Сколько минут в 3 часах?", a:["120","150","180","200"], c:2, cat:"math"},
  {q:"Которое по счёту слово лишнее: дом, кот, стол, окно, собака?", a:["дом","кот","стол","собака"], c:3, cat:"patterns"},
  {q:"Сколько рёбер у куба?", a:["8","10","12","6"], c:2, cat:"math"},
  {q:"Если у тебя 2 яблока и ты забираешь 1 у друга, сколько яблок у тебя?", a:["1","2","3","4"], c:2, cat:"logic"},
  {q:"Сколько месяцев имеют 28 дней?", a:["Один","Два","Три","Все"], c:3, cat:"logic"},
  {q:"Сколько секунд в 5 минутах?", a:["300","240","120","600"], c:0, cat:"math"},
  {q:"Запомните: 5ГК2. Какой код был?", a:["5КГ2","5ГК2","5Г2К","К5Г2"], c:1, cat:"memory"},
  {q:"Запомните: 6, 1, 4, 3. Число на второй позиции?", a:["6","1","4","3"], c:1, cat:"memory"},
  {q:"Найдите продолжение: 1, 1, 2, 3, 5, ...", a:["6","7","8","8"], c:3, cat:"math"},
  {q:"Что лишнее: автобус, поезд, велосипед, самолёт?", a:["Автобус","Поезд","Велосипед","Самолёт"], c:2, cat:"patterns"},
  {q:"Сколько букв в слове «алфавит»?", a:["6","7","8","9"], c:2, cat:"logic"}
];

qTotalEl.textContent = questions.length;

// Показ вопроса
function showQuestion(){
  const q = questions[current];
  qIdxEl.textContent = current+1;
  qText.textContent = q.q;
  answersContainer.innerHTML = "";
  q.a.forEach((t,idx)=>{
    const b = document.createElement("button");
    b.textContent = t;
    b.addEventListener("click", ()=>select(idx));
    answersContainer.appendChild(b);
  });
  bar.style.width = `${((current)/questions.length)*100}%`;
}

// Выбор ответа
function select(idx){
  const q = questions[current];
  if(idx === q.c){
    score++;
    if(q.cat==="logic") logicCorrect++;
    if(q.cat==="patterns") patternsCorrect++;
    if(q.cat==="math") mathCorrect++;
    if(q.cat==="memory") memoryCorrect++;
  }
  current++;
  if(current>=questions.length){
    finishQuiz();
  }else{
    showQuestion();
  }
}

// Старт
emailForm.addEventListener("submit", (e)=>{
  e.preventDefault();
  if(!emailInput.value.trim()) return;
  intro.classList.add("hidden");
  quiz.classList.remove("hidden");
  current = 0; score = 0;
  logicCorrect=patternsCorrect=mathCorrect=memoryCorrect=0;
  showQuestion();
});

// Рестарт
restartBtn.addEventListener("click", ()=>{
  resultSection.classList.add("hidden");
  intro.classList.remove("hidden");
  emailInput.focus();
});

// --- Финиш ---
function finishQuiz(){
  const total = questions.length;
  const percent = Math.round((score/total)*100);
  const breakdown = makeBreakdown();
  const message = `Ваш результат: ${percent}% (правильных: ${score} из ${total}).\n\n${breakdown}`;
  const userEmail = emailInput.value.trim();

  // 1) Письмо владельцу (Formspree)
  sendToFormspree(userEmail, message);

  // 2) Письмо участнику (EmailJS)
  sendEmailToUser(userEmail, percent, score, total, breakdown);

  quiz.classList.add("hidden");
  resultSection.classList.remove("hidden");
  resultText.textContent = "Результат отправлен на почту.";
  bar.style.width = "100%";
}

// --- Formspree владельцу
function sendToFormspree(email, message){
  const fd = new FormData();
  fd.append("email", email);
  fd.append("message", message);
  fetch("https://formspree.io/f/mzzypjko",{
    method:"POST",
    headers:{Accept:"application/json"},
    body:fd
  }).catch(()=>{});
}

// --- EmailJS участнику
function sendEmailToUser(toEmail, percent, score, total, breakdown){
  if(!toEmail) return;
  emailjs.send("YOUR_SERVICE_ID","YOUR_TEMPLATE_ID",{
    to_email: toEmail,
    percent, score, total, breakdown
  }).catch(()=>{});
}

function makeBreakdown(){
  return `Разделы:
• Логика: ${logicCorrect}/5
• Шаблоны: ${patternsCorrect}/5
• Математика: ${mathCorrect}/6
• Память: ${memoryCorrect}/4`;
}
