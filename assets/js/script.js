// Global variables to reference DOM elements
var startPageEl = document.querySelector("#start-page");
var questionContainerEl = document.querySelector("#question-container");
var endContainerEl = document.querySelector("#end-container");
var startBtnEl = document.querySelector("#start");
var timerEl = document.querySelector("#time");
var questionEl = document.querySelector("#question");
var answersEl = document.querySelector("#answers");
var submitEl = document.querySelector("#submit-btn");

startBtnEl.addEventListener("click", startQuiz);

function startQuiz() {
  startPageEl.classList.add("hidden");
  questionContainerEl.classList.remove("hidden");
}
