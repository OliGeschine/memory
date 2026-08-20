import {getSelectedPlayer, getSelectedBoard} from "./settings";
import {showSettings} from "./main";
import {codeVibesImages, boards} from "./boards";

let flippedCards: HTMLElement[] = [];

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

function createCardImages(boardSize: number) {
  const pairs = boards[boardSize as keyof typeof boards].pairs;
  const selectedImages = codeVibesImages.slice(0, pairs);
  return [...selectedImages, ...selectedImages];
}

function shuffleCards(cards: string[]) {
  return cards.sort(() => Math.random() - 0.5);
}

export function createBoard() {
  const boardSize = getSelectedBoard();
  const cards = createCardImages(boardSize);
  const shuffledCards = shuffleCards(cards);
  renderCards(shuffledCards, boardSize);
}

function renderCards(cards: string[], boardSize: number) {
  const gameField = document.querySelector("#game_field");
  if (!gameField) return;
  gameField.innerHTML = "";
  gameField.className = `game__field board--${boardSize}`;
  cards.forEach((image) => {
    gameField.innerHTML += `
      <button class="card" data-card="${image}">
        <div class="card__inner">
          <div class="card__face">
          <img src="dist/assets/cards/code_vibes/code_vibes_back.svg" alt="">
          </div>
          <div class="card__face card__face--back">
            <img src="dist/assets/cards/code_vibes/${image}" alt="">
          </div>
        </div>
      </button>
    `;
  });
}

export function flippAnimation() {
    const fieldRef = document.querySelector('.game__field');
    if (!fieldRef) return;
    fieldRef.addEventListener("click", e => {
      const card = (e.target as HTMLElement).closest('.card') as HTMLButtonElement;
      if (!card) return;
      if (card.classList.contains('matched')) return;
      if (flippedCards.length >= 2) return;
      if (flippedCards.includes(card)) return;
      card.classList.add('is-flipped');
      flippedCards.push(card);
      if (flippedCards.length === 2) {
        checkPair();
      }
    });
}

function checkPair(){
  const [firstCard, secondCard] = flippedCards;
  const firstImage = firstCard.dataset.card;
  const secondImage = secondCard.dataset.card;
  if (firstImage === secondImage) {
    firstCard.classList.add("matched");
    secondCard.classList.add("matched");
    flippedCards = [];
    return;
  }
  setTimeout(() => {
    firstCard.classList.remove("is-flipped");
    secondCard.classList.remove("is-flipped");
    flippedCards = [];
  }, 800);
}