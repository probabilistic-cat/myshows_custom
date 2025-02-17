function viewCommonEmojiRemove() {
    if (isViewShowPage() || isViewRatingPage()) {
        $('.ShowDetails__reactions').hide();
    }
}
