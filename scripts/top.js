function createLeaderboard(parent) {
  const leaderboard = createElement('dialog', undefined, parent);
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



  closeButton.addEventListener('click', () => {
    leaderboard.close();
  });

  return { open: () => leaderboard.showModal() };
}
