class Network {
    static domainName = 'https://eventnexa.tech/';
    //static domainName = 'http://192.168.65.26:3000/';

    /**
     * Redirects the user to a url
     * 
     * @param {String} url url to redirect to
     */
    static redirect(url) {
        window.location.href = url;
        //console.log(url);
    }

    /**
     * Redirects the user to a local url from the domain
     * 
     * @param {String} url local url to redirect to 
     */
    static redirectLocal(url) {
        this.redirect(this.domainName + url);
    }

    /**
    * Redirects the user to registration page.
    */
    static goToRegistration() {
        Network.redirectLocal('registration/registration.html');
    }

    /**
     * Redirects user to login page
    */
    static goToLogin() {
        Network.redirectLocal('login/login.html');
    }

    /**
     * Redirects the user to profile page
     */
    static goProfile() {
        Network.redirectLocal('profile/profile.html');
    }

    static goHome() {
        Network.redirectLocal('');
    }
}