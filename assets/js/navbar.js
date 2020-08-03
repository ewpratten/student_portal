// Hide the auth-only nav content if not logged in
if (!cookieExists("auth_token_2")) {
    document.getElementById("navbar-auth-only").classList.add("hidden");
} else {
    document.getElementById("navbar-auth-only").classList.remove("hidden");
}