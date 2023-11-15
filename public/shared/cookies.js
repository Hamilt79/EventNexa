class Cookies {
    /**
     * Recieves a cookie
     * 
     * @param {String} cname Cookie name 
     * @returns Cookie value
     */
    static getCookie(cname) {
        let name = cname + "=";
        let decodedCookie = decodeURIComponent(document.cookie);
        let ca = decodedCookie.split(';');
        for(let i = 0; i <ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
        }
        return "";
    }

    /**
     * Stores a cookie
     * @param {String} cname Cookie name
     * @param {*} cvalue Cookie Value
     * @param {*} exdays Days till the cookie expires
     */
    static setCookie(cname, cvalue, exdays) {
        const d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        let expires = "expires="+d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }

    static COOKIE_NAME_E = {
        username: 'username',
        password: 'password'
    }

}