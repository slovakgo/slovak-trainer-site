/* ThinkLevel RU — dark-blue */
const intro=document.getElementById('intro');
const quiz=document.getElementById('quiz');
const result=document.getElementById('result');
const emailForm=document.getElementById('emailForm');
const emailInput=document.getElementById('email');
const qText=document.getElementById('qText');
const answers=document.getElementById('answers');
const qIdxEl=document.getElementById('qIdx');
const qTotalEl=document.getElementById('qTotal');
const bar=document.getElementById('bar');
const resultText=document.getElementById('resultText');
const restart=document.getElementById('restart');

const FORMSPREE_URL = emailForm.getAttribute('action'); // mzzypjko

const Q=[
{q:"Какое число продолжит ряд: 3, 6, 18, 72, …",a:["144","216","288","360"],c:3},
{q:"Что лишнее: автобус, поезд, велосипед, самолёт?",a:["Автобус","Поезд","Велосипед","Самолёт"],c:2},
{q:"Сколько углов у трёх треугольников?",a:["6","9","3","12"],c:1},
{q:"Что идёт после ряда: 2, 3, 5, 8, 12, 17, …?",a:["22","23","24","25"],c:1},
{q:"Найдите закономерность: О, Д, Т, Ч, П, …",a:["С","Ш","Щ","С'"],c:1},
{q:"Что тяжелее: 1 кг железа или 1 кг пуха?",a:["Железо","Пух","Одинаково","Нельзя сравнить"],c:2},
{q:"Какое число лишнее: 3, 9, 27, 81, 243, 729, 1000?",a:["729","1000","243","81"],c:1},
{q:"Сколько секунд в 3 минутах?",a:["120","150","180","240"],c:2},
{q:"Сколько букв в слове «алфавит»?",a:["7","8","9","10"],c:0},
{q:"6×7 = ?",a:["36","40","42","48"],c:2},
{mem:"4A9B",ask:"Какой код был?",a:["4A9B","4B9A","49AB","A49B"],c:0},
{mem:"7, 2, 9, 4",ask:"Число на третьей позиции?",a:["7","2","9","4"],c:2},
{mem:"НЕЙРОН",ask:"Какая буква была второй?",a:["Й","Е","Н","Р"],c:1},
{q:"Сколько дней в невисокосном году?",a:["365","366","364","360"],c:0},
{q:"Май — какой по счёту месяц?",a:["3","4","5","6"],c:2},
{q:"Что лишнее: март, июнь, август, ноябрь?",a:["Март","Июнь","Август","Ноябрь"],c:1},
{q:"Сумма углов треугольника равна …",a:["90°","120°","180°","270°"],c:2},
{q:"Продолжите: А, Б, В, Г, …",a:["Е","Ж","Д","З"],c:2},
{q:"Сколько дней в двух неделях?",a:["10","12","14","16"],c:2},
{q:"Антоним к слову «трудный».",a:["Лёгкий","Тяжёлый","Медленный","Высокий"],c:0},
{q:"Что больше: 2/3 или 3/5?",a:["2/3","3/5","Одинаково","Нельзя сравнить"],c:0},
{q:"Среднее арифметическое 4 и 10 равно …",a:["6","7","8","9"],c:1},
{q:"Чему равно 15% от 200?",a:["20","25","30","35"],c:2},
{q:"Сколько чётных чисел от 1 до 10 включительно?",a:["4","5","6","7"],c:1},
{q:"Сколько сторон у правильного восьмиугольника?",a:["6","7","8","9"],c:2}
];
qTotalEl.textContent=Q.length;

let i=0,score=0,userEmail="";
emailForm.addEventListener("submit",(e)=>{
  e.preventDefault();
  userEmail=(emailInput.value||"").trim();
  if(!userEmail) return;
  intro.classList.add("hidden");
  quiz.classList.remove("hidden");
  render();
});

function render(){
  if(i>=Q.length) return finish();
  qIdxEl.textContent=i+1;
  bar.style.width=Math.round((i/Q.length)*100)+"%";
  answers.innerHTML="";
  const it=Q[i];
  if(it.mem){
    qText.textContent="Запомните: "+it.mem;
    setTimeout(()=>{ qText.textContent=it.ask; draw(it); }, 1800);
  }else{
    qText.textContent=it.q;
    draw(it);
  }
}
function draw(it){
  it.a.forEach((t,idx)=>{
    const b=document.createElement("button");
    b.className="opt"; b.textContent=t;
    b.onclick=()=>sel(idx===it.c);
    answers.appendChild(b);
  });
}
function sel(ok){ if(ok) score++; i++; render(); }

function finish(){
  quiz.classList.add("hidden");
  result.classList.remove("hidden");
  resultText.textContent="Результат отправлен на почту.";
  // 1) владельцу (Formspree)
  fetch(FORMSPREE_URL,{
    method:"POST",
    headers:{Accept:"application/json","Content-Type":"application/json"},
    body:JSON.stringify({ email:userEmail, message:`Результат: ${score} из ${Q.length} (${Math.round(score/Q.length*100)}%).` })
  }).catch(()=>{});
  // 2) участнику (EmailJS) — замените YOUR_* в index.html и ниже, чтобы включить
  // emailjs.send('YOUR_SERVICE_ID','YOUR_TEMPLATE_ID',{
  //   to_email:userEmail, score:score, total:Q.length, percent:Math.round(score/Q.length*100)
  // }).catch(()=>{});
}
document.getElementById("restart").addEventListener("click",()=>location.reload());
