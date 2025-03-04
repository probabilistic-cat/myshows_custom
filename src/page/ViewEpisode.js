class ViewEpisode
{
    static compactPosterAndInfo() {
        if (this.#isViewEpisodePage()) {
            const pageMain = $('.Page__main');

            const details = $('.episode-details');
            const detailsTop = details.children(':first');
            const detailsPoster = details.find('.episode-details-poster');
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


            const showRating = detailsInfo.find('.ShowRating');
            const showRatingLabel = showRating.find('.EpisodeWatchLabel');
            const showRatingInfo = showRating.find('.ShowRating-info');
            const showRatingValue = showRating.find('.ShowRating-value');

            showRating.parent().css({
                'margin': '0',
                'padding-bottom': '10px',
            });
            showRating.css({
                'width': '100%',
                'display': 'grid',
                'grid-template-rows': '30px 38px',
                'grid-template-columns': '30px auto',
                'gap': '0',
            });
            showRatingLabel.css({'grid-area': '1 / 1 / 2 / 2'});
            showRatingInfo.css({'grid-area': '1 / 2 / 2 / 3'});
            showRatingValue.css({'grid-area': '2 / 1 / 3 / 3'});

            ViewCommon.InfoTable();
        }
    }

    static hideNoteShare() {
        if (this.#isViewEpisodePage()) {
            $('.episode-details__note').hide();
            $('.episode-details__share').hide();
        }
    }

    static #isViewEpisodePage() {
        const viewShowPage = new RegExp(`^/view/episode/\\d+/$`);
        return viewShowPage.test(window.location.pathname);
    }
}
