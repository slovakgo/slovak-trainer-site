const emailForm = document.getElementById('emailForm');
const intro = document.getElementById('intro');
const quiz = document.getElementById('quiz');
const result = document.getElementById('result');

const qText = document.getElementById('qText');
const answers = document.getElementById('answers');
const qIdxEl = document.getElementById('qIdx');
const qTotalEl = document.getElementById('qTotal');
const progressEl = document.getElementById('progress');

const cp = document.getElementById('checkpoint');
const cpGrid = document.getElementById('cpGrid');
const continueBtn = document.getElementById('continueBtn');

const resText = document.getElementById('resText');
const restartBtn = document.getElementById('restart');

const qs = [
  {t:'Какое число продолжит ряд: 3, 6, 18, 72, ?', a:['144','216','288','360'], c:1, g:'Математика'},
  {t:'Что лишнее: книга, тетрадь, карандаш, ручка?', a:['Книга','Тетрадь','Карандаш','Ручка'], c:0, g:'Логика'},
  {t:'Выберите фигуру, продолжающую ▭, △, ○, ▭, △, …', a:['○','◇','▭','⬟'], c:0, g:'Шаблоны'},
  {t:'Если все A — B, и некоторые B — C. Следует ли, что некоторые A — C?', a:['Да','Нет','Недостаточно данных','Иногда'], c:0, g:'Логика'},
  {t:'Сколько трёхзначных чисел делится на 3?', a:['300','299','100','200'], c:0, g:'Математика'},
  {t:'Зеркально: слово «ШКОЛА» в зеркале будет…', a:['АЛОКШ','АЛОКШь','АЛКОШ','ШКОЛА'], c:0, g:'Память'},
  {t:'Сколько углов у звезды ✦ ?', a:['5','10','8','6'], c:1, g:'Математика'},
  {t:'Найдите закономерность: О, Д, Т, Ч, П, …', a:['С','Ш','Сь','—'], c:0, g:'Шаблоны'},
  {t:'Сколько секунд в 12 минутах?', a:['720','600','640','560'], c:0, g:'Математика'},
  {t:'Если завтра четверг, какой сегодня день?', a:['Среда','Вторник','Пятница','Суббота'], c:1, g:'Логика'},
  {t:'Какая фигура имеет наименьшую площадь при одинаковом периметре?', a:['Круг','Квадрат','Треугольник','Прямоугольник'], c:2, g:'Шаблоны'},
  {t:'Продолжите ряд: 1, 1, 2, 3, 5, 8, …', a:['13','12','11','10'], c:0, g:'Математика'},
  {t:'Найдите лишнее: январь, май, июль, среда', a:['январь','май','июль','среда'], c:3, g:'Логика'},
  {t:'Запомните: 4A9B. Какой код был?', a:['4A9B','4B9A','49AB','A49B'], c:0, g:'Память'},
  {t:'Сколько градусов у прямого угла?', a:['45','60','90','120'], c:2, g:'Математика'},
  {t:'Если все кошки — животные. Верно ли: некоторые животные — кошки?', a:['Да','Нет','Неизвестно','Иногда'], c:0, g:'Логика'},
  {t:'Что продолжит узор: ▲ ● ▲ ● …', a:['▲','●','■','◆'], c:0, g:'Шаблоны'},
  {t:'Сколько минут в 3,5 часах?', a:['180','200','210','240'], c:2, g:'Математика'},
  {t:'Запомните: 7, 2, 9, 4. Число на третьей позиции?', a:['7','2','9','4'], c:2, g:'Память'},
  {t:'Сколько квадратов на шахматной доске?', a:['64','204','120','200'], c:1, g:'Математика'},
  {t:'Что лишнее: автобус, поезд, велосипед, самолёт?', a:['Автобус','Поезд','Велосипед','Самолёт'], c:2, g:'Логика'},
  {t:'Что будет дальше: ■ ■ ■ □ □ □ ■ ■ ■ …', a:['□ □ □','■ □ ■','□ ■ □','■ ■ □'], c:0, g:'Шаблоны'},
  {t:'Запомните слово: «НЕЙРОН». Какая буква была второй?', a:['Й','Е','Н','Р'], c:1, g:'Память'},
  {t:'Сколько дней в невисокосном году?', a:['365','366','364','360'], c:0, g:'Математика'},
  {t:'Какая фигура имеет больше всего осей симметрии?', a:['Круг','Квадрат','Шестиугольник','Треугольник'], c:0, g:'Шаблоны'}
];

qTotalEl.textContent = qs.length;
let idx = 0, ok = 0;
let buckets = { 'Логика':0,'Шаблоны':0,'Математика':0,'Память':0 };
let userEmail = '';

emailForm.addEventListener('submit', (e)=>{
  e.preventDefault();
  const v = (document.getElementById('email').value || '').trim();
  if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v)) return alert('Введите корректный e‑mail');
  userEmail = v;
  intro.classList.add('hidden');
  quiz.classList.remove('hidden');
  render();
});

function render(){
  if(idx>=qs.length){ return finish(); }
  const q = qs[idx];
  qIdxEl.textContent = String(idx+1);
  progressEl.style.width = Math.max(3, Math.round(idx/qs.length*100)) + '%';
  qText.textContent = q.t;
  answers.innerHTML = '';
  q.a.forEach((an, i)=>{
    const b = document.createElement('button');
    b.textContent = an;
    b.onclick = ()=>choose(i);
    answers.appendChild(b);
  });
  if(idx>0 && idx%5===0){
    cp.classList.remove('hidden');
    cpGrid.innerHTML = '';
    Object.entries(buckets).forEach(([k,v])=>{
      const pill = document.createElement('div');
      pill.className = 'pill';
      pill.textContent = `${k}: ${v}`;
      cpGrid.appendChild(pill);
    });
  }else{
    cp.classList.add('hidden');
  }
}

continueBtn.addEventListener('click', ()=> cp.classList.add('hidden'));

function choose(i){
  const q = qs[idx];
  if(i===q.c){ ok++; buckets[q.g] = (buckets[q.g]||0)+1; }
  idx++; render();
}

async function finish(){
  quiz.classList.add('hidden');
  result.classList.remove('hidden');
  progressEl.style.width = '100%';
  const pct = Math.round(ok/qs.length*100);
  const text = `Ваш результат: ${pct}% (правильных ответов: ${ok} из ${qs.length}).`;
  resText.textContent = text;
  try{
    await fetch('https://formspree.io/f/mzzypjko', {
      method:'POST',
      headers:{ 'Accept':'application/json' },
      body: new URLSearchParams({ email: userEmail, message: text })
    });
  }catch(e){}
}

restartBtn.addEventListener('click', ()=> location.reload());
