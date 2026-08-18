import "../scss/main.scss";
import { renderStartscreenLayout } from "../templates/startscreen";
import { getGameThemeImage, renderSettingsLayout, setDefaultImg, getPlayerSelection } from "../templates/settings";
import { renderGameLayout, flippAnimation } from "../templates/game";

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
