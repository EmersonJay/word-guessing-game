// Author: Emerson Jay C. RIcarte
// Course: BSIT 2B
// Word Guessing Game

const words = ["apple", "banana", "grape", "orange", "peach", "kiwi", "mango"];
const maxAttempts = 5;
let attemptsLeft = maxAttempts;
let secretWord = words[Math.floor(Math.random() * words.length)];
let gameOver = false;

// For testing purposes
console.log("Secret word:", secretWord);

const input = document.getElementById("guessInput");
const submitBtn = document.getElementById("submitBtn");
const message = document.getElementById("message");
const restartBtn = document.getElementById("restart");

submitBtn.addEventListener("click", handleGuess);
restartBtn.addEventListener("click", restartGame);
input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") handleGuess();
});

function handleGuess() {
  if (gameOver) return;

  let guess = input.value.trim().toLowerCase();
  input.value = "";

  if (guess === "") {
    attemptsLeft--;
    updateMessage(`Incorrect guess. You have ${attemptsLeft} attempts left. Try again!`);
  } else if (guess === secretWord) {
    updateMessage("🎉 Congratulations! You guessed the secret word!", "green");
    endGame();
  } else {
    attemptsLeft--;
    if (attemptsLeft > 0) {
      updateMessage(`Incorrect guess. You have ${attemptsLeft} attempts left. Try again!`);
    } else {
      updateMessage(`❌ Game over! The secret word was '${secretWord}'.`, "red");
      endGame();
    }
  }
}

function updateMessage(msg, color = "black") {
  message.textContent = msg;
  message.style.color = color;
}

function endGame() {
  gameOver = true;
  submitBtn.disabled = true;
  input.disabled = true;
  restartBtn.style.display = "inline-block";
}

function restartGame() {
  secretWord = words[Math.floor(Math.random() * words.length)];
  attemptsLeft = maxAttempts;
  gameOver = false;
  input.value = "";
  input.disabled = false;
  submitBtn.disabled = false;
  message.textContent = "";
  restartBtn.style.display = "none";
  console.log("New secret word:", secretWord);
}
