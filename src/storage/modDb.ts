import { BoxelModLoader } from "../bml";
import { BoxelMod } from "../boxelMod";

export class ModDb {
    #idb: IDBDatabase;
    #storage: Storage;

    constructor() {}

    async #tx<T>(
        mode: IDBTransactionMode,
        action: (store: IDBObjectStore) => IDBRequest<T>
    ) {
        const idb = await this.#getDb();
        return new Promise<T>((resolve, reject) => {
            const t = idb.transaction("mods", mode);
            const store = t.objectStore("mods");

            const req = action(store);

            req.onsuccess = () => resolve(req.result);
            req.onerror = () => reject(req.error);

            t.onerror = () => reject(t.error);
        });
    }

    // From PolyModLoader
    async #getDb(): Promise<IDBDatabase> {
        return new Promise((resolve, reject) => {
            if (this.#idb) {
                return resolve(this.#idb);
            }

            const DBOpenRequest = window.indexedDB.open(
                "BoxelModLoader",
                BoxelModLoader.instance.manifest.idbVersion
            );
            DBOpenRequest.onerror = () => {
                console.error("Error initializing database.");
                reject(new Error("DB init failed"));
            };

            DBOpenRequest.onsuccess = () => {
                console.log("Database initialized.");
                this.#idb = DBOpenRequest.result;
                resolve(this.#idb);
            };

            DBOpenRequest.onupgradeneeded = (event) => {
                console.log("Upgrading...");
                // @ts-ignore
                this.#idb = event.target.result as IDBDatabase;

                if (!this.#idb) {
                    return reject(new Error("Upgrade DB is null"));
                }

                this.#idb.onerror = () => {
                    console.error("Error during DB upgrade.");
                };

                if (!this.#idb.objectStoreNames.contains("mods")) {
                    this.#idb.createObjectStore("mods", { keyPath: "id" });
                    console.log("Object store created.");
                }

                // @ts-ignore
                event.target.transaction.oncomplete = () => {
                    console.log("Upgrade finished.");
                    resolve(this.#idb!);
                };
            };
        });
    }

    async addMod(mod: BoxelMod) {
        const idb = this.#getDb();
        this.#tx("readwrite", (s) => s.clear());
        
    }
}

export const modDb = new ModDb();