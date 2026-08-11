import '../scss/main.scss';
import { renderStartscreenLayout } from '../templates/startscreen';
import { renderSettingsLayout } from '../templates/settings';
import { renderGameLayout, flippAnimation } from '../templates/game';

function init() {
    getStartscreen();
}

// Init beim Laden der Seite
window.addEventListener('DOMContentLoaded', init);

function getStartscreen() {
    const main = document.querySelector('main');
    if (main) {
        main.innerHTML = renderStartscreenLayout();
    }
}

