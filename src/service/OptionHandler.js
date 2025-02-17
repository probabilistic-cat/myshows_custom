class OptionHandler {
    static enable() {
        const lang = Utils.getLang();

        this.#enableIfOn('name_stats', () => Name.stats(lang));
        this.#enableIfOn('name_status_label_old', () => Name.statusLabelOld());
        this.#enableIfOn('name_expand_show_lists', () => Name.expandShowLists());
        this.#enableIfOn('name_expand_newsfeed', () => Name.expandNewsfeed());

        this.#enableIfOn('view_compact', () => ViewShow.compact());
        this.#enableIfOn('view_navigation_remove', () => ViewShow.removeNavigation());
        this.#enableIfOn('view_style_old', () => ViewShow.styleOld());
        this.#enableIfOn('view_report_remove', () => ViewShow.removeReport());
        this.#enableIfOn('view_emoji_remove', () => View.removeEmoji());
        this.#enableIfOn('view_note_share_remove', () => ViewShow.removeNoteShare());
        this.#enableIfOn('view_expand_seasons', () => ViewShow.expandSeasons());
        this.#enableIfOn('view_similar_remove', () => ViewShow.removeSimilar());
        this.#enableIfOn('view_best_comments_remove', () => View.removeBestComments());
        this.#enableIfOn('view_accurate_rating', () => ViewRating.makeRatingAccurate());
    }

    static #enableIfOn(storageKey, callbackFunc) {
        browser.storage.local.get(storageKey).then(data => {
            if (data[storageKey]) {
                callbackFunc();
            }
        });
    }
}
