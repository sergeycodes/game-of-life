import { createGrid, drawGrid, renderGrid } from './grid.js';
import { nextGeneration } from './logic.js';
import { initControls } from './controls.js';
import { saveState, loadState } from './storage.js';

let grid, generation = 0, intervalId = null;

document.addEventListener('DOMContentLoaded', () => {
  // Initialize grid
  grid = createGrid();
  const container = document.getElementById('grid-container');
  if (!container) {
    console.error('Missing #grid-container!');
    return;
  }
  // Try to load previous state; otherwise start fresh
  const saved = loadState();
  if (saved) {
    grid = saved.grid;
    generation = saved.generation;
  } else {
    grid = createGrid();
    generation = 0;
  }

  // Draw and render the grid
  drawGrid(container);
  renderGrid(grid);

  // Toggle cell on click
  container.addEventListener('click', e => {
    if (!e.target.classList.contains('cell')) return;
    const r = +e.target.dataset.row;
    const c = +e.target.dataset.col;
    grid[r][c] ^= 1;
    renderGrid(grid);
    // Save state after each toggle
    saveState(grid, generation);
  });

  // Modal elements for Explanation popup
  const infoModal = document.getElementById('info-modal');
  const infoCloseBtn = document.getElementById('info-close');
  const infoOverlay = document.getElementById('info-overlay');
  const explanationBtn = document.getElementById('explanationBtn');

  // Show explanation modal
  explanationBtn.addEventListener('click', () => {
    infoModal.classList.remove('hidden');
  });

  // Close modal when clicking close button or overlay
  infoCloseBtn.addEventListener('click', () => {
    infoModal.classList.add('hidden');
  });
  infoOverlay.addEventListener('click', () => {
    infoModal.classList.add('hidden');
  });

  // Cache control buttons and counter
  const startBtn = document.getElementById('startBtn');
  const pauseBtn = document.getElementById('pauseBtn');
  const clearBtn = document.getElementById('clearBtn');
  const genCounter = document.getElementById('generation-counter');

  // Hook up Start/Pause/Clear via controls module
  initControls({
    onStart: () => {
      if (intervalId != null) return;
      // Reset generation on start
      generation = 0;
      genCounter.textContent = `Generation: ${generation}`;
      saveState(grid, generation);

      startBtn.disabled = true;
      pauseBtn.disabled = false;

      intervalId = setInterval(() => {
        grid = nextGeneration(grid);
        renderGrid(grid);
        generation++;
        genCounter.textContent = `Generation: ${generation}`;
        saveState(grid, generation);

        if (!hasAliveCells(grid)) {
          clearInterval(intervalId);
          intervalId = null;
          startBtn.disabled = false;
          pauseBtn.disabled = true;
        }
      }, 100);
    },
    onPause: () => {
      clearInterval(intervalId);
      intervalId = null;
      startBtn.disabled = false;
      pauseBtn.disabled = true;
      saveState(grid, generation);
    },
    onClear: () => {
      clearInterval(intervalId);
      intervalId = null;
      generation = 0;
      genCounter.textContent = `Generation: ${generation}`;
      grid = createGrid();
      renderGrid(grid);
      saveState(grid, generation);
      startBtn.disabled = false;
      pauseBtn.disabled = true;
    }
  });
});

/** Return true if at least one cell in the grid is alive */
function hasAliveCells(grid) {
  return grid.some(row => row.some(cell => cell === 1));
}
