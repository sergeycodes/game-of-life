import { ROWS, COLS } from "./grid.js";

export function nextGeneration(current) {
  const next = Array.from({ length: ROWS }, () => Array(COLS).fill(0));

  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      let liveNeighbors = 0;
      for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -1; dc <= 1; dc++) {
          if (dr === 0 && dc === 0) continue;
          const nr = r + dr,
            nc = c + dc;
          if (
            nr >= 0 &&
            nr < ROWS &&
            nc >= 0 &&
            nc < COLS &&
            current[nr][nc] === 1
          )
            liveNeighbors++;
        }
      }
      // Apply Conway’s rules:
      if (current[r][c] === 1) {
        next[r][c] = liveNeighbors === 2 || liveNeighbors === 3 ? 1 : 0;
      } else {
        next[r][c] = liveNeighbors === 3 ? 1 : 0;
      }
    }
  }
  return next;
}
