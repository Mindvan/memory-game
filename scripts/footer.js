function createFooter(parent) {
  function createFooterLink(href, parent, text) {
    const link = createElement('a', text, parent);
    link.href = href;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    return link;
  }

  const footer = createElement('footer', undefined, parent);
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
}
