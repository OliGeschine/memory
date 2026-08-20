export function renderGameLayout(): string {
    return `
    <section id="game" class="game">
    <div class="game__header">
        <div class="game__header__score">
            <div class="game__header__score--player">
                <img src="dist/assets/icons/blue_player.svg">
                <div class="game__header__score--player--blue">Blue: <span id="blue-score">0</span></div>
            </div>
            <div class="game__header__score--player">
                <img src="dist/assets/icons/orange_player.svg">
                <div class="game__header__score--player--orange">Orange: <span id="orange-score">0</span></div>
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
    </section>
    `;
}