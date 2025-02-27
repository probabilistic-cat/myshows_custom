class ProfileName
{
    static #STATS_EPISODES_TITLES = {
        [LANG_RU]: ['эпизодов', 'эпизода', 'эпизод'],
    };
    static #STATS_MOVIES_TITLES = {
        [LANG_RU]: ['фильмов', 'фильма', 'фильм'],
    };
    static #STATS_HOURS_TITLES = {
        [LANG_RU]: ['часов', 'часа', 'час'],
    };
    static #STATS_DAYS_TITLES = {
        [LANG_RU]: ['дней', 'дня', 'день'],
    };

    static #STATS_OF = {[LANG_EN]: 'of', [LANG_RU]: 'от', [LANG_UA]: 'від'};

    static compact() {
        if (this.#isOldProfileNamePage()) {
            Utils.addGlobalCss(['.catalogTable td {padding-top: 8px; padding-bottom: 8px}']);
        }

        if (this.#isNewProfileNamePage()) {
            Utils.addGlobalCss(['div.UserShowItem_mode_compact {padding: 11px 0;}']);
            Utils.addGlobalCss([
                'div.UserHeader {margin-top: 50px; padding-top: 15px; padding-bottom: 15px;}',
                'div.LayoutWrapper.user div.LayoutWrapper__main {padding-top: 150px;}',
            ]);

            $('div.FeedItem.personal:not(:last-child)').css({'margin-bottom': '5px', 'padding-bottom': '5px'});
            $('div.Feed-group').css({'padding': '9px 0'});

            $('div.com-comments div.Col.all').css({'padding': '5px 0'});
        }
    }

    static stats(lang) {
        const of = this.#STATS_OF[lang];

        if (this.#isOldProfileNamePage()) {
            $('div.statusBlocks div.statusBlock').each(function(index) {
                if (index > 2) {
                    return false;
                }
                const percent = parseFloat($(this).find('b').attr('style').substring(8).replace('%', ''));
                const subDiv = $(this).find('div');
                const spanPos = subDiv.html().indexOf('<span>');
                const value = parseInt(subDiv.html().substring(0, spanPos).replace(' ', ''));
                const max = Math.round(value / percent * 100);

                $(this).find('.statusBlockExtra').remove();
                subDiv.append('<span class="statusBlockExtra" style="margin-top: 10px;">' + percent + '% ' + of + ' <b>' + max + '</b></span>');
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
                this.#renderStatsHeader(watchedEpisodes, totalEpisodes, this.#STATS_EPISODES_TITLES[lang], of);
                this.#renderStatsHeader(watchedMovies, totalMovies, this.#STATS_MOVIES_TITLES[lang], of);
                this.#renderStatsHeader(watchedHours, totalHours, this.#STATS_HOURS_TITLES[lang], of);
                this.#renderStatsHeader(watchedDays, totalDays, this.#STATS_DAYS_TITLES[lang], of);

                this.#renderStatsCharts(watchedEpisodes, totalEpisodes, this.#STATS_EPISODES_TITLES[lang], of);
                this.#renderStatsCharts(watchedMovies, totalMovies, this.#STATS_MOVIES_TITLES[lang], of);
                this.#renderStatsCharts(watchedHours, totalHours, this.#STATS_HOURS_TITLES[lang], of);
                this.#renderStatsCharts(watchedDays, totalDays, this.#STATS_DAYS_TITLES[lang], of);
            }, 1000);

            const observer = new MutationObserver(() => {
                this.#renderStatsCharts(watchedEpisodes, totalEpisodes, this.#STATS_EPISODES_TITLES[lang], of);
                this.#renderStatsCharts(watchedMovies, totalMovies, this.#STATS_MOVIES_TITLES[lang], of);
                this.#renderStatsCharts(watchedHours, totalHours, this.#STATS_HOURS_TITLES[lang], of);
                this.#renderStatsCharts(watchedDays, totalDays, this.#STATS_DAYS_TITLES[lang], of);
            });
            observer.observe(document.querySelector('.UserStatisticsBlock__charts'), {childList: true});
        }
    }

    static expandShowLists() {
        if (this.#isOldProfileNamePage()) {
            $('a.linkPseudo.show-shows span').each(function() {
                $(this).trigger('click');
            });
        }

        if (this.#isNewProfileNamePage()) {
            const showMore = $('div.UserShowsBlock__button-more');
            setTimeout(function() {
                showMore.trigger('click');
            }, 250);

            const observer = new MutationObserver(() => {
                if (showMore.length) {
                    showMore.trigger('click');
                }
            });
            observer.observe(document.querySelector('div.UserShowsBlock__shows div.Container'), {childList: true});
        }
    }

    static expandNewsfeed() {
        if (this.#isOldProfileNamePage()) {
            $('a.linkPseudo.show-news span').trigger('click');
        }
    }

    static removeNewsBlock() {
        if (this.#isNewProfileNamePage()) {
            $('div.UserNewsBlock').closest('div.UserBlock').hide();
        }
    }

    static removeRecommendationsBlock() {
        if (this.#isNewProfileNamePage()) {
            $('div.UserRecommendationsBlock').closest('div.UserBlock').hide();
        }
    }

    static #isOldProfileNamePage() {
        const nameEl = $('div.wrapper div.container.content main.col8._borderLeft h1');
        return nameEl.length && nameEl.html() === window.location.pathname.substring(1);
    }

    static #isNewProfileNamePage() {
        const nameEl = $('div.UserHeader__name');
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
        return $(blockClass).filter(function () {
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
