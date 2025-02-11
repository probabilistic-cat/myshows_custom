$(document).ready(function() {
    checkboxPropAndSave('name_stats');
    checkboxPropAndSave('name_status_label_old');
    checkboxPropAndSave('name_expand_show_lists');
    checkboxPropAndSave('name_expand_newsfeed');
    checkboxPropAndSave('view_compact');
    checkboxPropAndSave('view_navigation_remove');
    checkboxPropAndSave('view_style_old');
    checkboxPropAndSave('view_report_remove');
    checkboxPropAndSave('view_emoji_remove');
    checkboxPropAndSave('view_note_share_remove');
    checkboxPropAndSave('view_expand_seasons');
    checkboxPropAndSave('view_similar_remove');
    checkboxPropAndSave('view_best_comments_remove');
});

function checkboxPropAndSave(checkboxId) {
    let checkbox = $('#' + checkboxId);

    browser.storage.local.get(checkboxId).then(data => {
        checkbox.prop('checked', data[checkboxId] || false);
    });

    checkbox.on('change', function() {
        let checkboxValue = $(this).is(':checked');
        browser.storage.local.set({[checkboxId]: checkboxValue});
    });
}
