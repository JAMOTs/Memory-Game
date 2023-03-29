const gameContainer = document.getElementById("game");

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// TODO: Implement this function!
// function handleCardClick(event) {
//   // you can use event.target to see which element was clicked
//   console.log("you just clicked", event.target);
// }
let firstCard = null;
let secondCard = null;
let count = 0;

function handleCardClick(event) {
  const clickedCard = event.target;
  
  // ignore clicks on already matched cards or when two cards are already open
  if (clickedCard.classList.contains("matched") || count === 2) {
    return;
  }

  // show clicked card by changing its background color
  clickedCard.style.backgroundColor = clickedCard.classList[0];

  if (!firstCard) {
    // first card clicked, store it and wait for the second card
    firstCard = clickedCard;
  } else {
    // second card clicked, store it and check for match
    secondCard = clickedCard;

    if (firstCard.classList[0] === secondCard.classList[0]) {
      // matched cards, mark them as matched and reset variables
      firstCard.classList.add("matched");
      secondCard.classList.add("matched");
      firstCard = null;
      secondCard = null;
    } else {
      // not matched, wait a bit and then hide both cards
      count = 2;
      setTimeout(() => {
        firstCard.style.backgroundColor = "";
        secondCard.style.backgroundColor = "";
        firstCard = null;
        secondCard = null;
        count = 0;
      }, 1000);
    }
  }
}


// when the DOM loads
createDivsForColors(shuffledColors);
