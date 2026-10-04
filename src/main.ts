import "../scss/main.scss";
import { renderStartscreenLayout } from "../templates/startscreenLayout";
import { renderSettingsLayout } from "../templates/settingsLayout";
import { renderGameLayout } from "../templates/gameLayout";

import { getGameThemeImage, setDefaultImg, getPlayerSelection, getBoardSelection, getThemeSelection, getSelectedTheme, checkStartButton} from "./settings";
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
  setDefaultImg();
  checkStartButton();
  getPlayerSelection();
  getBoardSelection();
  getThemeSelection();
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
 * Adds the event listener for returning to the startscreen
 * from the winner overlay.
 */
function attachWinnerOverlayListeners() {
  const homeBtn = document.querySelector(".game__winner--homebtn");
  if (homeBtn) {
    homeBtn.addEventListener("click", showStartscreen);
  }
}

/**
 * Adds the exit, game over, and winner overlays
 * based on the selected theme.
 */
function addOverlays() {
  const selectedTheme = getSelectedTheme();
  const overlayContainer = document.querySelector(".game__exitoverlay--container");
  if (overlayContainer) {
    overlayContainer.innerHTML = getExitOverlays(selectedTheme);
  }
  const gameOverOverlayContainer = document.querySelector(".game__gameover--container");
  if (gameOverOverlayContainer) {
    gameOverOverlayContainer.innerHTML = getGameOverOverlay(selectedTheme);
  }
  const winnerOverlayContainer = document.querySelector(".game__winner--container");
  if (winnerOverlayContainer) {
    winnerOverlayContainer.innerHTML = getWinnerOverlay(selectedTheme);
  }
  attachWinnerOverlayListeners();
}