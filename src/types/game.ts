import type { Group, HemisphereLight, PerspectiveCamera, Scene } from "three";
import type { Engine, World } from "matter-js";

import { BoxelModLoader } from "../bml";

export interface BoxelEngine extends Engine {
    detector: any;
    events: {
        beforeUpdate: any[];
        afterUpdate: any[];
    };
    grid: any;
}

export interface App {
    BOX_SIZE: number;
    animation: any;
    assets: any;
    background: Group;
    camera: PerspectiveCamera;
    canvas: HTMLCanvasElement;
    collision: any;
    delta: number;
    document: HTMLDocument;
    engine: BoxelEngine;
    fov: number;
    graphics: any; // figure out later
    interval: any;
    level: Group;
    levelHistory: any;
    levelEditor: any;
    light: HemisphereLight;
    motion: boolean;
    multiplayer: any;
    network: any;
    now: number;
    play: boolean;
    player: any; // combination of three, matter, custom stuff
    scene: Scene;
    screenHeight: number;
    screenWidth: number;
    state: AppState;
    storage: any;
    then: number;
    timer: any;
    world: World;
}

export enum AppState {
  Home = "home",
  LevelPicker = "level-picker",
  LevelManager = "level-manager",
  LevelEditor = "level-editor",
  Campaign = "campaign",
  Skins = "skins"
}

declare global {
    const app: App;
    interface Window {
        bml: BoxelModLoader;
        app: App;
    }
}