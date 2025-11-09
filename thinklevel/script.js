const FORM_ENDPOINT = "https://formspree.io/f/mzzypjko";
const TOTAL = 25;
const PACK_B64 = "W3sicSI6ICLQn9GA0L7QtNC+0LvQttC40YLQtSDRgNGP0LQ6IDMsIDYsIDE4LCA3Miwg4oCmIiwgImEiOiBbIjE0NCIsICIyMTYiLCAiMjg4IiwgIjM2MCJdLCAiYyI6IDF9LCB7InEiOiAi0KPQutCw0LbQuNGC0LUg0LvQuNGI0L3QtdC1INGB0LvQvtCy0L46INC60L3QuNCz0LAsINGC0LXRgtGA0LDQtNGMLCDQutCw0YDQsNC90LTQsNGILCDRgNGD0YfQutCwIiwgImEiOiBbItCa0L3QuNCz0LAiLCAi0KLQtdGC0YDQsNC00YwiLCAi0JrQsNGA0LDQvdC00LDRiCIsICLQoNGD0YfQutCwIl0sICJjIjogMH0sIHsicSI6ICLQmtCw0LrQvtC1INGH0LjRgdC70L4g0LvQuNGI0L3QtdC1OiAyOCwgNDksIDY0LCA4MSwgMTAwIiwgImEiOiBbIjI4IiwgIjQ5IiwgIjY0IiwgIjgxIiwgIjEwMCJdLCAiYyI6IDB9LCB7InEiOiAi0KHQutC+0LvRjNC60L4g0YPQs9C70L7QsiDRgyDRgtGA0ZHRhSDRgNCw0LLQvdGL0YUg0LrQstCw0LTRgNCw0YLQvtCyINCy0LzQtdGB0YLQtT8iLCAiYSI6IFsiNCIsICI2IiwgIjgiLCAiMTIiXSwgImMiOiAzfSwgeyJxIjogItCV0YHQu9C4INC60LDQttC00YPRjiDQvNC40L3Rg9GC0YMg0YfQuNGB0LvQviDRg9C00LLQsNC40LLQsNC10YLRgdGPLCDRh9C10YDQtdC3INGB0LrQvtC70YzQutC+INC80LjQvdGD0YIg0LjQtyAxINC/0L7Qu9GD0YfQuNGC0YHRjyAyNTY/IiwgImEiOiBbIjYiLCAiNyIsICI4IiwgIjkiXSwgImMiOiAyfSwgeyJxIjogItCa0LDQutCw0Y8g0YTQuNCz0YPRgNCwINC/0L7Qu9GD0YfQuNGC0YHRjyDQv9GA0Lgg0L/QtdGA0LXRgdC10YfQtdC90LjQuCDQtNCy0YPRhSDQvtC60YDRg9C20L3QvtGB0YLQtdC5PyIsICJhIjogWyLQntC60YDRg9C20L3QvtGB0YLRjCIsICLQotC+0YfQutCwIiwgItCe0LLQsNC7IiwgItCU0LLQtSDRgtC+0YfQutC4Il0sICJjIjogM30sIHsicSI6ICLQm9C+0LTQutCwINC/0L4g0YLQtdGH0LXQvdC40Y4g0LjQtNGR0YIgMzAg0LrQvC/Rhywg0L/RgNC+0YLQuNCyIOKAlCAxMCDQutC8L9GHLiDQodC60L7RgNC+0YHRgtGMINGC0LXRh9C10L3QuNGPPyIsICJhIjogWyI1IiwgIjEwIiwgIjE1IiwgIjIwIl0sICJjIjogMX0sIHsicSI6ICLQn9GA0L7QtNC+0LvQttC40YLQtTogQSwgQywgRiwgSiwgTywg4oCmIiwgImEiOiBbIlQiLCAiVSIsICJWIiwgIlciXSwgImMiOiAwfSwgeyJxIjogItCh0YDQtdC00L3QtdC1INCw0YDQuNGE0LzQtdGC0LjRh9C10YHQutC+0LUg0L/Rj9GC0Lgg0YfQuNGB0LXQuyDRgNCw0LLQvdC+IDEyLiDQodGD0LzQvNCwINCy0YHQtdGFINC/0Y/RgtC4PyIsICJhIjogWyIxMiIsICIyNCIsICI0OCIsICI2MCJdLCAiYyI6IDN9LCB7InEiOiAi0JLQtdGA0L7Rj9GC0L3QvtGB0YLRjCDQvtGA0LvQsCDQsiDQvdC10YfQtdGB0YLQvdC+0Lkg0LzQvtC90LXRgtC1IDAuNi4g0JLQtdGA0L7Rj9GC0L3QvtGB0YLRjCDQtNCy0YPRhSDQvtGA0LvQvtCyINC/0L7QtNGA0Y/QtD8iLCAiYSI6IFsiMC4xMiIsICIwLjI0IiwgIjAuMzYiLCAiMC42Il0sICJjIjogMn0sIHsicSI6ICLQodC60L7Qu9GM0LrQviDQvdC10YfRkdGC0L3Ri9GFINC00LLRg9C30L3QsNGH0L3Ri9GFINGH0LjRgdC10Ls/IiwgImEiOiBbIjQ1IiwgIjUwIiwgIjkwIiwgIjEwMCJdLCAiYyI6IDB9LCB7InEiOiAi0JvQvtCz0LjQutCwOiDQstGB0LUgWiDigJQgWS4g0J3QtdC60L7RgtC+0YDRi9C1IFkg4oCUIFguINCh0LvQtdC00YPQtdGCINC70LgsINGH0YLQviDQvdC10LrQvtGC0L7RgNGL0LUgWiDigJQgWD8iLCAiYSI6IFsi0JTQsCIsICLQndC10YIiLCAi0JjQvdC+0LPQtNCwIiwgItCd0LXQu9GM0LfRjyDQvtC/0YDQtdC00LXQu9C40YLRjCJdLCAiYyI6IDN9LCB7InEiOiAi0KHRg9C80LzQsCDRg9Cz0LvQvtCyINCy0YvQv9GD0LrQu9C+0LPQviDQv9GP0YLQuNGD0LPQvtC70YzQvdC40LrQsD8iLCAiYSI6IFsiMzYwwrAiLCAiNDUwwrAiLCAiNTQwwrAiLCAiNzIwwrAiXSwgImMiOiAyfSwgeyJxIjogItCV0YHQu9C4IDJ4ICsgMyA9IDE5LCB4ID0gPyIsICJhIjogWyI2IiwgIjciLCAiOCIsICI5Il0sICJjIjogMX0sIHsicSI6ICLQktGA0LXQvNGPINGA0LXQsNC60YbQuNC4OiAwLjMg0YHQtdC6IOKAlCDRjdGC0L4g0YHQutC+0LvRjNC60L4g0LzQuNC70LvQuNGB0LXQutGD0L3QtD8iLCAiYSI6IFsiMzAiLCAiMzAwIiwgIjMwMDAiLCAiMC4zIl0sICJjIjogMX0sIHsicSI6ICLQndCw0LnQtNC40YLQtSDRgdC70LXQtNGD0Y7RidC10LU6IDEsIDQsIDksIDE2LCDigKYiLCAiYSI6IFsiMjAiLCAiMjQiLCAiMjUiLCAiMzYiXSwgImMiOiAyfSwgeyJxIjogItCh0LrQvtC70YzQutC+INGA0LDQt9C70LjRh9C90YvRhSDQsNC90LDQs9GA0LDQvNC8INGDINGB0LvQvtCy0LAgwqvQotCV0KHQosK7ICjQstGB0LUg0LHRg9C60LLRiyDRgNCw0LfQu9C40YfQuNC80YspPyIsICJhIjogWyI2IiwgIjEyIiwgIjI0IiwgIjEyMCJdLCAiYyI6IDJ9LCB7InEiOiAi0JzQuNC90LjQvNGD0Lwg0YTRg9C90LrRhtC40LggeSA9ICh44oCTMinCsiArIDMg0YDQsNCy0LXQveKApiIsICJhIjogWyLigJMyIiwgIjAiLCAiMiIsICIzIl0sICJjIjogM30sIHsicSI6ICLQldGB0LvQuCDRgdC10LPQvtC00L3RjyDRgdGA0LXQtNCwLCDRgtC+INGH0LXRgNC10LcgMTAwINC00L3QtdC5INCx0YPQtNC10YLigKYiLCAiYSI6IFsi0JLQvtGB0LrRgNC10YHQtdC90YzQtSIsICLQn9C+0L3QtdC00LXQu9GM0L3QuNC6IiwgItCS0YLQvtGA0L3QuNC6IiwgItCh0YDQtdC00LAiXSwgImMiOiAxfSwgeyJxIjogItCf0YDQvtC00L7Qu9C20LjRgtC1OiAyLCAzLCA1LCA5LCAxNywg4oCmIiwgImEiOiBbIjMzIiwgIjMxIiwgIjI5IiwgIjI1Il0sICJjIjogMn0sIHsicSI6ICLQkiDRj9GJ0LjQutC1IDMg0LHQtdC70YvRhSDQuCAyINGH0ZHRgNC90YvRhSDRiNCw0YDQsC4g0JLQtdGA0L7Rj9GC0L3QvtGB0YLRjCDQtNC+0YHRgtCw0YLRjCDQsdC10LvRi9C5PyIsICJhIjogWyIyLzUiLCAiMy81IiwgIjEvMiIsICIzLzEwIl0sICJjIjogMX0sIHsicSI6ICLQodC60L7Qu9GM0LrQviDQv9C10YDQtdGB0YLQsNC90L7QstC+0Log0YMgNSDRgNCw0LfQu9C40YfQvdGL0YUg0L/RgNC10LTQvNC10YLQvtCyPyIsICJhIjogWyIxMCIsICIyNSIsICI2MCIsICIxMjAiXSwgImMiOiAzfSwgeyJxIjogItCg0LXRiNC40YLQtTogNyEgLyA1ISA9IiwgImEiOiBbIjciLCAiNDIiLCAiMjEwIiwgIjg0MCJdLCAiYyI6IDF9LCB7InEiOiAi0JzQtdC00LjQsNC90LAg0L3QsNCx0L7RgNCwICgyLCA1LCA3LCAxMiwgMTQpPyIsICJhIjogWyI1IiwgIjciLCAiMTIiLCAiOS41Il0sICJjIjogMX0sIHsicSI6ICLQp9GC0L4g0LHQvtC70YzRiNC1OiBsbihlwrMpINC40LvQuCAzIGxuKGUpPyIsICJhIjogWyLQoNCw0LLQvdGLIiwgItCf0LXRgNCy0L7QtSIsICLQktGC0L7RgNC+0LUiLCAi0J3QtdC70YzQt9GPINGB0YDQsNCy0L3QuNGC0YwiXSwgImMiOiAwfV0=";

