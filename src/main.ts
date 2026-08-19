import "../scss/main.scss";

import { renderStartscreenLayout } from "../templates/startscreenLayout";
import { renderSettingsLayout } from "../templates/settingsLayout";
import { renderGameLayout } from "../templates/gameLayout";

import { getGameThemeImage, setDefaultImg, getPlayerSelection, getBoardSelection, getThemeSelection } from "./settings";
import { flippAnimation } from "./game";

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

function showSettings() {
  renderInMain(renderSettingsLayout());
  attachSettingsListeners();
  getGameThemeImage();
  setDefaultImg();
  getPlayerSelection();
  getBoardSelection();
  getThemeSelection();
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
  if (returnBtn) {
    returnBtn.addEventListener("click", showStartscreen);
  }
}
