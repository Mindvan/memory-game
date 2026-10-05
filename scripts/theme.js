function createThemePanel(parent) {
  const themePanel = createElement('aside', undefined, parent);
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
}
