function createResultsStore() {
  const key = 'memory-game-results';
  let results = [];
  function rank(items) {
    return items.sort((a, b) => a.moves - b.moves || a.timestamp - b.timestamp).slice(0, 10);
  }
  try {
    const saved = JSON.parse(localStorage.getItem(key) || '[]');
    if (Array.isArray(saved)) {
      results = rank(saved.filter(item => item && Number.isInteger(item.moves)
        && item.moves >= gameData.emojis.length && Number.isFinite(item.timestamp)
        && Number.isFinite(new Date(item.timestamp).getTime())));
    }
  } catch {
  }
  return {
    getResults: () => results.map(result => ({ ...result })),
    add(moves) {
      results = rank([...results, { moves, timestamp: Date.now() }]);
      try {
        localStorage.setItem(key, JSON.stringify(results));
        return true;
      } catch {
        return false;
      }
    },
  };
}
