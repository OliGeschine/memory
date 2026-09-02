export function renderGameLayout(selectedTheme: string): string {
    return `
    <section id="game" class="game theme--${selectedTheme}">
    <div class="game__header">
        <div class="game__header__score">
            <div class="game__header__score--player">
                <img id="blue_player_image">
                <div class="game__header__score--player--blue">
                <span id="blue-player-text"></span>
                <span id="blue-score"></span></div>
            </div>
            <div class="game__header__score--player">
                <img id="orange_player_image">
                <div class="game__header__score--player--orange">
                <span id="orange-player-text"></span>
                <span id="orange-score"></span></div>
            </div>
        </div>
        <div class="game__header--player">
            <span>Current player:</span>
            <img>
        </div>
        <div class="game__header--exitBtn">
            <img src="dist/assets/icons/exit.svg">
            <div>Exit Game</div>
        </div>
    </div>
    <div class="game__field" id="game_field"></div>
    <div class="game__exitoverlay--container"></div>
    <div class="game__gameover--container"></div>
    </section>
    `;
}