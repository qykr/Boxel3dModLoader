<script lang="ts">
  import type { SvelteComponent } from "svelte";
  import CarouselItem from "./CarouselItem.svelte";
  import Menu from "./menu/Menu.svelte";
  import MenuTabs from "./menu/MenuTabs.svelte";
  import MenuTab from "./menu/MenuTab.svelte";
  import MenuPanels from "./menu/MenuPanels.svelte";
  import MenuPanel from "./menu/MenuPanel.svelte";
  import ModCard from "./ModCard.svelte";
</script>

<CarouselItem
  id="mod-menu-button"
  title="Mod Loader"
  thumbnailUrl="../svg/button-level-editor.svg"
/>
<Menu
  toggleButtonId="mod-menu-button"
  defaultTab="installed"
>
  <MenuTabs>
    <MenuTab target="installed" label="Installed" icon="extension" />
    <MenuTab target="featured" label="Featured" icon="star" />
    <MenuTab target="download" label="Download" icon="download" />
  </MenuTabs>
  <MenuPanels>
    <MenuPanel id="installed">
      <p>Installed</p>
      <ModCard
        modManifest={{
          id: "test-mod",
          name: "Test Mod",
          version: "0.0.1",
          author: "qykr",
          shortDesc: "A test mod"
        }}
        newest="0.0.2"
      ></ModCard>
      <ModCard
        modManifest={{
          id: "test-mod2",
          name: "Test Modlkjlkjklj",
          version: "0.0.1",
          author: "qykr",
          shortDesc: "A test mod"
        }}
        newest="0.0.2"
      ></ModCard>
      <ModCard
        modManifest={{
          id: "test-mod3",
          name: "Test Mod",
          version: "0.0.1",
          author: "qykr",
          shortDesc: "A test mod"
        }}
        newest="0.0.2"
      ></ModCard>
      <ModCard
        modManifest={{
          id: "test-mod4",
          name: "Test Mod",
          version: "0.0.1",
          author: "qykr",
          shortDesc: "A test mod"
        }}
        newest="0.0.2"
      ></ModCard>
      <ModCard
        modManifest={{
          id: "test-mod5",
          name: "Test Mod",
          version: "0.0.1",
          author: "qykr",
          shortDesc: "A test mod"
        }}
        newest="0.0.1"
        isInstalled={true}
      ></ModCard>
    </MenuPanel>
    <MenuPanel id="featured">
      <p>Featured</p>
    </MenuPanel>
    <MenuPanel id="download">
      <p>Download</p>
    </MenuPanel>
  </MenuPanels>
</Menu>