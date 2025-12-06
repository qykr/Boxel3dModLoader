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

    public addBeforeUpdateHook(name: string, fn: () => void, priority: number = 0) {
        this.beforeUpdate.addHook(name, fn, priority);
        app.engine.events.beforeUpdate = this.beforeUpdate.toFnArray();
    }

    public addAfterUpdateHook(name: string, fn: () => void, priority: number = 0) {
        this.afterUpdate.addHook(name, fn, priority);
        app.engine.events.afterUpdate = this.afterUpdate.toFnArray();
    }

    public removeBeforeUpdateHook(name: string) {
        this.beforeUpdate.removeHook(name);
        app.engine.events.beforeUpdate = this.beforeUpdate.toFnArray();
    }

    public removeAfterUpdateHook(name: string) {
        this.afterUpdate.removeHook(name);
        app.engine.events.afterUpdate = this.afterUpdate.toFnArray();
    }

    public singleBeforeUpdateHook(name: string, fn: () => void, priority: number = 0) {
        this.addBeforeUpdateHook(name, () => {
            fn();
            this.beforeUpdate.removeHook(name); // prevent beforeUpdate refresh
        }, priority);
    }

    public singleAfterUpdateHook(name: string, fn: () => void, priority: number = 0) {
        this.addAfterUpdateHook(name, () => {
            fn();
            this.afterUpdate.removeHook(name); //prevent afterUpdate refresh
        }, priority);
    }
}

export const gameApi = new GameApi();