<script lang="ts">
  let {
    title = '',
    label = '',
    tag = '',
    subtitle = '',
    thumbnailUrl = '',
    onclick = () => {}
  }: {
    title?: string;
    label?: string;
    tag?: string;
    subtitle?: string;
    thumbnailUrl?: string;
    onclick?: (event: MouseEvent) => void;
  } = $props();
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="item" {onclick}>
  <div class="thumbnail">
    {#if thumbnailUrl}
      <img src={thumbnailUrl} alt={title} />
    {/if}

    {#if label}
      <div class="label">{label}</div>
    {/if}

    {#if tag}
      <div class="tag"><div>{tag}</div></div>
    {/if}

    {#if title}
      <div class="title">{title}</div>
    {/if}
  </div>

  {#if subtitle}
    <div class="subtitle"><span>{subtitle}</span></div>
  {/if}
</div>