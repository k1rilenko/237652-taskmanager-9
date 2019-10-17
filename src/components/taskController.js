import {Task} from './task';
import {TaskEdit} from './taskEdit';
import {utils} from './utils';

export class TaskController {
  constructor(container, data, onDataChange, onChangeView) {
    this._container = container;
    this._data = data;
    this._onDataChange = onDataChange;
    this._onChangeView = onChangeView;
    this._task = new Task(data);
    this._taskEdit = new TaskEdit(data);
    this.init();
  }
  init() {
    const onEscKeyDown = (e) => {
      if (e.key === `Escape` || e.key === `Esc`) {
        this._taskList.getElement().replaceChild(this._task.getElement(), this._taskEdit.getElement());
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };
    this._task.getElement().querySelector(`.card__btn--edit`).addEventListener(`click`, () => {
      this._onChangeView();
      this._container.getElement().replaceChild(this._taskEdit.getElement(), this._task.getElement());
      document.addEventListener(`keydown`, onEscKeyDown);
    });
    this._taskEdit.getElement().querySelector(`.card__delete`).addEventListener(`click`, () => {
      utils.unrender(this._taskEdit.getElement());
      this._taskEdit._element = null;
      /* checkEmptyContainer(); */
    });
    this._taskEdit.getElement().querySelector(`textarea`).addEventListener(`focus`, () => {
      document.removeEventListener(`keydown`, onEscKeyDown);
    });
    this._taskEdit.getElement().querySelector(`textarea`).addEventListener(`blur`, () => {
      document.addEventListener(`keydown`, onEscKeyDown);
    });
    this._taskEdit.getElement().querySelector(`.card__save`).addEventListener(`click`, (evt) => {
      evt.preventDefault();
      this._container.getElement().replaceChild(this._task.getElement(), this._taskEdit.getElement());
      const formData = new FormData(this._taskEdit.getElement().querySelector(`.card__form`));
      const entry = {
        description: formData.get(`text`),
        color: formData.get(`color`),
        tags: new Set(formData.getAll(`hashtag`)),
        dueDate: new Date(formData.get(`date`)),
        repeatingDays: formData.getAll(`repeat`).reduce((acc, it) => {
          acc[it] = true;
          return acc;
        }, {
          'mo': false,
          'tu': false,
          'we': false,
          'th': false,
          'fr': false,
          'sa': false,
          'su': false
        })
      };
      this._onDataChange(entry, this._data);
      document.removeEventListener(`keydown`, onEscKeyDown);
    });
    utils.render(this._container.getElement(), this._task.getElement(), utils.position.BEFOREEND);
  }
  setDefaultView() {
    if (this._container.getElement().contains(this._taskEdit.getElement())) {
      this._container.getElement().replaceChild(this._task.getElement(), this._taskEdit.getElement());
    }
  }
}
