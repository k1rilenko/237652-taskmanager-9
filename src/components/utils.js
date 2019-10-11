export const utils = {
  position: {
    AFTERBEGIN: `start`,
    BEFOREEND: `end`
  },
  render(container, element, place) {
    switch (place) {
      case utils.position.AFTERBEGIN:
        container.prepend(element);
        break;
      case utils.position.BEFOREEND:
        container.append(element);
    }
  },
  unrender(element) {
    if (element) {
      element.remove();
    }
  },
  createElement(template) {
    const newElement = document.createElement(`div`);
    newElement.innerHTML = template;
    return newElement.firstChild;
  }
};
