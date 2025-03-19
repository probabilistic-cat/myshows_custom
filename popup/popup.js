const VALUE_TRUE = true;
const VALUE_FALSE = false;
const VALUE_INDETERMINATE = 'indeterminate';

const POPUP_LANG_DEFAULT = LANG_RU;
const POPUP_LANG_KEY = 'lang';
const SELECTED_LANG_CLASS = 'lang_selected';

$(async() => {
    await renderLangsHtml();
    await renderOptionsHtml(optionList);
    await renderCheckboxesValues(optionList);
    await fixRecursiveValues(optionList);
    await handleLangChange();
    await handleCheckboxesChecks(optionList);
});

async function renderLangsHtml() {
    const popupLang = await getPopupLang();

    const langs = [LANG_EN, LANG_RU, LANG_UA];
    let html = '';
    for (const lang of langs) {
        let classes = '';
        classes += (popupLang === lang) ? ' ' + SELECTED_LANG_CLASS : '';
        html += '<div class="lang_item' + classes + '" data-value="' + lang + '">' + lang.toUpperCase() + '</div>';
    }

    $('.langs').html(html);
}

async function renderOptionsHtml(options) {
    const optionsHtml = await getOptionsHtml(options, 0);
    $('.options').html(optionsHtml);
}

async function getOptionsHtml(options, marginLeft) {
    const popupLang = await getPopupLang();
    let html = '';

    for (const option of options) {
        let style = 'margin-left: ' + marginLeft + 'px; ';
        if ((marginLeft === 0) && option.hasOwnProperty('children')) {
            style += 'margin-top: 10px; margin-bottom: 5px; font-weight: bold; ';
        }

        html += '<div class="option" style="' + style + '">';
        html += '<input class="checkbox" type="checkbox" id="' + option.id + '">';
        html += '<span id="title_' + option.id + '">' + option.name[popupLang] + '</span>';
        html += '</div>';

        if (option.hasOwnProperty('children')) {
            html += await getOptionsHtml(option.children, marginLeft + 15);
        }
    }

    return html;
}

async function handleLangChange() {
    $('.lang_item').on('click', async function() {
        $('.lang_item').each(function() {
            $(this).removeClass(SELECTED_LANG_CLASS);
        });

        $(this).addClass(SELECTED_LANG_CLASS);
        await setStorageData(POPUP_LANG_KEY, $(this).attr('data-value'));

        await renderCheckboxesTitles(optionList);
    });
}

async function renderCheckboxesTitles(options) {
    const popupLang = await getPopupLang();
    for (const option of options) {
        $('#title_' + option.id).html(option.name[popupLang]);

        if (option.hasOwnProperty('children')) {
            await renderCheckboxesTitles(option.children);
        }
    }
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

async function handleCheckboxesChecks(options, parents = []) {
    for (const option of options) {
        const checkbox = $('#' + option.id);

        checkbox.on('change', async function() {
            const value = $(this).is(':checked');
            await setOptionValueRecursive(option, value);

            let child = option;
            let parent = null;
            for (let i = parents.length - 1; i >= 0; i--) {
                parent = parents[i];
                const parentValue = await getStorageData(parent.id);
                if (
                    child.hasOwnProperty('requireParent') && child.requireParent === true
                    && parentValue === VALUE_FALSE && value === VALUE_TRUE
                ) {
                    await setOptionValue(parent.id, value);
                }

                child = parent;
            }

            await fixRecursiveValues(optionList);
        });

        if (option.children) {
            await handleCheckboxesChecks(option.children, [...parents, option]);
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

        await disableChildrenWhatRequireParent(option, value);
    }
}

async function disableChildrenWhatRequireParent(option, value) {
    if (option.hasOwnProperty('children')) {
        for (const child of option.children) {
            if (child.hasOwnProperty('requireParent') && child.requireParent === true && value === VALUE_FALSE) {
                await setOptionValue(child.id, value);
                await disableChildrenWhatRequireParent(child, value);
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
                    const childValue = await getStorageData(child.id);
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

async function getPopupLang() {
    let popupLang = await getStorageData(POPUP_LANG_KEY);
    return (popupLang === undefined) ? POPUP_LANG_DEFAULT : popupLang;
}

async function getStorageData(id) {
    return await CrossBrowser.getStorageData(id);
}

async function setStorageData(id, value) {
    await CrossBrowser.setStorageData(id, value);
}
