export const filter = (data) => {
  return `<section class="main__filter filter container">
  ${data.map((el) => {
    return `
    <input type="radio" id="filter__${el.title}" class="filter__input visually-hidden" name="filter" checked/>
    <label for="filter__${el.title}" class="filter__label"> ${el.title}<span class="filter__${el.title}-count"> ${el.count}</span></label>
    `;
  }).join(``)}

</section>`;
};
