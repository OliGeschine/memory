import { getSelectedBoard, getSelectedTheme } from "./settings";
import { themeImages, boards, themeFolders } from "./boards";

function shuffleCards(cards: string[]) {
  return cards.sort(() => Math.random() - 0.5);
}

function createCardImages(boardSize: number, selectedTheme: keyof typeof themeImages) {
  const pairs = boards[boardSize as keyof typeof boards].pairs;
  const selectedImages = themeImages[selectedTheme].slice(0, pairs);
  return [...selectedImages, ...selectedImages];
}

export function createBoard() {
  const boardSize = getSelectedBoard();
  const selectedTheme = getSelectedTheme() as keyof typeof themeImages;
  const cards = createCardImages(boardSize, selectedTheme);
  const shuffledCards = shuffleCards(cards);
  renderCards(shuffledCards, boardSize, selectedTheme);
}

function renderCards(cards: string[], boardSize: number, selectedTheme: keyof typeof themeImages) {
  const gameField = document.querySelector("#game_field");
  if (!gameField) return;
  gameField.innerHTML = "";
  gameField.className = `game__field board--${boardSize}`;
  const themeFolder = themeFolders[selectedTheme];
  cards.forEach((image) => {
    gameField.innerHTML += `
      <button class="card" data-card="${image}">
        <div class="card__inner">
          <div class="card__face">
          <img src="dist/assets/cards/${themeFolder}/${themeFolder}_back.svg" alt="">
          </div>
          <div class="card__face card__face--back">
            <img src="dist/assets/cards/${themeFolder}/${image}" alt="">
          </div>
        </div>
      </button>
    `;
  });
}