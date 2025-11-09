/* === ThinkLevel (RU) === */
// Элементы
const layers = document.querySelectorAll('.layer');
const container = document.querySelector('.container');
const intro = document.getElementById('intro');
const quiz = document.getElementById('quiz');
const resultSection = document.getElementById('result');
const questionText = document.getElementById('question');
const answersContainer = document.getElementById('answers');
const emailForm = document.getElementById('emailForm');
const progressBar = document.getElementById('progress');
const qcount = document.getElementById('qcount');
const checkpoint = document.getElementById('checkpoint');
const cpGrid = document.getElementById('cpGrid');
const continueBtn = document.getElementById('continueBtn');
const resultText = document.getElementById('resultText');
const restartBtn = document.getElementById('restart');

// Параллакс
let px=0, py=0;
window.addEventListener('mousemove', (e)=>{
  const x = (e.clientX / window.innerWidth) - 0.5;
  const y = (e.clientY / window.innerHeight) - 0.5;
  px += (x - px) * 0.08;
  py += (y - py) * 0.08;
  layers[0].style.transform = `translate(${px*-12}px, ${py*-12}px) scale(1.1)`;
  layers[1].style.transform = `translate(${px*8}px, ${py*8}px)`;
  layers[2].style.transform = `translate(${px*16}px, ${py*16}px)`;
});

// Категории и счет
let current = 0, score = 0;
const bucketScore = { logic:0, patterns:0, math:0, memory:0 };

// Вопросы (25). Убран спорный вопрос про карандаш/ручку.
const Q = [
  { t:'math', q:'Какое число продолжит ряд: 3, 6, 18, 72, ?', a:['144','216','288','360'], c:1 },
  { t:'logic', q:'Какое слово лишнее: Мозг, Мысль, Сознание, Апельсин?', a:['Сознание','Мозг','Апельсин','Мысль'], c:2 },
  { t:'memory', mode:'remember', prompt:'Запомните: 4А9В', question:'Какой код был?', a:['4А9В','4В9А','49АВ','А49В'], c:0, ms:1600 },
  { t:'patterns', q:'Продолжи ряд: 2, 4, 8, 16, ...', a:['18','24','32','36'], c:2 },
  { t:'logic', q:'Что лишнее: автобус, поезд, велосипед, самолёт?', a:['Автобус','Поезд','Велосипед','Самолёт'], c:2 },
  { t:'math', q:'Сколько углов у трёх треугольников?', a:['6','9','3','12'], c:1 },
  { t:'memory', mode:'remember', prompt:'Запомните: НОСОК', question:'Какая буква была третьей?', a:['О','С','Н','К'], c:1, ms:1500 },
  { t:'patterns', q:'Если вчера было завтра, то какой день сегодня?', a:['Понедельник','Воскресенье','Суббота','Пятница'], c:1 },
  { t:'math', q:'Что тяжелее: 1 кг железа или 1 кг пуха?', a:['Железо','Пух','Одинаково','Зависит от ветра'], c:2 },
  { t:'patterns', q:'Какое число лишнее: 3, 9, 27, 81, 243, 729, 1000?', a:['729','81','243','1000'], c:3 },
  { t:'logic', q:'В комнате 4 угла. В каждом углу сидит кот. Напротив каждого кота — ещё 3. Сколько всего котов?', a:['3','4','5','8'], c:1 },
  { t:'memory', mode:'remember', prompt:'Запомните: 7, 2, 9, 4', question:'Число на третьей позиции?', a:['7','2','9','4'], c:2, ms:1700 },
  { t:'math', q:'Сколько секунд в 3 минутах?', a:['120','180','200','240'], c:1 },
  { t:'patterns', q:'Логотип ThinkLevel — это…', a:['Молекула','Нейрон','Галактика','Кристалл'], c:1 },
  { t:'logic', q:'Если прибавить к числу его половину, получим 30. Какое число?', a:['15','20','25','40'], c:2 },
  { t:'memory', mode:'remember', prompt:'Запомните: НЕЙРОН', question:'Какая буква была второй?', a:['Й','Е','Н','Р'], c:1, ms:1500 },
  { t:'patterns', q:'Продолжи ряд: A, C, F, J, O, …', a:['S','T','U','V'], c:0 },
  { t:'math', q:'Сколько дней в невисокосном году?', a:['365','366','364','360'], c:0 },
  { t:'logic', q:'В каком месяце люди меньше всего спят?', a:['Февраль','Январь','Июль','Одинаково'], c:0 },
  { t:'memory', mode:'remember', prompt:'Запомните: 5♣, K♥', question:'Какая карта была второй?', a:['K♥','5♣','Туз♠','Дама♦'], c:0, ms:1600 },
  { t:'patterns', q:'Выберите лишнее: △ ◻︎ ◯ ★', a:['△','◻︎','◯','★'], c:3 },
  { t:'math', q:'Чему равно 15% от 160?', a:['16','20','24','32'], c:2 },
  { t:'logic', q:'Кто всё время идёт и не приходит?', a:['Почта','Время','Секундамер','Эхо'], c:1 },
  { t:'memory', mode:'remember', prompt:'Запомните: 3 слова — свет, код, ток', question:'Какого слова НЕ было?', a:['ток','код','свет','цвет'], c:3, ms:1800 },
  { t:'patterns', q:'Найдите закономерность: О, Д, Т, Ч, П, …', a:['С','Ш','Щ','С\''], c:0 }
];

