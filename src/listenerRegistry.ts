import { BoxelModLoader } from "./bml";
import { AppState } from "./types/game";

export interface Listener {
    type: string,
    listener: EventListenerOrEventListenerObject
}

class ListenerRegistry {
    #oldState: AppState | null = null;
    #register: Record<string, Listener> = {};

    constructor() {
        window.addEventListener("pageMounted", () => {
            if (app.state === this.#oldState) return;
            this.#oldState = app.state;
            setTimeout(() => {
                window.dispatchEvent(new CustomEvent(
                    "appStateChange",
                    { detail: app.state}
                ));
            }, 50); // To wait for page load
        });
    }
    
    public addListener(
        name: string, type: string,
        listener: EventListenerOrEventListenerObject
    ) {
        this.#register[name] = { type, listener };
        window.addEventListener(type, listener);
    }

    public delete(name: string) {
        this.disconnect(name);
        delete this.#register[name];
    }

    public disconnect(name: string) {
        const listener = this.#register[name];
        if (!listener) {
            console.warn(`Listener ${name} does not exist`);
            return;
        }
        window.removeEventListener(listener.type, listener.listener);
    }
}

export const listenerRegistry = new ListenerRegistry();

listenerRegistry.addListener("injectIds", "appStateChange", () => {
    const selectorFrom: Partial<Record<AppState, string>> = {
        [AppState.Home]: ".title",
        [AppState.LevelPicker]: ".label",
        [AppState.Skins]: ".title"
    };
    const slugify = (str: string) => str.toLowerCase().split(' ').join('-');

    const selector = selectorFrom[app.state];
    if (!selector) return;

    const items = Array.from(
        document.querySelectorAll<HTMLElement>(".carousel .item")
    );
    for (const item of items) {
        const nameElement = item.querySelector<HTMLElement>(selector);
        if (!nameElement) continue;

        const id = slugify(nameElement.innerText);
        item.setAttribute("data-bml-id", id);
    }
})

listenerRegistry.addListener("logging", "appStateChange", () => {
    console.log("State changed to", app.state);
});

listenerRegistry.addListener("modCallback", "appStateChange", () => {
    for (const mod of BoxelModLoader.instance.mods) {
        mod.onStateChange(app.state);
    }
});