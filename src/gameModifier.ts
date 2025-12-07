import { HookGroup } from "./hookRegistry";

class GameApi {
    beforeUpdate: HookGroup = new HookGroup();
    afterUpdate: HookGroup = new HookGroup();

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
     * @param name Name of the hook
     * @param fn Callback to register
     * @param priority Higher priority means it comes earlier
     */
    public addBeforeUpdate(name: string, fn: () => void, priority: number = 0) {
        this.beforeUpdate.addHook(name, fn, priority);
        app.engine.events.beforeUpdate = this.beforeUpdate.toFnArray();
    }

    /**
     * Called after each game update
     * 
     * @param name Name of the hook
     * @param fn Callback to register
     * @param priority Higher priority means it comes earlier
     */
    public addAfterUpdate(name: string, fn: () => void, priority: number = 0) {
        this.afterUpdate.addHook(name, fn, priority);
        app.engine.events.afterUpdate = this.afterUpdate.toFnArray();
    }

    /**
     * Removes a before update hook
     * 
     * @param name Name of the hook
     */
    public removeBeforeUpdate(name: string) {
        this.beforeUpdate.removeHook(name);
        app.engine.events.beforeUpdate = this.beforeUpdate.toFnArray();
    }

    /**
     * Removes an after update hook
     * 
     * @param name Name of the hook
     */
    public removeAfterUpdate(name: string) {
        this.afterUpdate.removeHook(name);
        app.engine.events.afterUpdate = this.afterUpdate.toFnArray();
    }

    public singleBeforeUpdateHook(name: string, fn: () => void, priority: number = 0) {
        this.addBeforeUpdate(name, () => {
            fn();
            this.beforeUpdate.removeHook(name); // prevent beforeUpdate refresh
        }, priority);
    }

    public singleAfterUpdateHook(name: string, fn: () => void, priority: number = 0) {
        this.addAfterUpdate(name, () => {
            fn();
            this.afterUpdate.removeHook(name); //prevent afterUpdate refresh
        }, priority);
    }
}

export const gameApi = new GameApi();