function createGame(parent) {
  const main = createElement('main', undefined, parent);
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

  let cards = [];

  function createShuffledCards() {
    const images = [...gameData.emojis, ...gameData.emojis];

    // Перемешивание Фишера — Йетса: каждый раз создаётся новая раскладка.
    for (let index = images.length - 1; index > 0; index--) {
      const randomIndex = Math.floor(Math.random() * (index + 1));
      [images[index], images[randomIndex]] = [images[randomIndex], images[index]];
    }

    return images.map((image) => ({ image, isOpen: false, isMatched: false }));
  }

  function renderBoard() {
    board.replaceChildren();

    cards.forEach((card, index) => {
      const button = createButton(gameData.cardBack, board);
      button.className = 'card';
      button.dataset.index = String(index);
      button.setAttribute('aria-label', `Карточка ${index + 1}, закрыта`);
    });
  }

  const message = createElement('p', '', main);
  message.setAttribute('role', 'status');

  function startGame() {
    cards = createShuffledCards();
    renderBoard();
    movesCounter.textContent = '0';
    pairsCounter.textContent = '0';
    message.textContent = '';
  }

  return { startGame };
}
