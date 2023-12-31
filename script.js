const gridContainer = document.querySelector(".container");
const gridSizeBtn = document.querySelector("#size-btn");
gridSizeBtn.addEventListener("click", changeGrid);
const clearGridBtn = document.querySelector("#clear-btn");
clearGridBtn.addEventListener("click", clearGrid);
const borderBtn = document.querySelector("#borders-btn");
borderBtn.addEventListener("click", toggleBorders);

let gridSquare;
let squareAmount = 16;
let currentColor = "#000000"

// Color buttons
const blackBtn = document.querySelector("#black-btn");
blackBtn.addEventListener("click", () => {currentColor = "#000000"});
const redBtn = document.querySelector("#red-btn");
redBtn.addEventListener("click", () => {currentColor = "#FF6666"});
const greenBtn = document.querySelector("#green-btn");
greenBtn.addEventListener("click", () => {currentColor = "#66CC66"});
const blueBtn = document.querySelector("#blue-btn");
blueBtn.addEventListener("click", () => {currentColor = "#99CCC8"});
const randomBtn = document.querySelector("#random-btn");
randomBtn.addEventListener("click", randomColor);
const eraser = document.querySelector("#eraser");
eraser.addEventListener("click", () => {currentColor = "eraser"});

// Themes
const themeBtn =  document.querySelector("#theme-btn");
const theme = document.querySelector("#theme-link");
themeBtn.addEventListener("click", () => {
  if (theme.getAttribute("href") == "styles.css") {
    theme.href = "dark-mode-styles.css";
  } else {
    theme.href = "styles.css";
  }
})


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
  let input = prompt("Enter the amount of squares you'd like your grid's side to have\n(min. 8 max. 200)")
  squareAmount = Math.floor(input)
  // Return if invalid input
  if (squareAmount === null || squareAmount === NaN || typeof squareAmount != "number") {
    return;
  } else if (squareAmount < 8 || squareAmount > 200) {
    squareAmount = 16;
    clearGrid();
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
      if (gridSquares[i].style.backgroundColor && currentColor === "eraser") {
        gridSquares[i].style.backgroundColor = "";
      } else if (currentColor != "#000000" && currentColor != "#FF6666" && currentColor != "#66CC66" && currentColor != "#99CCC8" && currentColor != "eraser" && !(gridSquares[i].style.backgroundColor)) {
        // if the selected color is random and the hovered on grid cell is empty, change it to the random color and generate a new one
        gridSquares[i].style.backgroundColor = currentColor;
        randomColor();
      } else if (!(gridSquares[i].style.backgroundColor)){
        gridSquares[i].style.backgroundColor = currentColor;
        console.log(currentColor);
      }
    })
  }
}

function toggleBorders() {
  for (let i = 1; i < squareAmount * squareAmount; i++) {
    gridContainer.childNodes[i].classList.toggle("item-border");
  }
}

function randomColor() {
  let randomColor = Math.floor(Math.random()*16777215).toString(16);
  currentColor = "#" + randomColor;
}

generateGrid();