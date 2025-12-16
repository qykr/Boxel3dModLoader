import { HookGroup } from "./hookRegistry";

/**
 * Quality of life improvements on the built in game modding API
 */
class GameApi {
    #beforeUpdate: HookGroup = new HookGroup();
    #afterUpdate: HookGroup = new HookGroup();

    constructor() {}

    get player() { return app.player; }
    get level() { return app.level; }
    get engine() { return app.engine; }
    get world() { return app.engine.world; }
    get gravity() { return app.engine.gravity; }
    get velocity() { return app.player.body.velocity; }
    get isDead() { return app.player.isFrozen(); }
    get timer() { return app.timer.toString(); }

    /**
     * Called before each game update
     * 
     * @param id Id of the hook
     * @param fn Callback to register
     * @param priority Higher priority means it comes earlier
     */
    public addBeforeUpdate(id: string, fn: () => void, priority: number = 0) {
        this.#beforeUpdate.addHook(id, fn, priority);
        app.engine.events.beforeUpdate = this.#beforeUpdate.toFnArray();
    }

    /**
     * Called after each game update
     * 
     * @param id Id of the hook
     * @param fn Callback to register
     * @param priority Higher priority means it comes earlier
     */
    public addAfterUpdate(id: string, fn: () => void, priority: number = 0) {
        this.#afterUpdate.addHook(id, fn, priority);
        app.engine.events.afterUpdate = this.#afterUpdate.toFnArray();
    }

    /**
     * Removes a before update hook
     * 
     * @param id Id of the hook
     */
    public removeBeforeUpdate(id: string) {
        this.#beforeUpdate.removeHook(id);
        app.engine.events.beforeUpdate = this.#beforeUpdate.toFnArray();
    }

    /**
     * Removes an after update hook
     * 
     * @param id Id of the hook
     */
    public removeAfterUpdate(id: string) {
        this.#afterUpdate.removeHook(id);
        app.engine.events.afterUpdate = this.#afterUpdate.toFnArray();
    }

    public singleBeforeUpdateHook(id: string, fn: () => void, priority: number = 0) {
        this.addBeforeUpdate(id, () => {
            fn();
            this.#beforeUpdate.removeHook(id); // prevent beforeUpdate refresh
        }, priority);
    }

    public singleAfterUpdateHook(id: string, fn: () => void, priority: number = 0) {
        this.addAfterUpdate(id, () => {
            fn();
            this.#afterUpdate.removeHook(id); //prevent afterUpdate refresh
        }, priority);
    }
}

export const gameApi = new GameApi();