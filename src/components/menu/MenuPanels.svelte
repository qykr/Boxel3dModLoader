<script lang="ts">
    import { type Snippet } from "svelte";
    import { getMenuContext } from "./context";

    let { children }: { children?: Snippet } = $props();

    const ctx = getMenuContext();
</script>

<div class="content compact">
    {@render children()}
    <!-- svelte-ignore a11y_missing_attribute -->
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <a class="close" title="Close" onclick={ctx.close}>
        <span class="material-symbols-rounded">
            close
        </span>
    </a>
</div>

<style>
    .content.compact {
        width: 30em !important;
    }
</style>