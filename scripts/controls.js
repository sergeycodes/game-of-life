export function initControls({ onStart, onPause, onClear }) {
  const startBtn = document.getElementById("startBtn");
  const pauseBtn = document.getElementById("pauseBtn");
  const clearBtn = document.getElementById("clearBtn");

  startBtn.addEventListener("click", () => {
    onStart();
    startBtn.disabled = true;
    pauseBtn.disabled = false;
  });

  pauseBtn.disabled = true;
  pauseBtn.addEventListener("click", () => {
    onPause();
    startBtn.disabled = false;
    pauseBtn.disabled = true;
  });

  clearBtn.addEventListener("click", () => {
    onClear();
    startBtn.disabled = false;
    pauseBtn.disabled = true;
  });
}
