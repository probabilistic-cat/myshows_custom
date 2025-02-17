class View {
    static removeEmoji() {
        ViewShow.removeEmoji();
        ViewRating.removeEmoji()
    }

    static removeBestComments() {
        ViewShow.removeBestComments();
        ViewRating.removeBestComments();
    }

    static removeEmojiCommon() {
        $('.ShowDetails__reactions').hide();
    }
}
