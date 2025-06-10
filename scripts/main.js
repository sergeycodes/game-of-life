import { createEmptyGrid, buildGrid, updateGridDisplay } from "./grid.js";

import { computeNextGeneration, seedRandom } from "./logic.js";

import { saveState, loadState } from "./storage.js";

import { initControls } from "./controls.js";

let grid = createEmptyGrid();
let gameInterval = null;

/**
 * Called once DOM is loaded. 1) Load any saved state, 2) build grid, 3) init controls.
 */
document.addEventListener("DOMContentLoaded", () => {
  // 1) Attempt to load saved state from localStorage
  const saved = loadState();
  if (saved && Array.isArray(saved.grid)) {
    grid = saved.grid;
    // Optionally set the speed slider from saved.speed:
    document.getElementById("speedSlider").value = saved.speed;
  }

  // 2) Build the grid in the DOM (painting saved cells if any)
  buildGrid(grid);

  // 3) Initialize controls with their callbacks
  initControls({
    onStart: handleStart,
    onPause: handlePause,
    onClear: handleClear,
    onSeedRandom: handleSeedRandom,
    onSpeed: handleSpeedChange,
  });

  updateGridDisplay(grid);
});

/** Start the game loop (advance every “speed” ms). */
function handleStart() {
  if (gameInterval) return; // already running

  const speedMs = Number(document.getElementById("speedSlider").value);
  gameInterval = setInterval(() => {
    grid = computeNextGeneration(grid);
    updateGridDisplay(grid);
    saveState(grid, speedMs);
  }, speedMs);
}

function handlePause() {
  if (gameInterval) {
    clearInterval(gameInterval);
    gameInterval = null;
  }
}

/** Clear the grid completely (all-dead) and repaint. */
function handleClear() {
  handlePause(); // ensure it’s not running
  grid = createEmptyGrid(); // brand-new grid
  updateGridDisplay(grid);
  saveState(grid, Number(document.getElementById("speedSlider").value));
}

function handleSeedRandom() {
  handlePause();
  grid = createEmptyGrid();
  seedRandom(grid, 0.2); // e.g. 20% cells alive
  updateGridDisplay(grid);
  saveState(grid, Number(document.getElementById("speedSlider").value));
}

/** When speed slider changes, restart the interval if running. */
function handleSpeedChange(newSpeedMs) {
  if (gameInterval) {
    clearInterval(gameInterval);
    gameInterval = setInterval(() => {
      grid = computeNextGeneration(grid);
      updateGridDisplay(grid);
      saveState(grid, newSpeedMs);
    }, newSpeedMs);
  }
}
