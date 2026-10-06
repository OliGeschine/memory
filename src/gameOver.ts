import {themes, getSelectedBoard, getSelectedTheme} from "./settings";

let gameOverTimer: ReturnType<typeof setTimeout> | null = null;

/**
 * Opens the game over overlay when all card pairs have been matched.
 * Updates the final scores and starts the game over timer.
 */
export function openGameOverOverlay() {
  const overlay = document.querySelector(".game__gameoveroverlay");
  if (!overlay || !isGameFinished()) return;
  overlay.classList.add("active");
  setGameOverScores();
  startGameOverTimer();
}

/**
 * Checks whether all cards on the game board have been matched.
 * @returns Whether the game is finished.
 */
function isGameFinished() {
  const boardSize = getSelectedBoard();
  const matchedCards = document.querySelectorAll(".card.matched");
  return boardSize === matchedCards.length;
}

/**
 * Updates the player icons, names, and scores in the game over overlay.
 */
function setGameOverScores() {
  setFinalScoreIcons();
  setFinalPlayerTexts();
  const blueScore = getFinalScore("blue");
  const orangeScore = getFinalScore("orange");
  setFinalScore("blue", blueScore);
  setFinalScore("orange", orangeScore);
}

/**
 * Displays a player's final score in the game over overlay.
 * @param player The player whose score is displayed.
 * @param score The player's final score.
 */
function setFinalScore(player: string, score: number) {
  const scoreElement = document.querySelector(
    `#finalscore-${player}`
  );
  if (scoreElement) {
    scoreElement.textContent = score.toString();
  }
}

/**
 * Starts the timer for automatically closing the game over overlay.
 */
function startGameOverTimer() {
  gameOverTimer = setTimeout(() => {
    closeGameOverOverlay();
  }, 3000);
}

/**
 * Sets the player names in the game over overlay
 * based on the selected theme.
 */
function setFinalPlayerTexts() {
  const finalBluePlayerText = document.querySelector("#final-blue-player-text");
  const finalOrangePlayerText = document.querySelector("#final-orange-player-text");
  const selectedTheme = getSelectedTheme();
  const theme = themes[selectedTheme];
  if (finalBluePlayerText) finalBluePlayerText.textContent = theme.texts.bluePlayer;
  if (finalOrangePlayerText) finalOrangePlayerText.textContent = theme.texts.orangePlayer;
}

/**
 * Returns the final score of the specified player.
 * @param player The player whose score is requested.
 * @returns The player's final score.
 */
function getFinalScore(player: string): number {
  const scoreElement = document.querySelector(
    `#${player.toLowerCase()}-score`
  );
  if (!scoreElement) return 0;
  return parseInt(scoreElement.textContent || "0", 10);
}

/**
 * Sets the player icons in the game over overlay
 * based on the selected theme.
 */
function setFinalScoreIcons() {
  const selectedTheme = getSelectedTheme();
  const theme = themes[selectedTheme];
  const blueIcon = document.querySelector("#finalscore-blue-icon");
  const orangeIcon = document.querySelector("#finalscore-orange-icon");
  if (blueIcon) blueIcon.setAttribute("src", `/memory/assets/icons/${theme.icons.blue}`);
  if (orangeIcon) orangeIcon.setAttribute("src", `/memory/assets/icons/${theme.icons.orange}`);
}

/**
 * Opens the winner overlay and updates its content.
 */
function openWinnerOverlay() {
  const overlay = document.querySelector('.game__winner');
  if (!overlay) return;
  getWinnerConditions();
  setHomeBtn();
  overlay.classList.add('active');
}

/**
 * Closes the game over overlay and opens the winner overlay.
 */
export function closeGameOverOverlay() {
  const overlay = document.querySelector('.game__gameoveroverlay');
  if (!overlay) return;
  overlay.classList.remove('active');
  openWinnerOverlay();
}

/**
 * Determines the winner based on the final scores
 * and updates the winner display.
 */
function getWinnerConditions() {
  const blueScore = getFinalScore("blue");
  const orangeScore = getFinalScore("orange");
  if (blueScore === orangeScore) {
    setWinner("draw");
    setWinnerIcon("draw");
    setWinnerText("draw");
  } else{
    const winner = blueScore > orangeScore ? "blue" : "orange"; 
    setWinner(winner);
    setWinnerIcon(winner);
    setWinnerIconContainer(winner);
    setWinnerText(winner);
  }
}

/**
 * Sets the winner name and applies the corresponding winner style.
 * @param player The winning player or draw result.
 */
function setWinner(player: "blue" | "orange" | "draw") {
  const selectedTheme = getSelectedTheme();
  const theme = themes[selectedTheme];
  const winnerElement = document.querySelector("#winner-name");
  if (winnerElement){
    winnerElement.textContent = theme.texts[`${player.toLowerCase()}Winner` as keyof typeof theme.texts];
    winnerElement.classList.add(`winner--${player}`);
  }
}

/**
 * Sets the winner icon based on the result and selected theme.
 * @param player The winning player or draw result.
 */
function setWinnerIcon(player: "blue" | "orange" | "draw") {
  const selectedTheme = getSelectedTheme();
  const theme = themes[selectedTheme];
  const winnerIconElement = document.querySelector("#winner-icon");
  if (winnerIconElement) winnerIconElement.setAttribute("src", `/memory/assets/icons/${theme.icons[`${player.toLowerCase()}Winner` as keyof typeof theme.icons]}`);
}

/**
 * Adds the winner decoration for the Code Vibes theme.
 * Selects the decoration based on the screen width.
 * @param player The winning player or draw result.
 */
function setWinnerIconContainer(player: "blue" | "orange" | "draw") {
  const selectedTheme = getSelectedTheme();
  const winnerIconContainer = document.querySelector("#winner-icon-container");
  if (!winnerIconContainer) return;
  if (selectedTheme !== "codeVibes" && player === "draw") return;
  const confettiImg = window.innerWidth <= 1440 ? "confetti.svg" : "confetti_wide.svg";
  winnerIconContainer.innerHTML = `<img src="/memory/assets/icons/${confettiImg}" alt="">`;
}

/**
 * Sets the winner message based on the game result.
 * @param player The winning player or draw result.
 */
function setWinnerText(player: "blue" | "orange" | "draw") {
  const winnerTextElement = document.querySelector("#winner-text");
  if (!winnerTextElement) return;
  if (player === "draw") {
    winnerTextElement.textContent = "It's a";
  } else {
    winnerTextElement.textContent = "The winner is";
  }
}

/**
 * Sets the home button text based on the selected theme.
 */
function setHomeBtn() {
  const selectedTheme = getSelectedTheme();
  const theme = themes[selectedTheme];
  const homeBtn = document.querySelector("#homebtn-text");
  if (homeBtn) homeBtn.textContent = theme.texts.homeBtn;
}