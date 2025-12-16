export interface Hook<TArgs extends any[] = any[]> {
    id: string;
    fn: (...args: TArgs) => void;
    priority: number;
}

/**
 * A class to provide hook priorities, ids, and sorting
 */
export class HookGroup<TArgs extends any[] = any[]> {
    hooks: Map<string, Hook<TArgs>> = new Map();

    /**
     * Adds a hook to the group
     * 
     * @param id The unique ID of the hook
     * @param fn The hook function to call
     * @param priority Higher priority will be executed sooner
     */
    public addHook(id: string, fn: (...args: TArgs) => void, priority: number = 0) {
        this.hooks.set(id, { id: id, fn, priority });
    }

    /**
     * Removes a hook given its ID
     * 
     * @param id The unique ID of the hook 
     */
    public removeHook(id: string) {
        this.hooks.delete(id);
    }

    /**
     * Registers a hook that will only run once
     * 
     * @param id The unique ID of the hook
     * @param fn The hook function to call
     * @param priority Higher priority will be executed sooner
     */
    public addOneTimeHook(id: string, fn: (...args: TArgs) => void, priority: number = 0) {
        this.addHook(id, (...args: TArgs) => {
            fn(...args);
            this.removeHook(id);
        }, priority);
    }

    /**
     * Sorts the hooks by priority into an array
     * 
     * @returns The sorted array of hooks
     */
    public toFnArray(): ((...args: TArgs) => void)[] {
        return Array.from(this.hooks.values())
            .sort((a, b) => a.priority - b.priority)
            .map(hook => hook.fn);
    }
}

/**
 * Simple way to organize pre and post hooks
 */
export type FunctionHooks<TResult, TArgs extends any[] = any[]> = {
    pre: HookGroup<TArgs>;
    post: HookGroup<[TResult, ...TArgs]>;
}

/**
 * Singleton registry for all hooks for the mod loader
 */
class HookRegistry {
    #originals: WeakMap<Function, Function> = new Map();
    #hooks: WeakMap<Function, FunctionHooks<any, any[]>> = new Map();

    constructor() {}

    /**
     * Register a signature to ensure type safety for hooks. Optional.
     * @param obj Object containing the function
     * @param fnId Id of the function
     * @returns If the signature already exists
     */
    public registerSignature<TResult, TArgs extends any[]>(
        obj: any, fnId: string
    ) {
        if (this.#hooks.has(obj[fnId])) {
            console.warn(`Function ${fnId} already registered`);
            return false;
        }
        this.#hooks.set(obj[fnId], {
            pre: new HookGroup<TArgs>(),
            post: new HookGroup<[TResult, ...TArgs]>()
        });
        return true;
    }

    /**
     * Modifies a function with the hooks stored in the registry
     * 
     * @param obj Object containing the function
     * @param fnId The function id
     */
    public modifyFunction(obj: any, fnId: string) {
        const originalFn = this.#originals.get(obj[fnId]);
        const preHooks = this.#hooks.get(obj[fnId])?.pre.toFnArray();
        const postHooks = this.#hooks.get(obj[fnId])?.post.toFnArray();
        obj[fnId] = (...args: any[]) => {
            preHooks?.forEach(hook => hook(...args));
            const result = originalFn(...args);
            postHooks?.forEach(hook => hook(result, ...args));
        };
    }

    /**
     * Adds a hook before a function call
     * 
     * @param obj Object containing the function
     * @param fnId The function id
     * @param id The unique ID of the hook
     * @param hook The hook itself
     */
    public addPreHook(obj: any, fnId: string, id: string, hook: (...args: any[]) => void) {
        if (!this.#hooks.has(obj[fnId])) {
            this.#hooks.set(obj[fnId], {
                pre: new HookGroup<any[]>(),
                post: new HookGroup<any[]>()
            });
            this.#originals.set(obj[fnId], obj[fnId]);
        }
        this.#hooks.get(obj[fnId])?.pre.addHook(id, hook);
        this.modifyFunction(obj, fnId);
    }

    /**
     * Adds a hook after a function call
     * 
     * @param obj Object containing the function
     * @param fnId The function id
     * @param id The unique ID of the hook
     * @param hook The hook itself
     */
    public addPostHook(obj: any, fnId: string, id: string, hook: (...args: any[]) => void) {
        if (!this.#hooks.has(obj[fnId])) {
            this.#hooks.set(obj[fnId], {
                pre: new HookGroup<any[]>(),
                post: new HookGroup<any[]>()
            });
        }
        this.#hooks.get(obj[fnId])?.post.addHook(id, hook);
        this.modifyFunction(obj, fnId);
    }

    /**
     * Removes a hook before a function call
     * 
     * @param obj Object containing the function
     * @param fnId The function id
     * @param id The unique ID of the hook
     */
    public removePreHook(obj: any, fnId: string, id: string) {
        this.#hooks.get(obj[fnId])?.pre.removeHook(id);
    }

    /**
     * Removes a hook after a function call
     * 
     * @param obj Object containing the function
     * @param fnId The function id
     * @param id The unique ID of the hook
     */
    public removePostHook(obj: any, fnId: string, id: string) {
        this.#hooks.get(obj[fnId])?.post.removeHook(id);
    }
}

export const hookRegistry = new HookRegistry();