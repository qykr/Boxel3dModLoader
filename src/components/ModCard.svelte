<script lang="ts">
    import Popup from "./menu/Popup.svelte";
    import type { ModManifest } from "../boxelMod";
  import Menu from "./menu/Menu.svelte";
  import MenuTabs from "./menu/MenuTabs.svelte";
  import MenuTab from "./menu/MenuTab.svelte";
  import MenuPanels from "./menu/MenuPanels.svelte";
  import MenuPanel from "./menu/MenuPanel.svelte";

    let {
        modManifest,
        newest,
        isInstalled = false,
    }: {
        modManifest: ModManifest,
        newest?: string,
        isInstalled?: boolean
    } = $props();
    const iconSrc = $derived(
        modManifest.iconSrc ?
            modManifest.iconSrc :
            "../svg/button-level-editor.svg"
    )
    const isOutdated = $derived(
        newest && modManifest.version != newest
    );
</script>

<div class="group">
    <div class="option modcard">
        <img src={iconSrc} class="mod-icon" alt="icon"/>
        <div class="mod-info">
            <div class="mod-title">
                <h2 class="mod-name">
                    {modManifest.name}
                </h2>
                {#if isOutdated}
                    <span class="mod-outdated">
                        v{modManifest.version} -> v{newest}
                    </span>
                {:else}
                    <span class="mod-uptodate">
                        v{modManifest.version}
                    </span>
                {/if}
            </div>
            <div class="mod-author">
                By {modManifest.author}
            </div>
            <div class="mod-description">
                <p>{modManifest.shortDesc}</p>
            </div>
        </div>
        <div class="mod-update"></div>
        <div class="mod-installed"></div>
        {#if isInstalled}
            <button class="mod-view" id={modManifest.id}>View</button>
        {:else}
            <button class="mod-get" id={modManifest.id}>Get</button>
        {/if}
    </div>
    <Menu toggleButtonId={modManifest.id} defaultTab={`${modManifest.id}-description`}>
        <MenuTabs>
            <MenuTab target={`${modManifest.id}-description`}>Description</MenuTab>
            <MenuTab target={`${modManifest.id}-changelog`}>Changelog</MenuTab>
        </MenuTabs>
        <MenuPanels>
            <MenuPanel id={`${modManifest.id}-description`}></MenuPanel>
            <MenuPanel id={`${modManifest.id}-changelog`}></MenuPanel>
        </MenuPanels>
    </Menu>
</div>

<style>
    .option.modcard {
        display: flex;
        gap: 1em;
        align-items: center;
    }

    .mod-icon {
        width: 5em;
        height: 5em;
        border-radius: 1em;
    }

    .mod-info {
        flex-grow: 1;
    }

    .mod-title {
        display: flex;
        gap: 1em;
    }

    .mod-name {
        font-size: 1.4em;
        margin: 0;
        color: white;
    }

    .mod-uptodate {
        font-size: 1.2em;
        color: green;
    }

    .mod-outdated {
        font-size: 1.2em;
        color: rgb(90, 135, 255);
    }

    .mod-author {
        font-size: 1.2em;
        margin: 0.3em 0 0.3em 0;
        color: white;
    }

    .mod-description {
        color: #e9e9e9;
    } 

    .mod-get {
        width: 4em;
        font-size: 1.5em;
        background-color: green !important
    }

    .mod-view {
        width: 4em;
        font-size: 1.5em;
    }
</style>