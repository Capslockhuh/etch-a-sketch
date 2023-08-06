const gridContainer = document.querySelector('.container');
let gridSquare;

function generateGrid() {
  for (let i = 1; i <= 4096; i++) {
    gridSquare = document.createElement("div");
    gridSquare.classList.add("item");
    gridContainer.appendChild(gridSquare);
  }
}

generateGrid();