export function getExitOverlays(selectedTheme: string): string {
    return `
    <div class="game__exitoverlay theme--${selectedTheme}">
        <div class="game__exitoverlay--content">
        <span>Are you sure you want<br/>to quit the game?</span>
        <div class="game__exitoverlay--buttons">
            <button class="game__exitoverlay--cancel">Back to game</button>
            <button class="game__exitoverlay--confirm">Exit game</button>
        </div>
    </div>
    </div>`;
}

export function getGameOverOverlay(selectedTheme: string): string {
    return `
    <div class="game__gameoveroverlay theme--${selectedTheme}">
        <div class="game__gameoveroverlay--content">
            <h5>Game Over</h5>
            <span>Final score</span>
            <div class="game__header__score">
             <div class="game__header__score--player">
                <img id="finalscore-blue-icon">
                <div class="game__header__score--player--blue">
                <span id="blue-player-text"></span>
                <span id="finalscore-blue">0</span></div>
            </div>
            <div class="game__header__score--player">
                <img id="finalscore-orange-icon">
                <div class="game__header__score--player--orange">
                <span id="orange-player-text"></span>
                <span id="finalscore-orange">0</span></div>
            </div>
            </div>
        </div>
    </div>`;
}

export function getWinnerOverlay(selectedTheme: string): string {
    return `
    <div class="game__winner theme--${selectedTheme}">
        <div class="game__winner--content">
            <img id="winner-icon">
            <span>The winner is</span>
            <span id="winner-name"></span>
            <div class="game__winner--homebtn">
                <span id="homebtn-text"></span>
            </div>
        </div>
    </div>`;
}