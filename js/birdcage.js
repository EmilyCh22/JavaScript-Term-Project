document.getElementById("goHome").addEventListener("click", function() {
  window.location.href = "https://lisabalbach.com/cherka3/CIT190/FinalProject/gameHomepage.html"
})

const wordList = [
  "Albatross", "Avocet", "BaldEagle", "BarnOwl", "BlueJay", "Bluebird", "Booby", "Canary", "Cardinal", "Chickadee",
  "Cockatoo", "Cormorant", "Crane", "Crow", "Cuckoo", "Dove", "Duck", "Eagle", "Egret", "Emu",
  "Falcon", "Finch", "Flamingo", "Goldfinch", "Goose", "Goshawk", "Grebe", "Grosbeak", "Gull", "Hawk",
  "Heron", "Hoopoe", "Hummingbird", "Ibis", "Jay", "Junco", "Kestrel", "Kingfisher", "Kite", "Lark",
  "Loon", "Macaw", "Magpie", "Mallard", "Mockingbird", "Mynah", "Nighthawk", "Nuthatch", "Oriole", "Osprey",
  "Ostrich", "Owl", "Parakeet", "Parrot", "Partridge", "Peacock", "Pelican", "Penguin", "Pigeon", "Plover",
  "Puffin", "Quail", "Raven", "Robin", "Roadrunner", "Rook", "Sandpiper", "Seagull", "Shrike", "Skua",
  "Snipe", "Sparrow", "Starling", "Stilt", "Stork", "Swallow", "Swan", "Swift", "Tanager", "Tern",
  "Thrush", "Titmouse", "Toucan", "Turkey", "Vireo", "Vulture", "Warbler", "Waxwing", "Weaver", "Wigeon",
  "Woodcock", "Woodpecker", "Wren", "Anhinga", "BeeEater", "Bittern", "Blackbird", "Bobolink", "Bulbul", "Bunting",
  "BushTit", "Chough", "Coot", "Creeper", "Curlew", "Darter", "Dotterel", "Drongo", "Dunnock", "Eider",
  "Fieldfare", "Flycatcher", "Gannet", "Godwit", "Grackle", "Greylag", "Grouse", "Guillemot", "Harrier", "Heron",
  "Hoatzin", "Iora", "Jacana", "Kea", "Killdeer", "Kingbird", "Kittiwake", "Limpkin", "Lorikeet", "Lyrebird",
  "Manakin", "Murre", "Nightjar", "Ortolan", "Ovenbird", "Peafowl", "Phalarope", "Pipit", "Quetzal", "Rail",
  "Redpoll", "Roller", "Rosella", "Shearwater", "Skimmer", "Spoonbill", "Stint", "Sunbird", "Tattler", "Teal",
  "Thrasher", "Trogon", "Tyrant", "Wagtail", "Wheatear", "Whinchat", "Willet", "Woodstar", "Yuhina", "Swiftlet",
  "Finch", "Robin", "Swan", "Duck", "Loon", "Jay", "Eagle", "Owl", "Tern", "Gull",
  "Wren", "Crow", "Puffin", "Kite", "Heron", "Falcon", "Raven", "Ibis", "Dove", "Goose",
  "Magpie", "Pelican", "Peacock", "Turkey", "Pigeon", "Canary", "Parrot", "Crane", "Cuckoo", "Stork",
  "Osprey", "Parakeet", "Toucan", "Swallow", "Stilt", "Grebe", "Bunting", "Kestrel", "Hawk", "Vulture",
  "Warbler", "Waxwing", "Oriole", "Mockingbird", "Sparrow", "Cardinal", "Bluebird", "Woodpecker", "Goldfinch", "Mallard"
];
const maxWrongGuesses = 6;
let wrongGuesses = 0;
let guessedLetters = [];
let word = "";

const wordDisplay = document.getElementById("wordDisplay");
const letterButtons = document.getElementById("letterButtons");
const guessesLeftDisplay = document.getElementById("guessesLeft");
const message = document.getElementById("message");

// Pick random word from wordList
function chooseWord() {
  word = wordList[Math.floor(Math.random() * wordList.length)].toLowerCase();
}

// Create blanks / bird cages
function displayWord() {
  wordDisplay.innerHTML = "";
  for (let letter of word) {
    const letterBox = document.createElement("div");
    letterBox.classList.add("letterBox");

    if (guessedLetters.includes(letter)) {
      letterBox.innerHTML = "<div class='birdEmoji'>🐦</div>"
      letterBox.innerHTML += `<div class="revealedLetter center">${letter}</div>`;
      letterBox.classList.add("free");
    } else {
      letterBox.innerHTML = "𐂺"
      letterBox.classList.add("caged");
    }

    wordDisplay.appendChild(letterBox);
  }
}

// Create A-Z buttons
function createLetterButtons() {
  letterButtons.innerHTML = "";
  for (let i = 97; i <= 122; i++) {
    const letter = String.fromCharCode(i);
    const button = document.createElement("button");
    button.textContent = letter;
    button.classList.add("letterButton");
    button.addEventListener("click", () => handleGuess(letter, button));
    letterButtons.appendChild(button);
  }
}

// Handle letter guessing
function handleGuess(letter, button) {
  button.disabled = true;

  if (word.includes(letter)) {
    guessedLetters.push(letter);
    displayWord();
    checkWin();
  } else {
    wrongGuesses++;
    guessesLeftDisplay.textContent = maxWrongGuesses - wrongGuesses;
    checkLose();
  }
}

// Check for win condition
function checkWin() {
  const wordLetters = [...new Set(word)];
  const guessedSet = new Set(guessedLetters);

  if (wordLetters.every(l => guessedSet.has(l))) {
    message.innerHTML = `Yippie! All the birds have been freed!<br>You win!
    <br><br><span id='reloadWin'>Reload Tab to restart :)</span>`;
    disableAllButtons();
  }
}

// Check for lose condition
function checkLose() {
  if (wrongGuesses >= maxWrongGuesses) {
    message.innerHTML = `Uh oh, you ran out of guesses! The birds remain trapped...
      <br>Your word was <span id="birdAnswer"><strong>${word}</strong></span>.
      <br><br><span id='reloadLose'>Reload Tab to restart :(</span>`;
    disableAllButtons();
  }
}

// Disable buttons when game is over
function disableAllButtons() {
  const allButtons = letterButtons.querySelectorAll("button");
  allButtons.forEach(button => button.disabled = true);
}

// To start game
function initGame() {
  chooseWord();
  guessedLetters = [];
  wrongGuesses = 0;
  guessesLeftDisplay.textContent = maxWrongGuesses;
  message.textContent = "";
  displayWord();
  createLetterButtons();
}

// Actually start the game
initGame();