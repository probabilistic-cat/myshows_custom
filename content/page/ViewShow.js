class ViewShow
{
    static #TIMEOUT = 1000;

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

            const rating = detailsInfo.children(':first');
            const ratingInfo = rating.find('.RatingInfo');
            const ratingInfoLeft = ratingInfo.find('.RatingInfo__left');
            const ratingInfoLeftTitle = ratingInfoLeft.find('.RatingInfo__title');
            const ratingInfoLeftStars = ratingInfoLeft.find('.RatingInfo__stars-wrapper');
            const ratingInfoRight = ratingInfo.find('.RatingInfo__right');
            const ratingInfoRightValue = ratingInfoRight.find('.RatingInfo__value');
            const ratingInfoRightProviders = ratingInfoRight.find('.RatingInfo__providers');

            rating.css({'margin': '0'});
            ratingInfo.css({
                'width': '100%',
                'display': 'grid',
                'grid-template-rows': '38px 1fr',
                'grid-template-columns': infoWidth + 'px',
                'gap': '0',
            });
            ratingInfoLeft.css({
                'grid-area': '1 / 1 / 2 / 2',
                'width': '100%',
                'display': 'grid',
                'grid-template-rows': '1fr',
                'grid-template-columns': '115px 1fr',
                'margin-bottom': '8px',
                'gap': '5px',
            });
            ratingInfoRight.css({'grid-area': '2 / 1 / 3 / 2', 'width': '100%', 'display': 'block'});
            ratingInfoLeftTitle.css({'grid-area': '1 / 1 / 2 / 2'});
            ratingInfoLeftStars.css({'grid-area': '1 / 2 / 2 / 3'});
            ratingInfoRightValue.css({'height': '30px', 'margin-bottom': '8px'});
            ratingInfoRightProviders.css({'float': 'left', 'height': '18px'});

            ViewCommon.posterFavoriteButton();
            ViewCommon.posterDisclaimer();

            ViewCommon.infoTable();
            setTimeout(() => {
                const infoTableDetached = $('#description .InfoTable').detach();
                detailsInfo.append(infoTableDetached);
                detailsInfo.find('.InfoTable').css({
                    'margin-top': '10px',
                    'margin-bottom': '30px',
                    'border-bottom': '0',
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

    static hideBestComments(hideNavigation) {
        if (this.#isViewShowPage()) {
            $('#top-comments').hide();

            if (!hideNavigation) {
                ViewCommon.fixNavigation();
                setTimeout(() => {
                    $('.TopNavigationLink[href="#top-comments"]').parent().hide();
                    console.log('HIDING HIDING HIDING');
                }, this.#TIMEOUT);
            }
        }
    }

    static hideCollections(hideNavigation) {
        if (this.#isViewShowPage()) {
            $('.ShowPage__collections-block').hide();

            if (!hideNavigation) {
                ViewCommon.fixNavigation();
                setTimeout(() => {
                    $('.TopNavigationLink[href="#collections"]').parent().hide();
                }, this.#TIMEOUT);
            }
        }
    }

    static hideSimilar(hideNavigation) {
        if (this.#isViewShowPage()) {
            $('.ShowPage__similar-block').hide();

            if (!hideNavigation) {
                ViewCommon.fixNavigation();
                setTimeout(() => {
                    $('.TopNavigationLink[href="#similar"]').parent().hide();
                }, this.#TIMEOUT);
            }
        }
    }

    static hideReviews(hideNavigation) {
        if (this.#isViewShowPage()) {
            $('.ShowPage__reviews').hide();

            if (!hideNavigation) {
                ViewCommon.fixNavigation();
                setTimeout(() => {
                    $('.TopNavigationLink[href="#reviews"]').parent().hide();
                }, this.#TIMEOUT);
            }
        }
    }

    static #isViewShowPage() {
        const viewShowPage = new RegExp(`^/view/\\d+/$`);
        return viewShowPage.test(window.location.pathname);
    }
}
