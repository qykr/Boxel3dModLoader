import { BoxelModLoader } from "./bml";
import { AppState } from "./types/game";

export type ModManifest = {
    /** Unique mod identifier */
    id: string;

    /** Mod human-readable name to display */
    name: string;

    /** Mod version */
    version: string;

    /** Mod author */
    author?: string;

    /** Short description for card */
    shortDesc?: string;
    
    /** Long description for info */
    longDesc?: string;

    /**
     * Boxel version compatibility
     * Optional, defaults to any
     */
    boxelVersion?: string;

    /**
     * Mod loader version compatibility
     * Optional, defaults to any
     */
    bmlVersion?: string;

    /** Mod icon source */
    iconSrc?: string;

    /** Other mod dependencies */
    dependencies?: Array<string>;

    /** Mod entry point */
    mainFile?: string;
};

export interface BoxelMod {
    manifest: ModManifest;
    isEnabled: boolean;
    isLoaded: boolean;

    /**
     * Run before any mods load in.
     * For example, register function signatures here.
     * @param bml BoxelModLoader instance
     */
    preInit(bml: BoxelModLoader): void;

    /**
     * Main mod function. Runs when the mod is enabled.
     * @param bml BoxelModLoader instance
     */
    init(bml: BoxelModLoader): void;

    /**
     * Runs after all mods have loaded.
     * @param bml BoxelModLoader instance
     */
    postInit(bml: BoxelModLoader): void;

    /**
     * Runs when the app state changes.
     * @param state New app state
     */
    onStateChange(state: AppState): void;
}