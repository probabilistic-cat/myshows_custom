let statsStateKey = 'statsState';

$(document).ready(function() {
    let statsCheckbox = $('#stats');

    browser.storage.local.get(statsStateKey).then(data => {
        statsCheckbox.prop('checked', data[statsStateKey] || false);
    });

    statsCheckbox.change(function() {
        let statsStatus = $(this).is(':checked');
        browser.storage.local.set({[statsStateKey]: statsStatus});
    });
});
