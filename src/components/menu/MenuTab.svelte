<script lang="ts">
    import { type Snippet } from 'svelte';
    import { getMenuContext } from './context';

    let { target, label, icon, children }: {
        target: string,
        label?: string,
        icon?: string,
        children?: Snippet
    } = $props();

    const ctx = getMenuContext();
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
    class="tab"
    class:selected={ctx.selected === target}
    onclick={() => ctx.selected = target}
>
    {#if children}
        {@render children()}
    {:else}
        {#if label}
            <!-- svelte-ignore a11y_label_has_associated_control -->
            <label>{label}</label>
        {/if}
        {#if icon}
            <span class="material-symbols-rounded">{icon}</span>
        {/if}
    {/if}
</div>