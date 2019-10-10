import {menu} from './components/menu.js';
import {search} from './components/search.js';
import {filter} from './components/filter.js';
import {board} from './components/board.js';
import {boardFilter} from './components/boardFilter.js';
import {boardTasks} from './components/boardTasks.js';
import {button} from './components/button.js';
import {taskMocks} from './components/data.js';
import {filterData} from './components/filterData.js';
import {Task} from './components/task.js';
import {TaskEdit} from './components/taskEdit.js';
import {utils} from './components/utils.js';

const renderTask = (taskMock) => {
  const task = new Task(taskMock);
  const taskEdit = new TaskEdit(taskMock);
  utils.render(taskContainer, task.getElement(), utils.position.BEFOREEND);
  const onEscKeyDown = (e) => {
    if (e.key === `Escape` || e.key === `Esc`) {
      taskContainer.replaceChild(task.getElement(), taskEdit.getElement());
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };
  const checkEmptyContainer = () => {
    if (taskContainer.childElementCount === 0) {
      taskContainer.remove();
      boardContainer.innerHTML = `<p class="board__no-tasks"> Congratulations, all tasks were completed! To create a new click on «add new task» button.</p>`;
    }
  };
  task.getElement().querySelector(`.card__btn--edit`).addEventListener(`click`, () => {
    taskContainer.replaceChild(taskEdit.getElement(), task.getElement());
    document.addEventListener(`keydown`, onEscKeyDown);
  });
  taskEdit.getElement().querySelector(`.card__delete`).addEventListener(`click`, () => {
    utils.unrender(taskEdit.getElement());
    taskEdit._element = null;
    checkEmptyContainer();
  });
  taskEdit.getElement().querySelector(`textarea`).addEventListener(`focus`, () => {
    document.removeEventListener(`keydown`, onEscKeyDown);
  });
  taskEdit.getElement().querySelector(`textarea`).addEventListener(`blur`, () => {
    document.addEventListener(`keydown`, onEscKeyDown);
  });
  taskEdit.getElement().querySelector(`.card__save`).addEventListener(`click`, () => {
    taskContainer.replaceChild(task.getElement(), taskEdit.getElement());
    document.removeEventListener(`keydown`, onEscKeyDown);
  });
};
const render = (block, template, position = `afterend`) => {
  const element = document.querySelector(block);
  element.insertAdjacentHTML(position, template);
};
/* const loadTasks = (data) => {
  const dataForRender = data.splice(1, 8);
  dataForRender.forEach((element) => {
    render(`.board__tasks`, card(element), `beforeend`);
  });
  if (dataForRender.length < 8) {
    loadButton.style.display = `none`;
  }
}; */
render(`.control__title`, menu());
render(`.main__control`, search());
render(`.main__search`, filter(filterData));
render(`.main__filter`, board());
render(`.board`, boardFilter(), `beforeend`);
render(`.board`, boardTasks(), `beforeend`);
render(`.board__tasks`, button());
const taskContainer = document.querySelector(`.board__tasks`);
const boardContainer = document.querySelector(`.board`);
taskMocks.forEach((task) => {
  renderTask(task);
});
