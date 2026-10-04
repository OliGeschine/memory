import {themes, getSelectedPlayer, getSelectedBoard, getSelectedTheme} from "./settings";
import { openGameOverOverlay } from "./gameOver";

let flippedCards: HTMLElement[] = [];
let currentPlayer: string = "";
let matchTimer: ReturnType<typeof setTimeout> | null = null;
let mismatchTimer: ReturnType<typeof setTimeout> | null = null;

/**
 * Resets the current game state and clears all active game timers.
 */
export function resetGameStatus() {
  flippedCards = [];
  currentPlayer = "";
  clearGameTimers();
}

/**
 * Clears all active match and mismatch timers.
 */
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

/**
 * Initializes the current player based on the selected starting player.
 */
export function initializeCurrentPlayer() {
  currentPlayer = getSelectedPlayer().toLowerCase();
}

/**
 * Sets the current player image based on the selected player and theme.
 */
export function setCurrentPlayerImage() {
  const playerImage = document.querySelector(
    ".game__header--player img"
  );
  if (!playerImage) return;
  const selectedPlayer = getSelectedPlayer();
  const selectedTheme = getSelectedTheme();
  setPlayerIcon(playerImage, selectedPlayer, selectedTheme);
}

/**
 * Sets the player icon based on the selected player and theme.
 * @param playerImage The image element to be updated.
 * @param selectedPlayer The selected player.
 * @param selectedTheme The selected game theme.
 */
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

/**
 * Sets the score icons for both players based on the selected theme.
 */
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

/**
 * Adds the card flip behavior to the game board.
 * Checks for a matching pair when two cards are flipped.
 */
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

/**
 * Checks whether the two flipped cards form a matching pair.
 */
function checkPair() {
  const [firstCard, secondCard] = flippedCards;
  if (firstCard.dataset.card === secondCard.dataset.card) {
    handleMatch(firstCard, secondCard);
    return;
  }
  handleMismatch(firstCard, secondCard);
}

/**
 * Handles a matching card pair and updates the game state.
 * @param firstCard The first matching card.
 * @param secondCard The second matching card.
 */
function handleMatch(firstCard: Element, secondCard: Element) {
  firstCard.classList.add("matched");
  secondCard.classList.add("matched");
  flippedCards = [];
  updateScore(currentPlayer);
  checkGameOver();
}

/**
 * Checks whether all cards have been matched.
 * Starts the game over timer when the game is finished.
 */
function checkGameOver() {
  const boardSize = getSelectedBoard();
  const matchedCards = document.querySelectorAll(".card.matched");
  if (boardSize === matchedCards.length) {
    startMatchTimer();
  }
}

/**
 * Starts the timer for opening the game over overlay.
 */
function startMatchTimer() {
  matchTimer = setTimeout(() => {
    openGameOverOverlay();
  }, 1500);
}

/**
 * Handles a mismatching card pair.
 * Flips the cards back and switches the current player.
 * @param firstCard The first mismatching card.
 * @param secondCard The second mismatching card.
 */
function handleMismatch(firstCard: Element, secondCard: Element) {
  mismatchTimer = setTimeout(() => {
    firstCard.classList.remove("is-flipped");
    secondCard.classList.remove("is-flipped");
    flippedCards = [];
    switchPlayer();
  }, 800);
}

/**
 * Switches the current player and updates the player image.
 */
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

/**
 * Increases the score of the specified player by one.
 * @param player The player whose score is updated.
 */
function updateScore(player: string) {
  const scoreElement = document.querySelector(
    `#${player.toLowerCase()}-score`
  );
  if (!scoreElement) return;
  const currentScore = parseInt(scoreElement.textContent || "0", 10);
  scoreElement.textContent = (currentScore + 1).toString();
}

/**
 * Sets the player names based on the selected theme.
 */
export function setPlayerTexts() {
  const bluePlayerText = document.querySelector("#blue-player-text");
  const orangePlayerText = document.querySelector("#orange-player-text");
  const selectedTheme = getSelectedTheme();
  const theme = themes[selectedTheme];
  if (bluePlayerText) bluePlayerText.textContent = theme.texts.bluePlayer;
  if (orangePlayerText) orangePlayerText.textContent = theme.texts.orangePlayer;
}