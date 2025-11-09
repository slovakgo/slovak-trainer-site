const intro = document.getElementById('intro');
const emailForm = document.getElementById('emailForm');
const emailInput = document.getElementById('email');
const quiz = document.getElementById('quiz');
const qText = document.getElementById('qText');
const answers = document.getElementById('answers');
const bar = document.getElementById('bar');
const qIdxSpan = document.getElementById('qIdx');
const qTotalSpan = document.getElementById('qTotal');
const checkpoint = document.getElementById('checkpoint');
const cpGrid = document.getElementById('cpGrid');
const continueBtn = document.getElementById('continueBtn');
const result = document.getElementById('result');
const resultText = document.getElementById('resultText');
const restartBtn = document.getElementById('restart');

const questions = [
  {q:'Какое число продолжит ряд: 3, 6, 18, 72, ?', a:['144','216','288','360'], c:1},
  {q:'Что лишнее: книга, тетрадь, карандаш, ручка?', a:['Книга','Тетрадь','Карандаш','Ручка'], c:0},
  {q:'Сколько углов у пятиугольника?', a:['4','5','6','7'], c:1},
  {q:'Если все розы — цветы, а некоторые цветы — красные, означает ли это, что все розы красные?', a:['Да','Нет'], c:1},
  {q:'Найдите закономерность: 2, 3, 5, 8, 13, ?', a:['18','20','21','22'], c:2},
  {q:'Какое слово образует анаграмму слова «КОДЕР»?', a:['ДРОКЕ','РЕДОК','КЕДОР','РЕКОД'], c:3},
  {q:'Продолжите ряд: П, В, С, Ч, П, ?', a:['С','Ш','Ч','В'], c:0},
  {q:'Сколько секунд в 3 часах?', a:['10 800','3 600','1 800','12 800'], c:0},
  {q:'Какая фигура имеет наибольшее число осей симметрии?', a:['Квадрат','Прямоугольник','Ромб','Трапеция'], c:0},
  {q:'Если вчера было завтра, то какой день сегодня?', a:['Понедельник','Среда','Пятница','Воскресенье'], c:3},
  {q:'Сколько пятерок в числе 55555?', a:['3','4','5','6'], c:2},
  {q:'Что лишнее: автобус, поезд, велосипед, самолёт?', a:['Автобус','Поезд','Велосипед','Самолёт'], c:2},
  {q:'Чему равно 15% от 240?', a:['24','30','36','42'], c:2},
  {q:'В слове «НЕЙРОН» какая буква вторая?', a:['Й','Е','Н','Р'], c:1},
  {q:'Сколько дней в невисокосном году?', a:['365','366','364','360'], c:0},
  {q:'Продолжите ряд: 1, 4, 9, 16, ?', a:['20','24','25','36'], c:2},
  {q:'Укажите синоним слова «быстрый»:', a:['Резвый','Медлительный','Неторопливый','Ленивый'], c:0},
  {q:'Сколько нулей в числе миллион?', a:['4','5','6','7'], c:2},
  {q:'Если А > B и B > C, то верно ли, что A > C?', a:['Да','Нет'], c:0},
  {q:'Какое слово можно получить из букв: И, Л, О, Г, К?', a:['ЛИГОК','ГОЛИК','ЛОГИК','КОЛИГ'], c:2},
  {q:'Запомните: 4A9B. Какой код был?', a:['4A9B','4B9A','49AB','A49B'], c:0},
  {q:'Запомните: 7, 2, 9, 4. Число на третьей позиции?', a:['7','2','9','4'], c:2},
  {q:'Сколько градусов в прямом угле?', a:['45','90','120','180'], c:1},
  {q:'На сколько больше 3×7, чем 4×4?', a:['1','3','5','7'], c:2},
  {q:'Что лишнее: март, июнь, август, ноябрь?', a:['Март','Июнь','Август','Ноябрь'], c:3}
];

qTotalSpan.textContent = questions.length;

let current = 0, score = 0;

emailForm.addEventListener('submit', async e => {
  e.preventDefault();
  intro.classList.add('hidden');
  quiz.classList.remove('hidden');
  render();
});

function render() {
  const q = questions[current];
  qIdxSpan.textContent = current + 1;
  bar.style.width = (current / questions.length * 100) + '%';
  qText.textContent = q.q;
  answers.innerHTML = '';
  q.a.forEach((t, i) => {
    const b = document.createElement('button');
    b.textContent = t;
    b.onclick = () => choose(i);
    answers.appendChild(b);
  });
}

function choose(i) {
  if (i === questions[current].c) score++;
  current++;
  if (current % 5 === 0 && current < questions.length) return checkpointScreen();
  if (current < questions.length) return render();
  finish();
}

function checkpointScreen() {
  quiz.classList.add('hidden');
  checkpoint.classList.remove('hidden');
  cpGrid.innerHTML = `<div>Пройдено ${current}/25</div>`;
}
continueBtn.onclick = () => {
  checkpoint.classList.add('hidden');
  quiz.classList.remove('hidden');
  render();
};

function finish() {
  quiz.classList.add('hidden');
  result.classList.remove('hidden');
  const percent = Math.round(score / questions.length * 100);
  resultText.textContent = `Результат: ${score} из 25 (${percent}%)`;
}

restartBtn.onclick = () => location.reload();
