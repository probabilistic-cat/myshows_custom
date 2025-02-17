$(document).ready(function() {
    renderPopupHtml(optionList);
    setCheckboxesValues(optionList);
    handleCheckboxesChecks(optionList);
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

    for (const option of options) {
        html += '<div class="option" style="' + style + '">';
        html += '<input type="checkbox" id="' + option.id + '"> ' + option.name;
        html += '</div>';

        if (option.children) {
            html += getPopupHtml(option.children, marginLeft + 15);
        }
    }

    return html;
}

function setCheckboxesValues(options) {
    for (const option of options) {
        setCheckboxValue(option.id, option.default);

        if (option.children) {
            setCheckboxesValues(option.children)
        }
    }
}

function handleCheckboxesChecks(options) {
    for (const option of options) {
        const checkbox = $('#' + option.id);

        checkbox.on('change', function() {
            const checked = $(this).is(':checked');
            storageSet(option.id, checked);

            if (option.children) {
                for (const child of option.children) {
                    storageSet(child.id, checked);
                    setCheckboxValue(child.id);
                }
            }
        });

        if (option.children) {
            handleCheckboxesChecks(option.children)
        }
    }
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
