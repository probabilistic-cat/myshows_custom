class View {
    static styleOld() {
        ViewEpisode.styleOld();
        ViewShow.styleOld();
    }

    static removeEmoji() {
        ViewShow.removeEmoji();
        ViewRating.removeEmoji()
    }

    static removeNoteShare() {
        ViewEpisode.removeNoteShare();
        ViewShow.removeNoteShare();
    }

    static removeBestComments() {
        ViewShow.removeBestComments();
        ViewRating.removeBestComments();
    }


    static removeEmojiCommon() {
        $('.ShowDetails__reactions').hide();
    }

    static pageMainWider(widthAsidePercent = 0.25) {
        const content = $('div.DefaultLayout__content');
        const pageMain = $('main.Page__main');
        const pageAside = $('aside.Page__aside');
        const pageAsideWidth = content.width() * widthAsidePercent;

        pageAside.css('width', pageAsideWidth + 'px');
        pageMain.css('max-width', 'calc(100% - ' + pageAsideWidth + 'px)');
    }

    static InfoTable() {
        const infoTable = $('table.info-table');
        infoTable.find('td').css({'font-size': '14px', 'padding': '1px 0'});
        infoTable.find('td.info-row__title').css({'width': '140px'});
        infoTable.find('td.info-row__value').css({'width': 'auto'});
        infoTable.parent().css({
            'margin-top': '10px',
            'border-bottom': '0',
        });
    }
}
