const STORAGE_KEY = 'lifeGameState';

// Save the current grid array to localStorage.
export function saveState(grid, generation) {
  try {
    const state = { grid, generation };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.warn('Failed to save state:', e);
  }
}

/**
 * Load saved state from localStorage. Returns an object with { grid, speed }
 * or null if nothing is saved or parsing fails.
 */
export function loadState() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return null;
    const { grid, generation } = JSON.parse(saved);
    // Validate structure
    if (Array.isArray(grid) && typeof generation === 'number') {
      return { grid, generation };
    }
  } catch (e) {
    console.warn('Failed to load state:', e);
  }
  return null;
}