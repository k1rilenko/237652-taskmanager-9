import {Menu} from './components/menu.js';
import {Search} from './components/search.js';
import {filter} from './components/filter.js';
import {sort} from './components/sort.js';
import {button} from './components/button.js';
import {taskMocks} from './components/data.js';
import {filterData} from './components/filterData.js';
import {utils} from './components/utils.js';
import {BoardController} from './components/boardController.js';

const TaskMockCopy = [...taskMocks];
const menu = new Menu();
const search = new Search();
const menuContainer = document.querySelector(`.main__control`);
const main = document.querySelector(`.main`);
const boardController = new BoardController(main, TaskMockCopy);
utils.render(menuContainer, menu.getElement(), utils.position.BEFOREEND);
utils.render(main, search.getElement(), utils.position.BEFOREEND);
utils.render(main, utils.createElement(filter(filterData)), utils.position.BEFOREEND);
boardController.init();
utils.render(boardController._board.getElement(), utils.createElement(sort()), utils.position.AFTERBEGIN);
utils.render(boardController._board.getElement(), utils.createElement(button()), utils.position.BEFOREEND);
const buttonLoad = document.querySelector(`.load-more`);
buttonLoad.addEventListener(`click`, () => {
  boardController.oneTimeRender();
  if (boardController.oneTimeRender() === 0) {
    buttonLoad.style = `display: none`;
  }
});
