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
      <MenuTab target="mods" label="Mods" icon="gamepad" />
      <MenuTab target="downloads" label="Downloads" icon="download" />
    </MenuTabs>
    <MenuPanels>
      <MenuPanel id="mods"><p>Hello there</p></MenuPanel>
      <MenuPanel id="downloads"><p>Nothing to see</p></MenuPanel>
    </MenuPanels>
  </Menu>
{/if}
