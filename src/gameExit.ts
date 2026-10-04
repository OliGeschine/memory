import {showSettings} from "./main";
import {resetGameStatus } from "./game";

/**
 * Adds the event listener for opening the exit overlay.
 */
export function exitGame() {
  const exitBtn = document.querySelector(".game__header--exitBtn");
  if (exitBtn) {
    exitBtn.addEventListener("click", () => {
      openExitOverlay();
    });
  }
}

/**
 * Opens the exit confirmation overlay.
 */
function openExitOverlay() {
  const exitOverlay = document.querySelector(".game__exitoverlay");
  if (!exitOverlay) return;
  exitOverlay.classList.add("active");
}

/**
 * Closes the exit confirmation overlay.
 */
function closeExitOverlay() {
  const exitOverlay = document.querySelector(".game__exitoverlay");
  if (!exitOverlay) return;
  exitOverlay.classList.remove("active");
}

/**
 * Adds the event listener for returning to the current game.
 */
export function backToGame() {
  const backBtn = document.querySelector(".game__exitoverlay--cancel");
  if (backBtn) {
    backBtn.addEventListener("click", () => {
      closeExitOverlay();
    });
  }
}

/**
 * Adds the event listener for quitting the current game.
 * Resets the game and returns to the settings.
 */
export function quitGame() {
  const quitBtn = document.querySelector(".game__exitoverlay--confirm");
  if (quitBtn) {
    quitBtn.addEventListener("click", () => {
      closeExitOverlay();
      resetGameStatus();
      showSettings();
    });
  }
}