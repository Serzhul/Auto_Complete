import InputView from './views/inputView.js';

import { getItems } from './utils/fetch.js';

const init = async () => {
    new InputView('app').render();

    const items = await getItems();

    console.log(items);
};

init();
