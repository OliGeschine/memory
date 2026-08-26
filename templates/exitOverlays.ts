export function getExitOverlays(): string {
    return `
    <div class="game__exitoverlay">
        <span>Are you sure you want to quit the game?</span>
        <div class="game__exitoverlay--buttons">
            <button class="game__exitoverlay--cancel">Back to game</button>
            <button class="game__exitoverlay--confirm">Exit game</button>
        </div>
    </div>`;
}