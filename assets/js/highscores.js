function displayUserHighscores() {
  // Display any saved highscores from the local storage, if there aren't any saved leave it blank
  var highscores = JSON.parse(window.localStorage.getItem("highscores")) || [];
  // Loop to create elements and display the results
  highscores.forEach(function(score) {
    // Create an h3 tag for each highscore entry
    var newScore = document.createElement("h3");
    newScore.textContent = score.initials + ": " + score.score;
    // Display highscores on the page
    var display = document.querySelector("#highscores");
    display.appendChild(newScore);
  });
}
// Function to clear any highscores from local storage
function clearScores() {
  window.localStorage.removeItem("highscores");
  window.location.reload();
}
// Listener for the clear button to call the clearScores function
document.querySelector("#clear").addEventListener("click", clearScores);
// Call the display function when the page loads
displayUserHighscores();
