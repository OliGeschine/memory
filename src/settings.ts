export let themes = {
  codeVibes: {
    name: "Code vibes",
    image: "code_vibes_theme.svg",
    icons: {
      blue: "blue_player.svg",
      orange: "orange_player.svg"
    },
    texts:{
      bluePlayer: "Blue:",
      orangePlayer: "Orange:",
      blueWinner: "Blue player",
      orangeWinner: "Orange player",
      homeBtn: "Back to start"
    }
  },
  games: {
    name: "Gaming",
    image: "gaming_theme.svg",
    icons: {
      blue: "blue_pawn.svg",
      orange: "orange_pawn.svg"
    },
    texts:{
      bluePlayer: "",
      orangePlayer: "",
      blueWinner: "Blue player",
      orangeWinner: "Orange player",
      homeBtn: "Home"
    }
  },
};

let selectedPlayer = "";
let selectedBoard = 16;
let selectedTheme: keyof typeof themes = "codeVibes";

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
      const themeKey = theme.getAttribute("data-theme") as keyof typeof themes;
      if (!themeImage) return;
      themeImage!.setAttribute(
        "src",
        `dist/assets/imgs/${themes[themeKey].image}`
      );
    });
  });
}

export function setDefaultImg(){
    const themeImage = document.querySelector("#theme_image");
    if (!themeImage) return;
    themeImage!.setAttribute("src", `dist/assets/imgs/${themes[selectedTheme].image}`);
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
  const themeElements = document.querySelectorAll(
    ".settings__choices--themes .settings__choices__list"
  );
setSelection(themeElements);
  themeElements.forEach((theme) => {
    theme.addEventListener("click", () => {
      const themeSpan = theme.querySelector("span");
      if (!themeSpan) return;
      selectedTheme = themeSpan.dataset.theme as keyof typeof themes;
      themeSelection!.textContent = themes[selectedTheme].name;
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