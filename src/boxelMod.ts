import { BoxelModLoader } from "./bml";
import { AppState } from "./types/game";

export interface ModManifest {
    /** Unique mod identifier */
    id: string;

    /** Mod human-readable name to display */
    name: string;

    /** Mod version */
    version: string;

    /** Mod author */
    author?: string;

    /** Mod description */
    description?: string;

    /**
     * Boxel version compatibility
     * Optional, defaults to any
     */
    boxelCompat?: string;

    /**
     * Mod loader version compatibility
     * Optional, defaults to any
     */
    bmlCompat?: string;

    /** Mod icon source */
    iconSrc?: string;
}

export interface BoxelMod {
    manifest: ModManifest;
    isEnabled: boolean;
    isLoaded: boolean;

    init(bml: BoxelModLoader): void;
    onStateChange(state: AppState): void;
}