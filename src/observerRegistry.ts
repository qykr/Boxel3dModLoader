import { AppState } from "./types/game";

class ObserverRegistry {
    #register: Record<string, MutationObserver> = {};

    constructor() {}
    
    public addObserver(name: string, observer: MutationObserver) {
        this.#register[name] = observer;
    }

    public delete(name: string) {
        this.disconnect(name);
        delete this.#register[name];
    }

    public disconnect(name: string) {
        const observer = this.#register[name];
        if (!observer) {
            console.warn(`Observer ${name} does not exist`);
            return;
        }
        observer.disconnect();
    }

    public takeRecords(name: string): MutationRecord[] {
        return this.#register[name].takeRecords();
    }
}

export const observerRegistry = new ObserverRegistry();