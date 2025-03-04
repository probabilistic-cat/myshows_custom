class ProfileCalendar
{
    static #TIMEOUT = 500;

    static compact() {
        if (this.#isProfileCalendarPage()) {
            $('.Col').css({'padding': '3px 0'});
            $('.FeedItem:not(:last-child)').css({'margin-bottom': '5px', 'padding-bottom': '5px'});
            $('.Feed-group').css({'padding': '9px 0'});
        }
    }

    static expandShowLists() {
        if (this.#isProfileCalendarPage()) {
            setTimeout(function() {
                $('.WatchSoon-title._with-chevron').each(function() {
                    if (!$(this).hasClass('opened')) {
                        $(this).trigger('click');
                    }
                });
            }, this.#TIMEOUT);
        }
    }

    static hideNewsBlock() {
        if (this.#isProfileCalendarPage()) {
            const newsEls = $('.Next-section.last');
            newsEls.first().prev().removeClass('border');
            newsEls.hide();
        }
    }

    static #isProfileCalendarPage() {
        return window.location.pathname === '/profile/next/';
    }
}