let data = JSON.parse(new TextDecoder().decode(Uint8Array.from(atob(PACK_B64), c=>c.charCodeAt(0))));

const startForm = document.getElementById('startForm');
const emailInput = document.getElementById('email');
const testPanel  = document.getElementById('testPanel');
const qLabel     = document.getElementById('qLabel');
const qText      = document.getElementById('question');
const answersBox = document.getElementById('answers');
const barFill    = document.getElementById('barFill');
const cpPanel    = document.getElementById('checkpoint');
const ring1=document.getElementById('ring1'), ring2=document.getElementById('ring2'), ring3=document.getElementById('ring3'), ring4=document.getElementById('ring4'), ring5=document.getElementById('ring5');
const continueBtn= document.getElementById('continueBtn');
const resultPanel= document.getElementById('resultPanel');
const scoreText  = document.getElementById('scoreText');
const restartBtn = document.getElementById('restart');

let current=0, score=0, emailSent="";

startForm.addEventListener('submit', async (e)=>{
  e.preventDefault();
  if(!emailInput.checkValidity()) return;
  emailSent = emailInput.value.trim();
  try{
    await fetch(FORM_ENDPOINT, { method:"POST", headers:{ "Accept":"application/json" }, body: new URLSearchParams({email:emailSent, event:"start"}) });
  }catch(_){}
  startForm.parentElement.classList.add('hidden');
  testPanel.classList.remove('hidden');
  showQuestion();
});

