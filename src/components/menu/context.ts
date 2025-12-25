import { createContext } from 'svelte';

export type MenuContext = {
    selected: string,
    readonly close: (event?: MouseEvent) => void
};

export const [getMenuContext, setMenuContext] = createContext<MenuContext>();