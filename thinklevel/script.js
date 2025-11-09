const emailForm = document.getElementById('emailForm');
const intro = document.getElementById('intro');
const quiz = document.getElementById('quiz');
const result = document.getElementById('result');
const qEl = document.getElementById('question');
const aWrap = document.getElementById('answers');
const bar = document.getElementById('bar');
const qnumEl = document.getElementById('qnum');
const qtotalEl = document.getElementById('qtotal');
const stimulus = document.getElementById('stimulus');
const cp = document.getElementById('checkpoint');
const cpGrid = document.getElementById('cpGrid');
const continueBtn = document.getElementById('continueBtn');
const resText = document.getElementById('resText');
const restartBtn = document.getElementById('restart');

const TOTAL = 25;
qtotalEl.textContent = TOTAL;

let email = '';
let i = 0;
let ok = 0;
let buckets = { 'Логика':0, 'Шаблоны':0, 'Математика':0, 'Память':0 };

const qs = [
  {t:'Продолжите ряд: 2, 5, 11, 23, ?', a:['35','41','47','49'], c:1, g:'Шаблоны'},
  {t:'Если все A — B. Верно ли: некоторые B — A?', a:['Да','Нет','Неизвестно','Иногда'], c:1, g:'Логика'},
  {t:'Чему равно (12×7 − 18) ÷ 6 ?', a:['9','10','11','12'], c:2, g:'Математика'},
  {t:'Запомните: 7A, 9B, 4C. Что было вторым?', a:['7A','9B','4C','7B'], c:1, g:'Память', mem:'7A · 9B · 4C'},
  {t:'Сколько рёбер у куба?', a:['8','12','16','6'], c:1, g:'Математика'},
  {t:'Выберите лишнее: мозг, мысль, сознание, апельсин', a:['мозг','мысль','сознание','апельсин'], c:3, g:'Логика'},
  {t:'Какое число продолжит: 3, 6, 18, 72, ?', a:['144','216','288','360'], c:2, g:'Шаблоны'},
  {t:'Если вчера было завтра, то сегодня…', a:['Пятница','Суббота','Воскресенье','Понедельник'], c:2, g:'Логика'},
  {t:'Сколько секунд в 12 минутах?', a:['720','600','640','560'], c:0, g:'Математика'},
  {t:'Запомните: ♦ ◼ △ ◼ ♦. Какая фигура была третьей?', a:['♦','◼','△','○'], c:2, g:'Память', mem:'♦  ◼  △  ◼  ♦'},

  {t:'Какое число лишнее: 3, 9, 27, 81, 243, 1000', a:['243','1000','27','81'], c:1, g:'Логика'},
  {t:'Продолжите: A, C, F, J, O, ?', a:['T','U','V','W'], c:0, g:'Шаблоны'},
  {t:'Наименьшее простое число > 20', a:['21','22','23','25'], c:2, g:'Математика'},
  {t:'Запомните: 5-2-9-5-2. Какая 3‑я цифра?', a:['5','2','9','6'], c:2, g:'Память', mem:'5‑2‑9‑5‑2'},
  {t:'Сколько углов у трёх треугольников?', a:['6','9','12','3'], c:1, g:'Математика'},
  {t:'Если ни один P не Q, а некоторые Q — R, то некоторые R не P?', a:['Да','Нет'], c:0, g:'Логика'},
  {t:'Что дальше: ⬜⬛⬛, ⬜⬜⬛, ⬜⬜⬜, ?', a:['⬛⬜⬜','⬜⬛⬜','⬜⬜⬛','⬛⬛⬜'], c:1, g:'Шаблоны'},
  {t:'Сколько процентов от 480 составляет 15%?', a:['62','72','78','84'], c:1, g:'Математика'},
  {t:'Запомните слово: КОРИДОР. Какая буква 5‑я?', a:['И','Д','О','Р'], c:1, g:'Память', mem:'К О Р И Д О Р'},
  {t:'Чему равна сумма углов треугольника в радианах?', a:['π','2π','π/2','3π/2'], c:0, g:'Математика'},

  {t:'Продолжите: 4, 6, 9, 13, 18, ?', a:['22','24','25','27'], c:3, g:'Шаблоны'},
  {t:'Какой день через 100 дней от среды?', a:['Понедельник','Вторник','Среда','Четверг'], c:3, g:'Логика'},
  {t:'Найдите корни: x² − 9x + 18 = 0', a:['2 и 9','3 и 6','1 и 18','−3 и −6'], c:1, g:'Математика'},
  {t:'Запомните: 9, 4, 1, 7, 3. Какое число 2‑е?', a:['9','4','1','7'], c:1, g:'Память', mem:'9  4  1  7  3'},
  {t:'Что будет дальше: ▲ ● ▲ ● ?', a:['▲','●','■','◆'], c:0, g:'Шаблоны'}
];

