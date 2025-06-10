export const ROWS = 100;
export const COLS = 100;

export function createGrid() {
  return Array.from({ length: ROWS }, () => Array(COLS).fill(0));
}

// Draws ROWS×COLS .cell DIVs inside the container 
export function drawGrid(container) {
  container.innerHTML = '';                  // clear any old cells

  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.dataset.row = r;
      cell.dataset.col = c;
      container.appendChild(cell);
    }
  }
}

// Toggles the .alive class on each cell DIV per grid data 
export function renderGrid(grid) {
  document.querySelectorAll('#grid-container .cell').forEach(cell => {
    const r = +cell.dataset.row, c = +cell.dataset.col;
    cell.classList.toggle('alive', grid[r][c] === 1);
  });
}
