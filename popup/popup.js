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
