class OptionHandler
{
    static async enable() {
        const lang = Utils.getLang();

        // common
        await this.#enableIfOn('common_compact', () => {
            My.compact();
            Profile.compact();
            ProfileCalendar.compact();
            ProfileEdit.compact();
            ProfileFriends.compact();
            ProfileName.compact();
            ViewShow.compact();
        });
        await this.#enableIfOn('common_classic_status_label', () => Common.classicStatusLabel());

        // profile
        await this.#enableIfOn('profile_stats', () => ProfileName.stats(lang));
        await this.#enableIfOn('profile_expand_show_lists', () => {
            ProfileName.expandShowLists();
            ProfileCalendar.expandShowLists();
        });
        await this.#enableIfOn('profile_news_hide', () => {
            ProfileName.hideNewsBlock();
            ProfileCalendar.hideNewsBlock();
        });
        await this.#enableIfOn('profile_recommendations_hide', () => ProfileName.hideRecommendationsBlock());
        await this.#enableIfOn('profile_expand_newsfeed', () => ProfileName.expandNewsfeed());

        // view
        await this.#enableIfOn('view_navigation_hide', () => ViewShow.hideNavigation());
        await this.#enableIfOn('view_poster_info_compact', () => {
            ViewEpisode.compactPosterAndInfo();
            ViewShow.compactPosterAndInfo();
        });
        await this.#enableIfOn('view_report_hide', () => ViewShow.hideReport());
        await this.#enableIfOn('view_emoji_hide', () => {
            ViewShow.hideEmoji();
            ViewRating.hideEmoji(lang);
        });
        await this.#enableIfOn('view_note_share_hide', () => {
            ViewEpisode.hideNoteShare();
            ViewShow.hideNoteShare();
        });
        await this.#enableIfOn('view_expand_seasons', () => ViewShow.expandSeasons());
        await this.#enableIfOn('view_similar_hide', () => ViewShow.hideSimilar(lang));
        await this.#enableIfOn('view_best_comments_hide', () => {
            ViewShow.hideBestComments(lang);
            ViewRating.hideBestComments(lang);
        });
        await this.#enableIfOn('view_accurate_rating', async() => {
            const renderBars = await this.#isOptionOn('view_accurate_rating_bars');
            ViewRating.makeRatingAccurate(renderBars, lang);
        });
    }

    static async #enableIfOn(storageKey, callbackFunc) {
        if (await this.#isOptionOn(storageKey)) {
            callbackFunc();
        }
    }

    static async #isOptionOn(storageKey) {
        let isOptionOn = await this.#getStorageValue(storageKey);
        return (isOptionOn === undefined) ? this.#getOptionDefaultValue(storageKey, optionList) : isOptionOn;
    }

    static async #getStorageValue(storageKey) {
        const data = await browser.storage.local.get(storageKey);
        return data[storageKey];
    }

    static #getOptionDefaultValue(id, options) {
        for (const option of options) {
            if (option.id === id) {
                return (option.hasOwnProperty('default')) ? option.default : null;
            }

            if (option.hasOwnProperty('children')) {
                const defaultValue = this.#getOptionDefaultValue(id, option.children);
                if (defaultValue !== undefined) {
                    return defaultValue;
                }
            }
        }
    }
}
