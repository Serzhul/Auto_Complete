import View from "./View.js";
import { ItemStore } from "../types/index.js";

const template = `<div class="bl_container">
        <form class="el_search__form">
            <label for="el_search__form" class="el_search__label">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                role="img" 
                width="20"
                height="20"
                preserveAspectRatio="xMidYMid meet"
                viewBox="0 0 1024 1024" 
                class="el_icon__search"
            >
                <path
                    fill="currentColor"
                    d="m795.904 750.72l124.992 124.928a32 32 0 0 1-45.248 45.248L750.656 795.904a416 416 0 1 1 45.248-45.248zM480 832a352 352 0 1 0 0-704a352 352 0 0 0 0 704z"
                />
            </svg>
            <input type="search" class="el_search__input" placeholder="제목, 감독, 배우로 검색"/>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                role="img"
                width="20" 
                height="20"
                preserveAspectRatio="xMidYMid meet"
                viewBox="0 0 24 24"
                class="el_icon__clear"
            >
                <path
                    fill="currentColor"
                    d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10s10-4.47 10-10S17.53 2 12 2zm4.3 14.3a.996.996 0 0 1-1.41 0L12 13.41L9.11 16.3a.996.996 0 1 1-1.41-1.41L10.59 12L7.7 9.11A.996.996 0 1 1 9.11 7.7L12 10.59l2.89-2.89a.996.996 0 1 1 1.41 1.41L13.41 12l2.89 2.89c.38.38.38 1.02 0 1.41z"
                />
            </svg>
        </label>
        <ul class="bl_list">
            {{__search_item__}}
        </ul>
        </form>
    </div>
`;

export default class InputView extends View {
  private store: ItemStore;
  constructor(containerId: string, store: ItemStore) {
    super(containerId, template);
    this.store = store;
  }

  public render = () => {
    const items = this.store.getAllItems();

    this.addHtml(
      items
        .map(
          (item, i) => `
            <li class="el_list__item">
            <div class="bl_container__item">
                <div class="${i === 0 ? "selected" : "unselected"}">
                    <span class="el_item__name"> ${item.text}</span>
                </div>
            </div>
        </li>
        `
        )
        .join("")
    );

    this.setTemplateData("search_item", this.getHtml());

    this.updateView();
  };
}
