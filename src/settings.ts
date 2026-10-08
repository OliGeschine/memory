export let themes = {
  codeVibes: {
    name: "Code vibes",
    image: "code_vibes_theme.svg",
    icons: {
      blue: "blue_player.svg",
      orange: "orange_player.svg",
      blueWinner: "blue_pawn.svg",
      orangeWinner: "orange_pawn.svg",
      drawWinner: "draw_green.svg"
    },
    texts:{
      bluePlayer: "Blue",
      orangePlayer: "Orange",
      blueWinner: "BLUE PLAYER",
      orangeWinner: "ORANGE PLAYER",
      drawWinner: "DRAW",
      homeBtn: "Back to start"
    }
  },
  games: {
    name: "Gaming",
    image: "gaming_theme.svg",
    icons: {
      blue: "blue_pawn.svg",
      orange: "orange_pawn.svg",
      blueWinner: "victory.svg",
      orangeWinner: "victory.svg",
      drawWinner: "draw_red.svg"
    },
    texts:{
      bluePlayer: "",
      orangePlayer: "",
      blueWinner: "Blue Player",
      orangeWinner: "Orange Player",
      drawWinner: "DRAW",
      homeBtn: "Home"
    }
  },
};

let selectedPlayer = "";
let selectedBoard = 16;
let selectedTheme: keyof typeof themes = "codeVibes";

/**
 * Returns the currently selected player.
 * @returns The selected player.
 */
export function getSelectedPlayer() {
  return selectedPlayer;
}

/**
 * Adds hover listeners to the theme selection elements.
 * Restores the selected theme image when the mouse leaves.
 */
export function getGameThemeImage() {
  const themeElements = document.querySelectorAll(
    ".settings__choices--themes .settings__choices__list"
  );
  themeElements.forEach((theme) => {
    theme.addEventListener("mouseenter", () => {
      updateThemePreview(theme);
    });
    theme.addEventListener("mouseleave", setDefaultImg);
  });
}

/**
 * Updates the theme preview image for the hovered theme.
 * @param theme The hovered theme element.
 */
function updateThemePreview(theme: Element) {
  const themeKey = theme.querySelector("span")?.getAttribute("data-theme");
  if (!themeKey || !(themeKey in themes)) return;
  const image = themes[themeKey as keyof typeof themes].image;
  const themeImage = document.querySelector("#theme_image");
  themeImage?.setAttribute("src", `/memory/assets/imgs/${image}`);
}

/**
 * Sets the theme image to the currently selected theme.
 */
export function setDefaultImg() {
  const themeImage = document.querySelector("#theme_image");
  if (!themeImage) return;
  themeImage.setAttribute(
    "src",
    `/memory/assets/imgs/${themes[selectedTheme].image}`
  );
}

/**
 * Adds selection behavior to a group of elements.
 * @param elements The elements that can be selected.
 */
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

/**
 * Adds click listeners to the available game themes.
 */
export function getThemeSelection() {
  const themeElements = document.querySelectorAll(
    ".settings__choices--themes .settings__choices__list"
  );
  setSelection(themeElements);
  themeElements.forEach((theme) => {
    theme.addEventListener("click", () => selectTheme(theme));
  });
}

/**
 * Saves the selected theme and updates the settings UI.
 * @param theme The clicked theme element.
 */
function selectTheme(theme: Element) {
  const themeSpan = theme.querySelector("span");
  const themeSelection = document.querySelector("#theme_selection");
  if (!themeSpan || !themeSelection) return;
  selectedTheme = themeSpan.dataset.theme as keyof typeof themes;
  saveSettings();
  themeSelection.textContent = themes[selectedTheme].name;
  setDefaultImg();
  checkStartButton();
}

/**
 * Returns the currently selected game theme.
 * @returns The selected game theme.
 */
export function getSelectedTheme() {
  return selectedTheme;
}

/**
 * Adds click listeners to the available players.
 */
export function getPlayerSelection() {
  const playerElements = document.querySelectorAll(
    ".settings__choices--players .settings__choices__list"
  );
  setSelection(playerElements);
  playerElements.forEach((player) => {
    player.addEventListener("click", () => selectPlayer(player));
  });
}

/**
 * Saves the selected player and updates the settings UI.
 * @param player The clicked player element.
 */
function selectPlayer(player: Element) {
  const playerSpan = player.querySelector("span");
  const playerSelection = document.querySelector("#player_selection");
  if (!playerSpan || !playerSelection) return;
  selectedPlayer = playerSpan.textContent?.trim() ?? "";
  saveSettings();
  playerSelection.textContent = selectedPlayer;
  checkStartButton();
}

