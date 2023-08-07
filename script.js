const gridContainer = document.querySelector(".container");
const gridSizeBtn = document.querySelector("#size-btn");
gridSizeBtn.addEventListener("click", changeGrid);
const clearGridBtn = document.querySelector("#clear-btn");
clearGridBtn.addEventListener("click", clearGrid);

let gridSquare;
let squareAmount = 16;

function generateGrid() {
  for (let i = 1; i <= squareAmount * squareAmount; i++) {
    gridSquare = document.createElement("div");
    gridSquare.classList.add("item");

    gridSquare.style.flexBasis = calcFlexBasis();
    gridContainer.appendChild(gridSquare);
  }
  addDrawEffect();
}

function changeGrid() {
  let input = prompt("Enter the amount of squares you'd like your grid's side to have (e.g. 64)")
  squareAmount = Math.floor(input)
  // Return if invalid input
  if (squareAmount === null || squareAmount === NaN || typeof squareAmount != "number") {
    return;
  } else {
    // I'm not using the clearGrid() function here, to avoid doubling of grid cells
    while ( gridContainer.hasChildNodes() ) {
      gridContainer.removeChild(gridContainer.firstChild);
    }
    generateGrid();
  }
}

// Remove all child divs from the container div before drawing a new grid
function clearGrid () {
  while ( gridContainer.hasChildNodes() ) {
    gridContainer.removeChild(gridContainer.firstChild);
  }
  generateGrid(); 
  // Remove all the previous elements and generate new ones
}

/* flex-basis of one grid item is calculated by dividing the container size (800 px) by the square amount (deafult is 16)
(deafult flex-basis is equal to 50px) */
function calcFlexBasis() {
  let basis = 800 / squareAmount;
  String(basis);
  let result = basis + "px";
  return result;
}

function addDrawEffect() {
  let gridSquares = document.querySelectorAll(".item");
  for (let i = 0; i < gridSquares.length; i++) {
    console.log(gridSquares.length); // debugging
    gridSquares[i].addEventListener("mouseover", function () {
      gridSquares[i].style.backgroundColor = changeColor("black");
    })
  }
}



function changeColor(color) {
  return color;
}

generateGrid();