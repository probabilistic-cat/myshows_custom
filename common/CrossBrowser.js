class CrossBrowser
{
    static async getStorageData(storageKey) {
        if (this.#isFirefox()) {
            return (await browser.storage.local.get(storageKey))[storageKey];
        } else {
            return new Promise((resolve) => {
                chrome.storage.local.get(storageKey, (result) => {
                    resolve(result[storageKey]);
                });
            });
        }
    }

    static async setStorageData(storageKey, value) {
        if (this.#isFirefox()) {
            await browser.storage.local.set({[storageKey]: value});
        } else {
            return new Promise((resolve) => {
                chrome.storage.local.set({[storageKey]: value}, () => {
                    resolve();
                });
            });
        }
    }

    static #isFirefox() {
        return typeof browser !== 'undefined';
    }
}
