// ThinkLevel — front-end логика
const form = document.getElementById('emailForm');
const emailInput = document.getElementById('emailInput');
const startBtn = document.getElementById('startBtn');
const testEl = document.getElementById('test');
const qCountEl = document.getElementById('qCount');
const questionEl = document.getElementById('question');
const answersEl = document.getElementById('answers');
const barFill = document.getElementById('barFill');
const checkpointEl = document.getElementById('checkpoint');
const checkpointList = document.getElementById('checkpointList');
const continueBtn = document.getElementById('continueBtn');
const resultEl = document.getElementById('result');
const resultText = document.getElementById('resultText');
const breakdownEl = document.getElementById('breakdown');
const restartBtn = document.getElementById('restartBtn');

let current = 0;
let score = 0;
let userEmail = "";
const sectionSize = 5;

// Блок вопросов (25)
const questions = [
  {cat:'Логика', q:'Какое число продолжит ряд: 3, 6, 18, 72, ?', a:['144','216','288','360'], c:1},
  {cat:'Логика', q:'Выберите лишнее: книга, тетрадь, карандаш, ручка', a:['Книга','Тетрадь','Карандаш','Ручка'], c:1},
  {cat:'Логика', q:'Если ВСЕ Z — X, а некоторые X — Y, верно ли, что некоторые Z — Y?', a:['Да','Нет','Недостаточно данных','Только если все X — Y'], c:2},
  {cat:'Логика', q:'Анаграмма к слову «СТИХ»', a:['ТИХС','ХИТС','СИТХ','ХИСТ'], c:3},
  {cat:'Логика', q:'Сколько прямых углов в кубе?', a:['8','12','24','48'], c:2},

  {cat:'Шаблоны', q:'Найдите следующую фигуру (мысленно): ◻︎ ▲ ◻︎ ▲ ◻︎ ?', a:['◻︎','▲','●','◆'], c:1},
  {cat:'Шаблоны', q:'Последовательность букв: A, C, F, J, O, ?', a:['U','T','V','W'], c:0},
  {cat:'Шаблоны', q:'Закончен ли ряд: 2, 3, 5, 8, 12, 17, ?', a:['23','24','25','26'], c:1},
  {cat:'Шаблоны', q:'Какой день недели будет через 63 дня, если сегодня понедельник?', a:['Среда','Четверг','Пятница','Суббота'], c:2},
  {cat:'Шаблоны', q:'Сколько пересечений у трёх попарно пересекающихся окружностей?', a:['3','6','12','0'], c:1},

  {cat:'Математика', q:'Сколько будет 14% от 350?', a:['42','45','47','49'], c:0},
  {cat:'Математика', q:'(2^5 · 2^3) / 2^4 = ?', a:['2^3','2^4','2^5','2^6'], c:2},
  {cat:'Математика', q:'Среднее арифметическое чисел 10, 14, 16, 20 равно:', a:['14','15','15.5','16'], c:3},
  {cat:'Математика', q:'Решите: 7x − 3 = 4x + 18', a:['x=5','x=6','x=7','x=8'], c:1},
  {cat:'Математика', q:'Сколько секунд в 2.5 часах?', a:['7200','8100','8400','9000'], c:2},

  {cat:'Память', q:'Запомните: «клен, море, 47, фиолетовый». Что было вторым?', a:['фиолетовый','клен','море','47'], c:2},
  {cat:'Память', q:'Запомните: 9-4-1-7-3. Через секунду: какое третье число?', a:['1','7','3','4'], c:0},
  {cat:'Память', q:'Запомните порядок: 🐶 🐱 🐭 🐹. Какой второй?', a:['🐱','🐶','🐭','🐹'], c:0},
  {cat:'Память', q:'Слово было «НЕФРИТ». Какая 4-я буква?', a:['Р','Ф','Е','И'], c:0},
  {cat:'Память', q:'Что из списка не называлось раньше: лампа, карта, флейта, сова?', a:['карта','сова','флейта','лампа'], c:1},

  {cat:'Скорость', q:'Как быстро: найдите сумму 39+48', a:['86','87','88','89'], c:2},
  {cat:'Скорость', q:'Синоним к слову «непоколебимый»', a:['уступчивый','твёрдый','мягкий','сомнительный'], c:1},
  {cat:'Скорость', q:'Сколько букв «Н» в «длинношеее»?', a:['1','2','3','4'], c:1},
  {cat:'Скорость', q:'Что лишнее: янтарь, сапфир, гранит, опал', a:['янтарь','сапфир','гранит','опал'], c:2},
  {cat:'Скорость', q:'Быстро: 15% от 80', a:['10','11','12','13'], c:2},
];

