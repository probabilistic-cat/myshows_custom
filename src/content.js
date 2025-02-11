$(document).ready(function(){
    checkingUrlChange(enable);
    enable();
});

function enable() {
    detectLanguage();
    console.log('LANGUAGE IS: ' + language);

    enableIfOnAndNamePage('name_stats', nameStats);
    enableIfOnAndNamePage('name_status_label_old', nameStatusLabelOld);
    enableIfOnAndNamePage('name_expand_show_lists', nameExpandShowLists);
    enableIfOnAndNamePage('name_expand_newsfeed', nameExpandNewsfeed);

    enableIfOnAndViewShowPage('view_compact', viewCompact);
    enableIfOnAndViewShowPage('view_navigation_remove', viewNavigationRemove);
    enableIfOnAndViewShowPage('view_style_old', viewStyleOld);
    enableIfOnAndViewShowPage('view_report_remove', viewReportRemove);
    enableIfOnAndViewShowPage('view_emoji_remove', viewEmojiRemove);
    enableIfOnAndViewShowPage('view_note_share_remove', viewNoteShareRemove);
    enableIfOnAndViewShowPage('view_expand_seasons', viewExpandSeasons);
    enableIfOnAndViewShowPage('view_similar_remove', viewSimilarRemove);
    enableIfOnAndViewShowPage('view_best_comments_remove', viewBestCommentsRemove);
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

function enableIfOnAndNamePage(storageKey, callbackFunc) {
    enableIfOn(storageKey, callbackFunc, isNamePage)
}

function enableIfOnAndViewShowPage(storageKey, callbackFunc) {
    enableIfOn(storageKey, callbackFunc, isViewShowPage)
}
