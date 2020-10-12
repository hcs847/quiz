// setup variables
var quizButtonEl = document.querySelector("#quiz-btn");
var quizHeader = document.querySelector("#quiz-hdr");
var questionsEl = document.querySelector("#questions-section");
var answersElm = document.querySelector("#answer-choice");
var counterEl = document.querySelector("#score");
var timeLeft = 75;
var scoreCountdown;


// create an array of objects for questions and answers
var questionsOb = [{
        question: "What does DOM stand for? ",
        answers: [{
            text: "Document Object Model",
            correct: true
        }, {
            text: "a12",
            correct: false
        }, {
            text: "a13",
            correct: false
        }]
    },
    {
        question: "What is a Callback function? ",
        answers: [{
            text: "a21",
            correct: false
        }, {
            text: "A function passed as an argument into another function",
            correct: true
        }, {
            text: "a23",
            correct: false
        }]
    },
    {
        question: "Difference property and method setup",
        answers: [{
            text: "a31",
            correct: false
        }, {
            text: "A property setup is: .property = value, while for Methods it’s: method(‘ ’)",
            correct: true
        }, {
            text: "a33",
            correct: false
        }]
    },
];

var startQuizHandler = function (event) {
    //  var testStart = event.target;
    quizHeader.remove();

    // start the timer which will be the score once stopped
    scoreCountdown = setInterval(timer, 1000);
    // console.log("This is countdown " + countdown);
    getQuestions(questionsOb, 0);
};

// function to extract the questions from the array
var getQuestions = function (object, i) {

    // creating p tags for the question
    var questionTextEl = document.createElement("p");
    questionTextEl.className = "question-text";
    // extracting the text for the question 
    questionTextEl.innerHTML = "<h2>" + object[i].question + "</h2>";
    // storing the index of the question as an attribute
    questionTextEl.setAttribute("data-question-id", i);
    // pushing the element into the document
    questionsEl.appendChild(questionTextEl);
    // creating a div for the block of answers
    answerChoiceEl = document.createElement("div");
    answerChoiceEl.className = "answers-choice";
    // storing the index to the answers block
    answerChoiceEl.setAttribute("answer-question-id", i);
    questionTextEl.appendChild(answerChoiceEl);
    // calling the function to render the answers
    listingQuestions(i);
};

var listingQuestions = function (i) {
    for (let j = 0; j < 3; j++) {
        // creating radio buttons
        var answersEl = document.createElement("div");
        answersEl.className = "answer-btn";
        answersEl.innerHTML = "<input type='button' name='answer' class='answer-btn' check-answer-id=" + questionsOb[i].answers[j].correct + " /><label for='answer-choice'>" + questionsOb[i].answers[j].text + "</label>";
        answerChoiceEl.appendChild(answersEl);

        if (j === 2) {

            answerChoiceEl.addEventListener("click", submitAnswerHandler);
        }
    }
};


var submitAnswerHandler = function (event) {

    var targetEl = event.target;
    var upperDiv = targetEl.closest(".answers-choice");
    var questionDiv = targetEl.closest(".question-text");
    var iValue = upperDiv.getAttribute("answer-question-id");
    var answer = targetEl.getAttribute("check-answer-id");
    var divParEl = document.querySelector(
        "[answer-question-id='" + iValue + "']");

    if (answer === "true") {
        var resultEl = document.createElement("p");
        resultEl.textContent = "correct";
        divParEl.appendChild(resultEl);



    } else if (answer === "false") {
        var resultEl = document.createElement("p");
        resultEl.textContent = "incorrect";
        divParEl.appendChild(resultEl);

    }
    if (iValue < 2) {
        setTimeout(function () {
            questionDiv.remove();
            iValue++;
            getQuestions(questionsOb, iValue);
        }, 800);
    } else if (iValue === "2") {
        questionDiv.remove();
        clearInterval(scoreCountdown);
        saveScore();

    }
};


// var countdown = setInterval(timer, 1000);

var timer = function () {
    if (timeLeft >= 0) {
        counterEl.textContent = "Time: " + timeLeft;
        timeLeft--;
    }
};

var saveScore = function () {
    localStorage.setItem("highscore", (timeLeft + 1));
};

var getUserInitials = function () {

}



// event handlers
quizButtonEl.addEventListener("click", startQuizHandler);