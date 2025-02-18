const VALUE_TRUE = true;
const VALUE_FALSE = false;
const VALUE_INDETERMINATE = 'indeterminate';

$(document).ready(function() {
    renderPopupHtml(optionList);
    renderCheckboxesValues(optionList);
    //fixRecursiveValues(optionList);
    handleCheckboxesChecks(optionList);
});

function renderPopupHtml(options) {
    const html = getPopupHtml(options, 0);
    $('div.container').html(html);
}

function getPopupHtml(options, marginLeft) {
    let html = '';

    let style = 'margin-left: ' + marginLeft + 'px; ';
    if (marginLeft === 0) {
        style += 'margin-top: 10px; margin-bottom: 5px; font-weight: bold; ';
    }

    for (const option of options) {
        html += '<div class="option" style="' + style + '">';
        html += '<input class="checkbox" type="checkbox" id="' + option.id + '"> ' + option.name;
        html += '</div>';

        if (option.children) {
            html += getPopupHtml(option.children, marginLeft + 15);
        }
    }

    return html;
}

function renderCheckboxesValues(options) {
    for (const option of options) {
        renderCheckboxValue(option.id, option.default);

        if (option.hasOwnProperty('children')) {
            renderCheckboxesValues(option.children)
        }
    }
}

function handleCheckboxesChecks(options, parent = null) {
    for (const option of options) {
        const parentValue = (parent !== null) ? getCheckboxValue(parent.id) : null;
        const checkbox = $('#' + option.id);

        checkbox.on('change', function() {
            const value = $(this).is(':checked');
            setOptionValueRecursive(option, value);

            if (
                option.hasOwnProperty('requireParent') && option.requireParent === true
                && parentValue === VALUE_FALSE && value === VALUE_TRUE
            ) {
                setOptionValue(parent.id, value);
            }

            //fixRecursiveValues(optionList);
        });

        if (option.children) {
            handleCheckboxesChecks(option.children, option);
        }
    }
}

function getCheckboxValue(id) {
    const checkbox = $('#' + id);
    if (checkbox.prop('indeterminate') === true) {
        return VALUE_INDETERMINATE;
    } else {
        return checkbox.prop('checked');
    }
}

function setOptionValue(id, value) {
    storageSet(id, value);
    renderCheckboxValue(id);
}

function setOptionValueRecursive(option, value) {
    setOptionValue(option.id, value);

    if (option.hasOwnProperty('children')) {
        if (option.hasOwnProperty('recursive') && option.recursive === true) {
            for (const child of option.children) {
                setOptionValueRecursive(child, value);
            }
        }
        for (const child of option.children) {
            if (child.hasOwnProperty('requireParent') && child.requireParent === true && value === VALUE_FALSE) {
                setOptionValue(child.id, value);
            }
        }
    }
}

function fixRecursiveValues(options) {
    for (const option of options) {
        if (option.hasOwnProperty('children')) {
            if (option.hasOwnProperty('recursive') && option.recursive === true) {
                let allChildsTrue = true;
                let allChildsFalse = true;

                for (const child of option.children) {
                    const childValue = getCheckboxValue(child.id);
                    if (childValue !== VALUE_TRUE) {
                        allChildsTrue = false;
                    }
                    if (childValue !== VALUE_FALSE) {
                        allChildsFalse = false;
                    }
                }

                let value = VALUE_INDETERMINATE;
                if (allChildsTrue === true) {
                    value = VALUE_TRUE;
                }
                if (allChildsFalse === true) {
                    value = VALUE_FALSE;
                }

                setOptionValue(option.id, value);
            }

            fixRecursiveValues(option.children);
        }
    }
}

function renderCheckboxValue(id, defaultValue) {
    storageGet(id, function(value) {
        if (value === undefined) {
            value = (defaultValue !== undefined) ? defaultValue : VALUE_FALSE;
            storageSet(id, value);
        }

        const checkbox = $('#' + id);
        if (value === VALUE_INDETERMINATE) {
            checkbox.prop('indeterminate', true);
        } else {
            checkbox.prop('indeterminate', false);
            checkbox.prop('checked', value);
        }
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
