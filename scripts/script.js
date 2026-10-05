function createElement(tag, text, parent) {
  const element = document.createElement(tag);

  if (text !== undefined) {
    element.textContent = text;
  }

  if (parent) {
    parent.append(element);
  }

  return element;
}

function createButton(text, parent) {
  const button = createElement('button', text, parent);
  button.type = 'button';
  return button;
}

const themePanel = createElement('aside', undefined, document.body);
themePanel.className = 'theme-panel';
themePanel.setAttribute('aria-label', 'Оформление');
const themeButton = createButton('', themePanel);
themeButton.setAttribute('aria-label', 'Тёмная тема');

function applyTheme(theme) {
  const isDark = theme === 'dark';
  document.documentElement.dataset.theme = theme;
  themeButton.textContent = gameData.themeLabels[theme];
  themeButton.setAttribute('aria-pressed', String(isDark));
}

let initialTheme = 'light';
try {
  if (localStorage.getItem('memory-game-theme') === 'dark') {
    initialTheme = 'dark';
  }
} catch {
}
applyTheme(initialTheme);

themeButton.addEventListener('click', () => {
  const theme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  applyTheme(theme);
  try {
    localStorage.setItem('memory-game-theme', theme);
  } catch {
  }
});

const header = createElement('header', undefined, document.body);
const newGameButton = createButton('Новая игра', header);
const leaderboardButton = createButton('Таблица лидеров', header);

const main = createElement('main', undefined, document.body);
createElement('h1', 'Memory Game', main);

const counters = createElement('section', undefined, main);
counters.className = 'counters';
counters.setAttribute('aria-label', 'Счётчики игры');

const movesText = createElement('p', undefined, counters);
createElement('span', 'Ходы', movesText).className = 'counter-label';
const movesCounter = createElement('span', '0', movesText);
movesCounter.className = 'counter-value';

const pairsText = createElement('p', undefined, counters);
createElement('span', 'Пары', pairsText).className = 'counter-label';
const pairsValue = createElement('span', undefined, pairsText);
pairsValue.className = 'counter-value';
const pairsCounter = createElement('span', '0', pairsValue);
pairsValue.append(` из ${gameData.emojis.length}`);

const board = createElement('section', undefined, main);
board.className = 'board';
board.setAttribute('aria-label', 'Игровое поле');

// пока просто кнопки
const cards = [...gameData.emojis, ...gameData.emojis];

for (let index = 0; index < cards.length; index++) {
  const card = createButton(cards[index], board);
  card.className = 'card';
  card.dataset.index = String(index);
}

const message = createElement('p', '', main);
message.setAttribute('role', 'status');

const leaderboard = createElement('dialog', undefined, document.body);
leaderboard.setAttribute('aria-labelledby', 'leaderboard-title');
const leaderboardTitle = createElement('h2', 'Таблица лидеров', leaderboard);
leaderboardTitle.id = 'leaderboard-title';
const resultsTable = createElement('table', undefined, leaderboard);
resultsTable.className = 'leaderboard-table';
const resultsBody = createElement('tbody', undefined, resultsTable);
for (const [name, score] of gameData.results) {
  const row = createElement('tr', undefined, resultsBody);
  const player = createElement('th', name, row);
  player.scope = 'row';
  createElement('td', `${score} баллов`, row);
}
const closeButton = createButton('Закрыть', leaderboard);

leaderboardButton.addEventListener('click', () => {
  leaderboard.showModal();
});

closeButton.addEventListener('click', () => {
  leaderboard.close();
});

newGameButton.addEventListener('click', () => {
  movesCounter.textContent = '0';
  pairsCounter.textContent = '0';
  message.textContent = 'новая игра поле готово!!!111';
});

function createFooterLink(href, parent, text) {
  const link = createElement('a', text, parent);
  link.href = href;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  return link;
}

document.body.append(themePanel);
const footer = createElement('footer', undefined, document.body);
footer.className = 'footer';
footer.id = 'contacts';

const footerTelegram = createElement('div', undefined, footer);
footerTelegram.className = 'footer-telegram';
const telegramLink = createFooterLink(gameData.footer.telegramUrl, footerTelegram);
telegramLink.title = 'Telegram';
telegramLink.setAttribute('aria-label', 'Telegram');

const svgNamespace = 'http://www.w3.org/2000/svg';
const telegramIcon = document.createElementNS(svgNamespace, 'svg');
telegramIcon.setAttribute('viewBox', gameData.telegramIcon.viewBox);
telegramIcon.setAttribute('width', '24');
telegramIcon.setAttribute('height', '24');
telegramIcon.setAttribute('fill', 'currentColor');
telegramIcon.setAttribute('aria-hidden', 'true');
telegramIcon.setAttribute('focusable', 'false');
const telegramPath = document.createElementNS(svgNamespace, 'path');
telegramPath.setAttribute('d', gameData.telegramIcon.path);
telegramIcon.append(telegramPath);
telegramLink.append(telegramIcon);

const footerRsschool = createElement('div', undefined, footer);
footerRsschool.className = 'footer-rsschool';
const schoolLink = createFooterLink(gameData.footer.schoolUrl, footerRsschool);
schoolLink.className = 'school-link';
const schoolLogo = createElement('img', undefined, schoolLink);
schoolLogo.src = gameData.footer.schoolLogo;
schoolLogo.alt = 'School';
schoolLogo.width = 100;
schoolLogo.loading = 'lazy';
const footerGithub = createElement('div', undefined, footer);
footerGithub.className = 'footer-github';
const githubLink = createFooterLink(gameData.footer.githubUrl, footerGithub, 'GitHub');
githubLink.className = 'github-link';

