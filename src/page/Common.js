class Common {
    static #HOSTNAME_OLD = 'old.myshows.me';
    static #HOSTNAME_NEW = 'myshows.me';

    static classicStatusLabel() {
        if (this.#isOld()) {
            Utils.addGlobalCss([
                'sup.status {background-color: transparent !important; background-position-x: -60px !important;}',
            ]);
        }

        if (this.#isNew()) {
            Utils.addGlobalCss([
                '.ShowStatusLabel.ShowStatusLabel--onair::before, .ShowStatusLabel.ShowStatusLabel--pilot::before, '
                + '.ShowStatusLabel.ShowStatusLabel--new::before, .ShowStatusLabel.ShowStatusLabel--dead::before, '
                + '.ShowStatusLabel.ShowStatusLabel--paused::before '
                + '{width: 20px; height: 7px; content: ""; background: url(/shared/img/fe/statuses.png) no-repeat 0 0; '
                + 'background-position-x: -60px;}',
                '.ShowStatusLabel.ShowStatusLabel--pilot::before {background-position-y: -20px;}',
                '.ShowStatusLabel.ShowStatusLabel--new::before {background-position-y: -40px;}',
                '.ShowStatusLabel.ShowStatusLabel--dead::before {background-position-y: -60px;}',
                '.ShowStatusLabel.ShowStatusLabel--paused::before {background-position-y: -80px; border: 0}',
            ]);
        }
    }

    static #isOld() {
        return window.location.hostname === this.#HOSTNAME_OLD;
    }

    static #isNew() {
        return window.location.hostname === this.#HOSTNAME_NEW;
    }
}
