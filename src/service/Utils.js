class Utils {
    static getLang() {
        const oldLangEl = $('.langSwitcher__selected .lang__label');
        if (oldLangEl.length) {
            return oldLangEl.html();
        }

        const langEl = $('.LangSwitcher-current .LangSwitcher-optionText');
        if (langEl) {
            return langEl.html();
        }

        return LANG_EN;
    }

    static addGlobalCss(cssItems) {
        for (const cssItem of cssItems) {
            const style = document.createElement('style');
            style.textContent = cssItem;
            document.head.appendChild(style);
        }
    }

    static pad(str, max) {
        str = str.toString();
        return (str.length < max) ? this.pad('0' + str, max) : str;
    }

    static round(number, decimalsCount) {
        const multiplier = Math.pow(10, decimalsCount);
        return (Math.round(number * multiplier) / multiplier);
    }

    static getNumberLocaled(number) {
        return number.toLocaleString('ru-RU');
    }
}
