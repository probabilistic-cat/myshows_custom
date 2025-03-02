class ProfileEdit {
    static compact() {
        if (this.#isProfileEditPage()) {
            $('.Field').css({'padding': '9px 0'});
        }
    }

    static #isProfileEditPage() {
        return window.location.pathname === '/profile/edit/';
    }
}
