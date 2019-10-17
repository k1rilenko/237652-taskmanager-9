import {Board} from './board';
import {TaskList} from './taskList';
import {utils} from './utils';
import {TaskController} from './taskController';
import {Sort} from './sort';
import {MoreButton} from './button';

export class BoardController {
  constructor(container, tasks) {
    this._container = container;
    this._tasks = tasks;
    this._board = new Board();
    this._taskList = new TaskList();
    this._sort = new Sort();
    this._loadButton = new MoreButton();
    this._subscription = [];
    this._onDataChange = this._onDataChange.bind(this);
    this._onChangeView = this._onChangeView.bind(this);
  }
  init() {
    utils.render(this._container, this._board.getElement(), utils.position.BEFOREEND);
    utils.render(this._board.getElement(), this._sort.getElement(), utils.position.AFTERBEGIN);
    utils.render(this._board.getElement(), this._taskList.getElement(), utils.position.BEFOREEND);
    this._tasks.forEach((taskMock) => this._renderTask(taskMock));
    utils.render(this._board.getElement(), this._loadButton.getElement(), utils.position.BEFOREEND);
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
  _renderBoard(tasks) {
    utils.unrender(this._taskList.getElement());
    utils.unrender(this._loadButton.getElement());
    this._taskList.removeElement();
    this._loadButton.removeElement();
    utils.render(this._board.getElement(), this._taskList.getElement(), utils.position.BEFOREEND);
    tasks.forEach((taskMock) => this._renderTask(taskMock));
    utils.render(this._board.getElement(), this._loadButton.getElement(), utils.position.BEFOREEND);
  }
  _renderTask(task) {
    const taskController = new TaskController(this._taskList, task, this._onDataChange, this._onChangeView);
    this._subscription.push(taskController.setDefaultView.bind(taskController));
  }
  _onDataChange(newData, oldData) {
    this._tasks[this._tasks.findIndex((it) => it === oldData)] = newData;
    this._renderBoard(this._tasks);
  }
  _onChangeView() {
    this._subscription.forEach((it) => it());
  }
}
