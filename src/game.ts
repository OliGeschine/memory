import {themes, getSelectedPlayer, getSelectedBoard, getSelectedTheme} from "./settings";
import {showSettings} from "./main";
import {themeImages, boards, themeFolders} from "./boards";

let flippedCards: HTMLElement[] = [];
let currentPlayer: string = "";
let matchTimer: ReturnType<typeof setTimeout> | null = null;
let mismatchTimer: ReturnType<typeof setTimeout> | null = null;
let gameOverTimer: ReturnType<typeof setTimeout> | null = null;

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
  if (gameOverTimer) {
    clearTimeout(gameOverTimer);
    gameOverTimer = null;
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

function setFinalPlayerTexts() {
  const finalBluePlayerText = document.querySelector("#final-blue-player-text");
  const finalOrangePlayerText = document.querySelector("#final-orange-player-text");
  const selectedTheme = getSelectedTheme();
  const theme = themes[selectedTheme];
  if (finalBluePlayerText) finalBluePlayerText.textContent = theme.texts.bluePlayer;
  if (finalOrangePlayerText) finalOrangePlayerText.textContent = theme.texts.orangePlayer;
}

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
  const overlay = document.querySelector('.game__winner');
  if (!overlay) return;
  getWinnerConditions();
  setHomeBtn();
  overlay.classList.add('active');
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