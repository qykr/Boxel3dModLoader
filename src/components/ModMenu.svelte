<script lang="ts">
  import CarouselItem from "./CarouselItem.svelte";

  let modMenu: HTMLElement;
  function handleClick() {
    modMenu.togglePopover();
  }
</script>

<CarouselItem title="Mod Loader" thumbnailUrl="../svg/button-level-editor.svg" onclick={handleClick} />
<div bind:this={modMenu} id="mod-menu" popover>Test</div>