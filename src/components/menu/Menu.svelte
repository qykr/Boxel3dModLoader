<script lang="ts">
    import { portal } from "svelte-portal";
    import { type Snippet } from 'svelte';
    import { setMenuContext } from "./context";

    let {
        width = "90%",
        portalTarget = ".ui-bubble",
        toggleButtonId,
        defaultTab = "",
        closeCustom,
        children
    }: {
        width?: string,
        portalTarget?: string,
        toggleButtonId?: string,
        defaultTab?: string,
        closeCustom?: (event: MouseEvent) => void,
        children?: Snippet
    } = $props();

    let isOpen = $state(false);
    // TODO: Find out how to rewrite ts
    $effect(() => {
        const button = document.getElementById(toggleButtonId);
        button.onclick = () => isOpen = true;
    });
    const close = $derived(
        closeCustom ? closeCustom : () => isOpen = false
    )

    let context = $state({
        selected: defaultTab,
        get close() { return close; }
    });
    setMenuContext(context);
</script>

{#if isOpen}
    <div use:portal={portalTarget} class="popup settings">
        <!-- svelte-ignore a11y_click_events_have_key_events -->
        <!-- svelte-ignore a11y_no_static_element_interactions -->
        <div class="background" onclick={() => isOpen = false}></div>
        <div class="container" style="width: {width}">
            {@render children()}
        </div>
    </div>
{/if}