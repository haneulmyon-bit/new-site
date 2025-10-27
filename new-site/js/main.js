// Получаем данные (вариант A: встроенные JSON в HTML)
const raw = document.getElementById('news-data').textContent;
let news = [];
try { news = JSON.parse(raw); } catch(e){ console.error('Ошибка парсинга новостей', e); }

const newsList = document.getElementById('news-list');

function createCard(item){
  const article = document.createElement('article');
  article.className = 'news-card';
  article.innerHTML = `
    <div class="news-media">
      <img src="${item.image}" alt="${item.title}">
    </div>
    <div class="news-body">
      <div class="news-meta">${item.date}</div>
      <h2 class="news-title">${item.title}</h2>
      <div class="news-summary">${item.summary}</div>
      <div class="news-full" aria-hidden="true">${item.full}</div>
      <button class="read-btn" aria-expanded="false">Читать далее</button>
    </div>
  `;

  // логику раскрытия делаем через высоту (чтобы анимация была плавной)
  const btn = article.querySelector('.read-btn');
  const full = article.querySelector('.news-full');

  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    const expanded = btn.getAttribute('aria-expanded') === 'true';
    if(!expanded){
      // раскрыть: установить реальную высоту контента
      full.style.height = full.scrollHeight + 'px';
      full.setAttribute('aria-hidden','false');
      btn.textContent = 'Свернуть';
      btn.setAttribute('aria-expanded','true');
    } else {
      full.style.height = '0';
      full.setAttribute('aria-hidden','true');
      btn.textContent = 'Читать далее';
      btn.setAttribute('aria-expanded','false');
    }
  });

  // Дополнительно: клик по карточке — тоже раскрывать
  article.addEventListener('click', (ev) => {
    // если клик не по кнопке
    if(ev.target !== btn){
      btn.click();
    }
  });

  return article;
}

// Рендерим все новости
news.forEach(n => newsList.appendChild(createCard(n)));
