// grid.js

export const ROWS = 30;
export const COLS = 50;

// 1) Create an empty 2D array [ROWS][COLS] of zeros
export function createEmptyGrid() {
  const arr = [];
  for (let r = 0; r < ROWS; r++) {
    arr[r] = [];
    for (let c = 0; c < COLS; c++) {
      arr[r][c] = 0;
    }
  }
  return arr;
}

// 2) Dynamically build ROWS×COLS <div class="cell"> elements
export function buildGrid(gridArray) {
  const container = document.getElementById('gridContainer');
  if (!container) {
    console.error('No element with id="gridContainer" found.');
    return;
  }

  // Tell CSS how many columns & rows (and what cell size) to expect
  container.style.gridTemplateColumns = `repeat(${COLS}, 20px)`;
  container.style.gridTemplateRows    = `repeat(${ROWS}, 20px)`;

  // Clear any old cells
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

  // Add click handlers so that clicking toggles cell between alive/dead
  attachCellClickHandlers(gridArray);

  // Paint initial state (all dead)
  updateGridDisplay(gridArray);
}

// 3) Attach click listeners to toggle grid[r][c]
export function attachCellClickHandlers(gridArray) {
  const container = document.getElementById('gridContainer');
  if (!container) return;

  container.querySelectorAll('.cell').forEach(cellDiv => {
    cellDiv.addEventListener('click', () => {
      const r = Number(cellDiv.dataset.row);
      const c = Number(cellDiv.dataset.col);
      gridArray[r][c] = gridArray[r][c] === 1 ? 0 : 1;
      updateGridDisplay(gridArray);
    });
  });
}

// 4) Sync the DOM classes with the JS array
export function updateGridDisplay(gridArray) {
  const container = document.getElementById('gridContainer');
  if (!container) return;

  container.querySelectorAll('.cell').forEach(cellDiv => {
    const r = Number(cellDiv.dataset.row);
    const c = Number(cellDiv.dataset.col);
    if (gridArray[r][c] === 1) {
      cellDiv.classList.add('alive');
    } else {
      cellDiv.classList.remove('alive');
    }
  });
}