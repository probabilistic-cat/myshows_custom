let language = 'en';

function detectLanguage() {
    language = $('.langSwitcher__selected .lang__label').html();
}

function addGlobalCss(cssItems) {
    for (const cssItem of cssItems) {
        const style = document.createElement('style');
        style.textContent = cssItem;
        document.head.appendChild(style);
    }
}

