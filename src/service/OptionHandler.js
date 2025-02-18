class OptionHandler {
    static async enable() {
        const lang = Utils.getLang();

        await this.#enableIfOn('name_stats', () => Name.stats(lang));
        await this.#enableIfOn('name_status_label_old', () => Name.statusLabelOld());
        await this.#enableIfOn('name_expand_show_lists', () => Name.expandShowLists());
        await this.#enableIfOn('name_expand_newsfeed', () => Name.expandNewsfeed());

        await this.#enableIfOn('view_compact', () => ViewShow.compact());
        await this.#enableIfOn('view_navigation_remove', () => ViewShow.removeNavigation());
        await this.#enableIfOn('view_style_old', () => ViewShow.styleOld());
        await this.#enableIfOn('view_report_remove', () => ViewShow.removeReport());
        await this.#enableIfOn('view_emoji_remove', () => View.removeEmoji());
        await this.#enableIfOn('view_note_share_remove', () => ViewShow.removeNoteShare());
        await this.#enableIfOn('view_expand_seasons', () => ViewShow.expandSeasons());
        await this.#enableIfOn('view_similar_remove', () => ViewShow.removeSimilar());
        await this.#enableIfOn('view_best_comments_remove', () => View.removeBestComments());
        await this.#enableIfOn('view_accurate_rating', () => ViewRating.makeRatingAccurate());
    }

    static async #enableIfOn(storageKey, callbackFunc) {
        if (await this.#isOptionOn(storageKey)) {
            callbackFunc();
        }
    }

    static async #isOptionOn(storageKey) {
        const data = await browser.storage.local.get(storageKey);
        return data[storageKey];
    }
}
