/**
 * Singleton registry for all observers for the mod loader
 */
class ObserverRegistry {
    #register: Record<string, MutationObserver> = {};

    constructor() {}

    /**
     * Gets a MutationObserver from the registry
     * 
     * @param id The unique ID of the observer
     * @returns The requested MutationObserver
     */
    public get(id: string): MutationObserver {
        return this.#register[id]
    }

        /**
     * Registers an observer
     * 
     * @param id The unique ID of the observer
     * @param observer The MutationObserver object
     */
    public addObserver(id: string, observer: MutationObserver) {
        this.#register[id] = observer;
    }

    /**
     * Disconnects and deletes an observer from the registry
     * 
     * @param id The unique ID of the observer
     */
    public delete(id: string) {
        this.disconnect(id);
        delete this.#register[id];
    }

    /**
     * Disconnect an observer but keep it registered
     * 
     * @param id The unique ID of the observer
     */
    public disconnect(id: string) {
        const observer = this.#register[id];
        if (!observer) {
            console.warn(`Observer ${id} does not exist`);
            return;
        }
        observer.disconnect();
    }
}

export const observerRegistry = new ObserverRegistry();