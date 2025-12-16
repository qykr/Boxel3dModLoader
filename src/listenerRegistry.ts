import { BoxelModLoader } from "./bml";
import { AppState } from "./types/game";

/**
 * Organizes listeners better
 */
export interface Listener {
    type: string,
    listener: EventListenerOrEventListenerObject
}

/**
 * Singleton registry for all listeners for the mod loader
 */
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

    /**
     * Gets a listener from the registry
     * 
     * @param id The unique ID of the listener
     * @returns The type and callback
     */
    public get(id: string): Listener {
        return this.#register[id];
    }
    
    public addListener(
        id: string, type: string,
        listener: EventListenerOrEventListenerObject
    ) {
        this.#register[id] = { type, listener };
        window.addEventListener(type, listener);
    }

    public delete(id: string) {
        this.disconnect(id);
        delete this.#register[id];
    }

    public disconnect(id: string) {
        const listener = this.#register[id];
        if (!listener) {
            console.warn(`Listener ${id} does not exist`);
            return;
        }
        window.removeEventListener(listener.type, listener.listener);
    }
}

export const listenerRegistry = new ListenerRegistry();