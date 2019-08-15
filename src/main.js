import {menu} from './components/menu.js';
import {search} from './components/search.js';
import {filter} from './components/filter.js';
import {card} from './components/card.js';
import {board} from './components/board.js';
import {boardFilter} from './components/boardFilter.js';
import {boardTasks} from './components/boardTasks.js';
import {button} from './components/button.js';

const render = (block, template, position = `afterend`) => {
  const element = document.querySelector(block);
  element.insertAdjacentHTML(position, template);
};
render(`.control__title`, menu());
render(`.main__control`, search());
render(`.main__search`, filter());
render(`.main__filter`, board());
render(`.board`, boardFilter(), `beforeend`);
render(`.board`, boardTasks(), `beforeend`);
for (let i = 0; i < 3; i++) {
  render(`.board__tasks`, card(), `beforeend`);
}
render(`.board__tasks`, button());
