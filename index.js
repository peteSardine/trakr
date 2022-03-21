window.addEventListener('visibilitychange', function (e) {
    e.preventDefault();
    this.window.alert("this window is about to close");
    e.returnValue = '';
});