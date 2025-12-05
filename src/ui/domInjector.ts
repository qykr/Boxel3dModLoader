import { AppState } from "../types/game";

class ObserverRegistry {
    #appEl = document.getElementById("app") as HTMLElement;
    #oldState: AppState | null = null;
    #register: Record<string, MutationObserver> = {};

    public addAppStateObserver(name: string, callback: MutationCallback) {
        if (!this.#appEl) throw new Error("App element not found");
        if (this.#register[name]) throw new Error("Observer already exists");

        const newCallback = (mutations, observer) => {
            const state = window.app.state;
            if (state === null || state === this.#oldState) return;
            this.#oldState = state;
            callback(mutations, observer);
        }

        const observer = new MutationObserver(newCallback);
        observer.observe(
            this.#appEl,
            { childList: true, subtree: true }
        );
        this.#register[name] = observer;
        return observer;
    }

    public remove(key: string) {
        const observer = this.#register[key];
        if (!observer) {
            console.warn(`Observer ${key} does not exist`);
            return;
        }
        observer.disconnect();
        delete this.#register[key];
    }

    public disconnect(key: string) {
        const observer = this.#register[key];
        if (!observer) throw new Error(`Observer ${key} not found`);
        observer.disconnect();
    }

    public takeRecords(key: string): MutationRecord[] {
        return this.#register[key].takeRecords();
    }
}

const observerRegistry = new ObserverRegistry();

observerRegistry.addAppStateObserver("ids", () => {
    const selectorFrom: Partial<Record<AppState, string>> = {
        [AppState.Home]: ".title",
        [AppState.LevelPicker]: ".label",
        [AppState.Skins]: ".title"
    };
    const slugify = (str: string) => str.toLowerCase().split(' ').join('-');

    const selector = selectorFrom[window.app.state];
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

observerRegistry.addAppStateObserver("logging", () => {
    console.log("State changed to", window.app.state);
});

export { observerRegistry };