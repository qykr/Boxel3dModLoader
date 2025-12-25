<script lang="ts">
  import type { SvelteComponent } from "svelte";
  import CarouselItem from "./CarouselItem.svelte";
  import Menu from "./menu/Menu.svelte";
  import MenuTabs from "./menu/MenuTabs.svelte";
  import MenuTab from "./menu/MenuTab.svelte";
  import MenuPanels from "./menu/MenuPanels.svelte";
  import MenuPanel from "./menu/MenuPanel.svelte";

  let modMenu: SvelteComponent;
  let modMenuOpen = false;
  const toggleMenu = () => modMenuOpen = !modMenuOpen;
</script>

<CarouselItem
    title="Mod Loader"
    thumbnailUrl="../svg/button-level-editor.svg"
    onclick={toggleMenu}
/>
{#if modMenuOpen}
  <Menu
    bind:this={modMenu}
    close={toggleMenu}
    defaultTab="mods"
  >
    <MenuTabs>
      <MenuTab target="installed" label="Installed" icon="extension" />
      <MenuTab target="featured" label="Featured" icon="star" />
      <MenuTab target="download" label="Download" icon="download" />
    </MenuTabs>
    <MenuPanels>
      <MenuPanel id="installed">
        <p>Mods</p>
      </MenuPanel>
      <MenuPanel id="featured">
        <p>Featured</p>
      </MenuPanel>
      <MenuPanel id="download">
        <p>Download</p>
      </MenuPanel>
    </MenuPanels>
  </Menu>
{/if}
