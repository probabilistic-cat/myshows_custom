function isViewShowPage() {
    const viewShowPage = new RegExp(`^/view/\\d+/$`);
    return viewShowPage.test(window.location.pathname);
}

function isViewEpisodePage() {
    const viewShowPage = new RegExp(`^/view/episode/\\d+/$`);
    return viewShowPage.test(window.location.pathname);
}

function isViewRatingPage() {
    const viewShowPage = new RegExp(`^/view/\\d+/rating/$`);
    return viewShowPage.test(window.location.pathname);
}

function viewCompact() {
    if (isViewShowPage()) {
        $('.episodes-by-season__episode').each(function() {
            $(this).css('height', 26);
        });
    }
}

function viewNavigationRemove() {
    if (isViewShowPage()) {
        $('.ShowDetails__navigation').hide();
        $('.ShowDetails').children(':first').css({'width': '100%', 'margin-bottom': '10px'});
    }
}

function viewStyleOld() {
    if (isViewShowPage()) {
        const pageMain = $('.Page__main');
        //const pageAside = $('.Page__aside');
        //const content = $('.DefaultLayout__content');
        //const pageAsideWidth = content.width() * 0.25;

        //pageAside.css('width', pageAsideWidth + 'px');
        //pageMain.css('max-width', 'calc(100% - ' + pageAsideWidth + 'px)');

        const details = $('.ShowDetails');
        const detailsTop = details.children(':first');
        const detailsPoster = $('.ShowDetails-poster');
        const detailsStatus = $('.ShowDetails-status');
        const detailsInfo = detailsStatus.next();
        const detailsDesc = detailsInfo.next();

        const detailsWidth = details.width();
        const posterWidth = pageMain.width() * 0.6;
        const posterHeight = posterWidth * 0.53 + '';
        const infoWidth = detailsWidth - posterWidth;

        details.css({
            'width': '100%',
            'display': 'grid',
            'grid-template-rows': 'auto ' + posterHeight + 'px auto auto',
            'grid-template-columns': posterWidth + 'px ' + infoWidth + 'px',
            'gap': '0',
        });
        detailsTop.css({'grid-area': '1 / 1 / 2 / 3'});
        detailsPoster.css({'grid-area': '2 / 1 / 3 / 2'});
        detailsStatus.css({'grid-area': '3 / 1 / 4 / 2'});
        detailsInfo.css({
            'grid-area': '2 / 2 / 4 / 3',
            'margin': '0',
            'padding-left': '0',
        });
        detailsDesc.css({
            'grid-area': '4 / 1 / 5 / 3',
            'width': '100%',
        });

        const infoRating = detailsInfo.children(':first');
        const showRating = infoRating.find('.ShowRating');
        const infoTable = infoRating.next();

        infoRating.css({'margin': '0'});
        showRating.css({
            'width': '100%',
            'display': 'grid',
            'grid-template-rows': '25px 25px',
            'grid-template-columns': infoWidth + 'px',
            'gap': '0',
        });
        $('.ShowRating-info').css({'grid-area': '1 / 1 / 2 / 2', 'width': '100%'});
        $('.ShowRating-value').css({'grid-area': '2 / 1 / 3 / 2', 'width': '100%'});
        $('.ShowRating-title').css({'width': '50%', 'margin-right': '0'});
        $('.ShowRating__stars-wrapper').css({'width': '50%'});

        $('.info-table td').css({'font-size': '14px', 'padding': '1px 0'});
        $('.info-row__title').css({'width': '140px'});
        $('.info-row__value').css({'width': 'auto'});

        $('.ShowDetails-report').css({
            'border-top': '1px solid var(--border-section-color)',
            'padding-top': '10px',
        });
        infoTable.css({'border-bottom': '0'});

        detailsDesc.find('.ShowTabs').css({
            'border-top': '1px solid var(--border-section-color)',
            'padding-top': '20px',
        });
    }
}

function viewReportRemove() {
    if (isViewShowPage()) {
        $('.ShowDetails-report').hide();
    }
}


function viewEmojiRemove() {
    if (isViewShowPage() || isViewRatingPage()) {
        $('.ShowDetails__reactions').hide();
    }
    if (isViewRatingPage()) {
        $('h3.title__main-text:contains("Эмоциональная оценка")').closest('div.title.title__secondary').hide();
    }
}

function viewNoteShareRemove() {
    if (isViewShowPage()) {
        $('.ShowDetails__note').hide();
        $('.ShowDetails__share').hide();
    }
}

function viewExpandSeasons() {
    if (isViewShowPage()) {
        $('div.episodes-by-season__season-row').each(function() {
            let iconOpenEl = $(this).find('svg.episodes-by-season__season-row_toggle-icon');
            if (!iconOpenEl.hasClass('opened')) {
                $(this).trigger('click');
            }
        });
    }
}

function viewBestCommentsRemove() {
    if (isViewShowPage()) {
        $('.ShowPage__best-comments').hide();
        $('button.TopNavigation__link:contains("Лучшие комментарии")').hide();
        $('.ShowDetails').children(':first').css({'width': '100%'});
    }
}

function viewSimilarRemove() {
    if (isViewShowPage()) {
        $('.ShowPage__similar-block').hide();
        $('button.TopNavigation__link:contains("Похожие")').hide();
        $('.ShowDetails').children(':first').css({'width': '100%'});
    }
    if (isViewRatingPage()) {
        $('h3.title__main-text:contains("Лучшие комментарии")').closest('div.title.title__secondary').hide();
        $('div.ShowRatingPage__top-comments').hide()
    }
}

