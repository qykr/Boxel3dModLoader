import { satisfies } from "semver";

import { BoxelMod } from "./boxelMod";
import { hookRegistry } from "./hookRegistry";
import { observerRegistry } from "./observerRegistry";
import { gameApi } from "./gameModifier";
import { listenerRegistry } from "./listenerRegistry";

export interface BMLManifest {    
    /** Loader human-readable name */
    name: string;

    /** Loader version */
    version: string;

    /** Boxel version compatibility */
    boxelCompat: string;

    /** Description of the loader */
    description?: string;

    /** Author or team */
    author?: string;

    /** Supported mod format / manifest version */
    modManifestVersion?: string;
}

export enum BMLState {
    Unloaded = "unloaded",
    PreInit = "pre-init",
    Init = "init",
    PostInit = "post-init",
    Loaded = "loaded"
}

/**
 * Singleton class that manages all mods for Boxel 3D
 */
export class BoxelModLoader {
    state: BMLState = BMLState.Unloaded;
    boxelVersion: string;
    manifest: BMLManifest = {
        name: "Boxel Mod Loader",
        version: "0.0.1",
        boxelCompat: "^2.8.0",
        description: "A mod loader for Boxel 3D",
        author: "qykr",
        modManifestVersion: "0.0.1"
    };
    #mods: BoxelMod[] = [];

    hooks = hookRegistry;
    listeners = listenerRegistry;
    observers = observerRegistry;
    game = gameApi;

    static #instance: BoxelModLoader | null = null;

    private constructor() {
        this.getBoxelVersion()
            .then(() => {
                console.log("Boxel v" + this.boxelVersion);
                console.log("Boxel Mod Loader v" + this.manifest.version);
                // TODO: insert fetch mods from local storage here
                this.state = BMLState.PreInit;
                for (const mod of this.#mods) {
                    mod.preInit(this);
                }
                this.state = BMLState.Init;
                for (const mod of this.#mods) {
                    mod.init(this);
                }
                this.state = BMLState.PostInit;
                for (const mod of this.#mods) {
                    mod.postInit(this);
                }
            });
    }

    public static get instance(): BoxelModLoader {
        if (this.#instance === null) {
            this.#instance = new BoxelModLoader();
        }
        return this.#instance;
    }

    public addMod(mod: BoxelMod) {
        this.#mods.push(mod);
    }

    public async getBoxelVersion(): Promise<string> {
        if (this.boxelVersion !== undefined) return this.boxelVersion;

        const manifest = await (await fetch("../manifest.json")).json();
        this.boxelVersion = manifest["version"];
        const compatible = satisfies(this.boxelVersion, this.manifest.boxelCompat);
        if (!compatible) throw new Error("Boxel v" + this.boxelVersion + " is not compatible with mod loader");
        // TODO: check the latest version compatible and tell user to upgrade
        return this.boxelVersion;
    }
}