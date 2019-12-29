// Global variables to reference DOM elements
var startPageEl = document.querySelector("#start-page");
var questionContainerEl = document.querySelector("#question-container");
var endContainerEl = document.querySelector("#end-container");
var startBtnEl = document.querySelector("#start");
var timerEl = document.querySelector("#time");
var questionEl = document.querySelector("#question");
var answersEl = document.querySelector("#answers");
var submitEl = document.querySelector("#submit-btn");
var msgEl = document.querySelector("#msg");
// Set global variables
var shuffledQuestions, currentQuestionIndex;
var time = questions.length * 16;
var timer;
// Listener for the start button to call the startQuiz function
startBtnEl.addEventListener("click", startQuiz);
// Function to start the quiz
function startQuiz() {
  // Hide start page
  startPageEl.classList.add("hidden");
  // Make questions appear in random order
  shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  // Set question index
  currentQuestionIndex = 0;
  // Display question
  questionContainerEl.classList.remove("hidden");
  // Start the timer element
  timer = setInterval(timerCount, 1000);
  // Show the time remaining
  timerEl.textContent = time;
  // Call the setNextQuestion function
  setNextQuestion();
}
// Function to get the page ready to display the next question
function setNextQuestion() {
  // Call the resetState function
  resetState();
  // Call the showQuestion function
  showQuestion(shuffledQuestions[currentQuestionIndex]);
}
// Function that will populate the question-container
function showQuestion(title) {
  questionEl.innerText = title.title;
  title.answers.forEach(answer => {
    // Creating the button elements
    var button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn");
    button.classList.add("ans-btn");
    // Setting the dataset of the correct answer
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    // Listener for the answer buttons to call the selectedAnswer function
    button.addEventListener("click", selectedAnswer);
    // Add the buttons to the answers element of the HTML
    answersEl.appendChild(button);
  });
}

function timerCount() {
  // Update the timer count and display the new time
  time--;
  timerEl.textContent = time;
  // End the game if the user runs out of time
  if (time <= 0) {
    // Call the endQuiz function
    endQuiz();
  }
}
// Function to reset the answers element and reset the msg div
function resetState() {
  while (answersEl.firstChild) {
    answersEl.removeChild(answersEl.firstChild);
    msgEl.classList.remove("hidden");
  }
}
// Function that will check for correct/wrong answers and see if there are more questions to load
function selectedAnswer(e) {
  // Set variable to the answer button that was clicked
  var slectedBtn = e.target;
  // Loop through the created answer buttons
  Array.from(answersEl.children).forEach(button => {
    // Call the setStatusClass function
    setStatusClass(button, button.dataset.correct);
  });

  // Statement to check for wrong answer
  if (slectedBtn.classList.contains("wrong")) {
    // Time penalty for wrong answer
    time -= 15;
    if (time < 0) {
      time = 0;
    }
    // Update the timer
    timerEl.textContent = time;
    // Add "wrong" class to msg div and set the text value
    msgEl.classList.add("wrong");
    msgEl.innerText = "Sorry, that answer was incorrect!";
  } else {
    // Add "correct" class to msg div and set the text value
    msgEl.classList.add("correct");
    msgEl.innerText = "Yes, that is the correct answer!";
  }
  // Set the message to display for 1.5 seconds
  setTimeout(function() {
    msgEl.classList.add("hidden");
  }, 1500);
  // Go to next question
  currentQuestionIndex++;
  // Check if we've run out of questions
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    // Call the setNextQuestion function
    setNextQuestion();
  } else {
    // Call the endQuiz function
    endQuiz();
  }
}
// Function to set the classes of the button elements (correct if there is a dataset/wrong if there's not)
function setStatusClass(element, correct) {
  // Call the clearStatusClass function
  clearStatusClass(element);
  if (correct) {
    element.classList.add("correct");
  } else {
    element.classList.add("wrong");
  }
}
// Function to clear the classes of the button elements
function clearStatusClass(element) {
  element.classList.remove("correct");
  element.classList.remove("wrong");
}
// Function that will display the end-container element
function endQuiz() {
  // Stop the timer
  clearInterval(timer);
  // Go to the game over screen
  var endQuizEl = document.querySelector("#end-container");
  endQuizEl.classList.remove("hidden");
  // Display the users final score
  var userScore = document.querySelector("#score");
  userScore.textContent = time;
  // Hide the questions and answers
  questionContainerEl.classList.add("hidden");
}

submitEl.addEventListener("click", saveHighscore);
function saveHighscore(event) {
  event.preventDefault();
  // Get the users initials
  var userInit = document.querySelector("#init").value.trim();
  // Statement to make sure the initials text field isn't left blank
  if (userInit !== "") {
    // Display any saved highscores from the local storage, if there aren't any saved leave it blank
    var highscores =
      JSON.parse(window.localStorage.getItem("highscores")) || [];
    // Get the users input that will be saved to the local storage
    var newHighscore = {
      score: time,
      initials: userInit
    };
    // Save the users input to the local storage
    highscores.push(newHighscore);
    window.localStorage.setItem("highscores", JSON.stringify(highscores));
    // Take the user to the highscores page
    window.location.href = "highscores.html";
  }
}
