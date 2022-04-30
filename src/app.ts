import InputView from './views/inputView.js';
import {
    keyInputHandler,
    listMenuHandler,
    focusHandler,
} from './controller.js';
import Store from './store.js';

const store = new Store();

export const init = async () => {
    new InputView('app', store).render();

    keyInputHandler(store);
    listMenuHandler();
    focusHandler();
};

init();
