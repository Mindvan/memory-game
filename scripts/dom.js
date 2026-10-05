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
