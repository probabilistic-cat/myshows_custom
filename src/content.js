$(document).ready(function(){
    checkingUrlChange(enable);
    enable();
});

function enable() {
    detectLanguage();

    enableIfOnAndOldProfilePage('profile_stats', profileStats);
    enableIfOnAndOldProfilePage('profile_status_label_old', profileStatusLabelOld);
    enableIfOnAndOldProfilePage('profile_expand_show_lists', profileExpandShowLists);
    enableIfOnAndOldProfilePage('profile_expand_newsfeed', profileExpandNewsfeed);

    enableIfOnAndViewPage('view_compact', viewCompact);
    enableIfOnAndViewPage('view_navigation_remove', viewNavigationRemove);
    enableIfOnAndViewPage('view_style_old', viewStyleOld);
    enableIfOnAndViewPage('view_report_remove', viewReportRemove);
    enableIfOnAndViewPage('view_emoji_remove', viewEmojiRemove);
    enableIfOnAndViewPage('view_note_share_remove', viewNoteShareRemove);
    enableIfOnAndViewPage('view_expand_seasons', viewExpandSeasons);
    enableIfOnAndViewPage('view_similar_remove', viewSimilarRemove);
    enableIfOnAndViewPage('view_best_comments_remove', viewBestCommentsRemove);
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

function enableIfOn(storageKey, callbackFunc, checkFunc) {
    if (checkFunc()) {
        browser.storage.local.get(storageKey).then(data => {
            if (data[storageKey]) {
                callbackFunc();
            }
        });
    }
}

function enableIfOnAndOldProfilePage(storageKey, callbackFunc) {
    enableIfOn(storageKey, callbackFunc, isOldProfilePage)
}

function enableIfOnAndViewPage(storageKey, callbackFunc) {
    enableIfOn(storageKey, callbackFunc, isViewPage)
}
