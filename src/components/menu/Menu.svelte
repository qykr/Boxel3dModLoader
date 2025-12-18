<script lang="ts">
    import { portal } from "svelte-portal";
    import { type Snippet } from 'svelte';
    import { setMenuContext } from "./context";

    let {
        portalTarget = ".ui-bubble",
        defaultTab = "",
        close = () => {},
        children
    }: {
        portalTarget?: string,
        defaultTab?: string,
        close?: (event: MouseEvent) => void,
        children?: Snippet
    } = $props();

    let context = $state({
        selected: defaultTab,
        get close() { return close; }
    });
    setMenuContext(context);
</script>

<div use:portal={portalTarget} id="mod-menu" class="popup">
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div class="background" onclick={close}></div>
    <div class="container">
        {@render children()}
    </div>
</div>