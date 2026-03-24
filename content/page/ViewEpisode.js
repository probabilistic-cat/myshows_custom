class ViewEpisode
{
    static compactPosterAndInfo() {
        if (this.#isViewEpisodePage()) {
            const pageMain = $('.Page__main');

            const details = $('.EpisodeDetails');
            const detailsTop = details.children(':first');
            const detailsPoster = details.find('.EpisodeDetails__poster');
            const detailsInfo = detailsPoster.next();

            const posterWidth = pageMain.width() * 0.6;
            const infoWidth = details.width() - posterWidth;

            details.css({
                'width': '100%',
                'display': 'grid',
                'grid-template-rows': 'auto auto',
                'grid-template-columns': posterWidth + 'px ' + infoWidth + 'px',
                'gap': '0',
            });
            detailsTop.css({
                'width': '100%',
                'grid-area': '1 / 1 / 2 / 3',
            });
            detailsPoster.css({'grid-area': '2 / 1 / 3 / 2'});
            detailsInfo.css({
                'grid-area': '2 / 2 / 3 / 3',
                'margin': '0',
                'padding-left': '0',
            });

            const ratingInfo = detailsInfo.find('.RatingInfo');
            const ratingInfoLeft = ratingInfo.find('.RatingInfo__left');
            const ratingInfoRight = ratingInfo.find('.RatingInfo__right');

            ratingInfo.parent().css({
                'margin': '0',
                'padding-bottom': '10px',
            });
            ratingInfo.css({
                'width': '100%',
                'display': 'grid',
                'grid-template-rows': '30px 38px',
                'grid-template-columns': '1fr',
                'gap': '0',
            });
            ratingInfoLeft.css({'grid-area': '1 / 1 / 2 / 2', 'width': '100%'});
            ratingInfoRight.css({'grid-area': '2 / 1 / 3 / 2', 'width': '100%'});

            ViewCommon.posterFavoriteButton();
            $('.AddPosterButton').css({'bottom': '12px', 'right': '14px'});

            ViewCommon.infoTable();
            $('.InfoTable').parent().css({
                'margin-top': '10px',
                'border-bottom': '0',
            });
        }
    }

    static hideNoteShare() {
        if (this.#isViewEpisodePage()) {
            $('.EpisodeDetails__note').hide();
            $('.EpisodeDetails__share').hide();
        }
    }

    static #isViewEpisodePage() {
        const viewShowPage = new RegExp(`^/view/episode/\\d+/$`);
        return viewShowPage.test(window.location.pathname);
    }
}
