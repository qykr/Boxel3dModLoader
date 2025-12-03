import { AppState } from "../lib/types/game";

// TODO: Finish up more states & types of elements
// TODO: make it more extensible (less assumptions)
const appElement = document.getElementById("app");
if (!appElement) throw new Error("Could not find app element");
let state: AppState | null = null;

const selectorFrom: Partial<Record<AppState, string>> = {
  [AppState.Home]: ".title",
  [AppState.LevelPicker]: ".label",
  [AppState.Skins]: ".title"
};

const slugify = (str: string) => str.toLowerCase().split(' ').join('-');
function assignItemIds() {
  const newState: AppState = window.app.state;
  if (newState === null || newState === state) return;
  state = newState;

  console.log("State changed to", state);

  const selector = selectorFrom[state];
  if (!selector) return;

  const items = Array.from(
    document.querySelectorAll<HTMLElement>(".carousel .item")
  );
  for (const item of items) {
    const nameElement = item.querySelector<HTMLElement>(selector);
    if (!nameElement) continue;

    const id = slugify(nameElement.innerText);
    item.setAttribute("data-bml-id", id);
  }
}

assignItemIds();
const observer = new MutationObserver(assignItemIds);
observer.observe(appElement, { childList: true, subtree: true });