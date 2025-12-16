import { mount } from "svelte";

import { BoxelModLoader } from "../src/bml";
import { getAnchor } from "../src/utils/dom";
import { AppState } from "../src/types/game";
import ModMenu from "../src/components/ModMenu.svelte";

const bml = BoxelModLoader.instance;

bml.listeners.addListener("bml-button", "appStateChange", () => {
    if (app.state != "home") return;

    const carousel = document.querySelector(".carousel") as HTMLElement;
    mount(ModMenu, {
        target: carousel,
        anchor: getAnchor(carousel, 0, ".item")
    })
});

bml.listeners.addListener("injectIds", "appStateChange", () => {
    const selectorFrom: Partial<Record<AppState, string>> = {
        [AppState.Home]: ".title",
        [AppState.LevelPicker]: ".label",
        [AppState.Skins]: ".title"
    };
    const slugify = (str: string) => str.toLowerCase().split(' ').join('-');

    const selector = selectorFrom[app.state];
    if (!selector) return;

    const items = Array.from(
        document.querySelectorAll<HTMLElement>(".carousel .item")
    );
    for (const item of items) {
        const nameElement = item.querySelector<HTMLElement>(selector);
        if (!nameElement) continue;

        const id = slugify(nameElement.innerText);
        item.setAttribute("data-bml-id", id);
    }
})

bml.listeners.addListener("logging", "appStateChange", () => {
    console.log("State changed to", app.state);
});

bml.listeners.addListener("modCallback", "appStateChange", () => {
    for (const mod of BoxelModLoader.instance.mods) {
        mod.onStateChange(app.state);
    }
});