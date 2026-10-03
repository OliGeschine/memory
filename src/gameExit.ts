import {showSettings} from "./main";
import {resetGameStatus } from "./game";

export function exitGame() {
  const exitBtn = document.querySelector(".game__header--exitBtn");
  if (exitBtn) {
    exitBtn.addEventListener("click", () => {
      openExitOverlay();
    });
  }
}

function openExitOverlay() {
  const exitOverlay = document.querySelector(".game__exitoverlay");
  if (!exitOverlay) return;
  exitOverlay.classList.add("active");
}

function closeExitOverlay() {
  const exitOverlay = document.querySelector(".game__exitoverlay");
  if (!exitOverlay) return;
  exitOverlay.classList.remove("active");
}

export function backToGame() {
  const backBtn = document.querySelector(".game__exitoverlay--cancel");
  if (backBtn) {
    backBtn.addEventListener("click", () => {
      closeExitOverlay();
    });
  }
}

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