function showQuestion(){
  const q = data[current];
  qLabel.textContent = `Вопрос ${current+1} из ${TOTAL}`;
  qText.textContent = q.q;
  answersBox.innerHTML = "";
  q.a.forEach((opt, idx)=>{
    const btn = document.createElement('button');
    btn.textContent = opt;
    btn.onclick = ()=>pick(idx);
    answersBox.appendChild(btn);
  });
  const pct = Math.round((current)/TOTAL*100);
  barFill.style.width = pct + '%';
  if(current>0 && (current)%5===0){
    updateRings();
    cpPanel.classList.remove('hidden');
    answersBox.classList.add('hidden');
  }else{
    cpPanel.classList.add('hidden');
    answersBox.classList.remove('hidden');
  }
}

continueBtn.onclick = ()=>{
  cpPanel.classList.add('hidden');
  answersBox.classList.remove('hidden');
}

function updateRings(){
  ring1.textContent = `${Math.min(score,5)}/5`;
  ring2.textContent = `${Math.min(score,10)}/10`;
  ring3.textContent = `${Math.min(score,15)}/15`;
  ring4.textContent = `${Math.min(score,20)}/20`;
  ring5.textContent = `${Math.min(score,25)}/25`;
}

function pick(idx){
  if(idx === data[current].c) score++;
  current++;
  if(current>=TOTAL) return finish();
  showQuestion();
}

async function finish(){
  testPanel.classList.add('hidden');
  resultPanel.classList.remove('hidden');
  const percent = Math.round(score/TOTAL*100);
  scoreText.textContent = `Ваш результат: ${score} из ${TOTAL} (${percent}%).`;
  try{
    await fetch(FORM_ENDPOINT, { method:"POST", headers:{ "Accept":"application/json" }, body: new URLSearchParams({email:emailSent, score:score, total:TOTAL, percent:percent, event:"result"}) });
  }catch(_){}
}

restartBtn.onclick = ()=>window.location.reload();
