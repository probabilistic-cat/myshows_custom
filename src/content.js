$(async() => {
    PageObserver.checkingTitleChange(async() => {
        await OptionHandler.enable();
    });
    await OptionHandler.enable();
});
