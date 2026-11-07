const welcomeScreen = document.getElementById("welcome-screen");
const gameScreen = document.getElementById("game-screen");
const startBtn = document.getElementById("start-btn");

const emojiButtons = document.querySelectorAll(".emoji-btn");
const randomEmojiDisplay = document.getElementById("random-emoji");
const playAgainBtn = document.getElementById("Play-btn");

// Create a result message above the Play Again button
const resultMessage = document.createElement("p");
resultMessage.id = "result-message";
playAgainBtn.before(resultMessage);

const emojis = ["😊", "😂", "😎", "😍", "😡"];
let randomEmoji;

// Remove hidden zero-width characters so the comparison works
function clean(text) {
  return text.replace(/\u200B/g, "").trim();
}

function getRandomEmoji() {
  return emojis[Math.floor(Math.random() * emojis.length)];
}

function handleEmojiGuess(event) {
  const userGuess = clean(event.currentTarget.textContent);
  const isCorrect = userGuess === randomEmoji;

  resultMessage.textContent = isCorrect
    ? "Correct! 🎉"
    : "Wrong! 😢 The correct emoji was: " + randomEmoji;
  resultMessage.className = isCorrect ? "correct" : "wrong";

  randomEmojiDisplay.textContent = randomEmoji;
  emojiButtons.forEach((btn) => (btn.disabled = true));
  playAgainBtn.style.display = "inline-block";
}

function resetGame() {
  randomEmoji = getRandomEmoji();

  resultMessage.textContent = "";
  resultMessage.className = "";
  randomEmojiDisplay.textContent = "❓";
  emojiButtons.forEach((btn) => (btn.disabled = false));
  playAgainBtn.style.display = "none";
}

function startGame() {
  welcomeScreen.classList.add("hidden");
  gameScreen.classList.remove("hidden");
  resetGame();
}

startBtn.addEventListener("click", startGame);

emojiButtons.forEach((button) => {
  button.addEventListener("click", handleEmojiGuess);
});

playAgainBtn.addEventListener("click", resetGame);
