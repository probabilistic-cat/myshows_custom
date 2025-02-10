$(document).ready(function(){
    checkingUrlChange(enable);
    enable();
});

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
