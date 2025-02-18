const VALUE_TRUE = true;
const VALUE_FALSE = false;
const VALUE_INDETERMINATE = 'indeterminate';

$(async function() {
    renderPopupHtml(optionList);
    await renderCheckboxesValues(optionList);
    await fixRecursiveValues(optionList);
    await handleCheckboxesChecks(optionList);
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

async function renderCheckboxesValues(options) {
    for (const option of options) {
        let value = await getStorageData(option.id);
        if (value === undefined) {
            value = (option.default !== undefined) ? option.default : VALUE_FALSE;
        }

        await setOptionValue(option.id, value);

        if (option.hasOwnProperty('children')) {
            await renderCheckboxesValues(option.children)
        }
    }
}

async function handleCheckboxesChecks(options, parent = null) {
    for (const option of options) {
        const checkbox = $('#' + option.id);

        checkbox.on('change', async function() {
            const value = $(this).is(':checked');
            await setOptionValueRecursive(option, value);

            const parentValue = (parent !== null) ? await getStorageData(parent.id) : null;
            if (
                option.hasOwnProperty('requireParent') && option.requireParent === true
                && parentValue === VALUE_FALSE && value === VALUE_TRUE
            ) {
                await setOptionValue(parent.id, value);
            }

            await fixRecursiveValues(optionList);
        });

        if (option.children) {
            await handleCheckboxesChecks(option.children, option);
        }
    }
}

async function setOptionValueRecursive(option, value) {
    await setOptionValue(option.id, value);

    if (option.hasOwnProperty('children')) {
        if (option.hasOwnProperty('recursive') && option.recursive === true) {
            for (const child of option.children) {
                await setOptionValueRecursive(child, value);
            }
        }
        for (const child of option.children) {
            if (child.hasOwnProperty('requireParent') && child.requireParent === true && value === VALUE_FALSE) {
                await setOptionValue(child.id, value);
            }
        }
    }
}

async function fixRecursiveValues(options) {
    for (const option of options) {
        if (option.hasOwnProperty('children')) {
            if (option.hasOwnProperty('recursive') && option.recursive === true) {
                let allChildsTrue = true;
                let allChildsFalse = true;

                for (const child of option.children) {
                    let childValue = await getStorageData(child.id);
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

                await setOptionValue(option.id, value);
            }

            await fixRecursiveValues(option.children);
        }
    }
}

async function setOptionValue(id, value) {
    await setStorageData(id, value);
    renderCheckboxValue(id, value);
}

function renderCheckboxValue(id, value) {
    const checkbox = $('#' + id);
    if (value === VALUE_INDETERMINATE) {
        checkbox.prop('indeterminate', true);
    } else {
        checkbox.prop('indeterminate', false);
        checkbox.prop('checked', value);
    }
}

async function getStorageData(id) {
    let data = await browser.storage.local.get(id);
    return data[id];
}

async function setStorageData(id, value) {
    await browser.storage.local.set({[id]: value});
}
