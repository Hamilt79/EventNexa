class NavMenu {
    static logout() {
        Cookies.setCookie(Cookies.COOKIE_NAME_E.username, "", 0);
        Cookies.setCookie(Cookies.COOKIE_NAME_E.password, "", 0);
        Network.goToLogin();
    }
}