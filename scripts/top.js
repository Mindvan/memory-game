function createLeaderboard(parent, resultsStore) {
  const modal = createModal(parent, 'Таблица лидеров', 'leaderboard-title');
  function renderResults() {
    modal.content.replaceChildren();
    const results = resultsStore.getResults();
    if (results.length === 0) {
      createElement('p', 'Пока нет результатов', modal.content);
      return;
    }
    const table = createElement('table', undefined, modal.content);
    table.className = 'leaderboard-table';
    const head = createElement('thead', undefined, table);
    const headings = createElement('tr', undefined, head);
    for (const title of ['Место', 'Ходы', 'Дата']) {
      createElement('th', title, headings).scope = 'col';
    }
    const body = createElement('tbody', undefined, table);
    results.forEach((result, index) => {
      const row = createElement('tr', undefined, body);
      const date = new Date(result.timestamp);
      const formattedDate = [String(date.getDate()).padStart(2, '0'),
        String(date.getMonth() + 1).padStart(2, '0'), date.getFullYear()].join('.');
      for (const value of [index + 1, result.moves, formattedDate]) {
        createElement('td', String(value), row);
      }
    });
  }
  return {
    open() {
      renderResults();
      modal.open();
    },
  };
}
