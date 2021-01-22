var time = document.querySelector(".timer");

//Var for timer
var score = document.querySelector("#score");
var secondsLeft = 90;

//var for button
const start = document.querySelector("#start");
//var for start
const codersIntro = document.querySelector("#challenge-begins");

var questionsEl = document.querySelector(".all-question");

let questionEl = document.querySelector("#question");
const correctWrong = document.querySelector("#right-wrong");
let questionCount = 0;
// var for final score
const finalEl = document.querySelector("#final-score");
let initialsInput = document.querySelector("#initials");
//var for high score
const highscoresEl = document.querySelector("#high-scores");
let scoreListEl = document.querySelector(".score-list");
let scoreList = [];
const ansBtn = document.querySelectorAll("button.answer-btn")
//var for submit, clear, view and go
let submitScrBtn = document.querySelector("#submit-score");
let clearScrBtn = document.querySelector("#clearScores");
let viewScrBtn = document.querySelector("#view-scores");
let goBackBtn = document.querySelector("#goBack");
// var for answers
const ans1Btn = document.querySelector("#answer-1");
const ans2Btn = document.querySelector("#answer-2");
const ans3Btn = document.querySelector("#answer-3");
const ans4Btn = document.querySelector("#answer-4");



// array of questions, starting from 0
const questions = [ 
    {
        question: "Inside which HTML element do we put the JavaScript?",
        answers: ["1. <javascript>", "2.<script>",  "3. <scripting>", "4. <scrpt>"],
        correctAnswer: "2"
    },
    {
        question: "How can you add a comment in a JavaScript?",
        answers: ["1. //This is a commment", "2. <!--This is a commment-->", "3.'This is a comment'", "4. '<This is a comment>"],
        correctAnswer: "1"
    },
    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        answers: ["1. Javascript", "2. terminal/bash", "3. for loops", "4. console.log"],
        correctAnswer: "3"
    },
    {
        question: "Which symbol is not used in logical operations?",
        answers: ["1.||", "2. %", "3. &&"],
        correctAnswer: "2"
    },
    {
        question: "JavaScript entities start with _______ and end with _________.",
        answers: ["1. Semicolon, colon", "2. Semicolon, Ampersand", "3. Ampersand, colon", "4. Semicolon, Ampersand"],
        correctAnswer: "3"
    }
    
];

//Timer
function setTime() {
    let timerInterval = setInterval(function () {
        secondsLeft--;
        time.textContent = `Time:${secondsLeft}s`;

        if (secondsLeft === 0 || questionCount === questions.length) {
            clearInterval(timerInterval);
            questionsEl.style.display = "none";
            finalEl.style.display = "block";
            score.textContent = secondsLeft;
        }
    }, 1000);
}

// Start quiz
function startQuiz() {
    codersIntro.style.display = "none";
    questionsEl.style.display = "block";
    questionCount = 0;

    setTime();
    setQuestion(questionCount);
}
//question function
function setQuestion(id) {
    if (id < questions.length) {
        questionEl.textContent = questions[id].question;
        ans1Btn.textContent = questions[id].answers[0];
        ans2Btn.textContent = questions[id].answers[1];
        ans3Btn.textContent = questions[id].answers[2];
        ans4Btn.textContent = questions[id].answers[3];
    }
}


function checkAnswer(event) {
    event.preventDefault();


    correctWrong.style.display = "block";
    let p = document.createElement("p");
    correctWrong.appendChild(p);


    setTimeout(function () {
        p.style.display = 'none';
    }, 1000);

    // correct answer
    if (questions[questionCount].correctAnswer === event.target.value) {
        p.textContent = "Correct!";
    } 
   
    //Incorrect answer takes away 10 seconds
    else if (questions[questionCount].correctAnswer !== event.target.value) {
        secondsLeft = secondsLeft - 10;
        p.textContent = "Incorrect!";
    }

    // CYCLE 
    if (questionCount < questions.length) {
        questionCount++;
    }
    setQuestion(questionCount);
}

function addScore(event) {
    event.preventDefault();

    finalEl.style.display = "none";
    highscoresEl.style.display = "block";

    let init = initialsInput.value.toUpperCase();
    scoreList.push({ initials: init, score: secondsLeft });

    // High Score List
    scoreList = scoreList.sort((a, b) => {
        if (a.score < b.score) {
          return 1;
        } else {
          return -1;
        }
      });
    
    scoreListEl.innerHTML="";
    for (let i = 0; i < scoreList.length; i++) {
        let li = document.createElement("li");
        li.textContent = `${scoreList[i].initials}: ${scoreList[i].score}`;
        scoreListEl.append(li);
    }

    storeScores();
    displayScores();
}

function storeScores() {
    localStorage.setItem("scoreList", JSON.stringify(scoreList));
}

function displayScores() {

    let storedScoreList = JSON.parse(localStorage.getItem("scoreList"));


    if (storedScoreList !== null) {
        scoreList = storedScoreList;
    }
}

// Clear the store
function clearScores() {
    localStorage.clear();
    scoreListEl.innerHTML="";
}


// Start timer and display first question when click start quiz
start.addEventListener("click", startQuiz);


ansBtn.forEach(item => {
    item.addEventListener('click', checkAnswer);
});

submitScrBtn.addEventListener("click", addScore);

goBackBtn.addEventListener("click", function () {
    highscoresEl.style.display = "none";
    codersIntro.style.display = "block";
    secondsLeft = 75;
    time.textContent = `Time:${secondsLeft}s`;
});

// clear the score
clearScrBtn.addEventListener("click", clearScores);


viewScrBtn.addEventListener("click", function () {
    if (highscoresEl.style.display === "none") {
        highscoresEl.style.display = "block";
    } 
    else if (highscoresEl.style.display === "block") {
        highscoresEl.style.display = "none";
    } 
    // no high score
    else {
        return alert("Please take quiz. There is No High Score.");
    }
});