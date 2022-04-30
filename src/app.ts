import InputView from "./views/inputView.js";
import { keyInputHandler, listMenuHandler } from "./controller.js";
import Store from "./store.js";

const store = new Store();

export const init = async () => {
  new InputView("app", store).render();

  keyInputHandler(store);
  listMenuHandler(store);
};

init();
