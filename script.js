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

const numberDisplay = document.getElementById("number-display");
const submitBtn = document.getElementById("submit-btn");
const resetBtn = document.getElementById("reset-btn");
const message = document.getElementById("message");
const guessesGrid = document.getElementById("guesses-grid");
const languageBtn = document.getElementById("language-btn");
const textElements = document.querySelectorAll("[data-en], [data-ar]");

let currentLanguage = "en";

languageBtn.addEventListener("click", () => {
  currentLanguage = currentLanguage === "en" ? "ar" : "en";
  updateLanguage();
});

function updateLanguage() {
  textElements.forEach((element) => {
    const text = element.getAttribute(`data-${currentLanguage}`);
    if (element.tagName === "INPUT") {
      element.placeholder = text;
    } else {
      element.textContent = text;
    }
  });

  if (currentLanguage === "ar") {
    document.body.setAttribute("dir", "rtl");
  } else {
    document.body.removeAttribute("dir");
  }
}

updateLanguage();

const hiddenNumber = generateHiddenNumber();
let attempts = 5;
let computerGuess = generateRandomGuess();

numberDisplay.textContent = "****";

submitBtn.addEventListener("click", () => {
  const feedback = compareGuess(hiddenNumber, computerGuess);

  if (feedback === "+4") {
    message.textContent = "Oh no! The computer has guessed your number!";
    submitBtn.disabled = true;
    resetBtn.hidden = false;
  } else {
    attempts--;

    if (attempts === 0) {
      message.textContent = "Congratulations! The computer could not guess your number!";
      submitBtn.disabled = true;
      resetBtn.hidden = false;
    } else {
      message.textContent = `The computer has ${feedback} correct digits.`;
      computerGuess = generateRandomGuess();
    }

    addToGuessesGrid(computerGuess, feedback);
  }
});

resetBtn.addEventListener("click", () => {
  attempts = 5;
  computerGuess = generateRandomGuess();
  message.textContent = "";
  guessesGrid.innerHTML = "";
  resetBtn.hidden = true;
  submitBtn.disabled = false;
});

function generateHiddenNumber() {
  const hiddenNumber = prompt("Enter a four-digit number for the computer to guess:");
  return hiddenNumber;
}

function generateRandomGuess() {
  let randomGuess = "";
  while (randomGuess.length < 4) {
    const randomDigit = Math.floor(Math.random() * 10);
    if (!randomGuess.includes(randomDigit)) {
      randomGuess += randomDigit;
    }
  }
  return randomGuess;
}

function compareGuess(hiddenNumber, guess) {
  let correctDigits = 0;

  for (let i = 0; i < 4; i++) {
    if (hiddenNumber[i] === guess[i]) {
      correctDigits++;
    }
  }

  let feedback = "";
  if (correctDigits > 0) {
    feedback += `+${correctDigits}`;
  } else {
    feedback = "0";
  }

  return feedback;
}

function addToGuessesGrid(guess, feedback) {
  const guessElement = document.createElement("div");
  guessElement.textContent = `${guess} (${feedback})`;
  guessesGrid.appendChild(guessElement);
}
