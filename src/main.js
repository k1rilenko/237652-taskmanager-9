import {menu} from './components/menu.js';
import {search} from './components/search.js';
import {filter} from './components/filter.js';
import {card} from './components/card.js';
import {board} from './components/board.js';
import {boardFilter} from './components/boardFilter.js';
import {boardTasks} from './components/boardTasks.js';
import {button} from './components/button.js';
import {allTasks} from './components/data.js';
import {filterData} from './components/filterData.js';
import {cardEdit} from './components/card-edit.js';
const render = (block, template, position = `afterend`) => {
  const element = document.querySelector(block);
  element.insertAdjacentHTML(position, template);
};
const loadTasks = (data) => {
  const dataForRender = data.splice(1, 8);
  dataForRender.forEach((element) => {
    render(`.board__tasks`, card(element), `beforeend`);
  });
  if (dataForRender.length < 8) {
    loadButton.style.display = `none`;
  }
};
render(`.control__title`, menu());
render(`.main__control`, search());
render(`.main__search`, filter(filterData));
render(`.main__filter`, board());
render(`.board`, boardFilter(), `beforeend`);
render(`.board`, boardTasks(), `beforeend`);
render(`.board__tasks`, cardEdit(allTasks[0]), `beforeend`);
render(`.board__tasks`, button());
const loadButton = document.querySelector(`.load-more`);
loadButton.addEventListener(`click`, function () {
  loadTasks(allTasks);
});
