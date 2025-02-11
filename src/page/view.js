function isViewShowPage() {
    const viewShowPage = new RegExp(`^/view/\\d+/$`);
    return viewShowPage.test(window.location.pathname);
}

function isViewEpisodePage() {
    const viewShowPage = new RegExp(`^/view/episode/\\d+/$`);
    return viewShowPage.test(window.location.pathname);
}

function isViewRatingPage() {
    const viewShowPage = new RegExp(`^/view/\\d+/rating/$`);
    return viewShowPage.test(window.location.pathname);
}

function viewCompact() {
    $('.episodes-by-season__episode').each(function() {
        $(this).css('height', 26);
    });
}

function viewNavigationRemove() {
    $('.ShowDetails__navigation').hide();
    $('.ShowDetails').children(':first').css({'width': '100%', 'margin-bottom': '10px'});
}

function viewStyleOld() {
    const pageMain = $('.Page__main');
    const pageAside = $('.Page__aside');
    const content = $('.DefaultLayout__content');
    const pageAsideWidth = content.width() * 0.25;

    pageAside.css('width', pageAsideWidth + 'px');
    pageMain.css('max-width', 'calc(100% - ' + pageAsideWidth + 'px)');

    const details = $('.ShowDetails');
    const detailsTop = details.children(':first');
    const detailsPoster = $('.ShowDetails-poster');
    const detailsStatus = $('.ShowDetails-status');
    const detailsInfo = detailsStatus.next();
    const detailsDesc = detailsInfo.next();

    const detailsWidth = details.width();
    const posterWidth = pageMain.width() * 0.6;
    const posterHeight = posterWidth * 0.53 + '';
    const infoWidth = detailsWidth - posterWidth;

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

    const infoRating = detailsInfo.children(':first');
    const showRating = infoRating.find('.ShowRating');
    const infoTable = infoRating.next();

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

function viewReportRemove() {
    $('.ShowDetails-report').hide();
}


function viewEmojiRemove() {
    $('.ShowDetails__reactions').hide();
}

function viewNoteShareRemove() {
    $('.ShowDetails__note').hide();
    $('.ShowDetails__share').hide();
}

function viewExpandSeasons() {
    $('div.episodes-by-season__season-row').each(function() {
        let iconOpenEl = $(this).find('svg.episodes-by-season__season-row_toggle-icon');
        if (!iconOpenEl.hasClass('opened')) {
            $(this).trigger('click');
        }
    });
}

function viewBestCommentsRemove() {
    $('.ShowPage__best-comments').hide();
    $('button.TopNavigation__link:contains("Лучшие комментарии")').hide();
    $('.ShowDetails').children(':first').css({'width': '100%'});
}

function viewSimilarRemove() {
    $('.ShowPage__similar-block').hide();
    $('button.TopNavigation__link:contains("Похожие")').hide();
    $('.ShowDetails').children(':first').css({'width': '100%'});
}
