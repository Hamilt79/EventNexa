class Network {
    static domainName = 'https://eventnexa.tech/';

    /**
     * Redirects the user to a url
     * 
     * @param {String} url url to redirect to
     */
    static redirect(url) {
        window.location.href = url;
    }

    /**
     * Redirects the user to a local url from the domain
     * 
     * @param {String} url local url to redirect to 
     */
    static redirectLocal(url) {
        this.redirect(this.domainName + url);
    }
}