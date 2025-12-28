<script lang="ts">
  let {
    id,
    title = '',
    label = '',
    href,
    tag = '',
    subtitle = '',
    thumbnailUrl = '',
    onclick = () => {}
  }: {
    id?: string,
    title?: string;
    label?: string;
    href?: string;
    tag?: string;
    subtitle?: string;
    thumbnailUrl?: string;
    onclick?: (event: MouseEvent) => void;
  } = $props();
</script>


<div {id} class="item">
  <a {href} {onclick}>
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
  </a>
</div>