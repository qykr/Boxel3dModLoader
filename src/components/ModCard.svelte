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
        enabled,
        isInstalled = false,
    }: {
        modManifest: ModManifest,
        newest?: string,
        enabled?: boolean,
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
        {#if isInstalled}
            <div class="mod-enabled">
                <input
                    id={`${modManifest.id}-description`}
                    type="checkbox"
                />
                <label for={`${modManifest.id}-description`}>Enabled</label>
            </div>
        {/if}
        {#if isInstalled}
            <button class="mod-view" id={modManifest.id}>View</button>
        {:else}
            <button class="mod-get" id={modManifest.id}>Get</button>
        {/if}
    </div>
    <Menu toggleButtonId={modManifest.id} defaultTab={`${modManifest.id}-description`}>
        <MenuTabs>
            <MenuTab
                target={`${modManifest.id}-description`}
                label="Description"
                icon="docs"
            />
            <MenuTab
                target={`${modManifest.id}-changelog`}
                label="Changelog"
                icon="history"
            />
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
        width: 4em;
        height: 4em;
        border-radius: 1em;
    }

    .mod-info {
        flex-grow: 1;
    }

    .mod-title {
        display: flex;
        gap: 1em;
        align-items: flex-end;
    }

    .mod-name {
        font-size: 1em;
        margin: 0;
        color: white;
    }

    .mod-uptodate {
        font-size: 0.8em;
        color: green;
    }

    .mod-outdated {
        font-size: 0.8em;
        color: rgb(90, 135, 255);
    }

    .mod-author {
        font-size: 0.8em;
        margin: 0.3em 0 0.3em 0;
        color: white;
    }

    .mod-description {
        font-size: 0.7em;
        color: #e9e9e9;
    } 

    .mod-get {
        width: 3.5em;
        font-size: 1.2em;
        background-color: green !important;
    }

    .mod-view {
        width: 3.5em;
        font-size: 1.2em;
    }

    .mod-enabled {
        display: flex;
        flex-direction: column;
    }
</style>