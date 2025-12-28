<script lang="ts">
    import { portal } from "svelte-portal";
    import { type Snippet } from 'svelte';
    import { setMenuContext } from "./context";

    let {
        portalTarget = ".ui-bubble",
        toggleButtonId,
        width = "30em",
        closeCustom,
        children
    }: {
        portalTarget?: string,
        toggleButtonId?: string,
        width?: string,
        closeCustom?: (event: MouseEvent) => void,
        children?: Snippet
    } = $props();

    let isOpen = $state(false);
    $effect(() => {
        const button = document.getElementById(toggleButtonId);
        button.onclick = () => isOpen = true;
    });
    const close = $derived(
        closeCustom ? closeCustom : () => isOpen = false
    )
</script>

{#if isOpen}
    <div use:portal={portalTarget} class="popup settings">
        <!-- svelte-ignore a11y_click_events_have_key_events -->
        <!-- svelte-ignore a11y_no_static_element_interactions -->
        <div class="background" onclick={close}></div>
        <div class="container">
            <div class="content compact" style="width: {width}">
                <div class="panel">
                    {@render children()}
                </div>
                <!-- svelte-ignore a11y_missing_attribute -->
                <!-- svelte-ignore a11y_click_events_have_key_events -->
                <!-- svelte-ignore a11y_no_static_element_interactions -->
                <a class="close" title="Close" onclick={close}>
                    <span class="material-symbols-rounded">
                        close
                    </span>
                </a>
            </div>
        </div>
    </div>
{/if}