document.getElementById("goHome").addEventListener("click", function() {
  window.location.href = "https://lisabalbach.com/cherka3/CIT190/FinalProject/gameHomepage.html"
})

const allWords = [
  "albatross", "avian", "beak", "bird", "canary", "cardinal", "chick", "claw", "cockatoo", "condor",
  "crane", "crow", "cuckoo", "dove", "duck", "eagle", "egret", "emu", "falcon", "feather",
  "finch", "flamingo", "fledge", "flock", "fly", "gannet", "goose", "gosling", "grouse", "gull",
  "hawk", "heron", "ibis", "jay", "junco", "kite", "kiwi", "lark", "loon", "macaw",
  "magpie", "mallard", "mocking", "nest", "nuthatch", "ostrich", "owl", "parakeet", "parrot", "peacock",
  "pelican", "penguin", "pheasant", "pigeon", "plumage", "quail", "quill", "raven", "robin", "rook",
  "roost", "scrape", "seagull", "serin", "shrike", "skylark", "sparrow", "starling", "stork", "swallow",
  "swan", "swift", "tail", "talon", "teal", "tern", "thrush", "toucan", "turkey", "vireo",
  "vulture", "wagtail", "warbler", "wattle", "waxwing", "weaver", "whippoor", "wingspan", "woodpecker", "wren",
  "yolk", "zebrafinch", "zephyr", "chough", "eggshell", "hen", "snipe", "puffin", "bluejay", "tit"
];
const selectedWords = [];
while (selectedWords.length < 6) {
  const word = allWords[Math.floor(Math.random() * allWords.length)];
  if (!selectedWords.includes(word)) {
    selectedWords.push(word);
  }
}

const grid = document.getElementById('grid');
const wordList = document.getElementById('wordList');
const size = 10;
const letters = "abcdefghijklmnopqrstuvwxyz";
const gridArray = Array(size).fill().map(() => Array(size).fill(''));
const foundWords = new Set();

function placeWord(word) {
  let placed = false;
  while (!placed) {
    const startX = Math.floor(Math.random() * (size - word.length + 1));
    const startY = Math.floor(Math.random() * size);
    let canPlace = true;

    for (let i = 0; i < word.length; i++) {
      if (gridArray[startY][startX + i] !== '') {
        canPlace = false;
        break;
      }
    }

    if (canPlace) {
      for (let i = 0; i < word.length; i++) {
        gridArray[startY][startX + i] = word[i];
      }
      placed = true;
    }
  }
}

function fillGrid() {
  selectedWords.forEach(word => {
    placeWord(word);
    const li = document.createElement('li');
    li.textContent = word;
    li.dataset.word = word;
    wordList.appendChild(li);
  });

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      if (!gridArray[y][x]) {
        gridArray[y][x] = letters[Math.floor(Math.random() * letters.length)];
      }
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.textContent = gridArray[y][x];
      grid.appendChild(cell);
    }
  }
}

function highlightWord(word) {
  let startX = -1;
  let startY = -1;
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      if (gridArray[y][x] === word[0]) {
        let match = true;
        for (let i = 0; i < word.length; i++) {
          if (gridArray[y][x + i] !== word[i]) {
            match = false;
            break;
          }
        }
        if (match) {
          startX = x;
          startY = y;
          break;
        }
      }
    }
    if (startX !== -1) { break; }
  }
  if (startX !== -1) {
    for (let i = 0; i < word.length; i++) {
      const index = startY * size + startX + i;
      grid.children[index].classList.add('found');
    }
    document.querySelector(`[data-word="${word}"]`).classList.add('strikethrough');
    foundWords.add(word);
    if (foundWords.size === selectedWords.length) {
      document.getElementById('modal').style.display = 'block';
      document.body.classList.add('blur');
    }
  }
}

fillGrid();

document.querySelectorAll('.cell').forEach(cell => {
  cell.addEventListener('click', () => {
    const word = prompt('Enter the word you found:').toLowerCase();
    if (selectedWords.includes(word) && !foundWords.has(word)) {
      highlightWord(word);
    } else {
      alert('Word not found OR already found!');
    }
  });
});