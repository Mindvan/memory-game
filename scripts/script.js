const header = createElement('header', undefined, document.body);
const newGameButton = createButton('Новая игра', header);
const leaderboardButton = createButton('Таблица лидеров', header);

const resultsStore = createResultsStore();
const game = createGame(document.body, resultsStore);
const leaderboard = createLeaderboard(document.body, resultsStore);
createThemePanel(document.body);
createFooter(document.body);

newGameButton.addEventListener('click', game.startGame);
leaderboardButton.addEventListener('click', leaderboard.open);
game.startGame();

