import { posMod } from "./math";

/**
 * Gets a positional anchor.
 * Useful for inserting before or after.
 * 
 * @param element The element to operate in
 * @param position The index of the anchor. Supports negative indexing.
 * @param selector Selector to filter
 * @returns 
 */
export function getAnchor(
    element: HTMLElement,
    position: number,
    selector: string | null = null
) {
    const items = selector ? element.querySelectorAll(selector) : element.children;
    const truePos = posMod(position, items.length + 1);
    return truePos < items.length ? items[truePos] : null;
}

/**
 * Injects an element in another with position
 * 
 * @param element The element to inject
 * @param parent The element to inject within
 * @param position The index of the anchor. Supports negative indexing.
 * @param selector Selector to filter
 */
export function injectPosition(
    element: HTMLElement,
    parent: HTMLElement,
    position: number,
    selector: string | null = null,
) {
    const anchor = getAnchor(parent, position, selector);
    anchor ? parent.insertBefore(element, anchor) : parent.appendChild(element)
}