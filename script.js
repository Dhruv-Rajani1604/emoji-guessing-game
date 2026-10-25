const emojiButtons = document.querySelectorAll(".emoji-btn");
const randomEmojiDisplay = document.getElementById("random-emoji");
const playAgainBtn = document.getElementById("Play-btn");

// The HTML has no result element, so create one above the Play Again button
const resultMessage = document.createElement("p");
resultMessage.id = "result-message";
playAgainBtn.before(resultMessage);

const emojis = ["😊", "😂", "😎", "😍", "😡"];
let randomEmoji;

// Remove the hidden zero-width characters in the HTML so the comparison works
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

emojiButtons.forEach((button) => {
  button.addEventListener("click", handleEmojiGuess);
});

playAgainBtn.addEventListener("click", resetGame);

resetGame();