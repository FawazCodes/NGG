// Generate a random 4-digit secret number for the computer to guess
function generateSecretNumber() {
  let secretNumber = "";
  const digits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

  while (secretNumber.length < 4) {
    const randomIndex = Math.floor(Math.random() * digits.length);
    const digit = digits[randomIndex];

    if (!secretNumber.includes(digit)) {
      secretNumber += digit;
    }
  }

  return secretNumber;
}

// Check if the computer's guess matches the secret number
function isCorrectGuess(guess, secretNumber) {
  return guess === secretNumber;
}

// Calculate the number of correct digits at the right position
function calculateCorrectDigits(guess, secretNumber) {
  let count = 0;
  for (let i = 0; i < guess.length; i++) {
    if (guess[i] === secretNumber[i]) {
      count++;
    }
  }
  return count;
}

// Calculate the number of correct digits at the wrong position
function calculateMisplacedDigits(guess, secretNumber) {
  let count = 0;
  for (let i = 0; i < guess.length; i++) {
    if (guess[i] !== secretNumber[i] && secretNumber.includes(guess[i])) {
      count++;
    }
  }
  return count;
}

// Clear the input field and focus on it
function clearFeedbackInput() {
  const feedbackInput = document.getElementById("feedback");
  feedbackInput.value = "";
  feedbackInput.focus();
}

// Submit the feedback and process the computer's next guess
function submitFeedback() {
  const feedbackInput = document.getElementById("feedback");
  const feedback = feedbackInput.value.trim();

  if (feedback.length === 0) {
    return; // Ignore empty feedback
  }

  const guess = document.getElementById("guess").textContent;
  const correctDigits = parseInt(feedback.match(/\+(\d+)/)[1]);
  const misplacedDigits = parseInt(feedback.match(/-(\d+)/)[1]);

  if (isCorrectGuess(guess, secretNumber)) {
    document.getElementById("result").textContent = "The computer cracked the code! You lose.";
    feedbackInput.disabled = true;
    feedbackInput.placeholder = "";
  } else {
    const nextGuess = getNextGuess(guess, correctDigits, misplacedDigits);
    document.getElementById("guess").textContent = nextGuess;
    clearFeedbackInput();
  }
}

// Get the computer's next guess based on the feedback
function getNextGuess(previousGuess, correctDigits, misplacedDigits) {
  // Implementation of the computer's strategy to generate the next guess
  // You can modify this function to improve the computer's guessing algorithm

  // Here's a simple implementation that generates a random guess
  let nextGuess = "";

  while (nextGuess.length < 4) {
    const randomIndex = Math.floor(Math.random() * 10);
    const digit = randomIndex.toString();

    if (!nextGuess.includes(digit)) {
      nextGuess += digit;
    }
  }

  return nextGuess;
}

// Reset the game to play again
function resetGame() {
  secretNumber = generateSecretNumber();
  document.getElementById("guess").textContent = "----";
  document.getElementById("result").textContent = "";
  document.getElementById("feedback").disabled = false;
  clearFeedbackInput();
}

// Start a new game
let secretNumber = generateSecretNumber();
resetGame();
