import {AbstractComponent} from './abstractComponent';

export class MoreButton extends AbstractComponent {
  getTemplate() {
    return `<button class="load-more" type="button">load more</button>`;
  }
}
