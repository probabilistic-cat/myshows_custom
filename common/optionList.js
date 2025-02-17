const optionList = [
    {id: 'name', name: 'Профиль', children: [
        {id: 'name_stats', name: 'Статистика', default: true},
        {id: 'name_status_label_old', name: 'Старый значок статуса сериала (в старом дизайне)', default: true},
        {id: 'name_expand_show_lists', name: 'Раскрывать списки сериалов', default: true},
        {id: 'name_expand_newsfeed', name: 'Раскрывать ленту событий', default: false},
    ]},
    {id: 'view', name: 'Страницы сериала', children: [
        {id: 'view_compact', name: 'Компактный вид', default: true},
        {id: 'view_navigation_remove', name: 'Убрать навигацию', default: true},
        {id: 'view_style_old', name: 'Старый стиль', default: true},
        {id: 'view_report_remove', name: 'Убрать "Нашли ошибку?"', default: true},
        {id: 'view_emoji_remove', name: 'Убрать эмоджи', default: true},
        {id: 'view_note_share_remove', name: 'Убрать "Написать заметку" и "Поделиться"', default: true},
        {id: 'view_expand_seasons', name: 'Раскрывать все сезоны на странице сериала', default: true},
        {id: 'view_similar_remove', name: 'Убрать похожие сериалы', default: true},
        {id: 'view_best_comments_remove', name: 'Убрать лучшие комментарии', default: true},
        {id: 'view_accurate_rating', name: 'Точный рейтинг серий (+ рейтинг столбиками)', default: true},
    ]},
];
