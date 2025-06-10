const STORAGE_KEY = 'lifeGameState';

// Save the current grid array to localStorage.

export function saveState(gridArray, speedMs) {
  const payload = {
    grid: gridArray,
    speed: speedMs,
    timestamp: Date.now()
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
}

/**
 * Load saved state from localStorage. Returns an object with { grid, speed }
 * or null if nothing is saved or parsing fails.
 */
export function loadState() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) return null;
  try {
    const { grid, speed } = JSON.parse(saved);
    return { grid, speed };
  } catch {
    console.warn('Could not parse saved game state.');
    return null;
  }
}