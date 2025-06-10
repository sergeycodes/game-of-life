import { ROWS, COLS, createEmptyGrid } from './grid.js';

/**
 * Given a 2D array oldGrid, return a brand-new 2D array (same dimensions)
 * representing the next generation according to Conway’s rules.
 */
export function computeNextGeneration(oldGrid) {
  const newGrid = createEmptyGrid();

  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      const liveNeighbors = countLiveNeighbors(oldGrid, r, c);
      if (oldGrid[r][c] === 1) {
        // Alive cell
        newGrid[r][c] = (liveNeighbors === 2 || liveNeighbors === 3) ? 1 : 0;
      } else {
        // Dead cell
        newGrid[r][c] = (liveNeighbors === 3) ? 1 : 0;
      }
    }
  }

  return newGrid;
}

/** Count how many of the eight neighbors around (r,c) are alive (1). */
function countLiveNeighbors(grid, r, c) {
  let count = 0;
  for (let dr = -1; dr <= 1; dr++) {
    for (let dc = -1; dc <= 1; dc++) {
      if (dr === 0 && dc === 0) continue;
      const nr = r + dr;
      const nc = c + dc;
      if (nr >= 0 && nr < ROWS && nc >= 0 && nc < COLS) {
        count += grid[nr][nc];
      }
    }
  }
  return count;
}

export function seedRandom(gridArray, fraction = 0.2) {
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      gridArray[r][c] = Math.random() < fraction ? 1 : 0;
    }
  }
}