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

export function getThemeSelection() {
  const themeSelection = document.querySelector("#theme_selection");
  const themeElements = document.querySelectorAll(
    ".settings__choices--themes .settings__choices__list"
  );
  themeElements.forEach((themeElement) => {
    themeElement.addEventListener("click", () => {
      const themeIndex = Number(
        themeElement.querySelector("span")!.dataset.theme
      );
      themeSelection!.textContent = themes[themeIndex].name;
    });
  });
}

export function getPlayerSelection() {
const playerSelection = document.querySelector("#player_selection");
const players = document.querySelectorAll(
  ".settings__choices--players .settings__choices__list"
);
players.forEach((player) => {
  player.addEventListener("click", () => {
    playerSelection!.textContent =
      player.querySelector("span")!.textContent;
  });
});
}

export function getBoardSelection() {
const boardSelection = document.querySelector("#board_selection");
const boards = document.querySelectorAll(
  ".settings__choices--boards .settings__choices__list"
);
boards.forEach((board) => {
  board.addEventListener("click", () => {
    boardSelection!.textContent =
      board.querySelector("span")!.textContent;
  });
});
}