$(document).ready(async function() {
    PageObserver.checkingTitleChange(async () => {
        await OptionHandler.enable();
    });
    await OptionHandler.enable();
});
