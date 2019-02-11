const ANIMALS = [
  {name: "Cat", image: "img:assets/images/cat.jpg"},
  {name: "Dog", image: "img:assets/images/dog.jpg"},
  {name: "Horse", image: "img:assets/images/horse.jpg"},
  {name: "Mouse", image: "img:assets/images/mouse.jpg"},
  {name: "Bird", image: "img:assets/images/bird.jpg"},
  {name: "Giraffe", image: "img:assets/images/giraffe.jpg"},
  {name: "Elephant", image: "img:assets/images/elephant.jpg"},
  {name: "Lion", image: "img:assets/images/lion.jpg"},
  {name: "Sheep", image: "img:assets/images/sheep.jpg"},
  {name: "Cow", image: "img:assets/images/cow.jpg"},
  {name: "Chicken", image: "img:assets/images/chicken.jpg"},
  {name: "Snake", image: "img:assets/images/snake.jpg"},
  {name: "Fish", image: "img:assets/images/fish.jpg"}
]

// Stores all the cards inside the grid in an array
var cards = document.getElementsByClassName('card-grid__card');

// Create a reference our playing board
var playImage = document.getElementsByClassName('play-area__card_image')[0];
var playName = document.getElementsByClassName('play-area__card_name')[0];
// ... and win modal DOM
var winModal = document.querySelector('.modal');
var winModal_name = document.getElementsByClassName('modal__body__animalName')[0];
var winModal_image = document.getElementsByClassName('modal__body__animalImage')[0];

// Game state variables
var game_animals = [];
var game_cards = [];
var matchCount = 0;

// Click tracking
var typeLastClicked,
    imageLastClicked = -1, nameLastClicked = -1;

// Make sure we have enough Animals to generate
// the grid
if(ANIMALS.length * 2 < cards.length)
  throw "Not enough animals to generate cards";

// Shuffle array function, based on the Fisher–Yates Shuffle alogrithm
// Sourced from: https://bost.ocks.org/mike/shuffle/
function shuffle(array) {
  var m = array.length, t, i;
  // While there remain elements to shuffle…
  while (m) {
    // Pick a remaining element…
    i = Math.floor(Math.random() * m--);
    // And swap it with the current element.
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }
  return array;
}

function onCardClick(e) {
  var code = e.target.getAttribute('data-code');

  if(code == -1) return;

  var isImageCard = !! e.target.getAttribute('src')
                    || e.target.getAttribute('data-cardType') == 'image'


  // Prevent player from clicking the same card twice
  if((isImageCard && typeLastClicked == 'image' && code == imageLastClicked)
  || (!isImageCard && typeLastClicked == 'text' && code == nameLastClicked)) {
    return;
  }

  if(isImageCard) {
    playImage.innerHTML = `<img src="${e.target.getAttribute('src')}"/>`
  } else{
    playName.innerText = e.target.innerText;
  }

  // Very simple win detection, see documentation
  if(code == nameLastClicked || code == imageLastClicked) {
    clearPlayboard();
    win(code);
  }

  if(isImageCard) {
    imageLastClicked = code;
  } else{
    nameLastClicked = code;
  }

  typeLastClicked = isImageCard ? 'image' : 'text';
}

function clearPlayboard() {
  playImage.innerHTML = ''
  playName.innerText = '';
}

function closeModal() {
  winModal.style.display = "none";
}

function win(code) {
  var animal = game_animals[code];

  winModal_name.innerText = animal.name;
  winModal_image.setAttribute('src', animal.image.substring(4));
  winModal.style.display = "block";

  setMatched(code);

  if(++matchCount == cards.length / 2) {
    refresh();
  } else {
    render();
  }

  console.log("You correctly matched:", animal.name)
}

function setMatched(code) {
  for (var i = 0; i < game_cards.length; i++) {
    if(game_cards[i].code == code)
      game_cards[i].matched = true;
  }
}

// Initate event handlers
function init() {
  for (var i = 0; i < cards.length; i++) {
    cards[i].addEventListener('click', onCardClick);
  }
  winModal.addEventListener('click', closeModal);
  // Set up the game
  refresh();
}

// Generate the cards
function refresh() {
  // Clear variables from any previous rounds
  game_cards = [];
  imageLastClicked = -1;
  nameLastClicked = -1;

  // Make a copy of the defined animals to manipulate
  var animalPool = ANIMALS;

  // Choose 5 random animals
  for (var i = 0; i < 5; i++) {

    var newAnimalIndex = Math.floor(Math.random() * animalPool.length);
    var newAnimal = animalPool[newAnimalIndex];
    // Add animal to game
    game_animals.push(newAnimal);
    // Remove animal from pool
    animalPool.splice(newAnimalIndex, 1);

    // Also generate the playing cards
    // (`code` is used to check a text/image combonation is correct)
    game_cards.push({code: i, content: newAnimal['name']});
    game_cards.push({code: i, content: newAnimal['image']});
  }

  // Shuffle the playing cards
  game_cards = shuffle(game_cards);

  // Render the playing cards
  render();
}

function render() {
  // Render the playing cards
  for (var i = 0; i < game_cards.length; i++) {
    // If the card has been matched, ignore it
    if(game_cards[i].hasOwnProperty('matched')){
      cards[i].setAttribute('data-code', -1);
      cards[i].innerHTML = "";
      continue;
    }

    cards[i].setAttribute('data-code', game_cards[i].code);
    // If the card is an image card...
    if(game_cards[i].content.indexOf("img:") == 0){
      cards[i].setAttribute('data-cardType', 'image');
      // ... render the image
      cards[i].innerHTML = `<img src="${game_cards[i].content.substring(4)}" data-code="${game_cards[i].code}"/>`
    } else {
      cards[i].setAttribute('data-cardType', 'word');
      // ... otherwise just set the text
      cards[i].innerText = game_cards[i].content;
    }
  }
}


// Start the game
init();
