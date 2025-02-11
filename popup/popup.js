const optionsList = [
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
    ]},
];

$(document).ready(function() {
    renderPopupHtml(optionsList);
    setCheckboxesValues(optionsList);
    handleCheckboxesChecks(optionsList);
});

function renderPopupHtml(options) {
    const html = getPopupHtml(options, 0);
    $('body').html(html);
}

function getPopupHtml(options, marginLeft) {
    let html = '';

    let style = 'margin-left: ' + marginLeft + 'px; ';
    if (marginLeft === 0) {
        style += 'margin-top: 10px; margin-bottom: 5px; font-weight: bold; ';
    }

    options.forEach(function(option) {
        html += '<div class="option" style="' + style + '">';
        html += '<input type="checkbox" id="' + option.id + '"> ' + option.name;
        html += '</div>';

        if (option.children) {
            html += getPopupHtml(option.children, marginLeft + 15);
        }
    });

    return html;
}

function setCheckboxesValues(options) {
    options.forEach(function(option) {
        setCheckboxValue(option.id, option.default);

        if (option.children) {
            setCheckboxesValues(option.children)
        }
    });
}

function handleCheckboxesChecks(options) {
    options.forEach(function(option) {
        const checkbox = $('#' + option.id);

        checkbox.on('change', function() {
            const checked = $(this).is(':checked');
            storageSet(option.id, checked);

            if (option.children) {
                option.children.forEach(function(subOption) {
                    storageSet(subOption.id, checked);
                    setCheckboxValue(subOption.id);
                });
            }
        });

        if (option.children) {
            handleCheckboxesChecks(option.children)
        }
    });
}

function setCheckboxValue(id, defaultValue) {
    storageGet(id, function(value) {
        if (value === undefined) {
            value = (defaultValue !== undefined) ? defaultValue : false;
            storageSet(id, value);
        }
        $('#' + id).prop('checked', value);
    });
}

function storageGet(id, callbackFunc) {
    browser.storage.local.get(id).then(data => {
        callbackFunc(data[id]);
    });
}

function storageSet(id, value) {
    browser.storage.local.set({[id]: value});
}