function viewRatingAccurate() {
    if (isViewRatingPage()) {
        setTimeout(function() {
            const jsonData = $('#__NUXT_DATA__').html();
            const data = JSON.parse(jsonData);

            [seasonsData, episodesData] = getSeasonsAndEpisodesData(data);
            makeRatingTableAccurate(seasonsData, episodesData);
            renderRatingChart(seasonsData, episodesData);
        }, 250);
    }
}

function getSeasonsAndEpisodesData(data) {
    let seasonsData = {};
    let episodesData = {};

    const seasonsKeys = data[data[data[4].seasonRatings].seasons];
    for (const seasonKey of seasonsKeys) {
        const episodes2Keys = data[data[seasonKey].episodes];
        for (const episode2Key of episodes2Keys) {
            const episodeId = data[data[episode2Key].episodeId];
            const seasonNum = data[data[episode2Key].seasonNumber];
            const rating = data[data[episode2Key].rating];

            episodesData[episodeId] = {
                id: episodeId,
                season: seasonNum,
                episode: data[data[episode2Key].episodeNumber],
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
        episodesData[episodeId].date = data[data[episode1Key].airDateUTC];
    }

    return [seasonsData, episodesData];
}

function makeRatingTableAccurate(seasonsData, episodesData) {
    $('a.ShowRatingTable__cell-link').each(function() {
        let matched = $(this).attr('href').match(`^/view/episode/(\\d+)/$`);
        const episodeId = matched[1];
        $(this).html(episodesData[episodeId].rating);
        $(this).attr('title', getRatingTitle(episodesData[episodeId].rating, episodesData[episodeId].votes));
    });

    let seasonNum = 0;
    $('div.ShowRatingTable__content div.df:last div.ShowRatingTable__cell').each(function() {
        if (seasonsData.hasOwnProperty(seasonNum)) {
            $(this).html(seasonsData[seasonNum].rating);
            $(this).attr('title', getRatingTitle(seasonsData[seasonNum].rating, seasonsData[seasonNum].votes));
        }
        seasonNum++;
    });
}

function renderRatingChart(seasonsData, episodesData) {
    [minRating, maxRating] = getMinAndMaxRatings(episodesData);

    const barsCellsData = getBarsCellsData(minRating, maxRating);
    const backgroundColor = $('.Page__main').css('--content-background');
    const graphLine = '1px solid #b2b2b2';
    const smallFont = 'font-size: 11px;';
    const ratingMarksWidth = 30;
    const chartWidth = $('div.ShowRatingTable').parent().width() - ratingMarksWidth;
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
            + getRatingTitle(seasonsData[seasonNum].rating, seasonsData[seasonNum].votes)
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
            const rating = round(barsCellsData.maxRatingLimit - ((cellNum - 1) * barsCellsData.cellValue), 1);

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
            + '">' + round(barsCellsData.minRatingLimit, 1) + '</div>';

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
        seasonEpisodesData.forEach(function(episodeData) {
            const barHeight = round(getBarHeight(
                episodeData.rating, barsCellsData.minRatingLimit,
                barsCellsData.maxRatingLimit, barHeightMax
            ), 2);
            const episodeNumDisplay = (episodeData.episode !== 0) ? episodeData.episode : 'special';
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
                + '" title="' + getRatingTitle(episodeData.rating, episodeData.votes) + '">';
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
        });

        html += '</div>';
        html += '</div>';
        html += '</div>';
    }
    html += '</div>';

    $(html).insertBefore('div.ShowRatingTable');
}

function getMinAndMaxRatings(episodesData) {
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

function getBarsCellsData(minRating, maxRating) {
    let minRatingLimit = Math.floor(minRating * 10) / 10;
    let maxRatingLimit = Math.ceil(maxRating * 10) / 10;

    const range = round(maxRatingLimit - minRatingLimit, 1);

    let possibleCellsCount = [5, 4, 3];
    if (range === 0.1) {
        possibleCellsCount = [1];
    } else if (range === 0.2) {
        possibleCellsCount = [2];
    }

    for (const cellsCount of possibleCellsCount) {
        const step = round(range / cellsCount, 3);
        if (step >= 0.1 && (step * 10 % 1) === 0) {
            return {
                minRatingLimit: minRatingLimit,
                maxRatingLimit: maxRatingLimit,
                cellsCount: cellsCount,
                cellValue: round(step, 1),
            };
        }
    }

    if (
        (((minRating - minRatingLimit) < (maxRatingLimit - maxRating)) && minRatingLimit > 1)
        || maxRatingLimit === 5.0
    ) {
        minRatingLimit = round(minRatingLimit - 0.1, 1);
    } else {
        maxRatingLimit = round(maxRatingLimit + 0.1, 1);
    }

    return getBarsCellsData(minRatingLimit, maxRatingLimit);
}

function getBarHeight(rating, minRatingLimit, maxRatingLimit, barHeightMax) {
    const range = round(maxRatingLimit - minRatingLimit, 1);
    return barHeightMax / range * (rating - minRatingLimit);
}

function getRatingTitle(rating, votes) {
    return 'Рейтинг: ' + rating + ' (голосов ' + votes + ')';
}
