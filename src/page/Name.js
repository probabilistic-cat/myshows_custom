class Name
{
    static compact() {
        if (this.#isNewNamePage()) {
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
        if (this.#isOldNamePage()) {
            $('div.statusBlocks div.statusBlock').each(function(index) {
                if (index > 2) {
                    return false;
                }
                const percent = parseFloat($(this).find('b').attr('style').substring(8).replace('%', ''));
                const subDiv = $(this).find('div');
                const spanPos = subDiv.html().indexOf('<span>');
                const value = parseInt(subDiv.html().substring(0, spanPos).replace(' ', ''));
                const max = Math.round(value / percent * 100);

                const of = {[LANG_EN]: 'of', [LANG_RU]: 'от', [LANG_UA]: 'від'};

                subDiv.append('<span style="margin-top: 10px;">' + percent + '% ' + of[lang] + ' <b>' + max
                    + '</b></span>'
                );
            })
        }
        if (this.#isNewNamePage()) {
            const percents = [];
            $('div.UserStatisticsProgress__bar-value').each(function() {
                const value = Utils.round($(this).attr('style').match(/height:\s*([\d.]+)%/)[1], 2) + '%';
                percents.push(value);
            });

            setTimeout(function() {
                $('div.UserStatisticsProgress__title-wrapper').each(function(index) {
                    const div = '<div class="UserStatisticsProgress__value">' + percents[index] + '</div>';
                    $(div).insertAfter($(this));
                });
            }, 100);
        }
    }

    static statusLabelOld() {
        if (this.#isOldNamePage()) {
            Utils.addGlobalCss([
                'sup.status {background-color: transparent !important; background-position-x: -60px !important;}',
            ]);
        }
    }

    static expandShowLists() {
        if (this.#isOldNamePage()) {
            $('a.linkPseudo.show-shows span').each(function() {
                $(this).trigger('click');
            });
        }
        if (this.#isNewNamePage()) {
            const showMore = $('div.UserShowsBlock__button-more');
            setTimeout(function() {
                showMore.trigger('click');
            }, 100);

            const observer = new MutationObserver(() => {
                if (showMore.length) {
                    showMore.trigger('click');
                }
            });

            observer.observe(document.querySelector('div.UserShowsBlock__shows div.Container'), {childList: true});
        }
    }

    static expandNewsfeed() {
        if (this.#isOldNamePage()) {
            $('a.linkPseudo.show-news span').trigger('click');
        }
    }

    static removeNewsBlock() {
        if (this.#isNewNamePage()) {
            $('div.UserNewsBlock').closest('div.UserBlock').hide();
        }
    }

    static removeRecommendationsBlock() {
        if (this.#isNewNamePage()) {
            $('div.UserRecommendationsBlock').closest('div.UserBlock').hide();
        }
    }

    static #isOldNamePage() {
        const nameEl = $('div.wrapper div.container.content main.col8._borderLeft h1');
        return nameEl.length && nameEl.html() === window.location.pathname.substring(1);
    }

    static #isNewNamePage() {
        const nameEl = $('div.UserHeader__name');
        return nameEl.length && nameEl.html().startsWith(window.location.pathname.substring(1));
    }
}
