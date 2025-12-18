<script lang="ts">
    import { type Snippet } from 'svelte';
    import { getMenuContext } from './context';

    let { id, children }: {
        id: string,
        children?: Snippet
    } = $props();

    const ctx = getMenuContext();
</script>

{#if ctx.selected === id}
    <div class="panel">
        {@render children()}
    </div>
{/if}