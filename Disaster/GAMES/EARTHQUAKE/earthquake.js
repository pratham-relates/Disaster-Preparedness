document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const gameBoard = document.getElementById('game-board');
    const timeLeftDisplay = document.getElementById('time-left');
    const survivorsFoundDisplay = document.getElementById('survivors-found');
    const statusText = document.getElementById('status-text');
    const gameContainer = document.getElementById('game-container');
    const startScreen = document.getElementById('start-screen');
    const endScreen = document.getElementById('end-screen');
    const startButton = document.getElementById('start-button');
    const restartButton = document.getElementById('restart-button');

    // Game Config
    const TILE_SIZE = 40;
    const ROWS = 15;
    const COLS = 20;
    const TILE_TYPES = { PATH: 0, WALL: 1, DEBRIS: 2, SURVIVOR: 3, EXIT: 4, PLAYER: 5 };
    const initialMap = [
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,5,0,0,1,2,0,0,2,0,0,1,2,0,3,0,0,1,1,1],
        [1,1,1,0,1,2,1,1,1,1,0,1,1,1,1,1,0,0,0,1],
        [1,0,0,0,2,0,0,0,0,1,0,0,0,0,0,2,0,1,0,1],
        [1,0,1,1,1,1,1,2,0,1,1,1,0,1,1,1,0,1,0,1],
        [1,0,0,2,0,0,1,2,0,0,0,1,0,2,3,1,0,1,2,1],
        [1,1,1,1,1,0,1,1,1,1,0,1,0,1,1,1,0,1,0,1],
        [1,3,2,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1],
        [1,1,1,1,2,1,1,1,0,1,1,1,1,1,2,1,1,1,0,1],
        [1,0,0,0,0,0,2,1,0,0,0,0,0,0,0,0,0,1,0,1],
        [1,2,1,1,1,1,2,1,1,1,1,1,2,1,1,1,0,1,0,1],
        [1,0,0,0,0,1,0,0,0,0,0,1,2,0,0,0,0,1,2,1],
        [1,1,0,1,2,1,0,1,1,1,0,1,1,1,1,1,1,1,0,1],
        [1,0,0,0,2,0,0,0,0,1,0,0,0,0,0,2,0,0,4,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    ];

    // Game State
    let player, map, timeLeft, survivorsFound, gameIntervals;

    function startGame() {
        map = initialMap.map(row => [...row]); // Deep copy of the map
        timeLeft = 120;
        survivorsFound = 0;
        gameIntervals = [];

        startScreen.classList.add('hidden');
        endScreen.classList.add('hidden');
        
        createBoard();
        updateUI();

        gameIntervals.push(setInterval(updateTimer, 1000));
        gameIntervals.push(setInterval(triggerAftershock, 7000)); // Aftershock every 7s
    }

    function createBoard() {
        gameBoard.innerHTML = '';
        for (let r = 0; r < ROWS; r++) {
            for (let c = 0; c < COLS; c++) {
                const tile = document.createElement('div');
                tile.classList.add('tile');
                tile.id = `tile-${r}-${c}`;
                
                if (map[r][c] === TILE_TYPES.PLAYER) {
                    player = { x: c, y: r };
                    map[r][c] = TILE_TYPES.PATH;
                }
                
                gameBoard.appendChild(tile);
            }
        }
        drawBoard();
        
        const playerElement = document.createElement('div');
        playerElement.id = 'player';
        gameBoard.appendChild(playerElement);
        movePlayer(player.x, player.y);
    }

    function drawBoard() {
        for (let r = 0; r < ROWS; r++) {
            for (let c = 0; c < COLS; c++) {
                const tile = document.getElementById(`tile-${r}-${c}`);
                tile.className = 'tile';
                switch(map[r][c]) {
                    case TILE_TYPES.PATH: tile.classList.add('path'); break;
                    case TILE_TYPES.WALL: tile.classList.add('wall'); break;
                    case TILE_TYPES.DEBRIS: tile.classList.add('debris'); break;
                    case TILE_TYPES.SURVIVOR: tile.classList.add('survivor'); tile.textContent = '🙋'; break;
                    case TILE_TYPES.EXIT: tile.classList.add('exit'); tile.textContent = '🚁'; break;
                }
            }
        }
    }

    function movePlayer(x, y) {
        player.x = x;
        player.y = y;
        document.getElementById('player').style.left = `${x * TILE_SIZE}px`;
        document.getElementById('player').style.top = `${y * TILE_SIZE}px`;
    }

    function handleKeyPress(e) {
        if (gameIntervals.length === 0) return;
        let newX = player.x;
        let newY = player.y;

        if (e.key === 'ArrowUp') newY--;
        if (e.key === 'ArrowDown') newY++;
        if (e.key === 'ArrowLeft') newX--;
        if (e.key === 'ArrowRight') newX++;
        
        const targetTile = map[newY] && map[newY][newX];
        if (targetTile === undefined || targetTile === TILE_TYPES.WALL) return;
        
        if (targetTile === TILE_TYPES.DEBRIS) {
            map[newY][newX] = TILE_TYPES.PATH;
            statusText.textContent = "Debris cleared! It cost you 5 seconds.";
            timeLeft -= 5;
        } else if (targetTile === TILE_TYPES.SURVIVOR) {
            survivorsFound++;
            map[newY][newX] = TILE_TYPES.PATH;
            statusText.textContent = `Survivor found! ${3 - survivorsFound} to go.`;
        } else if (targetTile === TILE_TYPES.EXIT) {
            if (survivorsFound >= 3) {
                endGame(true);
            } else {
                statusText.textContent = `Find all survivors before exiting!`;
                return;
            }
        }
        
        movePlayer(newX, newY);
        drawBoard();
        updateUI();
    }

    function triggerAftershock() {
        gameContainer.classList.add('shake');
        setTimeout(() => gameContainer.classList.remove('shake'), 820);
        statusText.textContent = 'AFTERSHOCK! The ground is shifting!';
        
        for (let i = 0; i < 3; i++) {
            const r = Math.floor(Math.random() * ROWS);
            const c = Math.floor(Math.random() * COLS);
            if (map[r][c] === TILE_TYPES.PATH) {
                map[r][c] = TILE_TYPES.DEBRIS;
            }
        }
        drawBoard();
    }
    
    function updateTimer() {
        timeLeft--;
        if (timeLeft <= 0) {
            timeLeft = 0;
            endGame(false);
        }
        updateUI();
    }

    function updateUI() {
        timeLeftDisplay.textContent = timeLeft;
        survivorsFoundDisplay.textContent = `${survivorsFound} / 3`;
    }
    
    function endGame(isWin) {
        gameIntervals.forEach(clearInterval);
        gameIntervals = [];
        endScreen.classList.remove('hidden');
        const endTitle = document.getElementById('end-title');
        const endMessage = document.getElementById('end-message');
        
        if (isWin) {
            endTitle.textContent = "Mission Complete!";
            endMessage.textContent = `You rescued everyone with ${timeLeft} seconds remaining!`;
        } else {
            endTitle.textContent = "Mission Failed";
            endMessage.textContent = timeLeft <= 0 ? "You ran out of time." : `You only found ${survivorsFound} of 3 survivors.`;
        }
    }

    // Event Listeners
    startButton.addEventListener('click', startGame);
    restartButton.addEventListener('click', startGame);
    window.addEventListener('keydown', handleKeyPress);
});