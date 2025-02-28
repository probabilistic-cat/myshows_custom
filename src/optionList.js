const optionList = [
    {id: 'common', name: 'Общие', recursive: true, children: [
        {id: 'common_compact', name: 'Компактный вид', default: true},
        {id: 'common_classic_status_label', name: 'Классический значок статуса сериала', default: true},
    ]},
    {id: 'profile', name: 'Профиль', recursive: true, children: [
        {id: 'profile_stats', name: 'Статистика', default: true},
        {id: 'profile_expand_show_lists', name: 'Раскрывать списки сериалов', default: true},
        {id: 'profile_news_remove', name: 'Убрать новости', default: true},
        {id: 'profile_recommendations_remove', name: 'Убрать рекомендации', default: true},
        {id: 'profile_expand_newsfeed', name: 'Раскрывать ленту событий (в старом дизайне)', default: false},
    ]},
    {id: 'view', name: 'Страницы сериала', recursive: true, children: [
        {id: 'view_navigation_remove', name: 'Убрать навигацию', default: true},
        {id: 'view_style_old', name: 'Старый стиль', default: true},
        {id: 'view_report_remove', name: 'Убрать "Нашли ошибку?"', default: true},
        {id: 'view_emoji_remove', name: 'Убрать эмоджи', default: true},
        {id: 'view_note_share_remove', name: 'Убрать "Написать заметку" и "Поделиться"', default: true},
        {id: 'view_expand_seasons', name: 'Раскрывать все сезоны на странице сериала', default: true},
        {id: 'view_similar_remove', name: 'Убрать похожие сериалы', default: true},
        {id: 'view_best_comments_remove', name: 'Убрать лучшие комментарии', default: true},
        {id: 'view_accurate_rating', name: 'Точный рейтинг серий', default: true, children: [
            {id: 'view_accurate_rating_bars', name: 'Рейтинг столбиками', default: true, requireParent: true},
        ]},
    ]},
];
