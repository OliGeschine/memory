export function renderSettingsLayout(): string {
  return `
    <section class="settings">

        <div class="settings__headline">
            <h3>Settings</h3>
            <img class="settings__img" src="dist/assets/icons/settings_h3_line.svg"/>
        </div>
        <button id="return_btn" class="settings__btn">Back</button>

    <div class="settings__main">
        <div class="settings__overview">
            <div class="settings__choices">
                <div class="settings__choices--headline">
                    <img class="" src="dist/assets/icons/palette.svg"/>
                    <h4> Game themes</h4>
                </div>
                <div class="settings__choices--themes">
                    <div class="settings__choices__list">
                        <div class="settings__choices__circle"></div>
                        <span data-theme="0">Code vibes theme</span>
                        <div class="settings__choices__marker"></div>
                    </div>
                    <div class="settings__choices__list">
                        <div class="settings__choices__circle"></div>
                        <span data-theme="1">Gaming theme</span>
                        <div class="settings__choices__marker"></div>
                    </div>
                    <div class="settings__choices__list">
                        <div class="settings__choices__circle"></div>
                        <span data-theme="2">DA Projects theme</span>
                        <div class="settings__choices__marker"></div>
                    </div>
                    <div class="settings__choices__list">
                        <div class="settings__choices__circle"></div>
                        <span data-theme="3">Foods theme</span>
                        <div class="settings__choices__marker"></div>
                    </div>
                </div>
            </div>
            <div class="settings__choices">
                <div class="settings__choices--headline">
                    <img class="" src="dist/assets/icons/chess_pawn.svg"/>
                    <h4>Choose player</h4>
                </div>
                <div class="settings__choices--players">
                    <div class="settings__choices__list">
                        <div class="settings__choices__circle"></div>
                        <span>Blue</span>
                        <div class="settings__choices__marker"></div>
                    </div>
                    <div class="settings__choices__list">
                        <div class="settings__choices__circle"></div>
                        <span>Orange</span>
                        <div class="settings__choices__marker"></div>
                    </div>
                </div>
            </div>
            <div class="settings__choices">
                <div class="settings__choices--headline">
                    <img class="" src="dist/assets/icons/board.svg"/>
                    <h4>Board size</h4>
                </div>
                <div class="settings__choices--boards">
                    <div class="settings__choices__list">
                        <div class="settings__choices__circle"></div>
                        <span>16 cards</span>
                        <div class="settings__choices__marker"></div>
                    </div>
                    <div class="settings__choices__list">
                        <div class="settings__choices__circle"></div>
                        <span>24 cards</span>
                        <div class="settings__choices__marker"></div>
                    </div>
                    <div class="settings__choices__list">
                        <div class="settings__choices__circle"></div>
                        <span>36 cards</span>
                        <div class="settings__choices__marker"></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="settings__selection">
            <div class="settings__theme">
                <img class="settings__theme--img" id="theme_image" src="" alt="selected game theme">
            </div>
            <div class="settings__selection__overview">
                <span id="theme_selection" class="settings__selection__overview--theme">Theme</span>
                <img class="settings__selection__overview--theme--img" src="dist/assets/icons/overview_line.svg" alt="selected game theme">
                <span id="player_selection" class="settings__selection__overview--player">Player</span>
                <img class="settings__selection__overview--player--img" src="dist/assets/icons/overview_line.svg" alt="selected player">
                <span id="board_selection" class="settings__selection__overview--board">Board</span>
                <div class="settings__selection__overview--btn">
                    <img src="dist/assets/icons/play_icon.svg" alt="game">
                    <span>Start</span>
                </div>
            </div>
        </div>
    </div>

    </section>
    `;
}