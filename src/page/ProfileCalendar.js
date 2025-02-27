class ProfileCalendar {
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
            }, 250);
        }
    }

    static removeNewsBlock() {
        if (this.#isProfileCalendarPage()) {
            $('.Next-section.last').each(function() {
                $(this).hide();
            });
        }
    }

    static #isProfileCalendarPage() {
        return window.location.pathname === '/profile/next/';
    }
}
