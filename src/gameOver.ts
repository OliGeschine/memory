import {themes, getSelectedBoard, getSelectedTheme} from "./settings";

let gameOverTimer: ReturnType<typeof setTimeout> | null = null;

export function openGameOverOverlay() {
  const overlay = document.querySelector(".game__gameoveroverlay");
  if (!overlay || !isGameFinished()) return;
  overlay.classList.add("active");
  setGameOverScores();
  startGameOverTimer();
}

function isGameFinished() {
  const boardSize = getSelectedBoard();
  const matchedCards = document.querySelectorAll(".card.matched");
  return boardSize === matchedCards.length;
}

function setGameOverScores() {
  setFinalScoreIcons();
  setFinalPlayerTexts();
  const blueScore = getFinalScore("blue");
  const orangeScore = getFinalScore("orange");
  setFinalScore("blue", blueScore);
  setFinalScore("orange", orangeScore);
}

function setFinalScore(player: string, score: number) {
  const scoreElement = document.querySelector(
    `#finalscore-${player}`
  );
  if (scoreElement) {
    scoreElement.textContent = score.toString();
  }
}

function startGameOverTimer() {
  gameOverTimer = setTimeout(() => {
    closeGameOverOverlay();
  }, 3000);
}

function setFinalPlayerTexts() {
  const finalBluePlayerText = document.querySelector("#final-blue-player-text");
  const finalOrangePlayerText = document.querySelector("#final-orange-player-text");
  const selectedTheme = getSelectedTheme();
  const theme = themes[selectedTheme];
  if (finalBluePlayerText) finalBluePlayerText.textContent = theme.texts.bluePlayer;
  if (finalOrangePlayerText) finalOrangePlayerText.textContent = theme.texts.orangePlayer;
}

function getFinalScore(player: string): number {
  const scoreElement = document.querySelector(
    `#${player.toLowerCase()}-score`
  );
  if (!scoreElement) return 0;
  return parseInt(scoreElement.textContent || "0", 10);
}

function setFinalScoreIcons() {
  const selectedTheme = getSelectedTheme();
  const theme = themes[selectedTheme];
  const blueIcon = document.querySelector("#finalscore-blue-icon");
  const orangeIcon = document.querySelector("#finalscore-orange-icon");
  if (blueIcon) blueIcon.setAttribute("src", `dist/assets/icons/${theme.icons.blue}`);
  if (orangeIcon) orangeIcon.setAttribute("src", `dist/assets/icons/${theme.icons.orange}`);
}

function openWinnerOverlay() {
  const overlay = document.querySelector('.game__winner');
  if (!overlay) return;
  getWinnerConditions();
  setHomeBtn();
  overlay.classList.add('active');
}

export function closeGameOverOverlay() {
  const overlay = document.querySelector('.game__gameoveroverlay');
  if (!overlay) return;
  overlay.classList.remove('active');
  openWinnerOverlay();
}

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

function setWinner(player: "blue" | "orange" | "draw") {
  const selectedTheme = getSelectedTheme();
  const theme = themes[selectedTheme];
  const winnerElement = document.querySelector("#winner-name");
  if (winnerElement){
    winnerElement.textContent = theme.texts[`${player.toLowerCase()}Winner` as keyof typeof theme.texts];
    winnerElement.classList.add(`winner--${player}`);
  }
}

function setWinnerIcon(player: "blue" | "orange" | "draw") {
  const selectedTheme = getSelectedTheme();
  const theme = themes[selectedTheme];
  const winnerIconElement = document.querySelector("#winner-icon");
  if (winnerIconElement) winnerIconElement.setAttribute("src", `dist/assets/icons/${theme.icons[`${player.toLowerCase()}Winner` as keyof typeof theme.icons]}`);
}

function setWinnerIconContainer(player: "blue" | "orange" | "draw") {
  const selectedTheme = getSelectedTheme();
  const winnerIconContainer = document.querySelector("#winner-icon-container");
  if (!winnerIconContainer) return;
  if (selectedTheme === "codeVibes" && player !== "draw" && screen.width <= 1440){
    winnerIconContainer.innerHTML = `<img src="dist/assets/icons/confetti.svg" alt="">`;
  } else if (selectedTheme === "codeVibes" && player !== "draw" && screen.width > 1440) {
    winnerIconContainer.innerHTML = `<img src="dist/assets/icons/confetti_wide.svg" alt="">`;
  }
}

function setWinnerText(player: "blue" | "orange" | "draw") {
  const winnerTextElement = document.querySelector("#winner-text");
  if (!winnerTextElement) return;
  if (player === "draw") {
    winnerTextElement.textContent = "It's a";
  } else {
    winnerTextElement.textContent = "The winner is";
  }
}

function setHomeBtn() {
  const selectedTheme = getSelectedTheme();
  const theme = themes[selectedTheme];
  const homeBtn = document.querySelector("#homebtn-text");
  if (homeBtn) homeBtn.textContent = theme.texts.homeBtn;
}