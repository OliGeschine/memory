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