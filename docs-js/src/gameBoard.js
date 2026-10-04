import { getSelectedBoard, getSelectedTheme } from "./settings";
import { themeImages, boards, themeFolders } from "./boards";
/**
 * Shuffles the provided cards into a random order.
 * @param cards The cards to be shuffled.
 * @returns The shuffled cards.
 */
function shuffleCards(cards) {
    return cards.sort(() => Math.random() - 0.5);
}
/**
 * Creates the card image list for the selected board size and theme.
 * Duplicates each selected image to create matching pairs.
 * @param boardSize The selected number of cards.
 * @param selectedTheme The selected game theme.
 * @returns The card images required for the game board.
 */
function createCardImages(boardSize, selectedTheme) {
    const pairs = boards[boardSize].pairs;
    const selectedImages = themeImages[selectedTheme].slice(0, pairs);
    return [...selectedImages, ...selectedImages];
}
/**
 * Creates the game board based on the selected size and theme.
 * Generates, shuffles, and renders the required cards.
 */
export function createBoard() {
    const boardSize = getSelectedBoard();
    const selectedTheme = getSelectedTheme();
    const cards = createCardImages(boardSize, selectedTheme);
    const shuffledCards = shuffleCards(cards);
    renderCards(shuffledCards, boardSize, selectedTheme);
}
/**
 * Renders the cards on the game board.
 * @param cards The card images to be rendered.
 * @param boardSize The selected number of cards.
 * @param selectedTheme The selected game theme.
 */
function renderCards(cards, boardSize, selectedTheme) {
    const gameField = document.querySelector("#game_field");
    if (!gameField)
        return;
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
