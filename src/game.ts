import {getSelectedPlayer} from "./settings";
import {showSettings} from "./main";

export const players ={
    blue: "blue_player.svg",
    orange: "orange_player.svg",
};

export function setCurrentPlayerImage() {
  const playerImage = document.querySelector(
    ".game__header--player img"
  );
  const selectedPlayer = getSelectedPlayer();
  if (selectedPlayer === "Blue") {
    playerImage!.setAttribute(
      "src",
      "dist/assets/icons/blue_player.svg"
    );
  }
  if (selectedPlayer === "Orange") {
    playerImage!.setAttribute(
      "src",
      "dist/assets/icons/orange_player.svg"
    );
  }
}

export function exitGame() {
  const exitBtn = document.querySelector(".game__header--exitBtn");
  if (exitBtn) {
    exitBtn.addEventListener("click", () => {
      showSettings();
    });
  }
}





export function flippAnimation() {
    const fieldRef = document.querySelector('.game__field');
    if (fieldRef) {
        fieldRef.addEventListener("click", e => {
            const card = (e.target as HTMLElement).closest('.card') as HTMLButtonElement;
            if (card) {
                card.classList.toggle('is-flipped');
            }
        })
    }
}