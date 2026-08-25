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

let selectedPlayer = "";
let selectedBoard = 16;
let selectedTheme = "";

export function getSelectedPlayer() {
  return selectedPlayer;
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

function setSelection(elements: NodeListOf<Element>) {
  elements.forEach((element) => {
    element.addEventListener("click", () => {
      elements.forEach((item) => {
        item.classList.remove("selected");
      });
      element.classList.add("selected");
    });
  });
}

export function getThemeSelection() {
  const themeSelection = document.querySelector("#theme_selection");
  const themes = document.querySelectorAll(
    ".settings__choices--themes .settings__choices__list"
  );
setSelection(themes);
  themes.forEach((theme) => {
    theme.addEventListener("click", () => {
      const themeSpan = theme.querySelector("span");
      if (!themeSpan) return;
      selectedTheme = themeSpan.dataset.theme || "";
      themeSelection!.textContent = themeSpan.textContent;
    });
  });
}

export function getSelectedTheme() {
  return selectedTheme;
}

export function getPlayerSelection() {
  const playerSelection = document.querySelector("#player_selection");
  const playerElements = document.querySelectorAll(
    ".settings__choices--players .settings__choices__list"
  );
  setSelection(playerElements);
  playerElements.forEach((player) => {
    player.addEventListener("click", () => {
      selectedPlayer =
        player.querySelector("span")!.textContent!;
      playerSelection!.textContent = selectedPlayer;
    });
  });
}

export function getBoardSelection() {
  const boardSelection = document.querySelector("#board_selection");
  const boardElements = document.querySelectorAll(
    ".settings__choices--boards .settings__choices__list"
  );
  setSelection(boardElements);
  boardElements.forEach((board) => {
    board.addEventListener("click", () => {
      selectedBoard = Number(board.querySelector("span")!.textContent!.split(" ")[0]);
      boardSelection!.textContent = board.querySelector("span")!.textContent!;
    });
  });
}

export function getSelectedBoard() {
  return selectedBoard;
}