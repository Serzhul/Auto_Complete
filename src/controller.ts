import { fetch, helpers } from './utils/index.js';
import { ItemStore, NodeType } from './types/index.js';
import { init } from './app.js';

const { debounce, selectElement, selectAllElements, removeClass, addClass } =
    helpers;
const { getItems } = fetch;

let debounceDelay = 600;

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
    const $clearIcon = selectElement(document, '.el_icon__clear');
    const $listEl = selectElement(document, '.bl_list');

    const curKeyword = store.getCurKeyword();

    if ($clearIcon && curKeyword === '') addClass($clearIcon, 'hidden');

    if ($searchInput) {
        (<HTMLElement>$searchInput).focus();

        (<HTMLInputElement>$searchInput).value = '';
        (<HTMLInputElement>$searchInput).value = curKeyword;

        $searchInput?.addEventListener(
            'input',
            debounce(async (e: InputEvent) => {
                const inputVal = (<HTMLInputElement>e.target)?.value;

                if (inputVal.trim() === '') {
                    if ($listEl) addClass($listEl, 'hidden');
                    store.setCurKeyword('');
                } else {
                    if ($listEl) removeClass($listEl, 'hidden');
                    if ($clearIcon) removeClass($clearIcon, 'hidden');
                    store.setCurKeyword(inputVal);
                }

                const items = await getItems(inputVal);

                store.setAllItems(items);

                init();
            }, debounceDelay)
        );
    }
};

export const listMenuHandler = () => {
    const $searchInput = selectElement(document, '.el_search__input');
    const $itemList = selectAllElements(document, '.el_list__item');
    const $clearIcon = selectElement(document, '.el_icon__clear');

    const listLen = $itemList.length;

    let curIdx = 0;

    $searchInput?.addEventListener('keydown', (e) => {
        const { key } = <KeyboardEvent>e;

        const inputVal = (<HTMLInputElement>e.target)?.value;

        if (inputVal.trim() === '') {
            if ($clearIcon) addClass($clearIcon, 'hidden');
        } else {
            if ($clearIcon) removeClass($clearIcon, 'hidden');
        }

        if (key === 'ArrowDown') {
            moveFocus(curIdx, $itemList);
            curIdx += 1;
            if (curIdx >= listLen) curIdx = 0;
        } else if (key === 'ArrowUp') {
            e.preventDefault();
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
