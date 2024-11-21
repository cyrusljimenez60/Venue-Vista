window.onload = function() {
    var titleElement = document.getElementsByClassName('title')[0];
    if (titleElement) {
        titleElement.classList.add('animate-Up');
    }

    var subtitleElement = document.getElementsByClassName('subtitle')[0];
    if (subtitleElement) {
        subtitleElement.classList.add('animate-Down');
    }
};