// DOM elements
const player1NumberInput = document.getElementById('player1Number');
const player2NumberInput = document.getElementById('player2Number');
const randomNumbersBtn = document.getElementById('randomNumbersBtn');
const startBtn = document.getElementById('startBtn');
const turnIndicator = document.getElementById('turnIndicator');
const guessInput = document.getElementById('guessInput');
const submitBtn = document.getElementById('submitBtn');
const feedbackList = document.getElementById('feedbackList');
const resetBtn = document.getElementById('resetBtn');

// Game variables
let player1Number;
let player2Number;
let currentPlayer;
let currentGuess;

// Event listeners
randomNumbersBtn.addEventListener('click', generateRandomNumbers);
startBtn.addEventListener('click', startGame);
submitBtn.addEventListener('click', handleGuess);
resetBtn.addEventListener('click', resetGame);

// Generate random numbers for both players
function generateRandomNumbers() {
  player1NumberInput.value = generateRandomNumber();
  player2NumberInput.value = generateRandomNumber();
}

// Generate a random 4-digit number with unique digits
function generateRandomNumber() {
  const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  let randomNumber = '';

  for (let i = 0; i < 4; i++) {
    const randomIndex = Math.floor(Math.random() * digits.length);
    const digit = digits.splice(randomIndex, 1)[0];
    randomNumber += digit;
  }

  return randomNumber;
}

// Start the game
function startGame() {
  const player1Input = player1NumberInput.value;
  const player2Input = player2NumberInput.value;

  if (isValidNumber(player1Input) && isValidNumber(player2Input)) {
    player1Number = player1Input;
    player2Number = player2Input;
    currentPlayer = 'player1';
    currentGuess = '';

    turnIndicator.textContent = 'Player 1\'s turn';
    guessInput.value = '';
    feedbackList.innerHTML = '';
    startBtn.disabled = true;
    randomNumbersBtn.disabled = true;
    guessInput.disabled = false;
    submitBtn.disabled = false;
    resetBtn.disabled = false;

    document.getElementById('player1').style.display = 'none';
    document.getElementById('player2').style.display = 'none';
    document.getElementById('game').style.display = 'block';
  } else {
    alert('Please enter valid 4-digit numbers with unique digits.');
  }
}

// Validate the input number
function isValidNumber(number) {
  return /^\d{4}$/.test(number) && new Set(number).size === 4;
}

// Handle the guess input
function handleGuess() {
  const guess = guessInput.value;

  if (isValidNumber(guess)) {
    currentGuess = guess;
    evaluateGuess();
    guessInput.value = '';
  } else {
    alert('Please enter a valid 4-digit number with unique digits.');
  }
}

// Evaluate the current guess and provide feedback
function evaluateGuess() {
  let correctDigits = 0;
  let misplacedDigits = 0;

  for (let i = 0; i < 4; i++) {
    const guessDigit = currentGuess[i];
    if (guessDigit === player2Number[i]) {
      correctDigits++;
    } else if (player2Number.includes(guessDigit)) {
      misplacedDigits++;
    }
  }

  const feedback = `${correctDigits}+ ${misplacedDigits}-`;
  const feedbackItem = document.createElement('li');
  feedbackItem.textContent = feedback;
  feedbackList.appendChild(feedbackItem);

  if (correctDigits === 4) {
    endGame(currentPlayer);
  } else {
    currentPlayer = currentPlayer === 'player1' ? 'player2' : 'player1';
    turnIndicator.textContent = currentPlayer === 'player1' ? 'Player 1\'s turn' : 'Player 2\'s turn';
  }
}

// End the game and declare the winner
function endGame(winner) {
  turnIndicator.textContent = `${winner === 'player1' ? 'Player 1' : 'Player 2'} wins!`;
  guessInput.disabled = true;
  submitBtn.disabled = true;
}

// Reset the game
function resetGame() {
  player1NumberInput.value = '';
  player2NumberInput.value = '';
  startBtn.disabled = false;
  randomNumbersBtn.disabled = false;
  guessInput.disabled = true;
  submitBtn.disabled = true;
  resetBtn.disabled = true;
  document.getElementById('player1').style.display = 'block';
  document.getElementById('player2').style.display = 'block';
  document.getElementById('game').style.display = 'none';
  turnIndicator.textContent = '';
  feedbackList.innerHTML = '';
}
