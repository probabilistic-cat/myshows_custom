$(document).ready(function(){
    checkingUrlChange(enable);
    enable();
});

function enable() {
    const lang = getLang();

    enableIfOn('name_stats', function() {nameStats(lang)});
    enableIfOn('name_status_label_old', nameStatusLabelOld);
    enableIfOn('name_expand_show_lists', nameExpandShowLists);
    enableIfOn('name_expand_newsfeed', nameExpandNewsfeed);

    enableIfOn('view_compact', viewShowCompact);
    enableIfOn('view_navigation_remove', viewShowNavigationRemove);
    enableIfOn('view_style_old', viewShowStyleOld);
    enableIfOn('view_report_remove', viewShowReportRemove);
    enableIfOn('view_emoji_remove', viewEmojiRemove);
    enableIfOn('view_note_share_remove', viewShowNoteShareRemove);
    enableIfOn('view_expand_seasons', viewShowExpandSeasons);
    enableIfOn('view_similar_remove', viewSimilarRemove);
    enableIfOn('view_best_comments_remove', viewBestCommentsRemove);
    enableIfOn('view_accurate_rating', viewRatingAccurate);
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

function enableIfOn(storageKey, callbackFunc) {
    browser.storage.local.get(storageKey).then(data => {
        if (data[storageKey]) {
            callbackFunc();
        }
    });
}
