import {Board} from './board';
import {TaskList} from './taskList';
import {utils} from './utils';
import {Task} from './task.js';
import {TaskEdit} from './taskEdit.js';
import {Sort} from './sort.js';

export class BoardController {
  constructor(container, tasks) {
    this._container = container;
    this._tasks = tasks;
    this._board = new Board();
    this._taskList = new TaskList();
    this._sort = new Sort();
  }
  init() {
    utils.render(this._container, this._board.getElement(), utils.position.BEFOREEND);
    utils.render(this._board.getElement(), this._sort.getElement(), utils.position.AFTERBEGIN);
    utils.render(this._board.getElement(), this._taskList.getElement(), utils.position.BEFOREEND);
    this.oneTimeRender(5);
    this._sort.getElement().addEventListener(`click`, (evt) => this._onSortLinkClick(evt));
  }
  _onSortLinkClick(evt) {
    evt.preventDefault();
    if (evt.target.tagName !== `A`) {
      return;
    }
    this._taskList.getElement().innerHTML = ``;
    switch (evt.target.dataset.sortType) {
      case `date-up`:
        const sortedByDateUp = this._tasks.slice().sort((a, b) => a.dueDate - b.dueDate);
        sortedByDateUp.forEach((taskMock) => this._renderTask(taskMock));
        break;
      case `date-down`:
        const sortedByDateDown = this._tasks.slice().sort((a, b) => b.dueDate - a.dueDate);
        sortedByDateDown.forEach((taskMock) => this._renderTask(taskMock));
        break;
      case `default`:
        this._tasks.forEach((taskMock) => this._renderTask(taskMock));
        break;
    }

  }
  oneTimeRender() {
    const renderForOneTime = this._tasks.slice();
    renderForOneTime.splice(0, 5).forEach((taskMock) => this._renderTask(taskMock));
    return this._tasks.length;
  }
  _renderTask(task) {
    const taskComponent = new Task(task);
    const taskEditComponent = new TaskEdit(task);
    const onEscKeyDown = (e) => {
      if (e.key === `Escape` || e.key === `Esc`) {
        this._taskList.getElement().replaceChild(taskComponent.getElement(), taskEditComponent.getElement());
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };
    taskComponent.getElement().querySelector(`.card__btn--edit`).addEventListener(`click`, () => {
      this._taskList.getElement().replaceChild(taskEditComponent.getElement(), taskComponent.getElement());
      document.addEventListener(`keydown`, onEscKeyDown);
    });
    taskEditComponent.getElement().querySelector(`.card__delete`).addEventListener(`click`, () => {
      utils.unrender(taskEditComponent.getElement());
      taskEditComponent._element = null;
      /* checkEmptyContainer(); */
    });
    taskEditComponent.getElement().querySelector(`textarea`).addEventListener(`focus`, () => {
      document.removeEventListener(`keydown`, onEscKeyDown);
    });
    taskEditComponent.getElement().querySelector(`textarea`).addEventListener(`blur`, () => {
      document.addEventListener(`keydown`, onEscKeyDown);
    });
    taskEditComponent.getElement().querySelector(`.card__save`).addEventListener(`click`, () => {
      this._taskList.getElement().replaceChild(taskComponent.getElement(), taskEditComponent.getElement());
      document.removeEventListener(`keydown`, onEscKeyDown);
    });
    utils.render(this._taskList.getElement(), taskComponent.getElement(), utils.position.BEFOREEND);
  }
}
