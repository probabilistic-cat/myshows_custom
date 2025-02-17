function isViewEpisodePage() {
    const viewShowPage = new RegExp(`^/view/episode/\\d+/$`);
    return viewShowPage.test(window.location.pathname);
}
