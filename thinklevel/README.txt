ThinkLevel (статичный)
======================

Что внутри:
- index.html — разметка + подключение EmailJS
- style.css — оформление + фон нейронов (файл neurons-bg.jpg положите рядом)
- script.js — логика теста (25 вопросов), отправка результата:
    * владельцу — через Formspree (mzzypjko)
    * участнику — через EmailJS

Что нужно сделать 1 раз:
1) Создать аккаунт на https://emailjs.com, подключить почтовый сервис.
2) Создать шаблон письма с переменными: to_email, percent, score, total, breakdown.
3) Вставить в index.html свой PUBLIC KEY: emailjs.init('YOUR_PUBLIC_KEY')
4) Вставить в script.js свои: YOUR_SERVICE_ID и YOUR_TEMPLATE_ID

Фон:
- Положите изображение `neurons-bg.jpg` рядом с файлами (или в ту же папку), либо измените путь в CSS.
