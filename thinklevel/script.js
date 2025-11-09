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
  {q: "Какое число продолжит ряд: 3, 6, 18, 72, ?", a: ["144","216","288","360"], c: 1},
  {q: "Что лишнее: книга, тетрадь, калькулятор, ручка?", a: ["Книга","Тетрадь","Калькулятор","Ручка"], c: 2}
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
