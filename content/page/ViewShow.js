class ViewShow
{
    static #TIMEOUT = 1000;

    static #LANG_SIMILAR = {
        [LANG_EN]: 'Similar',
        [LANG_RU]: 'Похожие',
        [LANG_UA]: 'Схожі',
    };

    static #LANG_REVIEWS = {
        [LANG_EN]: 'Reviews',
        [LANG_RU]: 'Рецензии',
        [LANG_UA]: 'Рецензії',
    };

    static compact() {
        if (this.#isViewShowPage()) {
            $('.EpisodesBySeason__episode').css({'min-height': '26px'});
            Utils.addGlobalCss(['.RowEpisodeBySeason {height: 26px !important;}']);
        }
    }

    static hideNavigation() {
        if (this.#isViewShowPage()) {
            $('.ShowDetails__navigation').hide();
            $('.ShowDetails').children(':first').css({'width': '100%', 'margin-bottom': '10px'});
        }
    }

    static compactPosterAndInfo() {
        if (this.#isViewShowPage()) {
            ViewCommon.fixNavigation();

            const pageMain = $('.Page__main');

            const details = $('.ShowDetails');
            const detailsTop = details.children(':first');
            const detailsPoster = details.find('.ShowDetails-poster');
            const detailsStatus = details.find('.ShowDetails__status-bar');
            const detailsInfo = detailsStatus.next();
            const detailsDesc = detailsInfo.next();

            const posterWidth = pageMain.width() * 0.6;
            const posterHeight = posterWidth * 0.53 + '';
            const infoWidth = details.width() - posterWidth;

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

            $('.ShowDetails__rating-row').css({'padding-bottom': '10px'});

            const infoRating = detailsInfo.children(':first');
            const ratingInfo = infoRating.find('.RatingInfo');
            const ratingInfoLeft = ratingInfo.find('.RatingInfo__left');
            const ratingInfoRight = ratingInfo.find('.RatingInfo__right');
            const ratingInfoLeftTitle = ratingInfoLeft.find('.RatingInfo__title');
            const ratingInfoLeftStars = ratingInfoLeft.find('.RatingInfo__stars-wrapper');
            const ratingInfoRightValue = ratingInfoRight.find('.RatingInfo__value');
            const ratingInfoRightProviders = ratingInfoRight.find('.RatingInfo__providers');

            infoRating.css({'margin': '0'});
            ratingInfo.css({
                'width': '100%',
                'display': 'grid',
                'grid-template-rows': '30px 38px',
                'grid-template-columns': infoWidth + 'px',
                'gap': '0',
            });
            ratingInfoLeft.css({'grid-area': '1 / 1 / 2 / 2', 'width': '100%'});
            ratingInfoRight.css({'grid-area': '2 / 1 / 3 / 2', 'width': '100%', 'justify-content': 'normal'});

            ViewCommon.posterFavoriteButton();

            ViewCommon.infoTable();
            setTimeout(() => {
                const infoTableDetached = $('#description .InfoTable').detach();
                detailsInfo.append(infoTableDetached);
                detailsInfo.find('.InfoTable').css({
                    'margin-top': '10px',
                    'border-bottom': '0',
                });

                detailsDesc.find('.ShowTabs').css({
                    'padding-top': '10px',
                });
            }, this.#TIMEOUT);
        }
    }

    static hideReport() {
        if (this.#isViewShowPage()) {
            $('.ShowDetails-report').hide();
            $('.ShowTabs__report').hide();
        }
    }

    static hideWatchAlso() {
        if (this.#isViewShowPage()) {
            $('.ShowDetails__catalog-links').hide();
            $('.ShowTabs__catalog-links').hide();
        }
    }

    static hideEmoji() {
        if (this.#isViewShowPage()) {
            ViewCommon.removeEmoji();
            $('.ShowTabs__reactions').hide();
        }
    }

    static hideNoteShare() {
        if (this.#isViewShowPage()) {
            $('.ShowDetails__note').hide();
            $('.ShowDetails__share').hide();
            $('.ShowTabs__note').hide();
            $('.ShowTabs__share').hide();
        }
    }

    static expandSeasons() {
        if (this.#isViewShowPage()) {
            setTimeout(() => {
                $('.EpisodesBySeason__season-row-column').each(function() {
                    const iconOpenEl = $(this).find('.EpisodesBySeason__season-row-toggle-icon');
                    if (!iconOpenEl.hasClass('opened')) {
                        $(this).trigger('click');
                    }
                });
            }, this.#TIMEOUT);
        }
    }

    static hideBestComments(lang) {
        if (this.#isViewShowPage()) {
            ViewCommon.fixNavigation();
            $('#top-comments').hide();
            $('.TopNavigation__link:contains(' + ViewCommon.LANG_BEST_COMMENTS[lang] + ')').hide();
        }
    }

    static hideSimilar(lang) {
        if (this.#isViewShowPage()) {
            ViewCommon.fixNavigation();
            $('.ShowPage__similar-block').hide();
            $('.TopNavigation__link:contains(' + this.#LANG_SIMILAR[lang] + ')').hide();
        }
    }

    static hideReviews(lang) {
        if (this.#isViewShowPage()) {
            ViewCommon.fixNavigation();
            $('.ShowPage__reviews').hide();
            $('.TopNavigation__link:contains(' + this.#LANG_REVIEWS[lang] + ')').hide();
        }
    }

    static #isViewShowPage() {
        const viewShowPage = new RegExp(`^/view/\\d+/$`);
        return viewShowPage.test(window.location.pathname);
    }
}
