//--------------Global variable Declarations
var timeEl = document.getElementById("timer");
var questionEL = document.getElementById("question");
var titleEl = document.getElementById("title");

var answerDiv = document.getElementById("answers");

var beginBtn = document.getElementById("beginBtn");

var questionNum = 0;
var score = 0;
var secondsLeft = 75;

var timerInterval;

//array of objects for each question
var questions = [
    {
        question: "Which of the following is not a commonly used data type?",
        answers: ["Boolean", "String", "While", "Integer"],
        correctAnswer: 3
    },

    {
        question: "_______ is the process of finding errors and fixing them within a program.",
        answers: ["Compiling", "Executing", "Debugging", "Scanning"],
        correctAnswer: 3
    },

    {
        question: "What is the process of planning out your code without actually writing any code called?",
        answers: ["Pseudocode", "Planning", "Development", "Staging"],
        correctAnswer: 1
    },

    {
        question: "Which page of the Chrome developer tools displays error messages caused by a program?",
        answers: ["Application", "Console", "Sources", "Elements"],
        correctAnswer: 2
    },
    
    {
        question: "Which is a correct variable declaration in Javascript?",
        answers: ["var = isGold true;", "isGold = true;", "var = true;", "var isGold = true;"],
        correctAnswer: 4
    }
]



//----------------Event Listeners
// click event listener for the button that begins the test
beginBtn.addEventListener("click", function (event) {
    event.preventDefault();
    beginBtn.remove();
    titleEl.textContent = "";
    setTime();
    setUpTest();
})

// event listener for the answer buttons
document.addEventListener("click", function (event) {
    if (event.target.id === "answer") {

        if (event.target.value == questions[questionNum - 1].correctAnswer) {
            score++;
        } else {
            secondsLeft = secondsLeft - 5;
            timeEl.textContent = "Time: " + secondsLeft;
        }

        nextQuestion();
    }
})

//-----------------Functions
// timer for test
function setTime() {
    secondsLeft = 75;
    timeEl.textContent = "Time: " + secondsLeft;

    timerInterval = setInterval(function () {
        secondsLeft--;
        timeEl.textContent = "Time: " + secondsLeft;

        if (secondsLeft === 0) {
            finishTest();
        }

    }, 1000);
}

// sets up the test
function setUpTest() {
    questionNum = 0;

    for (let i = 0; i < 4; i++) {
        var btn = document.createElement("button");
        btn.value = i + 1;
        btn.setAttribute("id", "answer");
        answerDiv.appendChild(btn);
    }
    nextQuestion();
}


//Transition to the next question
function nextQuestion() {

    if (questionNum === 5) {
        finishTest();
    } else {
        questionNum++;

        questionEL.textContent = questions[questionNum - 1].question;

        for (let i = 0; i < 4; i++) {
            answerDiv.children[i].textContent = questions[questionNum - 1].answers[i];
        }
    }

}

    //Creates the score submission elements and houses instructions for storing score data in local storage
function finishTest() {
    answerDiv.innerHTML = "";

    if (secondsLeft > 0) {
        score = score * secondsLeft;
    }

    questionEL.textContent = "Score: " + score;

    clearInterval(timerInterval);

    titleEl.textContent = "Enter your initials to save your score:"

    var form = document.createElement("form");
    answerDiv.appendChild(form);

    var initials = document.createElement("input");
    form.appendChild(initials);

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        var scoreObj = {
            name: initials.value,
            score: score
        }

        var highscores = JSON.parse(localStorage.getItem("highscores")) || [];

        highscores.push(scoreObj);
        highscores.sort(function(a, b) {return b.score - a.score})
        highscores.splice(5);

        localStorage.setItem("highscores", JSON.stringify(highscores));

        window.location.href = "highscore.html";

    })

}
