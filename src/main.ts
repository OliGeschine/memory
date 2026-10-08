import "../scss/main.scss";
import { renderStartscreenLayout } from "../templates/startscreenLayout";
import { renderSettingsLayout } from "../templates/settingsLayout";
import { renderGameLayout } from "../templates/gameLayout";

import { getGameThemeImage, setDefaultImg, getPlayerSelection, getBoardSelection, getThemeSelection, getSelectedTheme, loadSettings, clearSettings} from "./settings";
import { flippAnimation, setCurrentPlayerImage, initializeCurrentPlayer, setPlayerScoreImages, setPlayerTexts, resetGameStatus } from "./game";
import { getExitOverlays, getGameOverOverlay, getWinnerOverlay } from "../templates/exitOverlays";
import { createBoard } from "./gameBoard";
import { exitGame, quitGame, backToGame } from "./gameExit";

// ========== Initialisierung ==========
/**
 * Initializes the application.
 * Shows the startscreen and resets the game state.
 */
function init() {
  showStartscreen();
  resetGameStatus();
}

window.addEventListener("DOMContentLoaded", init);

// ========== Render-Funktionen (nur für das Rendering verantwortlich) ==========
/**
 * Renders the provided HTML content inside the main element.
 * @param html The HTML content to be rendered.
 */
function renderInMain(html: string) {
  const main = document.querySelector("main");
  if (main) {
    main.innerHTML = html;
  }
}

// ========== View-Funktionen (Rendering + Event-Listener Setup) ==========
/**
 * Displays the startscreen and initializes its event listeners.
 */
function showStartscreen() {
  renderInMain(renderStartscreenLayout());
  attachStartscreenListeners();
}

/**
 * Displays the settings view and initializes its selections
 * and event listeners.
 */
export function showSettings() {
  renderInMain(renderSettingsLayout());
  attachSettingsListeners();
  getGameThemeImage();
  getPlayerSelection();
  getBoardSelection();
  getThemeSelection();
  loadSettings()
}

/**
 * Checks whether all required game settings have been selected.
 * @returns Whether the game is ready to start.
 */
function isGameReady() {
  const theme = document.querySelector("#theme_selection");
  const player = document.querySelector("#player_selection");
  const board = document.querySelector("#board_selection");
  if (!theme || !player || !board) return false;
  return (
    theme.textContent !== "Theme" &&
    player.textContent !== "Player" &&
    board.textContent !== "Board"
  );
}

/**
 * Starts the game when all required settings are selected.
 * Renders the game and initializes its components and event listeners.
 */
function startGame() {
  if (!isGameReady()) return;
  const selectedTheme = getSelectedTheme();
  renderInMain(renderGameLayout(selectedTheme));
  addOverlays();
  initializeCurrentPlayer();
  setCurrentPlayerImage();
  setPlayerScoreImages();
  setPlayerTexts();
  createBoard();
  flippAnimation();
  exitGame();
  quitGame();
  backToGame();
}

// ========== Event-Listener Setup ==========
/**
 * Adds the event listener for opening the settings from the startscreen.
 */
function attachStartscreenListeners() {
  const startBtn = document.querySelector(".startscreen__btn");
  if (startBtn) {
    startBtn.addEventListener("click", showSettings);
  }
}

/**
 * Adds the event listener for starting the game from the settings.
 */
function attachSettingsListeners() {
  const startGameBtn = document.querySelector("#start_btn");
  if (startGameBtn) {
    startGameBtn.addEventListener("click", startGame);
  }
}

/**
 * Adds a click listener to the winner overlay home button.
 * Clears saved settings and returns to the start screen.
 */
function attachWinnerOverlayListeners() {
  const homeBtn = document.querySelector(".game__winner--homebtn");
  if (homeBtn) {
    homeBtn.addEventListener("click", () => {
      clearSettings();
      showStartscreen();
    });
  }
}

/**
 * Adds the exit, game over, and winner overlays
 * based on the selected theme.
 */
function addOverlays() {
  const selectedTheme = getSelectedTheme();
  insertOverlay(".game__exitoverlay--container", getExitOverlays(selectedTheme));
  insertOverlay(".game__gameover--container", getGameOverOverlay(selectedTheme));
  insertOverlay(".game__winner--container", getWinnerOverlay(selectedTheme));
  attachWinnerOverlayListeners();
}

/**
 * Inserts an HTML overlay into the specified container.
 * @param selector The CSS selector of the overlay container.
 * @param html The HTML content to insert.
 */
function insertOverlay(selector: string, html: string) {
  const container = document.querySelector(selector);
  if (!container) return;
  container.innerHTML = html;
}