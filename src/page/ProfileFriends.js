class ProfileFriends {
    static compact() {
        if (this.#isProfileFriendsPage()) {
            $('.FeedItem:not(:last-child)').css({'margin-bottom': '5px', 'padding-bottom': '5px'});
            $('.Feed-group').css({'padding': '9px 0'});
        }
    }

    static #isProfileFriendsPage() {
        return window.location.pathname === '/profile/friends/';
    }
}
