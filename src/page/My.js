class My
{
    static compact() {
        if (this.#isMyPage()) {
            $('.UnwatchedEpisodeItem').css({'padding': '4px 10px'});
        }
    }

    static #isMyPage() {
        return window.location.pathname === '/my/';
    }
}
