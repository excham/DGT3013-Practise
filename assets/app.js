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

for (var i = 0; i < 5; i++) {
    var newAnimal = ANIMALS[Math.floor(Math.random() * ANIMALS.length)];
    game_animals.push(newAnimal);

    // Also generate the playing cards
    game_cards.push(newAnimal['name']);
    game_cards.push(newAnimal['image']);
  }

  // Render the playing cards
  for (var i = 0; i < game_cards.length; i++) {
    cards[i].childNodes[1].innerText = game_cards[i];
  }
