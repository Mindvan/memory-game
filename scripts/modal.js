function createModal(parent, title, titleId) {
  const dialog = createElement('dialog', undefined, parent);
  dialog.setAttribute('aria-labelledby', titleId);
  createElement('h2', title, dialog).id = titleId;
  const content = createElement('div', undefined, dialog);
  const actions = createElement('div', undefined, dialog);
  const closeButton = createButton('Закрыть', actions);

  function syncScroll() {
    document.documentElement.classList.toggle('modal-open', Boolean(document.querySelector('dialog[open]')));
  }
  function close() {
    if (dialog.open) dialog.close();
    syncScroll();
  }
  function isBackdrop(event) {
    const rect = dialog.getBoundingClientRect();
    return event.target === dialog && (event.clientX < rect.left || event.clientX > rect.right
      || event.clientY < rect.top || event.clientY > rect.bottom);
  }
  let pressedBackdrop = false;
  dialog.addEventListener('pointerdown', event => { pressedBackdrop = isBackdrop(event); });
  dialog.addEventListener('click', event => {
    if (pressedBackdrop && isBackdrop(event)) close();
    pressedBackdrop = false;
  });
  dialog.addEventListener('cancel', event => { event.preventDefault(); close(); });
  dialog.addEventListener('close', syncScroll);
  closeButton.addEventListener('click', close);
  return {
    content, actions, closeButton,
    open() {
      if (!dialog.open) dialog.showModal();
      syncScroll();
    },
    close,
  };
}
