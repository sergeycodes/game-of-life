# Conway’s Game of Life

## About this Project

I first heard of Conway’s Game of Life before majoring in Computer Science, when I was taking math classes. 
It shows how complex patterns can stabalize and how simple patterns can turn unstable. 
As a zero-player game, you set the starting cells and simply observe the evolution.

---

A client-side implementation of John Conway’s classic cellular automaton:

> "Game of Life" simulates an infinite grid of cells that live, die, or multiply based on simple rules:
>
> * **Underpopulation:** Alive cell with fewer than 2 neighbors dies.
> * **Survival:** Alive cell with 2 or 3 neighbors stays alive.
> * **Overpopulation:** Alive cell with more than 3 neighbors dies.
> * **Reproduction:** Dead cell with exactly 3 neighbors becomes alive.

**Play it:** [https://sergeycodes.github.io/game-of-life/](https://sergeycodes.github.io/game-of-life/)

---

## Usage

* **Start:** Run the simulation at 100ms per generation (counter resets to 0).
* **Pause:** Psue simulation, preserving the current pattern.
* **Clear:** Reset grid to empty and reset counter.
* **Click Cells:** Toggle individual cells between alive (black) and dead (white).
* **Explanation:** Show a modal overlay explaining the rules.

---

## Controls

| Button      | Action                                       |
| ----------- | -------------------------------------------- |
| Explanation | Show rules modal                             |
| Start       | Begin/resume simulation (reset counter to 0) |
| Pause       | Pause simulation                             |
| Clear       | Clear grid and counter                       |

---

## Code Structure

```
game-of-life/
├── index.html          # Main HTML layout
├── style.css           # Styles for grid, controls, and modal
└── scripts/
    ├── grid.js         # Grid creation & rendering
    ├── logic.js        # Conway’s next-generation rules
    ├── controls.js     # Button wiring
    └── main.js         # App initialization & event handling
```

* **grid.js**: Defines `ROWS`, `COLS` and draws/renders the 100×100 cell grid.
* **logic.js**: Exports `nextGeneration(grid)` applying Conway’s rules.
* **controls.js**: Exports \`initControl

---

## Future Development

* Add a button that shows common cell structures like spaceships and shooters
* explore different grid configurations, where if a cell reaches a border it travels to opposite side of grid
