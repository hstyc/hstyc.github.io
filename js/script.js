document.addEventListener('contextmenu', event => event.preventDefault());

document.onkeydown = function (e) {
    if (e.keyCode == 123) {
        return false;
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)) {
        return false;
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)) {
        return false;
    }
    if (e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)) {
        return false;
    }
}

document.getElementById('enter-button').addEventListener('click', function() {
    const initialScreen = document.getElementById('initial-screen');
    const mainContent = document.getElementById('main-content');
    const audio = document.getElementById('background-audio');
    
    initialScreen.style.opacity = '0';
    setTimeout(() => {
        initialScreen.style.display = 'none';
    }, 500);

    mainContent.classList.remove('hidden');
    
    audio.play();
});