/**
 * Adds selection behavior to the available board sizes.
 * Stores the selected board size and updates the settings overview.
 */
export function getBoardSelection() {
  const boardSelection = document.querySelector("#board_selection");
  const boardElements = document.querySelectorAll(
    ".settings__choices--boards .settings__choices__list"
  );
  setSelection(boardElements);
  boardElements.forEach((board) => {
    board.addEventListener("click", () => {
      selectedBoard = Number(board.querySelector("span")!.textContent!.split(" ")[0]);
      saveSettings();
      boardSelection!.textContent = board.querySelector("span")!.textContent!;
      checkStartButton();
    });
  });
}

/**
 * Returns the currently selected board size.
 * @returns The selected board size.
 */
export function getSelectedBoard() {
  return selectedBoard;
}

/**
 * Updates the state of the start button.
 * Enables it when a theme, player, and board size are selected.
 */
export function checkStartButton(){
  const theme = document.querySelector("#theme_selection");
  const player = document.querySelector("#player_selection");
  const board = document.querySelector("#board_selection");
  const startButton = document.querySelector("#start_btn");
  if(!theme || !player || !board || !startButton) return;
  const ready = theme.textContent !== "Theme" && player.textContent !== "Player" && board.textContent !== "Board";
  startButton.classList.toggle("disabled", !ready);
}

/**
 * Saves the current game settings to localStorage.
 */
function saveSettings() {
  localStorage.setItem("selectedTheme", selectedTheme);
  localStorage.setItem("selectedPlayer", selectedPlayer);
  localStorage.setItem("selectedBoard", selectedBoard.toString());
}

/**
 * Restores saved game settings and updates the settings UI.
 */
export function loadSettings() {
  const theme = localStorage.getItem("selectedTheme");
  const player = localStorage.getItem("selectedPlayer");
  const board = localStorage.getItem("selectedBoard");
  restoreSavedValues(theme, player, board);
  restoreThemeSelection(theme);
  restorePlayerSelection(player);
  restoreBoardSelection(board);
  setDefaultImg();
  checkStartButton();
}

/**
 * Restores the saved values to the internal settings variables.
 * @param theme The saved theme key.
 * @param player The saved player.
 * @param board The saved board size.
 */
function restoreSavedValues(
  theme: string | null,
  player: string | null,
  board: string | null
) {
  if (theme && theme in themes) {
    selectedTheme = theme as keyof typeof themes;
  }
  if (player) selectedPlayer = player;
  if (board && [16, 24, 36].includes(Number(board))) {
    selectedBoard = Number(board);
  }
}

/**
 * Restores the selected theme in the settings UI.
 * @param theme The saved theme key.
 */
function restoreThemeSelection(theme: string | null) {
  if (!theme || !(theme in themes)) return;
  const elements = document.querySelectorAll(
    ".settings__choices--themes .settings__choices__list"
  );
  elements.forEach((element) => {
    const key = element.querySelector("span")?.getAttribute("data-theme");
    element.classList.toggle("selected", key === theme);
  });
  const overview = document.querySelector("#theme_selection");
  if (overview) {
    overview.textContent = themes[selectedTheme].name;
  }
}

/**
 * Restores the selected player in the settings UI.
 * @param player The saved player.
 */
function restorePlayerSelection(player: string | null) {
  if (!player) return;
  const elements = document.querySelectorAll(
    ".settings__choices--players .settings__choices__list"
  );
  elements.forEach((element) => {
    const name = element.querySelector("span")?.textContent?.trim();
    element.classList.toggle("selected", name === player.trim());
  });
  const overview = document.querySelector("#player_selection");
  if (overview) overview.textContent = player;
}

/**
 * Restores the selected board size in the settings UI.
 * @param board The saved board size.
 */
function restoreBoardSelection(board: string | null) {
  if (!board || ![16, 24, 36].includes(Number(board))) return;
  const elements = document.querySelectorAll(
    ".settings__choices--boards .settings__choices__list"
  );
  elements.forEach((element) => {
    const label = element.querySelector("span")?.textContent?.trim() ?? "";
    const size = Number(label.split(" ")[0]);
    element.classList.toggle("selected", size === Number(board));
    if (size === Number(board)) {
      const overview = document.querySelector("#board_selection");
      if (overview) overview.textContent = label;
    }
  });
}

/**
 * Removes the saved game settings from localStorage.
 */
export function clearSettings() {
  localStorage.removeItem("selectedTheme");
  localStorage.removeItem("selectedPlayer");
  localStorage.removeItem("selectedBoard");
  selectedTheme = "codeVibes";
  selectedPlayer = "";
  selectedBoard = 16;
}