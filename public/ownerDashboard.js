function logoutOwner(){
    localStorage.removeItem("loggedIn")
    localStorage.removeItem("email")
    window.location.href= 'ownerLogin.html'
}