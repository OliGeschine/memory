export function renderSettingsLayout(): string {
    return `
    <section class="settings">

        <div class="settings__headline">
            <h3>Settings</h3>
            <img class="settings__img" src="dist/assets/icons/settings_h3_line.svg"/>
        </div>
        <button id="return_btn" class="settings__btn">Back</button>


        <div class="settings__overview">
            <div class="settings__choises">
            <img class="" src="dist/assets/icons/palette.svg"/>
                <h4> Game themes</h4>
            </div>

            <div class="settings__choises">
                <img class="" src="dist/assets/icons/chess_pawn.svg"/>
                <h4>Choose player</h4>
            </div>

            <div class="settings__choises">
                <img class="" src="dist/assets/icons/board.svg"/>
                <h4>Board size</h4>
            </div>

        </div>




    </section>
    `;
}