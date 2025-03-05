class Profile
{
    static compact() {
        if (this.#isProfilePage()) {
            Utils.addGlobalCss(['.Unwatched-season ~ div .UnwatchedEpisodeItem {padding: 4px 10px 4px 20px;}']);
            $('.Col').css({'padding': '5px 0'});
        }
    }

    static #isProfilePage() {
        return window.location.pathname === '/profile/';
    }
}
