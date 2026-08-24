import "../scss/main.scss";

import { renderStartscreenLayout } from "../templates/startscreenLayout";
import { renderSettingsLayout } from "../templates/settingsLayout";
import { renderGameLayout } from "../templates/gameLayout";

import { getGameThemeImage, setDefaultImg, getPlayerSelection, getBoardSelection, getThemeSelection } from "./settings";
import { flippAnimation, setCurrentPlayerImage, exitGame, createBoard, initializeCurrentPlayer } from "./game";

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
  renderInMain(renderGameLayout());
  attachGameListeners();
  initializeCurrentPlayer();
  setCurrentPlayerImage();
  createBoard();
  flippAnimation();
  exitGame();
}

// ========== Event-Listener Setup ==========
function attachStartscreenListeners() {
  const startBtn = document.querySelector(".startscreen__btn");
  if (startBtn) {
    startBtn.addEventListener("click", showSettings);
  }
}

function attachSettingsListeners() {
  const returnBtn = document.querySelector("#return_btn");
  const startGameBtn = document.querySelector("#start_btn");
  if (returnBtn) {
    returnBtn.addEventListener("click", showStartscreen);
  }
  if (startGameBtn) {
    startGameBtn.addEventListener("click", startGame);
  }
}

function attachGameListeners() {
  const returnBtn = document.querySelector("#return_btn");
  if (returnBtn) {
    returnBtn.addEventListener("click", showSettings);
  }
}
