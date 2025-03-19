const optionList = [
    {id: 'common_compact', name: {
        [LANG_EN]: 'Compact view',
        [LANG_RU]: 'Компактный вид',
        [LANG_UA]: 'Компактний вид',
    }, default: true},
    {id: 'common_classic_status_label', name: {
        [LANG_EN]: 'Classic show status icon',
        [LANG_RU]: 'Классический значок статуса сериала',
        [LANG_UA]: 'Класичний значок статусу серіалу',
    }, default: true},
    {id: 'profile', name: {
        [LANG_EN]: 'Profile',
        [LANG_RU]: 'Профиль',
        [LANG_UA]: 'Профіль',
    }, recursive: true, children: [
        {id: 'profile_stats', name: {
            [LANG_EN]: 'Statistics',
            [LANG_RU]: 'Статистика',
            [LANG_UA]: 'Статистика',
        }, default: true},
        {id: 'profile_expand_show_lists', name: {
            [LANG_EN]: 'Expand show lists',
            [LANG_RU]: 'Развернуть списки сериалов',
            [LANG_UA]: 'Розгорнути списки серіалів',
        }, default: true},
        {id: 'profile_news_hide', name: {
            [LANG_EN]: 'Hide news',
            [LANG_RU]: 'Скрыть новости',
            [LANG_UA]: 'Приховати новини',
        }, default: true},
        {id: 'profile_recommendations_hide', name: {
            [LANG_EN]: 'Hide recommendations',
            [LANG_RU]: 'Скрыть рекомендации',
            [LANG_UA]: 'Приховати рекомендації',
        }, default: true},
        {id: 'profile_expand_newsfeed', name: {
            [LANG_EN]: 'Expand newsfeed (old design)',
            [LANG_RU]: 'Развернуть ленту событий (старый дизайн)',
            [LANG_UA]: 'Розгорнути останні події (старий дизайн)',
        }, default: false},
    ]},
    {id: 'view', name: {
        [LANG_EN]: 'Show pages',
        [LANG_RU]: 'Страницы сериала',
        [LANG_UA]: 'Сторінки серіалу',
    }, recursive: true, children: [
        {id: 'view_navigation_hide', name: {
            [LANG_EN]: 'Hide navigation',
            [LANG_RU]: 'Скрыть навигацию',
            [LANG_UA]: 'Приховати навігацію',
        }, default: true},
        {id: 'view_poster_info_compact', name: {
            [LANG_EN]: 'Compact poster and info',
            [LANG_RU]: 'Компактный постер и инфо',
            [LANG_UA]: 'Компактний постер та інфо',
        }, default: true},
        {id: 'view_report_hide', name: {
            [LANG_EN]: 'Hide report panel',
            [LANG_RU]: 'Скрыть "Нашли ошибку?"',
            [LANG_UA]: 'Приховати "Знайшли помилку?"',
        }, default: true},
        {id: 'view_emoji_hide', name: {
            [LANG_EN]: 'Hide emoji panel',
            [LANG_RU]: 'Скрыть эмоджи',
            [LANG_UA]: 'Приховати емоджі',
        }, default: true},
        {id: 'view_note_share_hide', name: {
            [LANG_EN]: 'Hide note and share panel',
            [LANG_RU]: 'Скрыть "Написать заметку" и "Поделиться"',
            [LANG_UA]: 'Приховати "Написати нотатку" и "Поділитися"',
        }, default: true},
        {id: 'view_expand_seasons', name: {
            [LANG_EN]: 'Expand all seasons',
            [LANG_RU]: 'Развернуть все сезоны',
            [LANG_UA]: 'Розгорнути всі сезони',
        }, default: true},
        {id: 'view_similar_hide', name: {
            [LANG_EN]: 'Hide similar shows',
            [LANG_RU]: 'Скрыть похожие сериалы',
            [LANG_UA]: 'Приховати схожі серіали',
        }, default: true},
        {id: 'view_best_comments_hide', name: {
            [LANG_EN]: 'Hide best  comments',
            [LANG_RU]: 'Скрыть лучшие комментарии',
            [LANG_UA]: 'Приховати кращі коментарі',
        }, default: true},
        {id: 'view_rating_accurate', name: {
            [LANG_EN]: 'Accurate rating',
            [LANG_RU]: 'Точный рейтинг серий',
            [LANG_UA]: 'Точний рейтинг серій',
        }, default: true, children: [
            {id: 'view_rating_bars', name: {
                [LANG_EN]: 'Rating bars',
                [LANG_RU]: 'Рейтинг столбиками',
                [LANG_UA]: 'Рейтинг стовпчиками',
            }, default: true, requireParent: true, children: [
                {id:'view_rating_bars_specials', name: {
                    [LANG_EN]: 'Specials',
                    [LANG_RU]: 'Спешалы',
                    [LANG_UA]: 'Спешали',
                }, default: false, requireParent: true},
            ]},
        ]},
    ]},
];
