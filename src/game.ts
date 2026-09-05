import {themes, getSelectedPlayer, getSelectedBoard, getSelectedTheme} from "./settings";
import {showSettings} from "./main";
import {themeImages, boards, themeFolders} from "./boards";

let flippedCards: HTMLElement[] = [];
let currentPlayer: string = "";

export function initializeCurrentPlayer() {
  currentPlayer = getSelectedPlayer().toLowerCase();
}

export function setCurrentPlayerImage() {
  const playerImage = document.querySelector(
    ".game__header--player img"
  );
  if (!playerImage) return;
  const selectedPlayer = getSelectedPlayer();
  const selectedTheme = getSelectedTheme();
  const theme = themes[selectedTheme];
  if (selectedPlayer === "Blue") {
    playerImage.setAttribute(
      "src",
      `dist/assets/icons/${theme.icons.blue}`
    );
  }
  if (selectedPlayer === "Orange") {
    playerImage.setAttribute(
      "src",
      `dist/assets/icons/${theme.icons.orange}`
    );
  }
}

export function setPlayerScoreImages() {
  const blueImage = document.querySelector("#blue_player_image");
  const orangeImage = document.querySelector("#orange_player_image");
  if (!blueImage || !orangeImage) return;
  const selectedTheme = getSelectedTheme();
  const theme = themes[selectedTheme];
  blueImage.setAttribute(
    "src",
    `dist/assets/icons/${theme.icons.blue}`
  );
  orangeImage.setAttribute(
    "src",
    `dist/assets/icons/${theme.icons.orange}`
  );
}

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
      showSettings();
    });
  }
}

function createCardImages(boardSize: number, selectedTheme: keyof typeof themeImages) {
  const pairs = boards[boardSize as keyof typeof boards].pairs;
  const selectedImages = themeImages[selectedTheme].slice(0, pairs);
  return [...selectedImages, ...selectedImages];
}

function shuffleCards(cards: string[]) {
  return cards.sort(() => Math.random() - 0.5);
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
    updateScore(currentPlayer);
    openGameOverOverlay();
    return;
  }
  setTimeout(() => {
    firstCard.classList.remove("is-flipped");
    secondCard.classList.remove("is-flipped");
    flippedCards = [];
    switchPlayer();
  }, 800);
}

function switchPlayer() {
  const currentPlayerImage = document.querySelector(
    ".game__header--player img"
  );
    const selectedTheme = getSelectedTheme();
    const theme = themes[selectedTheme];
  if (!currentPlayerImage) return;
  if (currentPlayer === "blue") {
    currentPlayer = "orange";
    currentPlayerImage.setAttribute("src", `dist/assets/icons/${theme.icons.orange}`);
  } else {
    currentPlayer = "blue";
    currentPlayerImage.setAttribute("src", `dist/assets/icons/${theme.icons.blue}`);
  }
}

function updateScore(player: string) {
  const scoreElement = document.querySelector(
    `#${player.toLowerCase()}-score`
  );
  if (!scoreElement) return;
  const currentScore = parseInt(scoreElement.textContent || "0", 10);
  scoreElement.textContent = (currentScore + 1).toString();
}

export function setPlayerTexts() {
  const bluePlayerText = document.querySelector("#blue-player-text");
  const orangePlayerText = document.querySelector("#orange-player-text");
  const selectedTheme = getSelectedTheme();
  const theme = themes[selectedTheme];
  if (bluePlayerText) bluePlayerText.textContent = theme.texts.bluePlayer;
  if (orangePlayerText) orangePlayerText.textContent = theme.texts.orangePlayer;
}

export function openGameOverOverlay() {
  const overlay = document.querySelector('.game__gameoveroverlay');
  const boardSize = getSelectedBoard();
  if (!overlay) return;
  const matchedCards = document.querySelectorAll(".card.matched");
  if (boardSize === matchedCards.length) {
    const blueScore = document.querySelector("#blue-score");
    const orangeScore = document.querySelector("#orange-score");
    const finalBlueScore = document.querySelector("#finalscore-blue");
    const finalOrangeScore = document.querySelector("#finalscore-orange");
    if(blueScore && finalBlueScore) finalBlueScore.textContent = blueScore.textContent;
    if(orangeScore && finalOrangeScore) finalOrangeScore.textContent = orangeScore.textContent;
    overlay.classList.add('active');
    setFinalScoreIcons();
    const finalBlueScoreValue = getFinalScore("blue");
    const finalOrangeScoreValue = getFinalScore("orange");
    if (finalBlueScore) finalBlueScore.textContent = finalBlueScoreValue.toString();
    if (finalOrangeScore) finalOrangeScore.textContent = finalOrangeScoreValue.toString();
  }
  setTimeout(() => {
    closeGameOverOverlay();
  }, 5000);
}

export function closeGameOverOverlay() {
  const overlay = document.querySelector('.game__gameoveroverlay');
  if (!overlay) return;
  overlay.classList.remove('active');
  openWinnerOverlay();
}

function setFinalScoreIcons() {
  const selectedTheme = getSelectedTheme();
  const theme = themes[selectedTheme];
  const blueIcon = document.querySelector("#finalscore-blue-icon");
  const orangeIcon = document.querySelector("#finalscore-orange-icon");
  if (blueIcon) blueIcon.setAttribute("src", `dist/assets/icons/${theme.icons.blue}`);
  if (orangeIcon) orangeIcon.setAttribute("src", `dist/assets/icons/${theme.icons.orange}`);
}

function getFinalScore(player: string): number {
  const scoreElement = document.querySelector(
    `#${player.toLowerCase()}-score`
  );
  if (!scoreElement) return 0;
  return parseInt(scoreElement.textContent || "0", 10);
}

function openWinnerOverlay() {
  const overlay = document.querySelector('.game__winneroverlay');
  if (!overlay) return;
  overlay.classList.add('active');
}

function closeWinnerOverlay() {
  const overlay = document.querySelector('.game__winneroverlay');
  if (!overlay) return;
  overlay.classList.remove('active');
}