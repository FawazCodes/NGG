document.addEventListener("DOMContentLoaded", () => {
  // Generate random gradient colors and set them as CSS variables
  const color1 = getRandomColor();
  const color2 = getRandomColor();
  document.documentElement.style.setProperty("--color1", color1);
  document.documentElement.style.setProperty("--color2", color2);
});

function getRandomColor() {
  const randomColor = `hsl(${Math.random() * 360}, 50%, 50%)`;
  return randomColor;
}

const startBtn = document.getElementById("start-btn");
const message = document.getElementById("message");
const guessGrid = document.getElementById("guess-grid");

let secretNumber = "";
let attempts = 0;

startBtn.addEventListener("click", () => {
  // Prompt the player to enter a secret 4-digit number
  const playerNumber = prompt("Think of a secret 4-digit number (with no repeated digits). Press OK when you're ready.");

  // Validate the player's number
  if (isValidNumber(playerNumber)) {
    secretNumber = playerNumber;
    attempts = 0;
    message.textContent = "The computer is trying to guess your number...";
    startBtn.disabled = true;
    guessGrid.innerHTML = "";

    // Start the computer's guessing process
    setTimeout(computerGuess, 1000);
  } else {
    alert("Invalid number! Please try again.");
  }
});

function isValidNumber(number) {
  return /^\d{4}$/.test(number) && new Set(number).size === 4;
}

function computerGuess() {
  const guess = generateRandomNumber();

  // Display the computer's guess in the grid
  const guessElement = document.createElement("div");
  guessElement.textContent = guess;
  guessGrid.appendChild(guessElement);

  attempts++;

  // Check if the computer guessed the correct number
  if (guess === secretNumber) {
    message.textContent = `The computer guessed your number (${guess}) correctly in ${attempts} attempts!`;
    startBtn.disabled = false;
  } else {
    // Provide feedback to the computer and continue guessing
    const feedback = compareNumbers(guess, secretNumber);
    message.textContent = `Attempt ${attempts}: The computer guessed ${guess}, but it's ${feedback}.`;
    setTimeout(computerGuess, 1000);
  }
}

function generateRandomNumber() {
  let number = "";
  while (number.length < 4) {
    const randomDigit = Math.floor(Math.random() * 10);
    if (!number.includes(randomDigit.toString())) {
      number += randomDigit.toString();
    }
  }
  return number;
}

function compareNumbers(guess, secretNumber) {
  let feedback = "";
  for (let i = 0; i < 4; i++) {
    if (guess[i] === secretNumber[i]) {
      feedback += "+";
    } else if (secretNumber.includes(guess[i])) {
      feedback += "-";
    }
  }
  return feedback;
}
