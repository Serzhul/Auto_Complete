import { fetch, helpers } from "./utils/index.js";
import { ItemStore } from "./types/index.js";
import { init } from "./app.js";

// const $container = document.querySelector(".bl_container");

const { debounce } = helpers;
const { getItems } = fetch;

export const keyInputHandler = (store: ItemStore) => {
  const $searchInput = document.querySelector(".el_search__input");
  const $listEl = document.querySelector(".bl_list");

  if ($searchInput) {
    (<HTMLElement>$searchInput).focus();

    (<HTMLInputElement>$searchInput).value = "";
    (<HTMLInputElement>$searchInput).value = store.getCurKeyword();

    $searchInput?.addEventListener(
      "input",
      debounce(async (e: InputEvent) => {
        const inputVal = (<HTMLInputElement>e.target)?.value;

        if (inputVal.trim() === "") {
          $listEl?.classList.add("hidden");
          return;
        }

        $listEl?.classList.remove("hidden");

        const items = await getItems(inputVal);

        store.setAllItems(items);

        store.setCurKeyword(inputVal);

        init();
      })
    );
  }
};

export const listMenuHandler = (store: ItemStore) => {
  const $searchInput = document.querySelector(".el_search__input");
  const $itemList = document.querySelectorAll(".el_list__item");

  const listLen = $itemList.length;

  let curIdx = 0;

  $searchInput?.addEventListener("keydown", (e) => {
    const { key } = <KeyboardEvent>e;

    if (key === "ArrowDown") {
      curIdx += 1;

      if (curIdx >= listLen) curIdx = 0;

      [...$itemList].forEach(($item, i) => {
        const target = $item.querySelector(
          ".bl_container__item"
        )?.firstElementChild;

        if (i === curIdx) {
          target?.classList.remove("unselected");
          target?.classList.add("selected");
        } else {
          target?.classList.remove("selected");
          target?.classList.add("unselected");
        }
      });
    } else if (key === "ArrowUp") {
      curIdx -= 1;
      if (curIdx < 0) curIdx = listLen - 1;
      [...$itemList].forEach(($item, i) => {
        const target = $item.querySelector(
          ".bl_container__item"
        )?.firstElementChild;

        if (i === curIdx) {
          target?.classList.remove("unselected");
          target?.classList.add("selected");
        } else {
          target?.classList.remove("selected");
          target?.classList.add("unselected");
        }
      });
    }
  });
  console.log(store);
};

export const focusHandler = () => {
  const $searchInput = document.querySelector(".el_search__input");
  const $listEl = document.querySelector(".bl_list");
  const inputVal = (<HTMLInputElement>$searchInput)?.value;

  $searchInput?.addEventListener("focusin", () => {
    if (inputVal.trim() !== "") $listEl?.classList.remove("hidden");
  });

  $searchInput?.addEventListener("focusout", () => {
    $listEl?.classList.add("hidden");
  });
};
