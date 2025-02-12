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

    enableIfOn('view_compact', viewCompact);
    enableIfOn('view_navigation_remove', viewNavigationRemove);
    enableIfOn('view_style_old', viewStyleOld);
    enableIfOn('view_report_remove', viewReportRemove);
    enableIfOn('view_emoji_remove', viewEmojiRemove);
    enableIfOn('view_note_share_remove', viewNoteShareRemove);
    enableIfOn('view_expand_seasons', viewExpandSeasons);
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

function enableIfOn(storageKey, callbackFunc) {
    browser.storage.local.get(storageKey).then(data => {
        if (data[storageKey]) {
            callbackFunc();
        }
    });
}
