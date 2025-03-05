class ViewCommon
{
    static LANG_BEST_COMMENTS = {
        [LANG_EN]: 'Best comments',
        [LANG_RU]: 'Лучшие комментарии',
        [LANG_UA]: 'Кращі коментарі',
    };

    static removeEmoji() {
        $('.ShowDetails__reactions').hide();
    }

    static fixNavigation() {
        $('.ShowDetails').children(':first').css({'width': '100%'});
    }

    static pageMainWider(widthAsidePercent = 0.25) {
        const content = $('.DefaultLayout__content');
        const pageMain = $('.Page__main');
        const pageAside = $('.Page__aside');
        const pageAsideWidth = content.width() * widthAsidePercent;

        pageAside.css('width', pageAsideWidth + 'px');
        pageMain.css('max-width', 'calc(100% - ' + pageAsideWidth + 'px)');
    }

    static InfoTable() {
        const infoTable = $('.info-table');
        infoTable.find('td').css({'font-size': '14px', 'padding': '1px 0'});
        infoTable.find('td.info-row__title').css({'width': '140px'});
        infoTable.find('td.info-row__value').css({'width': 'auto'});
        infoTable.parent().css({
            'margin-top': '10px',
            'border-bottom': '0',
        });
    }
}
