import {Board} from './board';
import {TaskList} from './taskList';
import {utils} from './utils';
import {Task} from './task.js';
import {TaskEdit} from './taskEdit.js';

export class BoardController {
  constructor(container, tasks) {
    this._container = container;
    this._tasks = tasks;
    this._board = new Board();
    this._taskList = new TaskList();
  }
  init() {
    utils.render(this._container, this._board.getElement(), utils.position.BEFOREEND);
    utils.render(this._board.getElement(), this._taskList.getElement(), utils.position.BEFOREEND);
    this.oneTimeRender(5);
  }
  oneTimeRender() {
    this._tasks.splice(0, 5).forEach((taskMock) => this._renderTask(taskMock));
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
