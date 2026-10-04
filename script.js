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

const header = createElement('header', undefined, document.body);
const newGameButton = createButton('Новая игра', header);
const leaderboardButton = createButton('Таблица лидеров', header);

const main = createElement('main', undefined, document.body);
createElement('h1', 'Найди пару', main);

const counters = createElement('section', undefined, main);
counters.setAttribute('aria-label', 'Счётчики игры');

const movesText = createElement('p', undefined, counters);
movesText.append('Ходы: ');
const movesCounter = createElement('span', '0', movesText);

const pairsText = createElement('p', undefined, counters);
pairsText.append('Найдено пар: ');
const pairsCounter = createElement('span', '0', pairsText);
pairsText.append(' из 8');

const board = createElement('section', undefined, main);
board.setAttribute('aria-label', 'Игровое поле');


const emojis = ['🍎', '🍋', '🍇', '🍓', '🍒', '🍑', '🥝', '🍍'];
const cards = [...emojis, ...emojis];

for (let index = 0; index < cards.length; index++) {
  const card = createButton(cards[index], board);
  card.dataset.index = String(index);
}

const message = createElement('p', '', main);
message.setAttribute('role', 'status');

const leaderboard = createElement('dialog', undefined, document.body);
leaderboard.setAttribute('aria-labelledby', 'leaderboard-title');
const leaderboardTitle = createElement('h2', 'Таблица лидеров', leaderboard);
leaderboardTitle.id = 'leaderboard-title';
createElement('p', 'Пока нет завершённых игр.', leaderboard);
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
