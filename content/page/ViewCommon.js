class ViewCommon
{
    static LANG_BEST_COMMENTS = {
        [LANG_EN]: 'Top Comments',
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

    static infoTable() {
        const infoTable = $('.InfoTable');
        infoTable.find('td, th').css({'font-size': '14px', 'padding': '1px 0'});
        infoTable.find('.InfoRow__title').css({'width': '140px'});
        infoTable.find('.InfoRow__value').css({'width': 'auto'});
    }

    static posterFavoriteButton() {
        $('.FavoriteButton').css({'top': '12px', 'right': '14px'});
    }
}
