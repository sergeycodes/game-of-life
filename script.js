const ROWS = 30;
const COLS = 50;
let grid = createEmptyGrid();

function createEmptyGrid() {
    const arr = [];
    for (let r = 0; r < ROWS; r++) {
        arr[r] = [];
        for (let c = 0; c < COLS; c++) {
            arr[r][c] = 0;
        }
    }
    return arr;
}



buildGrid();

document.getElementById('startBtn').addEventListener('click', () => {
    alert('Start clicked (wire up your game loop here)');
});

document.getElementById('pauseBtn').addEventListener('click', () => {
    alert('Pause clicked (pause your game loop here)');
});

document.getElementById('clearBtn').addEventListener('click', () => {
    grid = createEmptyGrid();
    updateGridDisplay();
});


function buildGrid() {
    const container = document.getElementById('gridContainer');
    // grid size
    container.style.gridTemplateColumns = `repeat(${COLS}, 20px)`;
    container.style.gridTemplateRows = `repeat(${ROWS}, 20px)`;

    // Clear any existing cells
    container.innerHTML = '';

    // Create each cell
    for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
            const cellDiv = document.createElement('div');
            cellDiv.classList.add('cell');
            cellDiv.dataset.row = r;
            cellDiv.dataset.col = c;
            container.appendChild(cellDiv);
        }
    }

    // After all cells exist, add click handlers
    attachCellClickHandlers();
    updateGridDisplay();
}

function attachCellClickHandlers() {
    const container = document.getElementById('gridContainer');
    if (!container) return;

    container.querySelectorAll('.cell').forEach(cellDiv => {
        cellDiv.addEventListener('click', () => {
            const r = Number(cellDiv.dataset.row);
            const c = Number(cellDiv.dataset.col);
            grid[r][c] = grid[r][c] === 1 ? 0 : 1;
            updateGridDisplay();
        });
    });
}

function updateGridDisplay() {
    const container = document.getElementById('gridContainer');
    if (!container) return;

    container.querySelectorAll('.cell').forEach(cellDiv => {
        const r = Number(cellDiv.dataset.row);
        const c = Number(cellDiv.dataset.col);
        if (grid[r][c] === 1) {
            cellDiv.classList.add('alive');
        } else {
            cellDiv.classList.remove('alive');
        }
    });
}