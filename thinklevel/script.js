const emailStep=document.getElementById('email-step');
const testStep=document.getElementById('test-step');
const resultStep=document.getElementById('result-step');
const form=document.getElementById('emailForm');
const bar=document.getElementById('bar');
const counter=document.getElementById('counter');
const qTitle=document.getElementById('question');
const answersBox=document.getElementById('answers');
const checkpoint=document.getElementById('checkpoint');
const cpValue=document.getElementById('cp-value');
const cpText=document.getElementById('cp-text');
const cpContinue=document.getElementById('cp-continue');
const btnSend=document.getElementById('btn-send');
const FORM_ENDPOINT='https://formspree.io/f/mzzypjko';
const questions=[
{q:"Какое число лишнее: 2, 4, 8, 16, 24, 32?",a:["8","16","24","32"],c:2},
{q:"Что лишнее: книга, журнал, газета, ручка?",a:["Книга","Журнал","Газета","Ручка"],c:3},
{q:"Сколько секунд в 4 минутах?",a:["120","180","240","300"],c:2},
{q:"Что не подходит: кот, собака, воробей, тигр?",a:["Кот","Собака","Воробей","Тигр"],c:2},
{q:"Чему равно (12 − 5) × 3?",a:["18","19","21","27"],c:2},
{q:"Продолжите: 1, 1, 2, 3, 5, 8, …",a:["10","11","12","13"],c:3},
{q:"Антоним к слову «медленный»",a:["Тихий","Быстрый","Толстый","Крепкий"],c:1},
{q:"Найдите лишнее: квадрат, круг, ромб, треугольник",a:["Квадрат","Круг","Ромб","Треугольник"],c:1},
{q:"Продолжите ряд: ПН, ВТ, СР, …",a:["ЧТ","ПТ","СБ","ВС"],c:0},
{q:"Если все A — B, и все B — C, то все A — …",a:["C","B","A","ни одно"],c:0},
{q:"Сколько углов у шестиугольника?",a:["5","6","7","8"],c:1},
{q:"Анаграмма слова «КРОНА»",a:["КОРА","КОРЖ","КРОНА","НОРКА"],c:3},
{q:"Чему равна 7 + 9 × 2?",a:["32","25","23","20"],c:2},
{q:"Сейчас 15:00. Через 150 минут будет:",a:["16:30","17:30","18:00","18:30"],c:1},
{q:"Лишнее: север, юг, восток, вверх",a:["Север","Юг","Восток","Вверх"],c:3},
{q:"Что лишнее: лимон, апельсин, мандарин, груша",a:["Лимон","Апельсин","Мандарин","Груша"],c:3},
{q:"Продолжите: 5, 10, 20, 40, …",a:["45","60","70","80"],c:3},
{q:"Синоним к слову «быстрый»",a:["Шустрый","Тяжёлый","Мягкий","Глухой"],c:0},
{q:"Сколько чётных чисел среди: 3, 6, 9, 12, 15, 18?",a:["2","3","4","5"],c:1},
{q:"Сколько градусов в прямом угле?",a:["45","90","120","180"],c:1},
{q:"Выберите лишнее: стекло, дерево, пластик, соль",a:["Стекло","Дерево","Пластик","Соль"],c:3},
{q:"Чему равно (6 + 8) ÷ 2 ?",a:["6","7","8","9"],c:2},
{q:"Пара к слову «вопрос»",a:["Ответ","Доверие","Надежда","Радость"],c:0},
{q:"Какое число вместо ?: 3, 6, 12, 24, ?",a:["36","42","44","48"],c:3},
{q:"Лишнее: январь, февраль, время, март",a:["Январь","Февраль","Время","Март"],c:2}
];
let idx=0,score=0,emailValue="";
form.addEventListener('submit',async e=>{e.preventDefault();const email=document.getElementById('email').value.trim();if(!email||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){alert('Введите корректный e-mail');return;}emailValue=email;try{const fd=new FormData();fd.append('email',emailValue);fd.append('event','start_test');await fetch(FORM_ENDPOINT,{method:'POST',headers:{Accept:'application/json'},body:fd});}catch(e){}emailStep.classList.add('hidden');startTest();window.scrollTo({top:0,behavior:'smooth'});});
function startTest(){testStep.classList.remove('hidden');idx=0;score=0;renderQuestion();}
function renderQuestion(){const total=questions.length;counter.textContent=`Вопрос ${idx+1} из ${total}`;bar.style.width=Math.round(idx/total*100)+'%';const q=questions[idx];qTitle.textContent=q.q;answersBox.innerHTML='';q.a.forEach((t,i)=>{const b=document.createElement('button');b.className='answer';b.type='button';b.textContent=t;b.onclick=()=>pick(i);answersBox.appendChild(b);});}
function pick(choice){if(choice===questions[idx].c)score++;idx++;if(idx%5===0&&idx<questions.length){showCheckpoint();}else if(idx<questions.length){renderQuestion();}else{finish();}}
function showCheckpoint(){testStep.classList.add('hidden');checkpoint.classList.remove('hidden');const percent=Math.round(score/idx*100);cpValue.textContent=percent+'%';checkpoint.style.setProperty('--p',percent+'%');cpText.textContent=checkpointText(percent);}
cpContinue.addEventListener('click',()=>{checkpoint.classList.add('hidden');testStep.classList.remove('hidden');renderQuestion();});
function checkpointText(p){if(p>=90)return'Отличная скорость и точность — держите темп.';if(p>=75)return'Сильный результат. Чуть больше внимания к деталям — и вы выше 90%.';if(p>=60)return'Неплохо. Усильте задачи на логику и счёт.';return'Разгоняемся. Сфокусируйтесь и прибавьте темп.';}
function finish(){bar.style.width='100%';testStep.classList.add('hidden');resultStep.classList.remove('hidden');const percent=Math.round(score/questions.length*100);document.getElementById('score').textContent=percent+'%';let tier,text;if(percent>=90){tier='⚡ Уровень: Продвинутый';text='Отличная скорость обработки и высокая точность решений.';}else if(percent>=75){tier='✨ Уровень: Сильный';text='Хороший баланс скорости и точности. Продолжайте тренировки.';}else if(percent>=60){tier='🌱 Уровень: Базовый+';text='Есть база. Добавьте задачи на внимание и шаблоны.';}else{tier='🔧 Уровень: Стартовый';text='Хорошая точка входа. 10 минут в день дадут быстрый рост.';}document.getElementById('tier').textContent=tier;document.getElementById('summary').textContent=text;autoSendResult(percent,tier,text);btnSend.onclick=()=>manualSendResult(percent,tier,text);}
async function autoSendResult(percent,tier,text){if(!emailValue)return;try{const fd=new FormData();fd.append('email',emailValue);fd.append('event','final_result');fd.append('result_percent',percent+'%');fd.append('result_tier',tier);fd.append('result_text',text);await fetch(FORM_ENDPOINT,{method:'POST',headers:{Accept:'application/json'},body:fd});}catch(e){}}
async function manualSendResult(percent,tier,text){if(!emailValue){alert('Не найден адрес e-mail');return;}try{const fd=new FormData();fd.append('email',emailValue);fd.append('event','send_again');fd.append('result_percent',percent+'%');fd.append('result_tier',tier);fd.append('result_text',text);const r=await fetch(FORM_ENDPOINT,{method:'POST',headers:{Accept:'application/json'},body:fd});if(r.ok)alert('Результат отправлен на '+emailValue);else alert('Не удалось отправить. Попробуйте ещё раз.');}catch(e){alert('Не удалось отправить. Проверьте подключение.');}}