function parallax(e){
  const x = (e.clientX / innerWidth - .5) * 10;
  const y = (e.clientY / innerHeight - .5) * 10;
  document.getElementById('bg').style.transform = `translate(${x}px, ${y}px) scale(1.03)`;
}
document.addEventListener('mousemove', parallax);

emailForm.addEventListener('submit', (e)=>{
  e.preventDefault();
  const v = (document.getElementById('email').value || '').trim();
  if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v)) return alert('Введите корректный e‑mail');
  email = v;
  intro.classList.add('hidden');
  quiz.classList.remove('hidden');
  render();
});

function render(){
  if(i>=TOTAL){ return finish(); }
  const q = qs[i];
  qnumEl.textContent = (i+1);
  bar.style.width = Math.max(3, Math.round(i/TOTAL*100)) + '%';

  aWrap.innerHTML = '';
  qEl.textContent = '';
  stimulus.classList.add('hidden');
  if(q.mem){
    stimulus.textContent = q.mem;
    stimulus.classList.remove('hidden');
    setTimeout(()=>{
      stimulus.classList.add('hidden');
      qEl.textContent = q.t;
      renderAnswers(q);
    }, 1800);
  }else{
    qEl.textContent = q.t;
    renderAnswers(q);
  }

  if(i>0 && i%5===0){
    cp.classList.remove('hidden');
    cpGrid.innerHTML = '';
    Object.entries(buckets).forEach(([k,v])=>{
      const pill = document.createElement('div');
      pill.className = 'cp-pill';
      pill.textContent = `${k}: ${v}`;
      cpGrid.appendChild(pill);
    });
  }else{
    cp.classList.add('hidden');
  }
}

continueBtn?.addEventListener('click', ()=> cp.classList.add('hidden'));

function renderAnswers(q){
  q.a.forEach((text, idx)=>{
    const b = document.createElement('button');
    b.textContent = text;
    b.onclick = ()=> choose(idx);
    aWrap.appendChild(b);
  });
}

function choose(idx){
  const q = qs[i];
  if(idx===q.c){ ok++; buckets[q.g] = (buckets[q.g]||0)+1; }
  i++; render();
}

function levelByScore(p){
  if(p>=90) return 'Очень высокий';
  if(p>=75) return 'Выше среднего';
  if(p>=55) return 'Средний';
  return 'Нужна тренировка';
}

async function finish(){
  quiz.classList.add('hidden');
  result.classList.remove('hidden');
  bar.style.width = '100%';
  const pct = Math.round(ok/TOTAL*100);
  const level = levelByScore(pct);
  const msg = `Ваш результат: ${pct}% (правильных ответов: ${ok} из ${TOTAL}). Уровень: ${level}.`;
  resText.textContent = msg;

  const motivation = `Здравствуйте!
Вы завершили тест ThinkLevel — интеллектуальный инструмент для оценки внимания, памяти и логики.

Ваш результат: ${ok} из ${TOTAL}
Уровень: ${level}

Это отличный шаг к развитию когнитивных навыков. Для максимального прогресса попробуйте 10–15 минут в день уделять коротким задачам на память и закономерности.

Помните: интеллект — это мышца. Развивайте её регулярно 💪
Команда ThinkLevel`;

  try{
    await fetch('https://formspree.io/f/mzzypjko', {
      method: 'POST',
      headers: { 'Accept': 'application/json' },
      body: new URLSearchParams({
        email: email,
        _replyto: email,
        message: motivation,
        subject: 'Ваш результат в тесте ThinkLevel'
      })
    });
  }catch(e){}
}

restartBtn.addEventListener('click', ()=> location.reload());
