function redirectIfNoCookie() {
    if (Cookies.getCookie(Cookies.COOKIE_NAME_E.username) == "" || Cookies.getCookie(Cookies.COOKIE_NAME_E.password) == "") {
        Network.goToLogin();
    }
}

window.onload = redirectIfNoCookie;