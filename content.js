let language = 'en';

$(document).ready(function(){
    checkingUrlChange(enable);
    enable();
});


// -------------------- Common functions --------------------

function enable() {
    detectLanguage();
    enableIfOn('profile_stats', profileStats);
    enableIfOn('profile_status_label_old', profileStatusLabelOld);
    enableIfOn('profile_expand_show_lists', profileExpandShowLists);
    enableIfOn('profile_expand_newsfeed', profileExpandNewsfeed);
    enableIfOn('view_compact', viewCompact);
    enableIfOn('view_navigation_remove', viewNavigationRemove);
    enableIfOn('view_style_old', viewStyleOld);
    enableIfOn('view_report_remove', viewReportRemove);
    enableIfOn('view_emoji_remove', viewEmojiRemove);
    enableIfOn('view_note_share_remove', viewNoteShareRemove);
    enableIfOn('view_expand_seasons', expandSeasons);
    enableIfOn('view_similar_remove', viewSimilarRemove);
    enableIfOn('view_best_comments_remove', viewBestCommentsRemove);
}

function checkingUrlChange(callbackFunc) {
    let oldHref = document.location.href;
    const observer = new MutationObserver(() => {
        if (oldHref !== document.location.href) {
            oldHref = document.location.href;
            window.dispatchEvent(new Event('locationchange6'));
        }
    });
    observer.observe(document.querySelector('title'), { childList: true });
    window.addEventListener('locationchange6', () => {
        callbackFunc();
    });
}

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

function isViewPage() {
    return window.location.pathname.substring(1, 5) === 'view';
}


// -------------------- Options --------------------

function profileStats() {
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

function profileStatusLabelOld() {
    addGlobalCss(['sup.status {background-color: transparent !important; background-position-x: -60px !important}']);
}

function profileExpandShowLists() {
    if (isProfilePage()) {
        $('a.linkPseudo.show-shows span').each(function() {
            $(this).click();
        });
    }
}

function profileExpandNewsfeed() {
    if (isProfilePage()) {
        $('a.linkPseudo.show-news span').click();
    }
}

function expandSeasons() {
    if (isViewPage()) {
        $('div.episodes-by-season__season-row').each(function() {
            let iconOpenEl = $(this).find('svg.episodes-by-season__season-row_toggle-icon');
            if (!iconOpenEl.hasClass('opened')) {
                $(this).click();
            }
        });
    }
}

function viewCompact() {
    if (isViewPage()) {
        $('.episodes-by-season__episode').each(function() {
            $(this).css('height', 26);
        });
    }
}

function viewNavigationRemove() {
    if (isViewPage()) {
        $('.ShowDetails__navigation').hide();
        $('.ShowDetails').children(':first').css({'width': '100%', 'margin-bottom': '10px'});
    }
}

function viewStyleOld() {
    if (isViewPage()) {
        let pageMain = $('.Page__main');
        let pageAside = $('.Page__aside');
        let content = $('.DefaultLayout__content');
        let pageAsideWidth = content.width() * 0.25;

        pageAside.css('width', pageAsideWidth + 'px');
        pageMain.css('max-width', 'calc(100% - ' + pageAsideWidth + 'px)');

        let details = $('.ShowDetails');
        let detailsTop = details.children(':first');
        let detailsPoster = $('.ShowDetails-poster');
        let detailsStatus = $('.ShowDetails-status');
        let detailsInfo = detailsStatus.next();
        let detailsDesc = detailsInfo.next();

        let detailsWidth = details.width();
        let posterWidth = pageMain.width() * 0.6;
        let posterHeight = posterWidth * 0.53 + '';
        let infoWidth = detailsWidth - posterWidth;

        details.css({
            'width': '100%',
            'display': 'grid',
            'grid-template-rows': 'auto ' + posterHeight + 'px auto auto',
            'grid-template-columns': posterWidth + 'px ' + infoWidth + 'px',
            'gap': '0',
        });
        detailsTop.css({'grid-area': '1 / 1 / 2 / 3'});
        detailsPoster.css({'grid-area': '2 / 1 / 3 / 2'});
        detailsStatus.css({'grid-area': '3 / 1 / 4 / 2'});
        detailsInfo.css({
            'grid-area': '2 / 2 / 4 / 3',
            'margin': '0',
            'padding-left': '0',
        });
        detailsDesc.css({
            'grid-area': '4 / 1 / 5 / 3',
            'width': '100%',
        });

        let infoRating = detailsInfo.children(':first');
        let showRating = infoRating.find('.ShowRating');
        let infoTable = infoRating.next();

        infoRating.css({'margin': '0'});
        showRating.css({
            'width': '100%',
            'display': 'grid',
            'grid-template-rows': '25px 25px',
            'grid-template-columns': infoWidth + 'px',
            'gap': '0',
        });
        $('.ShowRating-info').css({'grid-area': '1 / 1 / 2 / 2', 'width': '100%'});
        $('.ShowRating-value').css({'grid-area': '2 / 1 / 3 / 2', 'width': '100%'});
        $('.ShowRating-title').css({'width': '50%', 'margin-right': '0'});
        $('.ShowRating__stars-wrapper').css({'width': '50%'});

        $('.info-table td').css({'font-size': '14px', 'padding': '1px 0'});
        $('.info-row__title').css({'width': '140px'});
        $('.info-row__value').css({'width': 'auto'});

        $('.ShowDetails-report').css({
            'border-top': '1px solid var(--border-section-color)',
            'padding-top': '10px',
        });
        infoTable.css({'border-bottom': '0'});

        detailsDesc.find('.ShowTabs').css({
            'border-top': '1px solid var(--border-section-color)',
            'padding-top': '20px',
        });
    }
}

function viewReportRemove() {
    if (isViewPage()) {
        $('.ShowDetails-report').hide();
    }
}


function viewEmojiRemove() {
    if (isViewPage()) {
        $('.ShowDetails__reactions').hide();
    }
}

function viewNoteShareRemove() {
    if (isViewPage()) {
        $('.ShowDetails__note').hide();
        $('.ShowDetails__share').hide();
    }
}

function viewBestCommentsRemove() {
    if (isViewPage()) {
        $('.ShowPage__best-comments').hide();
        $('button.TopNavigation__link:contains("Лучшие комментарии")').hide();
        $('.ShowDetails').children(':first').css({'width': '100%'});
    }
}

function viewSimilarRemove() {
    if (isViewPage()) {
        $('.ShowPage__similar-block').hide();
        $('button.TopNavigation__link:contains("Похожие")').hide();
        $('.ShowDetails').children(':first').css({'width': '100%'});
    }
}
