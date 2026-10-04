/**
 * Creates the HTML layout for the exit confirmation overlay.
 * @param selectedTheme The selected game theme.
 * @returns The HTML content for the exit confirmation overlay.
 */
export function getExitOverlays(selectedTheme) {
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
/**
 * Creates the HTML layout for the game over overlay.
 * @param selectedTheme The selected game theme.
 * @returns The HTML content for the game over overlay.
 */
export function getGameOverOverlay(selectedTheme) {
    return `
    <div class="game__gameoveroverlay theme--${selectedTheme}">
        <div class="game__gameoveroverlay--content">
            <h5>Game Over</h5>
            <span>Final score</span>
            <div class="game__header__score">
             <div class="game__header__score--player">
                <img id="finalscore-blue-icon">
                <div class="game__header__score--player--blue">
                <span id="final-blue-player-text"></span>
                <span id="finalscore-blue">0</span></div>
            </div>
            <div class="game__header__score--player">
                <img id="finalscore-orange-icon">
                <div class="game__header__score--player--orange">
                <span id="final-orange-player-text"></span>
                <span id="finalscore-orange">0</span></div>
            </div>
            </div>
        </div>
    </div>`;
}
/**
 * Creates the HTML layout for the winner overlay.
 * @param selectedTheme The selected game theme.
 * @returns The HTML content for the winner overlay.
 */
export function getWinnerOverlay(selectedTheme) {
    return `
    <div class="game__winner theme--${selectedTheme}">
        <div class="game__winner--content">
            <div id="winner-icon-container"></div>
            <span id="winner-text"></span>
            <span id="winner-name"></span>
            <img id="winner-icon">
            <div class="game__winner--homebtn">
                <span id="homebtn-text"></span>
            </div>
        </div>
    </div>`;
}
