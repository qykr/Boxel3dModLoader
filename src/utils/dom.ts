import { posMod } from "./math";

export function getAnchor(
    element: HTMLElement,
    position: number,
    selector: string | null = null
) {
    const items = selector ? element.querySelectorAll(selector) : element.children;
    const truePos = posMod(position, items.length + 1);
    return truePos < items.length ? items[truePos] : null;
}

export function injectPosition(
    element: HTMLElement,
    parent: HTMLElement,
    position: number,
    selector: string | null = null,
) {
    const anchor = getAnchor(parent, position, selector);
    anchor ? parent.insertBefore(element, anchor) : parent.appendChild(element)
}