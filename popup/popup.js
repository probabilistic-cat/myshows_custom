$(document).ready(function() {
    checkboxPropAndSave('stats');
    checkboxPropAndSave('status_label_old');
    checkboxPropAndSave('expand_show_lists');
});

function checkboxPropAndSave(checkboxId) {
    let checkbox = $('#' + checkboxId);

    browser.storage.local.get(checkboxId).then(data => {
        checkbox.prop('checked', data[checkboxId] || false);
    });

    checkbox.change(function() {
        let checkboxValue = $(this).is(':checked');
        browser.storage.local.set({[checkboxId]: checkboxValue});
    });
}
