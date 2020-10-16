function get(x){
    return document.getElementById(x);
}
var questionAreaEl = document.querySelector("#question-area");
var timerEl = get('timer');
const myQuestions = [
    {
      question: "Who invented JavaScript?",
      answers: {
        a: "Douglas Crockford",
        b: "Sheryl Sandberg",
        c: "Brendan Eich"
      },
      correctAnswer: "c"
    },
    {
      question: "Which one of these is a JavaScript package manager?",
      answers: {
        a: "Node.js",
        b: "TypeScript",
        c: "npm"
      },
      correctAnswer: "c"
    }
]
function get(x){
    return document.getElementById(x);
}
var questionHandler = function() {
    
  
}
function checkAnswer(){
   
  }
var startGame = function(event) {
    event.preventDefault();
    timerEl.textContent = "0";
    var startGameEl = document.createElement("div");
    startGameEl.className = "home-screen-title";
    startGameEl.innerHTML = "<h2>Coding Quiz Challenge</h2>"
    var startGameText = document.createElement("div");
    startGameText.className = "home-screen-text"
    startGameText.innerHTML = "<p>Try to answer the following code-related questions before the timer reaches 0, you'll earn points for each correct answer. Keep in mind incorrect answers will penalize your time left by 10 seconds!</p>"
    var startBtn = document.createElement("button");
    startBtn.className = "btn";
    startBtn.innerHTML = "Start Quiz";

    startGameEl.appendChild(startGameText);
    startGameEl.appendChild(startBtn);
    questionAreaEl.appendChild(startGameEl);
}
function countdown() {
    var timeLeft = 75;
    var timeInterval = setInterval(function() {
      if(timeLeft>0){
        timerEl.textContent = timeLeft
        timeLeft--;
      }
      else{
        timerEl.textContent = "0";
        clearInterval(timeInterval);
      }
    }, 1000);
  }
window.addEventListener("load", startGame);
//startGameEl.addEventListener("click", questionHandler);