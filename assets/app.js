const ANIMALS = [
  {name: "Cat", image: "img:assets/images/cat.jpg"},
  {name: "Dog", image: "img:assets/images/dog.jpg"},
  {name: "Horse", image: "img:assets/images/horse.jpg"},
  {name: "Mouse", image: "img:assets/images/mouse.jpg"},
  {name: "Bird", image: "img:assets/images/bird.jpg"},
  {name: "Giraffe", image: "img:assets/images/giraffe.jpg"},
  {name: "Elephant", image: "img:assets/images/elephant.jpg"},
  {name: "Lion", image: "img:assets/images/lion.jpg"}
]

// Stores all the cards inside the grid in an array
var cards = document.getElementsByClassName('card-grid__card');

var game_animals = [];
var game_cards = [];

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

for (var i = 0; i < 5; i++) {
  var newAnimal = ANIMALS[Math.floor(Math.random() * ANIMALS.length)];
  game_animals.push(newAnimal);

  // Also generate the playing cards
  game_cards.push(newAnimal['name']);
  game_cards.push(newAnimal['image']);
}

// Shuffle the playing cards
game_cards = shuffle(game_cards);

// Render the playing cards
for (var i = 0; i < game_cards.length; i++) {
  cards[i].childNodes[1].innerText = game_cards[i];
}
