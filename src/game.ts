import {themes, getSelectedPlayer, getSelectedBoard, getSelectedTheme} from "./settings";
import { openGameOverOverlay } from "./gameOver";

let flippedCards: HTMLElement[] = [];
let currentPlayer: string = "";
let matchTimer: ReturnType<typeof setTimeout> | null = null;
let mismatchTimer: ReturnType<typeof setTimeout> | null = null;

export function resetGameStatus() {
  flippedCards = [];
  currentPlayer = "";
  clearGameTimers();
}

function clearGameTimers() {
  if (matchTimer) {
    clearTimeout(matchTimer);
    matchTimer = null;
  }
  if (mismatchTimer) {
    clearTimeout(mismatchTimer);
    mismatchTimer = null;
  }
}

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
  setPlayerIcon(playerImage, selectedPlayer, selectedTheme);
}

function setPlayerIcon(
  playerImage: Element,
  selectedPlayer: string,
  selectedTheme: keyof typeof themes
) {
  const theme = themes[selectedTheme];
  const player = selectedPlayer.toLowerCase() as "blue" | "orange";
  playerImage.setAttribute(
    "src",
    `dist/assets/icons/${theme.icons[player]}`
  );
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

function checkPair() {
  const [firstCard, secondCard] = flippedCards;
  if (firstCard.dataset.card === secondCard.dataset.card) {
    handleMatch(firstCard, secondCard);
    return;
  }
  handleMismatch(firstCard, secondCard);
}

function handleMatch(firstCard: Element, secondCard: Element) {
  firstCard.classList.add("matched");
  secondCard.classList.add("matched");
  flippedCards = [];
  updateScore(currentPlayer);
  checkGameOver();
}

function checkGameOver() {
  const boardSize = getSelectedBoard();
  const matchedCards = document.querySelectorAll(".card.matched");
  if (boardSize === matchedCards.length) {
    startMatchTimer();
  }
}

function startMatchTimer() {
  matchTimer = setTimeout(() => {
    openGameOverOverlay();
  }, 1500);
}

function handleMismatch(firstCard: Element, secondCard: Element) {
  mismatchTimer = setTimeout(() => {
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