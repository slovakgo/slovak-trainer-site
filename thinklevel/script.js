// === ThinkLevel Script ===

// DOM
const container = document.querySelector(".container");
const intro = document.getElementById("intro");
const quiz = document.getElementById("quiz");
const result = document.getElementById("result");
const qText = document.getElementById("qText");
const answers = document.getElementById("answers");
const emailForm = document.getElementById("emailForm");
const qIdxEl = document.getElementById("qIdx");
const qTotalEl = document.getElementById("qTotal");
const bar = document.getElementById("bar");
const cp = document.getElementById("checkpoint");
const cpGrid = document.getElementById("cpGrid");
const contBtn = document.getElementById("continueBtn");
const restartBtn = document.getElementById("restart");
const resultText = document.getElementById("resultText");

const FORMSPREE = "https://formspree.io/f/mzzypjko";

// Пул вопросов (25) — логика, математика, память, внимание
const Q = [
  {t:"mcq", q:"Какое число продолжит ряд: 3, 6, 18, 72, ?", a:["144","216","288","360"], c:1},
  {t:"mcq", q:"Что лишнее: книга, тетрадь, карандаш, ручка?", a:["Книга","Тетрадь","Карандаш","Ручка"], c:0},
  {t:"mcq", q:"Сколько углов у трёх треугольников?", a:["6","9","3","12"], c:1},
  {t:"mcq", q:"Сколько секунд в 2,5 минутах?", a:["120","130","150","180"], c:2},
  {t:"mem",  q:"Запомните: 7, 2, 9, 4.", ask:"Число на третьей позиции?", a:["7","2","9","4"], c:2},

  {t:"mcq", q:"Сколько букв в слове «мозг»?", a:["3","4","5","6"], c:1},
  {t:"mcq", q:"Если сегодня среда, через 3 дня будет…", a:["Четверг","Пятница","Суббота","Воскресенье"], c:2},
  {t:"mcq", q:"Какой месяц лишний: март, июнь, август, ноябрь?", a:["Март","Июнь","Август","Ноябрь"], c:1},
  {t:"mcq", q:"Сколько будет 15 × 7?", a:["95","100","105","110"], c:2},
  {t:"mem",  q:"Запомните код: 4А9В.", ask:"Какой код был?", a:["4А9В","4В9А","49АВ","А49В"], c:0},

  {t:"mcq", q:"Сколько десятков в числе 420?", a:["4","42","40","14"], c:2},
  {t:"mcq", q:"Что лишнее: квадрат, круг, ромб, прямоугольник?", a:["Квадрат","Круг","Ромб","Прямоугольник"], c:1},
  {t:"mcq", q:"Выбери синоним к слову «умный»:", a:["Сообразительный","Твёрдый","Громкий","Солнечный"], c:0},
  {t:"mcq", q:"Сколько чётных чисел между 10 и 20?", a:["4","5","6","7"], c:2},
  {t:"mem",  q:"Запомните: НЕЙРОН", ask:"Какая буква была второй?", a:["Й","Е","Н","Р"], c:1},

  {t:"mcq", q:"Если у треугольника увеличить все стороны в 2 раза, площадь увеличится в…", a:["2 раза","3 раза","4 раза","6 раз"], c:2},
  {t:"mcq", q:"Сколько букв «С» в слове «приспособиться»?", a:["2","3","4","5"], c:1},
  {t:"mcq", q:"Реши: (18−5)×3", a:["33","36","39","41"], c:1},
  {t:"mcq", q:"Сколько дней в невисокосном году?", a:["365","366","364","360"], c:0},
  {t:"mem",  q:"Запомните: 5 → ◻, 8 → △, 2 → ○", ask:"Какой символ у числа 8?", a:["◻","△","○","—"], c:1},

  {t:"mcq", q:"Если вчера было завтра, то какой день сегодня?", a:["Понедельник","Среда","Пятница","Воскресенье"], c:3},
  {t:"mcq", q:"Продолжи ряд: 2, 4, 8, 16, …", a:["18","24","32","36"], c:2},
  {t:"mcq", q:"Найдите лишнее: 3, 9, 27, 81, 243, 729, 1000?", a:["81","243","729","1000"], c:3},
  {t:"mcq", q:"Что тяжелее: 1 кг железа или 1 кг пуха?", a:["Железо","Пух","Одинаково","Зависит от ветра"], c:2},
  {t:"mcq", q:"Сколько слогов в слове «нейросеть»?", a:["2","3","4","5"], c:1}
];

qTotalEl.textContent = Q.length;

let current = 0;
let score = 0;
let userEmail = "";

// старт: отправляем «старт» в formspree и переходим к тесту
emailForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const fd = new FormData(emailForm);
  userEmail = (fd.get("email") || "").trim();
  try{
    await fetch(FORMSPREE, { method:"POST", headers:{Accept:"application/json"}, body:fd });
  }catch(_){ /* ок, идём дальше даже при оффлайне */ }
  intro.classList.add("hidden");
  quiz.classList.remove("hidden");
  render();
});

function render(){
  const q = Q[current];
  qIdxEl.textContent = current+1;
  bar.style.width = Math.round(((current)/Q.length)*100) + "%";

  // память: сначала показываем «запомните…», затем через 1.5с заменяем вопросом
  if(q.t === "mem"){
    qText.textContent = q.q;
    answers.innerHTML = ""; // блокируем выбор, пока запоминает
    setTimeout(() => {
      showOptions(q.ask, q.a);
    }, 1500);
  } else {
    showOptions(q.q, q.a);
  }

  // чекпоинт после каждого 5-го вопроса, кроме последнего блока
  if((current>0) && ((current+1)%5===0) && current < Q.length-1){
    showCheckpoint();
  }else{
    cp.classList.add("hidden");
  }
}

function showOptions(text, options){
  qText.textContent = text;
  answers.innerHTML = "";
  options.forEach((opt, i) => {
    const btn = document.createElement("button");
    btn.className = "opt";
    btn.textContent = opt;
    btn.onclick = () => select(i);
    answers.appendChild(btn);
  });
}

function select(i){
  const q = Q[current];
  if(i === q.c) score++;
  next();
}

function next(){
  current++;
  if(current >= Q.length){
    finish();
  }else{
    render();
  }
}

function showCheckpoint(){
  cp.classList.remove("hidden");
  // мини-оценка по блокам 5/10/15/20
  const block = Math.floor(current/5); // 1..4
  const label = ["Логика","Математика","Память","Внимание"][ (block-1) % 4 ] || "Прогресс";
  cpGrid.innerHTML = "";
  const pill = document.createElement("div");
  pill.className = "cp-pill";
  pill.textContent = `${label}: ${current}/25`;
  cpGrid.appendChild(pill);
  contBtn.onclick = () => { cp.classList.add("hidden"); };
}

// завершение: отправляем результат через formspree и показываем краткое сообщение
async function finish(){
  quiz.classList.add("hidden");
  result.classList.remove("hidden");
  bar.style.width = "100%";

  resultText.textContent = "Спасибо за прохождение!";

  const fd = new FormData();
  fd.append("email", userEmail || "unknown@example.com");
  fd.append("message", `Ваш результат: ${score} из ${Q.length} ( ${Math.round(score/Q.length*100)}% ).`);
  fd.append("event", "result_pro");

  try{
    await fetch(FORMSPREE, { method:"POST", headers:{Accept:"application/json"}, body:fd });
  }catch(_){ /* молча */ }

  restartBtn.onclick = () => {
    current = 0; score = 0;
    result.classList.add("hidden");
    intro.classList.remove("hidden");
    emailForm.reset();
  };
}
