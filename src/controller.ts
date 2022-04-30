import { fetch, helpers } from './utils/index.js';
import { ItemStore, NodeType } from './types/index.js';
import { init } from './app.js';

const { debounce, selectElement, selectAllElements, removeClass, addClass } =
    helpers;
const { getItems } = fetch;

const moveFocus = (curIdx: number, itemList: NodeList) => {
    [...itemList].forEach(($item, i) => {
        const target = <HTMLElement>(
            selectElement(<NodeType>$item, '.bl_container__item')
                ?.firstElementChild
        );

        if (i === curIdx) {
            removeClass(target, 'unselected');
            addClass(target, 'selected');
        } else {
            removeClass(target, 'selected');
            addClass(target, 'unselected');
        }
    });
};

export const keyInputHandler = (store: ItemStore) => {
    const $searchInput = selectElement(document, '.el_search__input');
    const $listEl = selectElement(document, '.bl_list');
    const $clearIcon = selectElement(document, '.el_icon__clear');

    if ($clearIcon) addClass($clearIcon, 'hidden');

    const curKeyword = store.getCurKeyword();

    if ($searchInput) {
        (<HTMLElement>$searchInput).focus();

        (<HTMLInputElement>$searchInput).value = '';
        (<HTMLInputElement>$searchInput).value = curKeyword;

        if (curKeyword !== '') {
            if ($clearIcon) removeClass($clearIcon, 'hidden');
        }

        $searchInput?.addEventListener(
            'input',
            debounce(async (e: InputEvent) => {
                const inputVal = (<HTMLInputElement>e.target)?.value;

                if (inputVal.trim() === '') {
                    if ($listEl) addClass($listEl, 'hidden');
                    store.setCurKeyword('');
                } else {
                    if ($listEl) removeClass($listEl, 'hidden');
                    store.setCurKeyword(inputVal);
                }

                const items = await getItems(inputVal);

                store.setAllItems(items);

                init();
            })
        );
    }
};

export const listMenuHandler = () => {
    const $searchInput = selectElement(document, '.el_search__input');
    const $itemList = selectAllElements(document, '.el_list__item');
    const listLen = $itemList.length;

    let curIdx = 0;

    $searchInput?.addEventListener('keydown', (e) => {
        const { key } = <KeyboardEvent>e;

        if (key === 'ArrowDown') {
            curIdx += 1;
            if (curIdx >= listLen) curIdx = 0;
            moveFocus(curIdx, $itemList);
        } else if (key === 'ArrowUp') {
            curIdx -= 1;
            if (curIdx < 0) curIdx = listLen - 1;
            moveFocus(curIdx, $itemList);
        }
    });
};

export const focusHandler = () => {
    const $searchInput = selectElement(document, '.el_search__input');
    const $listEl = selectElement(document, '.bl_list');
    const inputVal = (<HTMLInputElement>$searchInput)?.value;

    if ($listEl) {
        $searchInput?.addEventListener('focusin', () => {
            if (inputVal.trim() !== '') removeClass($listEl, 'hidden');
        });

        $searchInput?.addEventListener('focusout', () => {
            addClass($listEl, 'hidden');
        });
    }
};
