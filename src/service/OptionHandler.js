class OptionHandler {
    static async enable() {
        const lang = Utils.getLang();

        // common
        await this.#enableIfOn('common_compact', () => {
            ProfileName.compact();
            Profile.compact();
            ProfileCalendar.compact();
            ProfileFriends.compact();
            ViewShow.compact();
        });
        await this.#enableIfOn('common_classic_status_label', () => Common.classicStatusLabel());

        // profile
        await this.#enableIfOn('profile_stats', () => ProfileName.stats(lang));
        await this.#enableIfOn('profile_expand_show_lists', () => {
            ProfileName.expandShowLists();
            ProfileCalendar.expandShowLists();
        });
        await this.#enableIfOn('profile_news_remove', () => {
            ProfileName.removeNewsBlock();
            ProfileCalendar.removeNewsBlock();
        });
        await this.#enableIfOn('profile_recommendations_remove', () => ProfileName.removeRecommendationsBlock());
        await this.#enableIfOn('profile_expand_newsfeed', () => ProfileName.expandNewsfeed());

        // view
        await this.#enableIfOn('view_navigation_remove', () => ViewShow.removeNavigation());
        await this.#enableIfOn('view_style_old', () => {
            ViewEpisode.styleOld();
            ViewShow.styleOld();
        });
        await this.#enableIfOn('view_report_remove', () => ViewShow.removeReport());
        await this.#enableIfOn('view_emoji_remove', () => {
            ViewShow.removeEmoji();
            ViewRating.removeEmoji();
        });
        await this.#enableIfOn('view_note_share_remove', () => {
            ViewEpisode.removeNoteShare();
            ViewShow.removeNoteShare();
        });
        await this.#enableIfOn('view_expand_seasons', () => ViewShow.expandSeasons());
        await this.#enableIfOn('view_similar_remove', () => ViewShow.removeSimilar());
        await this.#enableIfOn('view_best_comments_remove', () => {
            ViewShow.removeBestComments();
            ViewRating.removeBestComments();
        });
        await this.#enableIfOn('view_accurate_rating', async () => {
            const renderBars = await this.#isOptionOn('view_accurate_rating_bars');
            ViewRating.makeRatingAccurate(renderBars);
        });
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
