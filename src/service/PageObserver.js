class PageObserver {
    static checkingTitleChange(callbackFunc) {
        let oldHref = document.location.href;
        const observer = new MutationObserver(() => {
            if (oldHref !== document.location.href) {
                oldHref = document.location.href;
                window.dispatchEvent(new Event('locationchange'));
            }
        });

        observer.observe(document.querySelector('title'), {childList: true});

        window.addEventListener('locationchange', () => {
            callbackFunc();
        });
    }
}
