export const cardEdit = ({color, repeatingDays, description, dueDate, tags}) => {
  return `
  <article class="card card--edit card--${color} ${Object.keys(repeatingDays).some((day) => repeatingDays[day]) ? `card--repeat` : ``}">
            <form class="card__form" method="get">
              <div class="card__inner">
                <div class="card__control">
                  <button type="button" class="card__btn card__btn--archive">
                    archive
                  </button>
                  <button type="button" class="card__btn card__btn--favorites card__btn--disabled">
                    favorites
                  </button>
                </div>

                <div class="card__color-bar">
                  <svg class="card__color-bar-wave" width="100%" height="10">
                    <use xlink:href="#wave"></use>
                  </svg>
                </div>

                <div class="card__textarea-wrap">
                  <label>
                    <textarea class="card__text" placeholder="Start typing your text here..." name="text">${description}</textarea>
                  </label>
                </div>

                <div class="card__settings">
                  <div class="card__details">
                    <div class="card__dates">
                      <button class="card__date-deadline-toggle" type="button">
                        date: <span class="card__date-status">yes</span>
                      </button>

                      <fieldset class="card__date-deadline">
                        <label class="card__input-deadline-wrap">
                          <input class="card__date" type="text" placeholder="" name="date" value="${new Date(dueDate).toLocaleTimeString()}">
                        </label>
                      </fieldset>

                      <button class="card__repeat-toggle" type="button">
                        repeat:<span class="card__repeat-status">${Object.keys(repeatingDays).some((day) => repeatingDays[day] ? `yes` : `no`)}</span>
                      </button>
                      <fieldset class="card__repeat-days">
                        <div class="card__repeat-days-inner">
                          ${Object.entries(repeatingDays).map(([key, value]) => {
    return `
                            <input class="visually-hidden card__repeat-day-input" type="checkbox" id="repeat-${key}-4" name="repeat" value="${key}" ${value ? `checked=""` : ``}>
                            <label class="card__repeat-day" for="repeat-${key}-4">${key}</label>
                            `;
  }).join(``)}
                        </div>
                      </fieldset>
                    </div>

                    <div class="card__hashtag">
                      <div class="card__hashtag-list">
                      ${Array.from(tags).map((tag) => {
    return `
                        <span class="card__hashtag-inner">
                        <input type="hidden" name="hashtag" value="repeat" class="card__hashtag-hidden-input">
                        <p class="card__hashtag-name">
                          #${tag}
                        </p>
                        <button type="button" class="card__hashtag-delete">
                          delete
                        </button>
                      </span>
                        `;
  }).join(``)}
                      <label>
                        <input type="text" class="card__hashtag-input" name="hashtag-input" placeholder="Type new hashtag here">
                      </label>
                    </div>
                  </div>

                  <div class="card__colors-inner">
                    <h3 class="card__colors-title">Color</h3>
                    <div class="card__colors-wrap">
                      <input type="radio" id="color-black-4" class="card__color-input card__color-input--black visually-hidden" name="color" value="black">
                      <label for="color-black-4" class="card__color card__color--black">black</label>
                      <input type="radio" id="color-yellow-4" class="card__color-input card__color-input--yellow visually-hidden" name="color" value="yellow" checked="">
                      <label for="color-yellow-4" class="card__color card__color--yellow">yellow</label>
                      <input type="radio" id="color-blue-4" class="card__color-input card__color-input--blue visually-hidden" name="color" value="blue">
                      <label for="color-blue-4" class="card__color card__color--blue">blue</label>
                      <input type="radio" id="color-green-4" class="card__color-input card__color-input--green visually-hidden" name="color" value="green">
                      <label for="color-green-4" class="card__color card__color--green">green</label>
                      <input type="radio" id="color-pink-4" class="card__color-input card__color-input--pink visually-hidden" name="color" value="pink">
                      <label for="color-pink-4" class="card__color card__color--pink">pink</label>
                    </div>
                  </div>
                </div>
                <div class="card__status-btns">
                  <button class="card__save" type="submit">save</button>
                  <button class="card__delete" type="button">delete</button>
                </div>
              </div>
            </form>
          </article>
  `;
};