let language = 'en';

function detectLanguage() {
    const oldLangEl = $('.langSwitcher__selected .lang__label');
    if (oldLangEl.length) {
        language = oldLangEl.html();
        return;
    }

    const langEl = $('.LangSwitcher-current .LangSwitcher-optionText');
    if (langEl) {
        language = langEl.html();
    }
}

function addGlobalCss(cssItems) {
    for (const cssItem of cssItems) {
        const style = document.createElement('style');
        style.textContent = cssItem;
        document.head.appendChild(style);
    }
}

