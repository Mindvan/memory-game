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
  pairsValue.append(`/${gameData.emojis.length}`);

  const timeText = createElement('p', undefined, counters);
  timeText.className = 'game-time';
  createElement('span', 'Время', timeText).className = 'counter-label';
  const timeCounter = createElement('span', '00:00', timeText);
  timeCounter.className = 'counter-value';

  const board = createElement('section', undefined, main);
  board.className = 'board';
  board.setAttribute('aria-label', 'Игровое поле');

  let cards = [];
  let selectedCards = [];
  let moves = 0;
  let pairs = 0;
  let closeTimer = null;
  let finished = false;
  let startedAt = 0;
  let gameTimer = null;

  function updateTime() {
    const seconds = Math.floor((performance.now() - startedAt) / 1000);
    const minutes = String(Math.floor(seconds / 60)).padStart(2, '0');
    timeCounter.textContent = `${minutes}:${String(seconds % 60).padStart(2, '0')}`;
  }

  const victory = createElement('dialog', undefined, parent);
  victory.setAttribute('aria-labelledby', 'victory-title');
  createElement('h2', 'еее победа', victory).id = 'victory-title';
  const victoryText = createElement('p', '', victory);
  const victoryClose = createButton('Закрыть', victory);
  victoryClose.addEventListener('click', () => victory.close());

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
      card.button = button;
      card.index = index;
      updateCard(card);
      button.addEventListener('click', () => selectCard(card));
    });
  }

  function updateCard(card) {
    const visible = card.isOpen || card.isMatched;
    card.button.textContent = visible ? card.image : gameData.cardBack;
    card.button.setAttribute('aria-label', visible
      ? `Карточка ${card.index + 1}: ${card.image}${card.isMatched ? ', пара найдена' : ''}`
      : `Карточка ${card.index + 1}, закрыта`);
    card.button.setAttribute('aria-disabled', String(visible || finished));
  }

  function selectCard(card) {
    if (finished || closeTimer !== null || card.isOpen || card.isMatched) return;

    card.isOpen = true;
    selectedCards.push(card);
    updateCard(card);
    if (selectedCards.length !== 2) return;

    movesCounter.textContent = String(++moves);
    const [first, second] = selectedCards;

    if (first.image === second.image) {
      first.isMatched = second.isMatched = true;
      updateCard(first);
      updateCard(second);
      selectedCards = [];
      pairsCounter.textContent = String(++pairs);

      if (pairs === gameData.emojis.length) {
        finished = true;
        clearInterval(gameTimer);
        gameTimer = null;
        updateTime();
        victoryText.textContent = `Найдены все ${pairs} пар за ${moves} ходов. Время: ${timeCounter.textContent}.`;
        console.log('pairs', pairs, 'moves', moves, 'time', timeCounter.textContent);
        message.textContent = 'Игра завершена';
        victory.showModal();
      }
      return;
    }

    closeTimer = setTimeout(() => {
      first.isOpen = second.isOpen = false;
      updateCard(first);
      updateCard(second);
      selectedCards = [];
      closeTimer = null;
    }, 700);
  }

  const message = createElement('p', '', main);
  message.setAttribute('role', 'status');

  function startGame() {
    clearInterval(gameTimer);
    clearTimeout(closeTimer);
    closeTimer = null;
    selectedCards = [];
    moves = 0;
    pairs = 0;
    finished = false;
    if (victory.open) victory.close();
    cards = createShuffledCards();
    renderBoard();
    movesCounter.textContent = '0';
    pairsCounter.textContent = '0';
    message.textContent = '';
    startedAt = performance.now();
    updateTime();
    gameTimer = setInterval(updateTime, 250);
  }

  return { startGame };
}
