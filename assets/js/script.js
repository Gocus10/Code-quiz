//variable declarations
var pageContentEl = document.querySelector("#page-content");
var linkEl = document.querySelector("#link");
var questionAreaEl = document.querySelector("#question-area");
var responseAreaEl = document.querySelector("#response-area");
var timerEl = get('timer');
var timeLeft = 0;
var endTime=0;
var y = 0;
function get(x){
    return document.getElementById(x);
}

//questions
const myQuestions = [
    {
      question: "Who invented JavaScript?",
      answers: {
        a: "1. Douglas Crockford",
        b: "2. Sheryl Sandberg",
        c: "3. Brendan Eich"
      },
      correctAnswer: "3. Brendan Eich"
    },
    {
      question: "Which one of these is a JavaScript package manager?",
      answers: {
        a: "1. Node.js",
        b: "2. TypeScript",
        c: "3. npm"
      },
      correctAnswer: "3. npm"
    },
    {
      question: "Which tool can you use to ensure code quality?",
      answers: {
        a: "1. Angular",
        b: "2. jQuery",
        c: "3. RequireJS",
        d: "4. ESLint"
      },
      correctAnswer: "4. ESLint"
    }
];
//timer
function countdown() {
  timeLeft = 75;
  var timeInterval = setInterval(function() {
    if(timeLeft>0){
      timerEl.textContent = timeLeft
      timeLeft--;
    }
    else{
      timerEl.textContent = "0";
      clearInterval(timeInterval);
      endGame();
    }
  }, 1000);
}
//outputs a question to the question-area
var questionHandler =function(){
  if(y<myQuestions.length+1){
  var subQEl = document.createElement("div");
  subQEl.className = "sub-question-area";
  var questionEl = document.createElement("div");
  questionEl.className = "question-title";
  questionEl.innerHTML = "<h2>" + myQuestions[y].question + "</h2>";
  var allAnswersEl = document.createElement("ol");
  for(letter in myQuestions[y].answers){
  var answersEl = document.createElement("li");
  answersEl.className = "list-answers"
  answersEl.innerHTML = "<button class='btn answerBtn'>"+ myQuestions[y].answers[letter] + "</button>";
  allAnswersEl.appendChild(answersEl);
  }
  
  questionEl.appendChild(allAnswersEl);
  subQEl.appendChild(questionEl);
  questionAreaEl.appendChild(subQEl);
} 
}
//removes anything in the sub-question-area
function deleteQ(){
    var pageElement = document.querySelector(".sub-question-area");
    pageElement.remove();
  };
