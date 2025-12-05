// Get all necessary elements from the HTML
const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('#score');
const timeLeftBoard = document.querySelector('#time-left');
const startButton = document.querySelector('#startButton');

let score = 0;
let timeLeft = 30;
let hitPosition;
let moleTimerId = null;
let countdownTimerId = null;
let isGameRunning = false;

// Function to pick a random hole for the mole to appear
function randomHole() {
    // Remove the 'up' class from all holes first
    holes.forEach(hole => {
        hole.classList.remove('up');
    });

    // Get a random hole and add the 'up' class to make the mole appear
    const randomHole = holes[Math.floor(Math.random() * 12)];
    randomHole.classList.add('up');

    // Store the ID of the hole where the mole is
    hitPosition = randomHole.id;
}

// Add a click event listener to each hole
holes.forEach(hole => {
    hole.addEventListener('mousedown', () => {
        // If the game is running and the player clicks the correct hole
        if (isGameRunning && hole.id == hitPosition) {
            score++;
            scoreBoard.textContent = score;
            hitPosition = null; // Prevent multiple scores for the same mole
            hole.classList.remove('up'); // Make mole disappear immediately
        }
    });
});

// Function to move the mole periodically
function moveMole() {
    moleTimerId = setInterval(randomHole, 800); // The mole will move every 800 milliseconds
}

// Function for the game countdown timer
function countdown() {
    timeLeft--;
    timeLeftBoard.textContent = timeLeft;

    if (timeLeft === 0) {
        // Stop the timers when time is up
        clearInterval(countdownTimerId);
        clearInterval(moleTimerId);
        isGameRunning = false;
        alert('GAME OVER! Your final score is: ' + score);
        startButton.disabled = false;
    }
}

// Function to start the game
function startGame() {
    // Reset everything
    score = 0;
    timeLeft = 30;
    scoreBoard.textContent = score;
    timeLeftBoard.textContent = timeLeft;
    isGameRunning = true;
    startButton.disabled = true;

    // Start the game loops
    moveMole();
    countdownTimerId = setInterval(countdown, 1000); // Countdown every second
}

// Event listener for the start button
startButton.addEventListener('click', startGame);