class UserUtils {

    static getUsername() {
        return Cookies.getCookie(Cookies.COOKIE_NAME_E.username);
    }

    static getPassword() {
        return Cookies.getCookie(Cookies.COOKIE_NAME_E.password);
    }

}