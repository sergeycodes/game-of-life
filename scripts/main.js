// main.js

import { createGrid, drawGrid, renderGrid } from './grid.js';
import { nextGeneration }                from './logic.js';
import { initControls }                  from './controls.js';

let grid, generation = 0, intervalId = null;

// License URL constant
const LICENSE_URL = 'https://creativecommons.org/licenses/by-sa/3.0/';
const LICENSE_TEXT = 'This work is licensed under the Creative Commons Attribution-ShareAlike 3.0 Unported License (CC BY-SA 3.0).  Read more at:';

document.addEventListener('DOMContentLoaded', () => {
  // 1) Initialize grid data & DOM
  grid = createGrid();
  const container = document.getElementById('grid-container');
  if (!container) {
    console.error('Missing #grid-container!');
    return;
  }
  drawGrid(container);
  renderGrid(grid);

  // 2) Delegate clicks on cells
  container.addEventListener('click', e => {
    if (!e.target.classList.contains('cell')) return;
    const r = +e.target.dataset.row;
    const c = +e.target.dataset.col;
    grid[r][c] ^= 1;
    renderGrid(grid);
  });

  // 3) Add Explanation & Lexicon buttons
  const explanationBtn = document.getElementById('explanationBtn');
  const lexiconBtn    = document.getElementById('lexiconBtn');
  explanationBtn.addEventListener('click', () => {
    alert(`${LICENSE_TEXT}\n${LICENSE_URL}`);
  });
  lexiconBtn.addEventListener('click', () => {
    window.open(LICENSE_URL, '_blank');
  });

  // 4) Cache Start/Pause/Clear buttons & counter
  const startBtn   = document.getElementById('startBtn');
  const pauseBtn   = document.getElementById('pauseBtn');
  const clearBtn   = document.getElementById('clearBtn');
  const genCounter = document.getElementById('generation-counter');

  // 5) Wire up controls with callbacks
  initControls({
    onStart:  () => {
      if (intervalId != null) return;
      // Reset generation on each start
      generation = 0;
      genCounter.textContent = `Generation: ${generation}`;
      startBtn.disabled = true;
      pauseBtn.disabled = false;

      intervalId = setInterval(() => {
        grid = nextGeneration(grid);
        renderGrid(grid);
        generation++;
        genCounter.textContent = `Generation: ${generation}`;

        if (!hasAliveCells(grid)) {
          clearInterval(intervalId);
          intervalId = null;
          startBtn.disabled = false;
          pauseBtn.disabled = true;
        }
      }, 100);
    },

    onPause:  () => {
      clearInterval(intervalId);
      intervalId = null;
      startBtn.disabled = false;
      pauseBtn.disabled = true;
    },

    onClear:  () => {
      clearInterval(intervalId);
      intervalId = null;
      generation = 0;
      genCounter.textContent = `Generation: ${generation}`;
      grid = createGrid();
      renderGrid(grid);
      startBtn.disabled = false;
      pauseBtn.disabled = true;
    }
  });
});

/** Return true if at least one cell in the grid is alive (1). */
function hasAliveCells(grid) {
  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < grid[r].length; c++) {
      if (grid[r][c] === 1) return true;
    }
  }
  return false;
}
