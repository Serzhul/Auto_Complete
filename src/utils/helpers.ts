import { NodeType } from '../types/index.js';

const debounce = (callback: Function, delayTime = 500) => {
    let timeout: ReturnType<typeof setTimeout>;

    return (...args: []) => {
        if (timeout) clearTimeout(timeout);

        timeout = setTimeout(() => {
            callback(...args);

            clearTimeout(timeout);
        }, delayTime);
    };
};

const selectElement = ($container: NodeType, selector: string) =>
    $container.querySelector(selector);

const selectAllElements = ($container: NodeType, selector: string) =>
    $container.querySelectorAll(selector);

const hasClass = (target: Element, className: string) =>
    target.classList.contains(className);

const removeClass = (target: Element, className: string) => {
    target.classList.remove(className);
};

const addClass = (target: Element, className: string) => {
    target.classList.add(className);
};

export default {
    debounce,
    selectElement,
    selectAllElements,
    hasClass,
    removeClass,
    addClass,
};
