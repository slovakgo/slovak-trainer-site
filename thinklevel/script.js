// Parallax: mouse + gentle auto sway
const bg = document.getElementById('bg');
let t = 0;
function animate(){
  t += 0.0025;
  const dx = Math.sin(t)*2;
  const dy = Math.cos(t*0.8)*2;
  bg.style.transform = `translate(${dx}px, ${dy}px) scale(1.06)`;
  requestAnimationFrame(animate);
}
animate();
document.addEventListener('mousemove',(e)=>{
  const x = (e.clientX / innerWidth - .5) * 8;
  const y = (e.clientY / innerHeight - .5) * 8;
  bg.style.transform = `translate(${x}px, ${y}px) scale(1.06)`;
});

const intro = document.getElementById('intro');
const quiz  = document.getElementById('quiz');
const result= document.getElementById('result');
const emailForm = document.getElementById('emailForm');
const qText = document.getElementById('qText');
const answers = document.getElementById('answers');
const bar = document.getElementById('bar');
const qIdx = document.getElementById('qIdx');
const qTotal = document.getElementById('qTotal');
const cp = document.getElementById('checkpoint');
const cpGrid = document.getElementById('cpGrid');
const continueBtn = document.getElementById('continueBtn');
const restartBtn = document.getElementById('restart');

const Q = [
  {t:'Логика', q:'Какое число продолжит ряд: 3, 6, 18, 72, ?', a:['144','216','288','360'], c:1},
  {t:'Логика', q:'Лишнее: мозг, мысль, сознание, апельсин', a:['мозг','мысль','сознание','апельсин'], c:3},
  {t:'Шаблоны', q:'Продолжите: 2, 4, 8, 16, …', a:['18','24','32','36'], c:2},
  {t:'Математика', q:'Сколько секунд в 12 минутах?', a:['720','600','640','560'], c:0},
  {t:'Память', q:'Запомните: 4A9B. Какой код был?', a:['4A9B','4B9A','49AB','A49B'], c:0, flash:'4A9B'},

  {t:'Логика', q:'Если вчера было завтра, какой сегодня день?', a:['Понедельник','Воскресенье','Суббота','Среда'], c:1},
  {t:'Шаблоны', q:'A, C, F, J, O, …', a:['S','T','U','V'], c:0},
  {t:'Математика', q:'Сколько рёбер у куба?', a:['8','10','12','16'], c:2},
  {t:'Память', q:'Запомните: ♦ ◼ △ ◼ ♦. Какая фигура была третьей?', a:['♦','◼','△','○'], c:2, flash:'♦  ◼  △  ◼  ♦'},
  {t:'Логика', q:'Что лишнее: автобус, поезд, велосипед, самолёт?', a:['Автобус','Поезд','Велосипед','Самолёт'], c:2},

  {t:'Шаблоны', q:'Что будет дальше: ■ ■ ■ □ □ □ ■ ■ ■ …', a:['□ □ □','■ □ ■','□ ■ □','■ ■ □'], c:0},
  {t:'Математика', q:'Сколько будет 15% от 160?', a:['16','20','24','32'], c:2},
  {t:'Память', q:'Запомните: 7, 2, 9, 4. Третье число?', a:['7','2','9','4'], c:2, flash:'7  2  9  4'},
  {t:'Логика', q:'Сколько углов у трёх треугольников?', a:['6','9','12','3'], c:1},
  {t:'Шаблоны', q:'Найдите закономерность: О, Д, Т, Ч, П, …', a:['С','Ш','Щ','С\''], c:0},

  {t:'Математика', q:'Сумма чисел от 1 до 10 равна', a:['54','55','56','60'], c:1},
  {t:'Память', q:'Запомните слово: «НЕЙРОН». Какая буква была второй?', a:['Й','Е','Н','Р'], c:1, flash:'Н Е Й Р О Н'},
  {t:'Логика', q:'В каком месяце меньше всего дней?', a:['Февраль','Январь','Июль','Одинаково'], c:0},
  {t:'Шаблоны', q:'Выберите лишнее: △ ◻ ◯ ★', a:['△','◻','◯','★'], c:3},
  {t:'Математика', q:'Сколько минут в 3,5 часах?', a:['180','200','210','240'], c:2},

  {t:'Память', q:'Запомните: Z–K–M–T. Какая буква последняя?', a:['K','M','T','Z'], c:2, flash:'Z – K – M – T'},
  {t:'Логика', q:'Если 1=1, 2=4, 3=9, 4=?,', a:['12','14','15','16'], c:3},
  {t:'Шаблоны', q:'Что дальше: ▲ ● ▲ ● …', a:['▲','●','■','◆'], c:0},
  {t:'Математика', q:'Наименьшее простое число больше 20', a:['21','22','23','25'], c:2},
  {t:'Память', q:'Запомните: три слова — свет, код, ток. Какого слова НЕ было?', a:['ток','код','свет','цвет'], c:3}
];

qTotal.textContent = Q.length;
let i = 0, ok = 0;
let buckets = {'Логика':0,'Шаблоны':0,'Математика':0,'Память':0};

emailForm.addEventListener('submit', (e)=>{
  e.preventDefault();
  intro.classList.add('hidden');
  quiz.classList.remove('hidden');
  render();
});

function render(){
  if(i>=Q.length){ return finish(); }
  const q = Q[i];
  qIdx.textContent = (i+1);
  bar.style.width = Math.max(3, Math.round(i/Q.length*100)) + '%';
  qText.textContent = q.q;
  answers.innerHTML = '';

  if(q.flash){
    const notice = document.createElement('div');
    notice.className = 'answers';
    const msg = document.createElement('div');
    msg.style.padding='12px 0'; msg.style.opacity='.9';
    msg.textContent = q.flash;
    answers.appendChild(msg);
    setTimeout(()=>{ answers.innerHTML=''; buildAnswers(q); }, 1600);
  }else{
    buildAnswers(q);
  }

  if(i>0 && i%5===0){
    cp.classList.remove('hidden');
    cpGrid.innerHTML = '';
    Object.keys(buckets).forEach(k=>{
      const cell = document.createElement('div');
      cell.className='pill';
      cell.textContent = `${k}: ${buckets[k]}`;
      cpGrid.appendChild(cell);
    });
  } else {
    cp.classList.add('hidden');
  }
}

continueBtn.addEventListener('click', ()=> cp.classList.add('hidden'));

function buildAnswers(q){
  q.a.forEach((text, idx)=>{
    const b = document.createElement('button');
    b.textContent = text;
    b.onclick = ()=>choose(idx);
    answers.appendChild(b);
  });
}

function choose(idx){
  const q = Q[i];
  if(idx===q.c){ ok++; buckets[q.t] = (buckets[q.t]||0)+1; }
  i++; render();
}

async function finish(){
  quiz.classList.add('hidden');
  result.classList.remove('hidden');
  bar.style.width = '100%';
  // Friendly email (no numbers shown on-screen)
  const email = (document.getElementById('email').value || '').trim();
  const friendly = `Ваш результат готов! Спасибо, что прошли тест ThinkLevel 🧠
Мы обработали ваши ответы и подготовили анализ вашего уровня мышления.
Проверьте почту — письмо уже у вас 💫`;
  try{
    await fetch('https://formspree.io/f/mzzypjko', {
      method:'POST',
      headers:{'Accept':'application/json'},
      body: new URLSearchParams({ email, message: friendly, _subject:'Ваш результат ThinkLevel' })
    });
  }catch(e){}
}

resultText.textContent = "Результат отправлен на почту.";