function updateProgress(){
  const pct = Math.round((current / Q.length) * 100);
  progressBar.style.width = pct + '%';
  qcount.textContent = `Вопрос ${current+1} из ${Q.length}`;
}

function fillCheckpoint(){
  cpGrid.innerHTML = '';
  const items = [
    ['Логика', bucketScore.logic],
    ['Шаблоны', bucketScore.patterns],
    ['Математика', bucketScore.math],
    ['Память', bucketScore.memory],
  ];
  items.forEach(([label,val])=>{
    const d = document.createElement('div');
    d.className='pill'; d.innerHTML = `<b>${label}:</b> ${val}`;
    cpGrid.appendChild(d);
  });
}

function showQuestion(){
  updateProgress();
  checkpoint.classList.add('hidden');
  const q = Q[current];
  questionText.textContent = q.q || '';
  answersContainer.innerHTML = '';

  // Режим запоминания
  if(q.mode === 'remember'){
    questionText.textContent = q.prompt;
    answersContainer.innerHTML = '<div class="muted">Запоминайте…</div>';
    setTimeout(()=>{
      questionText.textContent = q.question;
      renderAnswers(q);
    }, q.ms || 1500);
  }else{
    renderAnswers(q);
  }
}

function renderAnswers(q){
  answersContainer.innerHTML = '';
  q.a.forEach((ans, idx)=>{
    const btn = document.createElement('button');
    btn.className = 'btn-answer';
    btn.textContent = ans;
    btn.onclick = ()=>checkAnswer(idx);
    answersContainer.appendChild(btn);
  });
}

function checkAnswer(i){
  const q = Q[current];
  if(i === q.c){
    score++;
    bucketScore[q.t]++;
  }
  current++;
  if(current % 5 === 0 && current < Q.length){
    fillCheckpoint();
    checkpoint.classList.remove('hidden');
    return;
  }
  if(current < Q.length){
    showQuestion();
  }else{
    finishTest();
  }
}

continueBtn.addEventListener('click', ()=>{
  showQuestion();
});

function finishTest(){
  quiz.classList.add('hidden');
  resultSection.classList.remove('hidden');
  const percent = Math.round((score / Q.length) * 100);
  const message = [
    `Ваш результат: ${percent}% (правильных ответов: ${score} из ${Q.length}).`,
    '',
    'Разбор по разделам:',
    `• Логика: ${bucketScore.logic}`,
    `• Шаблоны: ${bucketScore.patterns}`,
    `• Математика: ${bucketScore.math}`,
    `• Память: ${bucketScore.memory}`,
    '',
    'Спасибо, что прошли ThinkLevel! Вы молодец — продолжайте тренировки, и ваш мозг скажет вам спасибо.'
  ].join('\n');
  resultText.textContent = message;

  // Отправка результата на Formspree: участнику и копия вам (в кабинете Formspree включите автоответ).
  const email = (document.getElementById('email').value || '').trim();
  const formData = new FormData();
  formData.append('email', email);
  formData.append('message', message);
  formData.append('_subject', 'ThinkLevel — ваш результат');
  formData.append('_language', 'ru');
  fetch('https://formspree.io/f/mzzypjko', {
    method:'POST',
    headers:{ 'Accept':'application/json' },
    body: formData
  }).catch(()=>{});
}

restartBtn.addEventListener('click', ()=>{
  // Сброс
  current=0; score=0;
  bucketScore.logic=bucketScore.patterns=bucketScore.math=bucketScore.memory=0;
  resultSection.classList.add('hidden');
  intro.classList.remove('hidden');
  window.scrollTo({top:0, behavior:'smooth'});
});

// Старт: скрываем intro, показываем тест и отправляем старт на Formspree
emailForm.addEventListener('submit', async (e)=>{
  e.preventDefault();
  const fd = new FormData(emailForm);
  try{
    await fetch(emailForm.action, { method:'POST', body:fd, headers:{'Accept':'application/json'} });
  }catch{}
  intro.classList.add('hidden');
  quiz.classList.remove('hidden');
  current=0; score=0;
  bucketScore.logic=bucketScore.patterns=bucketScore.math=bucketScore.memory=0;
  showQuestion();
});
