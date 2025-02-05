let language = 'en';
let class_prefix = 'myshows_custom_';

$(document).ready(function(){
    detectLanguage();
    enableIfOn('stats', stats)
    enableIfOn('status_label_old', oldStatusLabel)
    enableIfOn('expand_show_lists', expandShowLists)
})

function addGlobalCss(cssItems) {
    for (const cssItem of cssItems) {
        const style = document.createElement('style');
        style.textContent = cssItem;
        document.head.appendChild(style);
    }
}

function enableIfOn(storageKey, callbackFunc) {
    browser.storage.local.get(storageKey).then(data => {
        if (data[storageKey]) {
            callbackFunc();
        }
    });
}

function detectLanguage() {
    language = $('.langSwitcher__selected .lang__label').html();
}

function isProfilePage() {
    const h1 = $('div.wrapper div.container.content main.col8._borderLeft h1');
    return h1.length && h1.html() === window.location.pathname.substring(1);
}

function stats() {
    if (!isProfilePage()) {
        return false;
    }

    $('div.statusBlocks div.statusBlock').each(function (index) {
        if (index > 2) {
            return false;
        }
        const percent = parseFloat($(this).find('b').attr('style').substring(8).replace('%', ''));
        const subDiv = $(this).find('div');
        const spanPos = subDiv.html().indexOf('<span>');
        const value = parseInt(subDiv.html().substring(0, spanPos).replace(' ', ''));
        const max = Math.round(value / percent * 100);

        let of = 'of';
        if (language === 'ru') {
            of = 'от';
        } else if (language === 'ua') {
            of = 'від';
        }

        subDiv.append('<span style="margin-top: 10px;">' + percent + '% ' + of + ' <b>' + max + '</b></span>');
    })
}

function oldStatusLabel() {
    addGlobalCss(['sup.status {background-color: transparent !important; background-position-x: -60px !important}']);
}

function expandShowLists() {
    if (isProfilePage()) {
        $('a.linkPseudo.show-shows span').each(function() {
            $(this).click();
        });

        //$('a.linkPseudo.show-news span').click()
    }
}
