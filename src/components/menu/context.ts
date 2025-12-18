import { createContext } from 'svelte';

export type MenuContext = {
    selected: string,
    get close(): void
};

export const [getMenuContext, setMenuContext] = createContext<MenuContext>();