import { listenerRegistry } from "../listenerRegistry";
import { posMod } from "../utils/math";
import { createElement } from "./elementBuilder";

export class CarouselItem {
    title?: string;
    label?: string;
    tag?: string;
    subtitle?: string;
    thumbnailUrl?: string;
    callback?: (event: PointerEvent) => void;

    /**
     * Turns this object into an HTMLElement
     * 
     * @returns The built HTMLElement
     */
    public toHtmlElement(): HTMLElement {
        const element = createElement("div", { class: "item" }, [
            createElement("div", { class: "thumbnail" }, [
                this.thumbnailUrl ? createElement("img", { src: this.thumbnailUrl }) : undefined,
                this.label ? createElement("div", { class: "label" }, [], this.label) : undefined,
                this.tag ? createElement("div", { class: "tag" }, [], `<div>${this.tag}</div>`) : undefined,
                this.title ? createElement("div", { class: "title" }, [], this.title) : undefined,
            ].filter(Boolean)),
            this.subtitle ? createElement("div", { class: "subtitle" }, [], `<span>${this.subtitle}</span>`) : undefined
        ].filter(Boolean));
        
        element.onclick = this.callback;
        return element;
    }

    /**
     * Injects this carousel item into a carousel
     * 
     * @param carousel The carousel element to inject into
     * @param position The number position (supports negative indexing)
     */
    public inject(carousel: HTMLElement, position: number) {
        if (carousel == null) return;
        if (carousel.className != "carousel") return;
        const items = carousel.querySelectorAll('.item');
        const truePosition = posMod(position, items.length + 1);
        if (truePosition < items.length) {
            carousel.insertBefore(
                this.toHtmlElement(), items[position]
            );
        } else carousel.appendChild(this.toHtmlElement());
    }

    /**
     * Builder class for CarouselItem
     */
    static Builder = class {
        private item = new CarouselItem();

        setTitle(title: string) { this.item.title = title; return this; }
        setLabel(label: string) { this.item.label = label; return this; }
        setTag(tag: string) { this.item.tag = tag; return this; }
        setSubtitle(subtitle: string) { this.item.subtitle = subtitle; return this; }
        setThumbnail(url: string) { this.item.thumbnailUrl = url; return this; }
        setCallback(callback: (event: PointerEvent) => void) { this.item.callback = callback; return this; }

        build() { return this.item; }
    }
}