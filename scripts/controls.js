export function initControls(callbacks) {
  const { onStart, onPause, onClear, onSeedRandom, onSpeed } = callbacks;

  const startBtn = document.getElementById('startBtn');
  const pauseBtn = document.getElementById('pauseBtn');
  const clearBtn = document.getElementById('clearBtn');
  const speedSlider = document.getElementById('speedSlider');
  const seedBtn = document.getElementById('seedBtn');

  if (startBtn && typeof onStart === 'function') {
    startBtn.addEventListener('click', () => {
      onStart();
      startBtn.disabled = true;
      pauseBtn.disabled = false;
    });
  }

  if (pauseBtn && typeof onPause === 'function') {
    pauseBtn.addEventListener('click', () => {
      onPause();
      startBtn.disabled = false;
      pauseBtn.disabled = true;
    });
    pauseBtn.disabled = true; // initially disabled
  }

  if (clearBtn && typeof onClear === 'function') {
    clearBtn.addEventListener('click', () => {
      onClear();
      startBtn.disabled = false;
      pauseBtn.disabled = true;
    });
  }

  if (seedBtn && typeof onSeedRandom === 'function') {
    seedBtn.addEventListener('click', () => {
      onSeedRandom();
      startBtn.disabled = false;
      pauseBtn.disabled = true;
    });
  }

  if (speedSlider && typeof onSpeed === 'function') {
    speedSlider.addEventListener('input', (e) => {
      onSpeed(Number(e.target.value));
    });
  }
}