
const emailStep=document.getElementById('email-step');
const testStep=document.getElementById('test-step');
const checkpoint=document.getElementById('checkpoint');
const resultStep=document.getElementById('result-step');
const form=document.getElementById('emailForm');
const emailInput=document.getElementById('email');
const counter=document.getElementById('counter');
const bar=document.getElementById('bar');
const qTitle=document.getElementById('question');
const answersBox=document.getElementById('answers');
const cpValue=document.getElementById('cp-value');
const cpText=document.getElementById('cp-text');
const cpContinue=document.getElementById('cp-continue');
const btnSend=document.getElementById('btn-send');
const FORM_ENDPOINT='https://formspree.io/f/mzzypjko';

let emailValue="", idx=0, score=0, questions=[];

function loadQuestions(){
  try{
    const json = atob(window.THINKLEVEL_PACKED);
    questions = JSON.parse(json);
  }catch(e){
    alert('Ошибка загрузки вопросов.');
  }
}
loadQuestions();

form.addEventListener('submit', async (e)=>{
  e.preventDefault();
  const v=emailInput.value.trim();
  if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)){alert('Введите корректный e-mail');return;}
  emailValue=v;
  try{
    const fd=new FormData();fd.append('email',emailValue);fd.append('event','start_pro');
    await fetch(FORM_ENDPOINT,{method:'POST',headers:{Accept:'application/json'},body:fd});
  }catch(e){}
  emailStep.classList.add('hidden');
  startTest();
  window.scrollTo({top:0,behavior:'smooth'});
});

function startTest(){idx=0;score=0;testStep.classList.remove('hidden');render();}

function render(){
  const total=questions.length;
  counter.textContent=`Вопрос ${idx+1} из ${total}`;
  bar.style.width=Math.round(idx/total*100)+'%';
  const q=questions[idx];
  qTitle.textContent=q.q;
  answersBox.innerHTML='';
  q.a.forEach((t,i)=>{
    const b=document.createElement('button');
    b.className='answer'; b.type='button'; b.textContent=t;
    b.onclick=()=>pick(i);
    answersBox.appendChild(b);
  });
}

function pick(choice){
  const q=questions[idx];
  if(choice===q.c) score++;
  idx++;
  if(idx%5===0 && idx<questions.length){showCP();}
  else if(idx<questions.length){render();}
  else finish();
}

function showCP(){
  testStep.classList.add('hidden');
  checkpoint.classList.remove('hidden');
  const p=Math.round(score/idx*100);
  cpValue.textContent=p+'%';
  checkpoint.style.setProperty('--p',p+'%');
  cpText.textContent = p>=90?'Отличная динамика — держите скорость и точность.':
                     p>=75?'Сильный темп. Усильте внимательность — дорога к 90% открыта.':
                     p>=60?'Неплохо. Добавьте фокус и проверку шагов.':
                           'Разгоняемся. Чаще сверяйтесь с условием.';
}
cpContinue.addEventListener('click',()=>{
  checkpoint.classList.add('hidden');
  testStep.classList.remove('hidden');
  render();
});

function finish(){
  bar.style.width='100%';
  testStep.classList.add('hidden');
  resultStep.classList.remove('hidden');
  const percent=Math.round(score/questions.length*100);
  document.getElementById('score').textContent=percent+'%';
  let tier,text;
  if(percent>=90){tier='⚡ Уровень: Продвинутый';text='Выше 90%: отличная аналитика и внимание.';}
  else if(percent>=75){tier='✨ Уровень: Сильный';text='Баланс скорости и точности на хорошем уровне.';}
  else if(percent>=60){tier='🌱 Уровень: Базовый+';text='База есть, усиливайте счёт и закономерности.';}
  else {tier='🔧 Уровень: Стартовый';text='Хорошая точка роста. Больше практики на ряды и логику.';}
  document.getElementById('tier').textContent=tier;
  document.getElementById('summary').textContent=text;
  autoSend(percent,tier,text);
  btnSend.onclick=()=>manualSend(percent,tier,text);
}

async function autoSend(percent,tier,text){
  if(!emailValue) return;
  try{
    const fd=new FormData();
    fd.append('email',emailValue);
    fd.append('event','final_pro');
    fd.append('result_percent',percent+'%');
    fd.append('result_tier',tier);
    fd.append('result_text',text);
    await fetch(FORM_ENDPOINT,{method:'POST',headers:{Accept:'application/json'},body:fd});
  }catch(e){}
}

async function manualSend(percent,tier,text){
  if(!emailValue){alert('Не найден e-mail');return;}
  try{
    const fd=new FormData();
    fd.append('email',emailValue);
    fd.append('event','send_again_pro');
    fd.append('result_percent',percent+'%');
    fd.append('result_tier',tier);
    fd.append('result_text',text);
    const r=await fetch(FORM_ENDPOINT,{method:'POST',headers:{Accept:'application/json'},body:fd});
    if(r.ok) alert('Результат отправлен на '+emailValue);
    else alert('Не удалось отправить. Попробуйте ещё раз.');
  }catch(e){ alert('Ошибка отправки.'); }
}
