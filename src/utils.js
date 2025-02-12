function getLang() {
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

function addGlobalCss(cssItems) {
    for (const cssItem of cssItems) {
        const style = document.createElement('style');
        style.textContent = cssItem;
        document.head.appendChild(style);
    }
}
