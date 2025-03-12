var gameDetails = document.getElementById("gameDetails");
// puzzle hover
document.getElementById("puzzles").addEventListener("mouseover", function() {
  gameDetails.innerHTML = "Drag and drop the pieces to complete the image of a bird or scene (of your choice!)";
  gameDetails.style.fontSize = "2em";
  gameDetails.style.transition = "font-size .4s";
})
document.getElementById("puzzles").addEventListener("mouseout", function() {
  gameDetails.innerHTML = "Hover over a game title to view a summary of the game!";
  gameDetails.style.fontSize = "1.2em";
})

// word search hover
document.getElementById("wordSearch").addEventListener("mouseover", function() {
  gameDetails.innerHTML = "Find the list of bird-related words in a grid of jumbled letters!";
  gameDetails.style.fontSize = "2em";
  gameDetails.style.transition = "font-size .4s";
})
document.getElementById("wordSearch").addEventListener("mouseout", function() {
  gameDetails.innerHTML = "Hover over a game title to view a summary of the game!";
  gameDetails.style.fontSize = "1.2em";
})

// birdcage hover
document.getElementById("birdcage").addEventListener("mouseover", function() {
  gameDetails.innerHTML = "Basically hangman, but with birds in cages!<br>Guess the letters correctly to set each bird free!";
  gameDetails.style.fontSize = "2em";
  gameDetails.style.transition = "font-size .4s";
})
document.getElementById("birdcage").addEventListener("mouseout", function() {
  gameDetails.innerHTML = "Hover over a game title to view a summary of the game!";
  gameDetails.style.fontSize = "1.2em";
})