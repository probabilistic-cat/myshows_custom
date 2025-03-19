class ViewRating
{
    static #TIMEOUT = 500;
    static #SPECIAL_NUM = 0;

    static #LANG_EMOTIONAL_RATING = {
        [LANG_EN]: 'Emotional rating',
        [LANG_RU]: 'Эмоциональная оценка',
        [LANG_UA]: 'Емоційна оцінка',
    };
    static #LANG_RELOAD_PAGE_TO_GET_ACCURATE_RATING = {
        [LANG_EN]: 'Refresh page to get an accurate rating.',
        [LANG_RU]: 'Обновите страницу, чтобы получить точный рейтинг.',
        [LANG_UA]: 'Оновіть сторінку, щоб отримати точний рейтинг.',
    };
    static #LANG_RATING = {
        [LANG_EN]: 'Rating',
        [LANG_RU]: 'Рейтинг',
        [LANG_UA]: 'Рейтинг',
    };
    static #LANG_VOTES = {
        [LANG_EN]: 'votes',
        [LANG_RU]: 'голосов',
        [LANG_UA]: 'голосів',
    };

    static hideEmoji(lang) {
        if (this.#isViewRatingPage()) {
            ViewCommon.removeEmoji();

            const title = this.#LANG_EMOTIONAL_RATING[lang];
            $('h3.title__main-text:contains(' + title + ')').closest('.title.title__secondary').hide();
        }
    }

    static hideBestComments(lang) {
        if (this.#isViewRatingPage()) {
            const title = ViewCommon.LANG_BEST_COMMENTS[lang];
            $('h3.title__main-text:contains(' + title + ')').closest('.title.title__secondary').hide();

            $('.ShowRatingPage__top-comments').hide()
        }
    }

    static makeRatingAccurate(enableBars, enableBarsSpecials, lang) {
        if (this.#isViewRatingPage()) {
            setTimeout(() => {
                const jsonData = $('#__NUXT_DATA__').html();
                const data = JSON.parse(jsonData);
                //console.log(JSON.stringify(Object.assign({}, data)));

                if (this.#isDataAvailable(data)) {
                    const [seasonsData, episodesData] = this.#getSeasonsAndEpisodesData(data, enableBarsSpecials);
                    console.log('seasonsData: ' + JSON.stringify(seasonsData));
                    console.log('episodesData: ' + JSON.stringify(episodesData));
                    this.#makeRatingTableAccurate(seasonsData, episodesData, lang);
                    if (enableBars) {
                        this.#renderRatingBars(seasonsData, episodesData, lang);
                    }
                } else {
                    this.#showNoDataWarning(lang);
                }
            }, this.#TIMEOUT);
        }
    }

    static #isViewRatingPage() {
        const viewShowPage = new RegExp(`^/view/\\d+/rating/$`);
        return viewShowPage.test(window.location.pathname);
    }

    static #isDataAvailable(data) {
        return data[4].hasOwnProperty('seasonRatings');
    }

    static #showNoDataWarning(lang) {
        let html = '<div class="ShowRatingAccurateWarning" '
            + 'style="margin-bottom: 20px; font-weight: bold; color: #cc0000;">'
        ;
        html += this.#LANG_RELOAD_PAGE_TO_GET_ACCURATE_RATING[lang];
        html += '</div>';

        $('.ShowRatingAccurateWarning').remove();
        $(html).insertBefore('.ShowRatingTable');
    }

    static #getSeasonsAndEpisodesData(data, enableBarsSpecials) {
        let seasonsData = {};
        let episodesData = {};

        const seasonsKeys = data[data[data[4].seasonRatings].seasons];
        for (const seasonKey of seasonsKeys) {
            const episodes2Keys = data[data[seasonKey].episodes];
            for (const episode2Key of episodes2Keys) {
                const episodeId = data[data[episode2Key].episodeId];
                const seasonNum = data[data[episode2Key].seasonNumber];
                const episodeNum = data[data[episode2Key].episodeNumber];
                const rating = data[data[episode2Key].rating];

                if (enableBarsSpecials === false && episodeNum === this.#SPECIAL_NUM) {
                    continue;
                }

                episodesData[episodeId] = {
                    id: episodeId,
                    season: seasonNum,
                    episode: episodeNum,
                    rating: rating,
                    votes: data[data[episode2Key].votes],
                };

                if (!seasonsData.hasOwnProperty(seasonNum)) {
                    seasonsData[seasonNum] = {
                        rating: data[data[seasonKey].rating],
                        votes: data[data[seasonKey].votes],
                    };
                }
            }
        }

        const episodes1Keys = data[data[5].episodes];
        for (const episode1Key of episodes1Keys) {
            const episodeId = data[data[episode1Key].id];
            if (episodesData.hasOwnProperty(episodeId)) {
                episodesData[episodeId].date = data[data[episode1Key].airDateUTC].substring(0, 10);
            }
        }

        return [seasonsData, episodesData];
    }

    static #makeRatingTableAccurate(seasonsData, episodesData, lang) {
        const self = this;

        $('.ShowRatingTable__cell-link').each(function() {
            const matched = $(this).attr('href').match(`^/view/episode/(\\d+)/$`);
            const episodeId = matched[1];
            $(this).html(episodesData[episodeId].rating);
            $(this).attr(
                'title',
                self.#getRatingTitle(episodesData[episodeId].rating, episodesData[episodeId].votes, lang),
            );
        });

        let seasonNum = 0;
        $('.ShowRatingTable__content .df:last .ShowRatingTable__cell').each(function() {
            if (seasonsData.hasOwnProperty(seasonNum)) {
                $(this).html(seasonsData[seasonNum].rating);
                $(this).attr(
                    'title',
                    self.#getRatingTitle(seasonsData[seasonNum].rating, seasonsData[seasonNum].votes, lang)
                );
            }
            seasonNum++;
        });
    }

    static #renderRatingBars(seasonsData, episodesData, lang) {
        const [minRating, maxRating] = this.#getMinAndMaxRatings(episodesData);
        const barsCellsData = this.#getBarsCellsData(minRating, maxRating);
        const backgroundColor = $('.Page__main').css('--content-background');
        const graphLine = '1px solid #b2b2b2';
        const smallFont = 'font-size: 11px;';
        const ratingMarksWidth = 30;
        const chartWidth = $('.ShowRatingTable').parent().width() - ratingMarksWidth;
        const barHeightMax = 180;

        let html = '';
        html += '<div class="ShowRatingBars">';
        for (let seasonNum in seasonsData) {
            seasonNum = parseInt(seasonNum);
            const seasonEpisodesData = Object.values(episodesData)
                .filter(item => item.season === seasonNum)
                .sort((a, b) => {
                    const dateDiff = new Date(a.date) - new Date(b.date);
                    return (dateDiff !== 0) ? dateDiff : (a.episode - b.episode);
                })
            ;
            const episodesCount = Object.keys(seasonEpisodesData).length

            html += '<div class="ShowRatingBars__season" style="margin-bottom: 30px;">';
            html += '<p style="font-size: 22px;">Сезон ' + seasonNum + '</p>';
            html += '<p style="' + smallFont + '">'
                + this.#getRatingTitle(seasonsData[seasonNum].rating, seasonsData[seasonNum].votes, lang)
                + '</p>';
            html += '<div class="ShowRatingBars__chart" style="'
                + 'display: grid; '
                + 'grid-template-rows: ' + (barHeightMax + 30) + 'px; '
                + 'grid-template-columns: ' + ratingMarksWidth + 'px auto; '
                + 'gap: 0; '
                + 'margin-top: 10px;'
                + '">';
            html += '<div class="ShowRatingBars__ratingsContainer" style="'
                + 'grid-area: 1 / 1 / 2 / 2; '
                + 'margin-top: 10px; '
                + 'height: ' + (barHeightMax + 20) + 'px; '
                + 'border-right: ' + graphLine + ';'
                + '">';
            html += '<div class="ShowRatingBars__ratings" style="'
                + 'display: grid; '
                + 'grid-template-rows: repeat(' + barsCellsData.cellsCount + ', 1fr); '
                + 'grid-template-columns: 20px auto 6px; '
                + 'gap: 0; '
                + 'position: relative; '
                + 'width: 100%; '
                + 'height: ' + barHeightMax + 'px; '
                + '">';

            for (let cellNum = 1; cellNum <= barsCellsData.cellsCount; cellNum++) {
                let ratingMarkStyle = '';
                if (cellNum === barsCellsData.cellsCount) {
                    ratingMarkStyle += 'border-bottom: ' + graphLine + ';';
                }
                const rating = Utils.round(barsCellsData.maxRatingLimit - ((cellNum - 1) * barsCellsData.cellValue), 1);

                html += '<div class="ShowRatingBars__rating" style="'
                    + 'grid-area: ' + cellNum + ' / 1 / ' + (cellNum + 1) + ' / 2; '
                    + 'margin-top: -6px; '
                    + 'height: 12px; '
                    + smallFont + ' '
                    + 'text-align: center;'
                    + '">' + rating + '</div>';
                html += '<div class="ShowRatingBars__ratingMark" style="'
                    + 'grid-area: ' + cellNum + ' / 3 / ' + (cellNum + 1) + ' / 4; '
                    + 'position: relative;'
                    + 'border-top: ' + graphLine + '; ' + ratingMarkStyle + ''
                    + '">';
                html += '<div class="ShowRatingBars__ratingMarkOnBars" style="'
                    + 'position: absolute; '
                    + 'top: -1px; '
                    + 'left: 6px; '
                    + 'width: ' + (chartWidth - 1) + 'px; '
                    + 'z-index: 10; '
                    + 'border-top: 1px solid ' + backgroundColor + '; '
                    + 'opacity: 0.21;'
                    + '"></div>';
                html += '</div>';
            }

            html += '<div class="ShowRatingBars__rating" style="'
                + 'position: absolute; '
                + 'bottom: -5px; '
                + 'left: 0; '
                + 'width: 20px; '
                + 'height: 12px; '
                + smallFont
                + ' text-align: center;'
                + '">' + Utils.round(barsCellsData.minRatingLimit, 1) + '</div>';

            html += '</div>';
            html += '</div>';
            html += '<div class="ShowRatingBars__episodes" style="'
                + 'grid-area: 1 / 2 / 2 / 3; '
                + 'display: grid; '
                + 'grid-template-rows: ' + barHeightMax + 'px 20px; '
                + 'grid-template-columns: repeat(' + episodesCount + ', 1fr); '
                + 'gap: 0; '
                + 'margin-top: 10px; '
                + 'height: ' + (barHeightMax + 20) + 'px;'
                + '">';


            let episodeNum = 1;
            for (const episodeData of seasonEpisodesData) {
                const barHeight = Utils.round(this.#getBarHeight(
                    episodeData.rating, barsCellsData.minRatingLimit,
                    barsCellsData.maxRatingLimit, barHeightMax
                ), 2);
                const episodeNumDisplay = (episodeData.episode !== this.#SPECIAL_NUM) ? episodeData.episode : 'special';
                let episodeNumBorderStyle = '';
                if (episodeNum > 1) {
                    episodeNumBorderStyle += 'border-left: ' + graphLine + ';';
                }
                if (episodeNum === episodesCount) {
                    episodeNumBorderStyle += 'border-right: ' + graphLine + ';';
                }


                html += '<div class="ShowRatingBars__barCell" style="'
                    + 'grid-area: 1 / ' + episodeNum + ' / 2 / ' + (episodeNum + 1) + '; '
                    + 'position: relative; '
                    + 'border-bottom: ' + graphLine + ';'
                    + '">';
                html += '<a href="/view/episode/' + episodeData.id + '/" style="'
                    + 'position: absolute; '
                    + 'bottom: 0; '
                    + 'left: 10%; '
                    + 'width: 80%; '
                    + 'height: ' + barHeight + 'px;'
                    + '" title="' + this.#getRatingTitle(episodeData.rating, episodeData.votes, lang) + '">';
                html += '<div class="ShowRatingBars__bar" style="'
                    + 'width: 100%; '
                    + 'height: 100%; '
                    + 'background-color: #85c5e3;'
                    + '"></div>';
                html += '</a>';
                html += '</div>';
                html += '<div class="ShowRatingBars__episodeNum" style="'
                    + 'grid-area: 2 / ' + episodeNum + ' / 3 / ' + (episodeNum + 1) + '; '
                    + 'padding-top: 3px; '
                    + smallFont
                    + ' text-align: center; '
                    + 'overflow: hidden; '
                    + episodeNumBorderStyle
                    + '">' + episodeNumDisplay + '</div>';

                episodeNum++;
            }

            html += '</div>';
            html += '</div>';
            html += '</div>';
        }
        html += '</div>';

        $('.ShowRatingBars').remove();
        $(html).insertBefore('.ShowRatingTable');
    }

    static #getMinAndMaxRatings(episodesData) {
        let minRating = 5;
        let maxRating = 0;

        for (const episodeId in episodesData) {
            const episodeData = episodesData[episodeId];
            if (episodeData.rating < minRating) {
                minRating = episodeData.rating;
            }
            if (maxRating < episodeData.rating) {
                maxRating = episodeData.rating;
            }
        }

        return [minRating, maxRating];
    }

    static #getBarsCellsData(minRating, maxRating) {
        let minRatingLimit = Math.floor(minRating * 10) / 10;
        let maxRatingLimit = Math.ceil(maxRating * 10) / 10;

        const range = Utils.round(maxRatingLimit - minRatingLimit, 1);

        let possibleCellsCount = [5, 4, 3];
        if (range === 0.1) {
            possibleCellsCount = [1];
        } else if (range === 0.2) {
            possibleCellsCount = [2];
        }

        for (const cellsCount of possibleCellsCount) {
            const step = Utils.round(range / cellsCount, 3);
            if (step >= 0.1 && (step * 10 % 1) === 0) {
                return {
                    minRatingLimit: minRatingLimit,
                    maxRatingLimit: maxRatingLimit,
                    cellsCount: cellsCount,
                    cellValue: Utils.round(step, 1),
                };
            }
        }

        if (
            (((minRating - minRatingLimit) < (maxRatingLimit - maxRating)) && minRatingLimit > 1)
            || maxRatingLimit === 5.0
        ) {
            minRatingLimit = Utils.round(minRatingLimit - 0.1, 1);
        } else {
            maxRatingLimit = Utils.round(maxRatingLimit + 0.1, 1);
        }

        return this.#getBarsCellsData(minRatingLimit, maxRatingLimit);
    }

    static #getBarHeight(rating, minRatingLimit, maxRatingLimit, barHeightMax) {
        const range = Utils.round(maxRatingLimit - minRatingLimit, 1);
        return barHeightMax / range * (rating - minRatingLimit);
    }

    static #getRatingTitle(rating, votes, lang) {
        return this.#LANG_RATING[lang] + ': ' + rating + ' (' + this.#LANG_VOTES[lang] + ' ' + votes + ')';
    }
}
