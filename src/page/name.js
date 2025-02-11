function isNamePage() {
    const oldNameEl = $('div.wrapper div.container.content main.col8._borderLeft h1');
    if (oldNameEl.length) {
        return oldNameEl.html() === window.location.pathname.substring(1);
    }

    const nameEl = $('div.UserHeader__name');
    if (nameEl.length) {
        return nameEl.html().startsWith(window.location.pathname.substring(1));
    }

    return false;
}

function nameStats() {
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

function nameStatusLabelOld() {
    addGlobalCss(['sup.status {background-color: transparent !important; background-position-x: -60px !important}']);
}

function nameExpandShowLists() {
    $('a.linkPseudo.show-shows span').each(function() {
        $(this).trigger('click');
    });
}

function nameExpandNewsfeed() {
    $('a.linkPseudo.show-news span').trigger('click');
}
