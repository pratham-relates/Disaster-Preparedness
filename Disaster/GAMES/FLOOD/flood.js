document.addEventListener('DOMContentLoaded', () => {
    // UI Elements
    const timeDisplay = document.querySelector('#time');
    const pointsDisplay = document.querySelector('#points');
    const startScreen = document.querySelector('#start-screen');
    const endScreen = document.querySelector('#end-screen');
    const waterLevel = document.querySelector('#water-level');

    // Buttons
    const startButton = document.querySelector('#start-button');
    const restartButton = document.querySelector('#restart-button');

    // Game Items
    const items = document.querySelectorAll('.item');

    // Game State
    let score = 0;
    let timeLeft = 90;
    let timerId = null;
    let tasks = {
        documents: { completed: false, points: 10 },
        torch: { completed: false, points: 10 },
        water: { completed: false, points: 10 },
        tv: { completed: false, points: 15 },
        gas: { completed: false, points: 20 },
        power: { completed: false, points: 20 },
        family: { completed: false, points: 50 }
    };

    function startGame() {
        // Reset state
        score = 0;
        timeLeft = 10;
        pointsDisplay.textContent = score;
        timeDisplay.textContent = timeLeft;
        Object.keys(tasks).forEach(key => tasks[key].completed = false);

        // Reset UI
        startScreen.classList.add('hidden');
        endScreen.classList.add('hidden');
        waterLevel.style.height = '0%';
        updateTaskList();
        items.forEach(item => item.classList.remove('completed'));

        // Start timer
        timerId = setInterval(countdown, 1000);
    }

    function countdown() {
        timeLeft--;
        timeDisplay.textContent = timeLeft;
        if (timeLeft === 0) {
            endGame(false); // Game over, time ran out
        }
    }

    function completeTask(taskId) {
        if (!tasks[taskId].completed) {
            tasks[taskId].completed = true;
            score += tasks[taskId].points;
            pointsDisplay.textContent = score;

            // Update visuals
            document.querySelector(`#${taskId}`).classList.add('completed');
            updateTaskList();
            checkWinCondition();
        }
    }

    function updateTaskList() {
        Object.keys(tasks).forEach(key => {
            const taskElement = document.querySelector(`#task-${key}`);
            if (tasks[key].completed) {
                taskElement.classList.add('completed');
            } else {
                taskElement.classList.remove('completed');
            }
        });
    }
    
    function checkWinCondition() {
        const allTasksDone = Object.values(tasks).every(task => task.completed);
        if(allTasksDone) {
            endGame(true); // Game won
        }
    }

    function endGame(isWin) {
        clearInterval(timerId);
        waterLevel.style.height = '50%'; // Flood the ground floor
        
        const endTitle = document.querySelector('#end-title');
        const endMessage = document.querySelector('#end-message');
        const finalScoreDisplay = document.querySelector('#final-score');
        
        if(isWin) {
            endTitle.textContent = "You're Prepared!";
            endMessage.textContent = `Excellent work! You secured everything with ${timeLeft} seconds to spare.`;
        } else {
            endTitle.textContent = "Time's Up!";
            endMessage.textContent = "The water is rising! You did your best to prepare.";
        }
        
        finalScoreDisplay.textContent = score;
        endScreen.classList.remove('hidden');
    }

    // Event Listeners
    startButton.addEventListener('click', startGame);
    restartButton.addEventListener('click', startGame);
    items.forEach(item => {
        item.addEventListener('click', () => completeTask(item.id));
    });
});