const total = questions.length;
const buckets = {};

// показать вопрос
function showQuestion(){
  const q = questions[current];
  qCountEl.textContent = `Вопрос ${current+1} из ${total}`;
  questionEl.textContent = q.q;
  barFill.style.width = `${Math.round((current)/total*100)}%`;

  answersEl.innerHTML = "";
  q.a.forEach((ans, idx) => {
    const btn = document.createElement('button');
    btn.textContent = ans;
    btn.onclick = () => onAnswer(idx);
    answersEl.appendChild(btn);
  });
}

// ответ
function onAnswer(idx){
  const q = questions[current];
  if(!buckets[q.cat]) buckets[q.cat] = {right:0,total:0};
  buckets[q.cat].total++;
  if(idx === q.c){ score++; buckets[q.cat].right++; }

  current++;

  // каждые 5 вопросов — чекпоинт
  if(current>0 && current % sectionSize === 0 && current < total){
    showCheckpoint();
    return;
  }

  if(current < total){
    showQuestion();
  }else{
    finish();
  }
}

function showCheckpoint(){
  checkpointList.innerHTML = "";
  Object.entries(buckets).forEach(([cat, v])=>{
    const li = document.createElement('li');
    const p = Math.round(100*(v.right/(v.total||1)));
    li.innerHTML = `<strong>${cat}</strong>: ${v.right}/${v.total} — ${p}%`;
    checkpointList.appendChild(li);
  });
  checkpointEl.classList.remove('hidden');
  answersEl.classList.add('hidden');
  questionEl.classList.add('hidden');
}

continueBtn.addEventListener('click', ()=>{
  checkpointEl.classList.add('hidden');
  answersEl.classList.remove('hidden');
  questionEl.classList.remove('hidden');
  showQuestion();
});

// стартуем после отправки формы
form.addEventListener('submit', async (e)=>{
  e.preventDefault();
  const email = emailInput.value.trim();
  if(!email){ emailInput.focus(); return; }
  userEmail = email;

  try{
    const fd = new FormData();
    fd.append('email', email);
    fd.append('event', 'start');
    await fetch(form.action, { method:'POST', body:fd, headers:{'Accept':'application/json'} });
  }catch(err){
    console.warn('Не удалось отправить начало теста:', err);
  }

  form.classList.add('hidden');
  testEl.classList.remove('hidden');
  current = 0; score = 0;
  Object.keys(buckets).forEach(k=>delete buckets[k]);
  showQuestion();
});

function finish(){
  barFill.style.width = '100%';
  testEl.classList.add('hidden');
  resultEl.classList.remove('hidden');

  const percent = Math.round(100*score/total);
  resultText.textContent = `Ваш результат: ${score} из ${total} (${percent}%).`;

  const frag = document.createDocumentFragment();
  Object.entries(buckets).forEach(([cat,v])=>{
    const p = Math.round(100*(v.right/(v.total||1)));
    const div = document.createElement('div');
    div.className = 'muted';
    div.textContent = `${cat}: ${v.right}/${v.total} — ${p}%`;
    frag.appendChild(div);
  });
  breakdownEl.innerHTML = "";
  breakdownEl.appendChild(frag);

  // Письмо с результатом пользователю
  if(userEmail){
    const fd = new FormData();
    fd.append('email', userEmail);
    fd.append('event', 'result');
    fd.append('score', `${score}/${total}`);
    fd.append('percent', `${Math.round(100*score/total)}`);
    try{
      fetch(form.action, { method:'POST', body:fd, headers:{'Accept':'application/json'} });
    }catch(e){ console.warn('Не удалось отправить результат:', e); }
  }
}

restartBtn.addEventListener('click', ()=>{
  resultEl.classList.add('hidden');
  form.classList.remove('hidden');
});
