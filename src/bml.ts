import { satisfies } from "semver";

import { BoxelMod } from "./boxelMod";
import { observerRegistry } from "./ui/observerRegistry";

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


/**
 * Singleton class that manages all mods for Boxel 3D
 */
export class BoxelModLoader {
    isLoaded: boolean = false;
    boxelVersion: string;
    manifest: BMLManifest = {
        name: "Boxel Mod Loader",
        version: "0.0.1",
        boxelCompat: "^2.8.0",
        description: "A mod loader for Boxel 3D",
        author: "qykr",
        modManifestVersion: "0.0.1"
    };
    observerRegistry = observerRegistry;
    mods: BoxelMod[] = [];

    static #instance: BoxelModLoader | null = null;

    private constructor() {
        this.getBoxelVersion().then(() => {
            this.isLoaded = true;
            console.log("Boxel v" + this.boxelVersion);
            console.log("Boxel Mod Loader v" + this.manifest.version);
        });
    }

    public static async getInstance(): Promise<BoxelModLoader> {
        if (this.#instance === null) {
            this.#instance = new BoxelModLoader();
        }
        return this.#instance;
    }

    public addMod(mod: BoxelMod) {
        this.mods.push(mod);
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

    // TODO: hook stacking and storage, probably need a registry
    public registerPreHook(
        obj: any,
        fnName: string,
        preFn: (...args: any[]) => void
    ) {
        const original = obj[fnName];
        obj[fnName] = function (...args: any[]) {
            preFn(...args)
            return original.apply(this, args);
        };
    }

    public registerPostHook(
        obj: any,
        fnName: string,
        after: (result: any, ...args: any[]) => void
    ) {
        const original = obj[fnName];
        obj[fnName] = function (...args: any[]) {
            const result = original.apply(this, args);
            after(result, ...args);
            return result;
        };
    }
}