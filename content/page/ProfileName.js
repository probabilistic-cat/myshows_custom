class ProfileName
{
    static #TIMEOUT = 1000;
    static #FRIENDS_COUNT = 10;
    static #ACHIEVEMENTS_COUNT = 10;

    static #LANG_STATS_EPISODES = {
        [LANG_EN]: ['episodes', 'episode'],
        [LANG_RU]: ['эпизодов', 'эпизода', 'эпизод'],
        [LANG_UA]: ['епізодів', 'епізоди', 'епізод'],
    };
    static #LANG_STATS_MOVIES = {
        [LANG_EN]: ['movies', 'movie'],
        [LANG_RU]: ['фильмов', 'фильма', 'фильм'],
        [LANG_UA]: ['фільмів', 'фільми', 'фільм'],
    };
    static #LANG_STATS_HOURS = {
        [LANG_EN]: ['hours', 'hour'],
        [LANG_RU]: ['часов', 'часа', 'час'],
        [LANG_UA]: ['годин', 'години', 'година'],
    };
    static #LANG_STATS_DAYS = {
        [LANG_EN]: ['days', 'day'],
        [LANG_RU]: ['дней', 'дня', 'день'],
        [LANG_UA]: ['днів', 'дні', 'день'],
    };
    static #LANG_STATS_OF = {
        [LANG_EN]: 'of',
        [LANG_RU]: 'от',
        [LANG_UA]: 'від',
    };

    static compact() {
        if (this.#isOldProfileNamePage()) {
            Utils.addGlobalCss(['.catalogTable td {padding-top: 8px; padding-bottom: 8px}']);
        }

        if (this.#isNewProfileNamePage()) {
            Utils.addGlobalCss([
                '.UserHeader {margin-top: 70px; padding-top: 15px; padding-bottom: 15px;}',
                '.LayoutWrapper.user .LayoutWrapper__main {padding-top: 130px;}',
            ]);
            $('.UserAvatar.extra').css({'width': '80px', 'height': '80px'});
            $('.UserHeader__friends-position').css({'font-size': '76px', 'line-height': '76px'});

            Utils.addGlobalCss(['.UserShowItem_mode_compact {padding: 11px 0;}']);

            $('.FeedItem:not(:last-child)').css({'margin-bottom': '5px', 'padding-bottom': '5px'});
            $('.Feed-group').css({'padding': '9px 0'});

            $('.com-comments .Col').css({'padding': '5px 0'});

            $('.AchievementList__item').css({'width': Utils.round(100 / this.#FRIENDS_COUNT, 2) + '%'});
            $('.AchievementList__item:nth-child(-n+' + this.#FRIENDS_COUNT + ')').show();

            $('.UserFriendsBlock__list').css({
                'grid-template-columns': 'repeat(' + this.#ACHIEVEMENTS_COUNT + ', 1fr)',
            });
            $('.UserFriendsBlock__name, .UserFriendsBlock__add-title').css({'font-size': '13px'});
        }
    }

    static stats(lang) {
        const of = this.#LANG_STATS_OF[lang];

        if (this.#isOldProfileNamePage()) {
            $('.statusBlock').each(function(index) {
                if (index > 2) {
                    return false;
                }
                const percent = parseFloat($(this).find('b').attr('style').substring(8).replace('%', ''));
                const subDiv = $(this).find('div');
                const spanPos = subDiv.html().indexOf('<span>');
                const value = parseInt(subDiv.html().substring(0, spanPos).replace(' ', ''));
                const max = Math.round(value / percent * 100);

                $(this).find('.statusBlockExtra').remove();
                subDiv.append('<span class="statusBlockExtra" style="margin-top: 10px;">' + percent + '% ' + of
                    + ' <b>' + max + '</b></span>')
                ;
            })
        }

        if (this.#isNewProfileNamePage()) {
            const jsonData = $('#__NUXT_DATA__').html();
            const data = JSON.parse(jsonData);
            //console.log(Object.assign({}, data));

            const profile = data[data[4].profile];
            const statsShows = data[data[profile.stats][1]];
            const statsMoview = data[data[profile.statsMovies][1]];
            const statsTotal = data[data[profile.statsTotal][1]];

            const watchedEpisodes = data[statsShows.watchedEpisodes];
            const totalEpisodes = data[statsShows.totalEpisodes];
            const watchedMovies = data[statsMoview.watchedMovies];
            const totalMovies = data[statsMoview.totalMovies];
            const watchedHours = Utils.round(data[statsTotal.watchedHours], 0);
            const totalHours = Utils.round(data[statsTotal.totalHours], 0);
            const watchedDays = Utils.round(data[statsTotal.watchedDays], 0);
            const totalDays = Utils.round(data[statsTotal.totalDays], 0);

            Utils.addGlobalCss(['.UserHeader__stats-extra {flex: 3;}']);
            setTimeout(() => {
                this.#renderStatsHeader(watchedEpisodes, totalEpisodes, this.#LANG_STATS_EPISODES[lang], of);
                this.#renderStatsHeader(watchedMovies, totalMovies, this.#LANG_STATS_MOVIES[lang], of);
                this.#renderStatsHeader(watchedHours, totalHours, this.#LANG_STATS_HOURS[lang], of);
                this.#renderStatsHeader(watchedDays, totalDays, this.#LANG_STATS_DAYS[lang], of);

                this.#renderStatsCharts(watchedEpisodes, totalEpisodes, this.#LANG_STATS_EPISODES[lang], of);
                this.#renderStatsCharts(watchedMovies, totalMovies, this.#LANG_STATS_MOVIES[lang], of);
                this.#renderStatsCharts(watchedHours, totalHours, this.#LANG_STATS_HOURS[lang], of);
                this.#renderStatsCharts(watchedDays, totalDays, this.#LANG_STATS_DAYS[lang], of);
            }, this.#TIMEOUT);

            const observer = new MutationObserver(() => {
                this.#renderStatsCharts(watchedEpisodes, totalEpisodes, this.#LANG_STATS_EPISODES[lang], of);
                this.#renderStatsCharts(watchedMovies, totalMovies, this.#LANG_STATS_MOVIES[lang], of);
                this.#renderStatsCharts(watchedHours, totalHours, this.#LANG_STATS_HOURS[lang], of);
                this.#renderStatsCharts(watchedDays, totalDays, this.#LANG_STATS_DAYS[lang], of);
            });
            observer.observe(document.querySelector('.UserStatisticsBlock__charts'), {childList: true});
        }
    }

    static expandShowLists() {
        if (this.#isOldProfileNamePage()) {
            $('.linkPseudo.show-shows span').each(function() {
                $(this).trigger('click');
            });
        }

        if (this.#isNewProfileNamePage()) {
            const showMore = $('.UserShowsBlock__button-more');
            setTimeout(() => {
                showMore.trigger('click');
            }, this.#TIMEOUT);

            const observer = new MutationObserver(() => {
                if (showMore.length) {
                    showMore.trigger('click');
                }
            });
            observer.observe(document.querySelector('.UserShowsBlock__shows .Container'), {childList: true});
        }
    }

    static expandNewsfeed() {
        if (this.#isOldProfileNamePage()) {
            $('.linkPseudo.show-news span').trigger('click');
        }
    }

    static hideNewsBlock() {
        if (this.#isNewProfileNamePage()) {
            $('.UserNewsBlock').closest('.UserBlock').hide();
        }
    }

    static hideRecommendationsBlock() {
        if (this.#isNewProfileNamePage()) {
            $('.UserRecommendationsBlock').closest('.UserBlock').hide();
        }
    }

    static #isOldProfileNamePage() {
        const nameEl = $('.wrapper .container.content .col8._borderLeft h1');
        return nameEl.length && nameEl.html() === window.location.pathname.substring(1);
    }

    static #isNewProfileNamePage() {
        const nameEl = $('.UserHeader__name');
        return nameEl.length && nameEl.html().startsWith(window.location.pathname.substring(1));
    }

    static #renderStatsHeader(watched, total, titles, of) {
        const block = this.#getStatsBlock('.UserHeader__stats-row', '.UserHeader__stats-title', titles);
        const percent = this.#getStatsPercentOfTotal(watched, total);

        this.#renderStatsAccurateValue(block, '.UserHeader__stats-value-wrapper', watched);

        block.find('.UserHeader__stats-extra').remove();
        const style = 'style="font-family: var(--number-font-family); font-size: 20px;"';
        const extra = '<span ' + style + '>' + percent + '%</span>&nbsp;'
            + of + '&nbsp;<span ' + style + '>' + Utils.getNumberLocaled(total) + '</span>'
        ;
        const statsExtra = $('<div class="UserHeader__stats-extra">' + extra + '</div>');
        statsExtra.insertAfter(block.find('.UserHeader__stats-title'));
    }

    static #renderStatsCharts(watched, total, titles, of) {
        const block = this.#getStatsBlock('.UserStatisticsProgress', '.UserStatisticsProgress__title', titles);
        const percent = this.#getStatsPercentOfTotal(watched, total);

        this.#renderStatsAccurateValue(block, '.UserStatisticsProgress__value span', watched);

        block.find('.UserStatisticsProgress__extra').remove();
        const style = 'style="color: var(--font-color); font-family: var(--number-font-family); font-size: 16px; '
            + 'font-weight: 300; margin-top: 4px;"'
        ;
        const extra = percent + '%<br />' + of + ' ' + Utils.getNumberLocaled(total);
        const statsExtra = $('<div class="UserStatisticsProgress__extra" ' + style + '>' + extra + '</div>');
        statsExtra.insertAfter(block.find('.UserStatisticsProgress__title-wrapper'));
    }

    static #getStatsBlock(blockClass, titleClass, titles) {
        return $(blockClass).filter(function() {
            const text = $(this).find(titleClass).text().trim();
            return titles.includes(text);
        });
    }

    static #renderStatsAccurateValue(block, valueClass, value) {
        block.find(valueClass).html(Utils.getNumberLocaled(value));
    }

    static #getStatsPercentOfTotal(watched, total) {
        return Utils.round(watched / (total / 100), 2);
    }
}
