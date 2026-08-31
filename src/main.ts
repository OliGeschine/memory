import "../scss/main.scss";

import { renderStartscreenLayout } from "../templates/startscreenLayout";
import { renderSettingsLayout } from "../templates/settingsLayout";
import { renderGameLayout } from "../templates/gameLayout";

import { getGameThemeImage, setDefaultImg, getPlayerSelection, getBoardSelection, getThemeSelection, getSelectedTheme } from "./settings";
import { flippAnimation, setCurrentPlayerImage, exitGame, createBoard, initializeCurrentPlayer, quitGame, backToGame, setPlayerScoreImages, setPlayerTexts } from "./game";
import { getExitOverlays } from "../templates/exitOverlays";

// ========== Initialisierung ==========
function init() {
  showStartscreen();
}

window.addEventListener("DOMContentLoaded", init);

// ========== Render-Funktionen (nur für das Rendering verantwortlich) ==========
function renderInMain(html: string) {
  const main = document.querySelector("main");
  if (main) {
    main.innerHTML = html;
  }
}

// ========== View-Funktionen (Rendering + Event-Listener Setup) ==========
function showStartscreen() {
  renderInMain(renderStartscreenLayout());
  attachStartscreenListeners();
}

export function showSettings() {
  renderInMain(renderSettingsLayout());
  attachSettingsListeners();
  getGameThemeImage();
  setDefaultImg();
  getPlayerSelection();
  getBoardSelection();
  getThemeSelection();
}

function startGame() {
  const selectedTheme = getSelectedTheme();
  renderInMain(renderGameLayout(selectedTheme));
  const overlayContainer = document.querySelector(".game__exitoverlay--container");
  if (overlayContainer) {
    overlayContainer.innerHTML = getExitOverlays(selectedTheme);
  }
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
function attachStartscreenListeners() {
  const startBtn = document.querySelector(".startscreen__btn");
  if (startBtn) {
    startBtn.addEventListener("click", showSettings);
  }
}

function attachSettingsListeners() {
  const startGameBtn = document.querySelector("#start_btn");
  if (startGameBtn) {
    startGameBtn.addEventListener("click", startGame);
  }
}