//removes anything in the response area
function deleteC(){
  var rightElement = document.querySelector(".sub-answer-area");
    rightElement.remove();
}
//first page that displays on loading -- start quiz from this page
var startGame = function(event) {
    event.preventDefault();
    timerEl.textContent = "0";
    var subStart = document.createElement("div");
    subStart.className = "sub-question-area";
    var startGameEl = document.createElement("div");
    startGameEl.className = "home-screen-title";
    startGameEl.innerHTML = "<h2>Coding Quiz Challenge</h2>"
    var startGameText = document.createElement("div");
    startGameText.className = "home-screen-text"
    startGameText.innerHTML = "<p>Try to answer the following code-related questions before the timer reaches 0, you'll earn points for each correct answer. Keep in mind incorrect answers will penalize your time left by 10 seconds!</p>"
    var startBtn = document.createElement("button");
    startBtn.className = "btn startBtn";
    startBtn.innerHTML = "Start Quiz";

    startGameEl.appendChild(startGameText);
    startGameEl.appendChild(startBtn);
    subStart.appendChild(startGameEl);
    questionAreaEl.appendChild(subStart);
}
//highscore function
function hs(){
  var hs = document.querySelector('#hs').value;
  const result = {name:hs,score:endTime};
  const savedScores = (localStorage.getItem('hs') || '[]');
  const highscores = [...JSON.parse(savedScores), result]
  highscores.sort((a, b) => b.score - a.score)
  highscores.slice(0,5);
  localStorage.setItem("hs", JSON.stringify(highscores));
}
// anytime a button is clicked
var buttonHandler = function(event) {
  var targetEl = event.target;
  console.log(event.target);
  if(targetEl.matches(".clearBtn")){Storage.clear()};
  if(targetEl.matches(".backBtn")){location.reload()};
  if(targetEl.matches("#link")){scoreScreen();}
  if(targetEl.matches("#sub")){hs();scoreScreen();}
//checks answer against array also subtracts time from timer if wrong
  function checkAnswer(){
    if(y>=1){deleteC();}
    if(targetEl.textContent === myQuestions[y].correctAnswer){
      var correctEl = document.createElement("div");
      correctEl.className = "sub-answer-area"
      correctEl.innerHTML = "<h2 class = 'bottom'>Correct!</h2>"
      pageContentEl.appendChild(correctEl); 
    }
    else{
      var wrongEl = document.createElement("div");
      wrongEl.className = "sub-answer-area"
      wrongEl.innerHTML = "<h2 class = 'bottom'>Wrong!</h2>"
      pageContentEl.appendChild(wrongEl);
      timeLeft=timeLeft - 10;
    }
    y++;
    deleteQ();
    if(y<myQuestions.length){
      questionHandler(y);
    }
    else{
      endTime = timeLeft;
      timeLeft = 0;
    }
  }

  if (targetEl.matches(".startBtn")) {
    countdown();
    deleteQ();
    questionHandler(y);
  
  }
  else if(targetEl.matches(".answerBtn")){
    checkAnswer(targetEl);
  }
};
//button onmouseover
var buttonZoneHandler = function(event) {
  var buttonZoneEl = event.target.closest(".btn");
  if (buttonZoneEl) {
    event.preventDefault();
    buttonZoneEl.setAttribute("style", "background: #c232fa;");
  }
};
//button on mouse leaving
var buttonLeaveHandler = function(event) {
  var buttonZoneEl = event.target.closest(".btn");
  if (buttonZoneEl) {
    buttonZoneEl.removeAttribute("style");
  }
}
function endGame(){
  var subQEl = document.createElement("div");
  subQEl.className="sub-question-area";
  var subEnd = document.createElement("div");
    subEnd.className = "sub-end-area";
    var endGameEl = document.createElement("div");
    endGameEl.className = "end-title";
    endGameEl.innerHTML = "<h2>All Done!</h2>"
    var startGameText = document.createElement("div");
    startGameText.className = "end-text"
    startGameText.innerHTML = "<p>Your final score is " + endTime + "</p>"
    var endTxt = document.createElement("div");
    endTxt.className = "enter-ini";
    endTxt.innerHTML = "Enter Initials";
    var endInput = document.createElement("form")
    endInput.className = "input";
    endInput.innerHTML = "<input name = 'hs' id = 'hs' class = 'box' type = 'text' size = '25'></input><button type='button' id='sub' class = 'btn'>Submit</button>"

    subEnd.appendChild(endGameEl);
    subEnd.appendChild(startGameText);
    subEnd.appendChild(endTxt);
    subEnd.appendChild(endInput);
    subQEl.appendChild(subEnd);
    questionAreaEl.appendChild(subQEl);
}
function scoreScreen(){
  deleteQ();
  const scores = JSON.parse(localStorage.getItem("hs"));
  console.log(scores);
    var subStart = document.createElement("div");
    subStart.className = "hs-area";
    var startGameEl = document.createElement("div");
    startGameEl.className = "hs-txt";
    startGameEl.innerHTML = "<h2>High Scores</h2>"
    var scoreList = document.createElement("div");
    for(j=0;j<scores.length;j++){
    var startGameText = document.createElement("div");
    startGameText.className = "hs-score"
    startGameText.innerHTML = "<p>"+ scores[j].name + " " + scores[j].score + "</p>";
    scoreList.appendChild(startGameText);
    }
    var startBtn = document.createElement("button");
    startBtn.className = "btn backBtn";
    startBtn.innerHTML = "Back";
    var clearBtn = document.createElement("button");
    clearBtn.className = "btn clearBtn";
    clearBtn.innerHTML = "Clear";
    startGameEl.appendChild(scoreList);
    startGameEl.appendChild(startBtn);
    startGameEl.appendChild(clearBtn);
    subStart.appendChild(startGameEl);
    questionAreaEl.appendChild(subStart);
}
linkEl.addEventListener("click",scoreScreen);
window.addEventListener("load", startGame);
pageContentEl.addEventListener("click", buttonHandler);
pageContentEl.addEventListener("mouseover", buttonZoneHandler);
pageContentEl.addEventListener("mouseout", buttonLeaveHandler);
