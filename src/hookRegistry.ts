export interface Hook<TArgs extends any[] = any[]> {
    name: string;
    fn: (...args: TArgs) => void;
    priority: number;
}

export class HookGroup<TArgs extends any[] = any[]> {
    hooks: Map<string, Hook<TArgs>> = new Map();

    public addHook(name: string, fn: (...args: TArgs) => void, priority: number = 0) {
        this.hooks.set(name, { name, fn, priority });
    }

    public removeHook(name: string) {
        this.hooks.delete(name);
    }

    public toFnArray() {
        return Array.from(this.hooks.values())
            .sort((a, b) => a.priority - b.priority)
            .map(hook => hook.fn);
    }
}

export type FunctionHooks<TResult, TArgs extends any[] = any[]> = {
    pre: HookGroup<TArgs>;
    post: HookGroup<[TResult, ...TArgs]>;
}

class HookRegistry {
    #originals: WeakMap<Function, Function> = new Map();
    #hooks: WeakMap<Function, FunctionHooks<any, any[]>> = new Map();

    constructor() {}

    /**
     * Register a signature to ensure type safety for hooks. Optional.
     * @param obj Object containing the function
     * @param fnName Name of the function
     * @returns True if the function was registered, false if it already exists
     */
    public registerSignature<TResult, TArgs extends any[]>(
        obj: any, fnName: string
    ) {
        if (this.#hooks.has(obj[fnName])) {
            console.warn(`Function ${fnName} already registered`);
            return false;
        }
        this.#hooks.set(obj[fnName], {
            pre: new HookGroup<TArgs>(),
            post: new HookGroup<[TResult, ...TArgs]>()
        });
        return true;
    }

    public modifyFunction(obj: any, fnName: string) {
        const originalFn = this.#originals.get(obj[fnName]);
        const preHooks = this.#hooks.get(obj[fnName])?.pre.toFnArray();
        const postHooks = this.#hooks.get(obj[fnName])?.post.toFnArray();
        obj[fnName] = (...args: any[]) => {
            preHooks?.forEach(hook => hook(...args));
            const result = originalFn(...args);
            postHooks?.forEach(hook => hook(result, ...args));
        };
    }

    public addPreHook(obj: any, fnName: string, hookName: string, fn: (...args: any[]) => void) {
        if (!this.#hooks.has(obj[fnName])) {
            this.#hooks.set(obj[fnName], {
                pre: new HookGroup<any[]>(),
                post: new HookGroup<any[]>()
            });
            this.#originals.set(obj[fnName], obj[fnName]);
        }
        this.#hooks.get(obj[fnName])?.pre.addHook(hookName, fn);
        this.modifyFunction(obj, fnName);
    }

    public addPostHook(obj: any, fnName: string, hookName: string, fn: (...args: any[]) => void) {
        if (!this.#hooks.has(obj[fnName])) {
            this.#hooks.set(obj[fnName], {
                pre: new HookGroup<any[]>(),
                post: new HookGroup<any[]>()
            });
        }
        this.#hooks.get(obj[fnName])?.post.addHook(hookName, fn);
        this.modifyFunction(obj, fnName);
    }

    public removePreHook(obj: any, fnName: string, hookName: string) {
        this.#hooks.get(obj[fnName])?.pre.removeHook(hookName);
    }

    public removePostHook(obj: any, fnName: string, hookName: string) {
        this.#hooks.get(obj[fnName])?.post.removeHook(hookName);
    }
}

export const hookRegistry = new HookRegistry();