document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const gameArea = document.getElementById('game-area');
    const car = document.getElementById('car');
    const scoreDisplay = document.getElementById('score');
    const startScreen = document.getElementById('start-screen');
    const endScreen = document.getElementById('end-screen');
    const startButton = document.getElementById('start-button');
    const restartButton = document.getElementById('restart-button');
    const finalScoreDisplay = document.getElementById('final-score');

    // Game State
    let score = 0;
    let isGameOver = true;
    let carPosition = 175;
    const gameWidth = 400;
    const carWidth = 50;
    let keys = {};
    let gameIntervals = [];

    function startGame() {
        isGameOver = false;
        score = 0;
        carPosition = 175;
        scoreDisplay.textContent = score;
        car.style.left = `${carPosition}px`;

        startScreen.classList.add('hidden');
        endScreen.classList.add('hidden');

        gameIntervals.forEach(clearInterval);
        gameIntervals = [];
        
        document.querySelectorAll('.boulder, .shadow').forEach(el => el.remove());

        // Start game loops
        gameIntervals.push(setInterval(gameLoop, 20)); // Main game loop for movement
        gameIntervals.push(setInterval(createBoulder, 1000)); // Create a new boulder every second
        gameIntervals.push(setInterval(() => { if (!isGameOver) score++; }, 100)); // Increment score
    }

    function gameLoop() {
        if (isGameOver) return;
        
        // Car Movement
        if (keys['ArrowLeft'] && carPosition > 0) {
            carPosition -= 5;
        }
        if (keys['ArrowRight'] && carPosition < gameWidth - carWidth) {
            carPosition += 5;
        }
        car.style.left = `${carPosition}px`;
        
        scoreDisplay.textContent = score;
        checkCollision();
    }

    function createBoulder() {
        if (isGameOver) return;

        const boulderSize = Math.random() * 40 + 20; // Size between 20px and 60px
        const boulderX = Math.random() * (gameWidth - boulderSize);
        
        // Create shadow warning
        const shadow = document.createElement('div');
        shadow.classList.add('shadow');
        shadow.style.width = `${boulderSize}px`;
        shadow.style.left = `${boulderX}px`;
        gameArea.appendChild(shadow);
        
        setTimeout(() => {
            shadow.remove();
            
            // Create actual boulder after shadow animation
            const boulder = document.createElement('div');
            boulder.classList.add('boulder');
            boulder.style.width = `${boulderSize}px`;
            boulder.style.height = `${boulderSize}px`;
            boulder.style.left = `${boulderX}px`;
            gameArea.appendChild(boulder);

            // Remove boulder after it falls off screen
            setTimeout(() => {
                boulder.remove();
            }, 3000); // Corresponds to animation duration

        }, 500); // Shadow appears 0.5s before boulder
    }

    function checkCollision() {
        const carRect = car.getBoundingClientRect();
        document.querySelectorAll('.boulder').forEach(boulder => {
            const boulderRect = boulder.getBoundingClientRect();
            if (
                carRect.left < boulderRect.right &&
                carRect.right > boulderRect.left &&
                carRect.top < boulderRect.bottom &&
                carRect.bottom > boulderRect.top
            ) {
                endGame();
            }
        });
    }

    function endGame() {
        isGameOver = true;
        gameIntervals.forEach(clearInterval);
        finalScoreDisplay.textContent = score;
        endScreen.classList.remove('hidden');
    }

    // Event Listeners
    window.addEventListener('keydown', (e) => keys[e.key] = true);
    window.addEventListener('keyup', (e) => keys[e.key] = false);
    startButton.addEventListener('click', startGame);
    restartButton.addEventListener('click', startGame);
});