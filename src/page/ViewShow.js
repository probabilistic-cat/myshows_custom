class ViewShow {
    static #TIMEOUT = 500;

    static #LANG_SIMILAR = {
        [LANG_EN]: 'Similar',
        [LANG_RU]: 'Похожие',
        [LANG_UA]: 'Схожі', // ?
    };

    static compact() {
        if (this.#isViewShowPage()) {
            $('.episodes-by-season__episode').each(function() {
                $(this).css('height', 26);
            });
        }
    }

    static removeNavigation() {
        if (this.#isViewShowPage()) {
            $('.ShowDetails__navigation').hide();
            $('.ShowDetails').children(':first').css({'width': '100%', 'margin-bottom': '10px'});
        }
    }

    static styleOld() {
        if (this.#isViewShowPage()) {
            ViewCommon.fixNavigation();

            const pageMain = $('.Page__main');

            const details = $('.ShowDetails');
            const detailsTop = details.children(':first');
            const detailsPoster = details.find('div.ShowDetails-poster');
            const detailsStatus = details.find('div.ShowDetails-status');
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


            const infoRating = detailsInfo.children(':first');
            const showRating = infoRating.find('div.ShowRating');
            const showRatingInfo = showRating.find('div.ShowRating-info');
            const showRatingValue = showRating.find('div.ShowRating-value');
            const showRatingInfoTitle = showRatingInfo.find('div.ShowRating-title');
            const showRatingInfoStars = showRatingInfo.find('div.ShowRating__stars-wrapper');

            infoRating.css({'margin': '0'});
            showRating.css({
                'width': '100%',
                'display': 'grid',
                'grid-template-rows': '20px 28px',
                'grid-template-columns': infoWidth + 'px',
                'gap': '0',
            });
            showRatingInfo.css({'grid-area': '1 / 1 / 2 / 2', 'width': '100%'});
            showRatingValue.css({'grid-area': '2 / 1 / 3 / 2', 'width': '100%'});
            showRatingInfoTitle.css({'width': '50%', 'margin-right': '0'});
            showRatingInfoStars.css({'width': '50%'});

            ViewCommon.InfoTable();


            detailsInfo.find('div.ShowDetails-report').css({
                'border-top': '1px solid var(--border-section-color)',
                'padding-top': '10px',
            });

            detailsDesc.find('div.ShowTabs').css({
                'border-top': '1px solid var(--border-section-color)',
                'padding-top': '20px',
            });
        }
    }

    static removeReport() {
        if (this.#isViewShowPage()) {
            $('.ShowDetails-report').hide();
        }
    }

    static removeEmoji() {
        if (this.#isViewShowPage()) {
            ViewCommon.removeEmoji();
        }
    }

    static removeNoteShare() {
        if (this.#isViewShowPage()) {
            $('.ShowDetails__note').hide();
            $('.ShowDetails__share').hide();
        }
    }

    static expandSeasons() {
        if (this.#isViewShowPage()) {
            setTimeout(() => {
                $('div.episodes-by-season__season-row').each(function() {
                    const iconOpenEl = $(this).find('svg.episodes-by-season__season-row_toggle-icon');
                    if (!iconOpenEl.hasClass('opened')) {
                        $(this).trigger('click');
                    }
                });
            }, this.#TIMEOUT);
        }
    }

    static removeBestComments(lang) {
        if (this.#isViewShowPage()) {
            ViewCommon.fixNavigation();

            $('.ShowPage__best-comments').hide();
            $('button.TopNavigation__link:contains(' + ViewCommon.LANG_BEST_COMMENTS[lang] + ')').hide();
        }
    }

    static removeSimilar(lang) {
        if (this.#isViewShowPage()) {
            ViewCommon.fixNavigation();
            $('.ShowPage__similar-block').hide();
            $('button.TopNavigation__link:contains(' + this.#LANG_SIMILAR[lang] + ')').hide();
        }
    }

    static #isViewShowPage() {
        const viewShowPage = new RegExp(`^/view/\\d+/$`);
        return viewShowPage.test(window.location.pathname);
    }
}
