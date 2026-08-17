export function renderStartscreenLayout(): string {
    return `
   <section class="startscreen">

        <div class="headline">
            <h2>It's play time.</h2>
            <h1>Ready to play?</h1>
        </div>

        <div id="startscreen__btn" class="startscreen__btn">
            <img class="controller__icon" src="dist/assets/icons/controller.svg" />
            <span class="startscreen__btn--play">Play</span>
            <img class="startscreen__arrow" src="dist/assets/icons/arrow_right.svg" />
            <img class="startscreen__arrow startscreen__arrow--hover" src="dist/assets/icons/arrow_right_active.svg" />
        </div>

        <img class="startscreen__img" src="dist/assets/imgs/controller.svg" />

    </section>`;
}