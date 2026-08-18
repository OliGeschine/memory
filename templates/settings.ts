let themes = [
  {
    name: "Code vibes",
    image: "code_vibes_theme.svg",
  },
  {
    name: "Gaming",
    image: "gaming_theme.svg",
  },
  {
    name: "DA Projects",
    image: "da_projects_theme.svg",
  },
  {
    name: "Foods",
    image: "foods_theme.svg",
  },
];

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
                        <img class="settings__choices__circle" src="dist/assets/icons/choice_circle.svg"/>
                        <span data-theme="0">Code vibes theme</span>
                    </div>
                    <div class="settings__choices__list">
                        <img class="settings__choices__circle" src="dist/assets/icons/choice_circle.svg"/>
                        <span data-theme="1">Gaming theme</span>
                    </div>
                    <div class="settings__choices__list">
                        <img class="settings__choices__circle" src="dist/assets/icons/choice_circle.svg"/>
                        <span data-theme="2">DA Projects theme</span>
                    </div>
                    <div class="settings__choices__list">
                        <img class="settings__choices__circle" src="dist/assets/icons/choice_circle.svg"/>
                        <span data-theme="3">Foods theme</span>
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
                        <img class="settings__choices__circle" src="dist/assets/icons/choice_circle.svg"/>
                        <span>Blue</span>
                    </div>
                    <div class="settings__choices__list">
                        <img class="settings__choices__circle" src="dist/assets/icons/choice_circle.svg"/>
                        <span>Orange</span>
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
                    </div>
                    <div class="settings__choices__list">
                        <div class="settings__choices__circle"></div>
                        <span>24 cards</span>
                    </div>
                    <div class="settings__choices__list">
                        <div class="settings__choices__circle"></div>
                        <span>36 cards</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="settings__theme">
            <img class="settings__theme--img" id="theme_image" src="" alt="selected game theme">
        </div>
    </div>

    </section>
    `;
}

export function getGameThemeImage() {
  const themeElements = document.querySelectorAll(
    ".settings__choices--themes span"
  );

  const themeImage = document.querySelector("#theme_image");

  themeElements.forEach((theme) => {
    theme.addEventListener("click", () => {
      const themeIndex = Number(theme.getAttribute("data-theme"));

      themeImage!.setAttribute(
        "src",
        `dist/assets/imgs/${themes[themeIndex].image}`
      );
    });
  });
}

export function setDefaultImg(){
    const themeImage = document.querySelector("#theme_image");
    themeImage!.setAttribute("src", `dist/assets/imgs/${themes[0].image}`);
}
