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
// Listener for start button
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

  showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(title) {
  questionEl.innerText = title.title;
  title.answers.forEach(answer => {
    var button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn");
    button.classList.add("ans-btn");
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectedAnswer);
    answersEl.appendChild(button);
  });
}

function timerCount() {
  // Update the timer count and display the new time
  time--;
  timerEl.textContent = time;
  // End the game if the user runs out of time
  if (time <= 0) {
    endQuiz();
  }
}

function resetState() {
  while (answersEl.firstChild) {
    answersEl.removeChild(answersEl.firstChild);
    msgEl.classList.remove("hidden");
  }
}

function selectedAnswer(e) {
  var slectedBtn = e.target;
  Array.from(answersEl.children).forEach(button => {
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

    msgEl.classList.add("wrong");
    msgEl.innerText = "Sorry, that answer was incorrect!";
  } else {
    msgEl.classList.add("correct");
    msgEl.innerText = "Yes, that is the correct answer!";
  }
  setTimeout(function() {
    msgEl.classList.add("hidden");
  }, 1500);
  // Go to next question
  currentQuestionIndex++;
  // Check if we've run out of questions
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    setNextQuestion();
  } else {
    endQuiz();
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element);
  if (correct) {
    element.classList.add("correct");
  } else {
    element.classList.add("wrong");
  }
}

function clearStatusClass(element) {
  element.classList.remove("correct");
  element.classList.remove("wrong");
}

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
