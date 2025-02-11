const optionsList = [
    {'id': 'name', 'name': 'Профиль', 'children': [
        {'id': 'name_stats', 'name': 'Статистика'},
        {'id': 'name_status_label_old', 'name': 'Старый значок статуса сериала (в старом дизайне)'},
        {'id': 'name_expand_show_lists', 'name': 'Раскрывать списки сериалов'},
        {'id': 'name_expand_newsfeed', 'name': 'Раскрывать ленту событий'},
    ]},
    {'id': 'view', 'name': 'Страницы сериала', 'children': [
        {'id': 'view_compact', 'name': 'Компактный вид'},
        {'id': 'view_navigation_remove', 'name': 'Убрать навигацию'},
        {'id': 'view_style_old', 'name': 'Старый стиль'},
        {'id': 'view_report_remove', 'name': 'Убрать "Нашли ошибку?"'},
        {'id': 'view_emoji_remove', 'name': 'Убрать эмоджи'},
        {'id': 'view_note_share_remove', 'name': 'Убрать "Написать заметку" и "Поделиться"'},
        {'id': 'view_expand_seasons', 'name': 'Раскрывать все сезоны на странице сериала'},
        {'id': 'view_similar_remove', 'name': 'Убрать похожие сериалы'},
        {'id': 'view_best_comments_remove', 'name': 'Убрать лучшие комментарии'},
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
        setCheckboxValue(option.id);

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

function setCheckboxValue(id) {
    storageGet(id, function(value) {
        $('#' + id).prop('checked', value || false);
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
