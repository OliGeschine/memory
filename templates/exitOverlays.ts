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
            <span>Game Over</span>
            <div class="game__header__score">
             <div class="game__header__score--player">
                <img id="blue_player_image">
                <div class="game__header__score--player--blue">
                <span id="blue-player-text"></span>
                <span id="blue-score">0</span></div>
            </div>
            <div class="game__header__score--player">
                <img id="orange_player_image">
                <div class="game__header__score--player--orange">
                <span id="orange-player-text"></span>
                <span id="orange-score">0</span></div>
            </div>
            </div>
        </div>
    </div>`;
}