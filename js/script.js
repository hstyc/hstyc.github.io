//
// "Seek, and you will find; knock, and the door will be opened to you."
// "A secret known by three is no longer a secret."
document.addEventListener('contextmenu', event => event.preventDefault());

document.onkeydown = function (e) {
    if (e.keyCode === 123 || (e.ctrlKey && e.shiftKey && (e.keyCode === 'I'.charCodeAt(0) || e.keyCode === 'J'.charCodeAt(0))) || (e.ctrlKey && e.keyCode === 'U'.charCodeAt(0))) {
        return false;
    }
};

const enterButton = document.getElementById('enter-button');
const riddleContainer = document.getElementById('riddle-container');
const initialScreen = document.getElementById('initial-screen');
const bottomRiddle = document.getElementById('bottom-riddle-container');
const riddleTextElement = document.getElementById('riddle-text');

const originalRiddleHTML = 'L, you know that gods of death eat only <span id="apples-word">apples?</span>';
const newRiddleHTML = 'L, do you know eat only apples gods <span id="death-phrase">of death?</span>';
let isOriginalText = true;

function showBottomRiddle() {
    bottomRiddle.classList.remove('hidden');
    bottomRiddle.classList.add('visible');
}

function hideBottomRiddle() {
    bottomRiddle.classList.remove('visible');
    setTimeout(() => {
        if (!bottomRiddle.classList.contains('visible')) {
            bottomRiddle.classList.add('hidden');
        }
    }, 500); // Match CSS transition time
}

function setupListeners() {
    const applesWord = document.getElementById('apples-word');
    const deathPhrase = document.getElementById('death-phrase');

    if (applesWord) {
        applesWord.addEventListener('mouseover', () => {
            if (isOriginalText) {
                riddleTextElement.innerHTML = newRiddleHTML;
                isOriginalText = false;
                setupListeners(); // Re-run to find the new #death-phrase element
            }
            showBottomRiddle();
        });
    }
    
    if (deathPhrase) {
        deathPhrase.addEventListener('mouseover', showBottomRiddle);
    }
}

riddleContainer.addEventListener('mouseleave', () => {
    if (!isOriginalText) {
        riddleTextElement.innerHTML = originalRiddleHTML;
        isOriginalText = true;
        setupListeners();
    }
    hideBottomRiddle();
});

// Initial setup
setupListeners();

enterButton.addEventListener('click', function() {
    const mainContent = document.getElementById('main-content');
    const audio = document.getElementById('background-audio');
    
    const rect = enterButton.getBoundingClientRect();
    const buttonCenterX = rect.left + rect.width / 2;
    const buttonCenterY = rect.top + rect.height / 2;
    for (let i = 0; i < 35; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        particle.innerHTML = '🩸';
        particle.style.left = `${buttonCenterX}px`;
        particle.style.top = `${buttonCenterY}px`;
        const x = (Math.random() - 0.5) * (window.innerWidth / 2);
        const y = (Math.random() - 0.5) * (window.innerHeight / 2);
        particle.style.setProperty('--x', `${x}px`);
        particle.style.setProperty('--y', `${y}px`);
        document.body.appendChild(particle);
        setTimeout(() => particle.remove(), 1200);
    }

    enterButton.classList.add('fading-out');
    riddleContainer.classList.add('fading-out');
    enterButton.style.pointerEvents = 'none';

    setTimeout(() => {
        initialScreen.classList.add('exiting');
        mainContent.classList.remove('hidden');
        audio.play();
    }, 200);

    setTimeout(() => {
        initialScreen.style.display = 'none';
    }, 1000);
});
