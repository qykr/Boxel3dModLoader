export class ElementBuilder {
    #element: HTMLElement;

    public constructor(tagName: keyof HTMLElementTagNameMap) {
        this.#element = document.createElement(tagName);
    }

    public setAttributes(attributes: Record<string, string>): ElementBuilder {
        for (const [k, v] of Object.entries(attributes)) {
            this.#element.setAttribute(k, v);
        }
        return this;
    }

    public setChildren(children: HTMLElement[]): ElementBuilder {
        children.forEach(child => this.#element.appendChild(child));
        return this;
    }

    public setInnerHtml(innerHTML: string): ElementBuilder {
        this.#element.innerHTML += innerHTML;
        return this;
    }

    public build() {
        return this.#element;
    }
}

export function createElement(
    tagName: keyof HTMLElementTagNameMap,
    attributes: Record<string, string> = {},
    children: HTMLElement[] = [],
    innerHTML: string = ""
) {
    return new ElementBuilder(tagName)
        .setAttributes(attributes)
        .setInnerHtml(innerHTML)
        .setChildren(children)
        .build();
}