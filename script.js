// setup variables
var quizButtonEl = document.querySelector("#quiz-btn");
var quizHeader = document.querySelector("#quiz-hdr");
var answersElm = document.querySelector("#answer-choice");
var counterEl = document.querySelector("#score");
var timeLeft = 75;
var scoreCountdown;
var questionsEl = document.createElement("div");
var submitButtonEl = document.querySelector("#initials-btn");

// create an array of objects for questions and answers
var questionsOb = [{
        question: "What does DOM stand for? ",
        answers: [{
            text: "Document Object Model",
            correct: true
        }, {
            text: "Document Objective Modeling",
            correct: false
        }, {
            text: "Domain Object Mail",
            correct: false
        }]
    },
    {
        question: "What is a Callback function? ",
        answers: [{
            text: "A function that calls back the DOM",
            correct: false
        }, {
            text: "A function passed as an argument into another function",
            correct: true
        }, {
            text: "A function that calls back another file",
            correct: false
        }]
    },
    {
        question: "What is the difference between property and method setup",
        answers: [{
            text: "Properties are set up without quatation marks",
            correct: false
        }, {
            text: "A property setup syntax is: .property = value, while for Methods it’s: method( )",
            correct: true
        }, {
            text: "Methods are setup with at the begining of the code",
            correct: false
        }]
    },
    {
        question: "How do you print “Hello World” to the console? ",
        answers: [{
            text: 'console.log("Hello World")',
            correct: true
        }, {
            Text: 'console.log.Hello World',
            correct: false
        }, {
            text: 'alert.Hello.World',
            correct: false
        }]
    },
    {
        question: "Which of the following are the Logical operators for Not, Or, And?",
        answers: [{
            text: "x, ?, & ",
            correct: false
        }, {
            text: " ! , || , && ",
            correct: true
        }, {
            text: " !!, |, # ",
            correct: false
        }]
    },
    {
        question: "Which one of the values is NOT Falsy? ",
        answers: [{
            text: "Null",
            correct: false
        }, {
            text: "’False’",
            correct: true
        }, {
            text: "0",
            correct: false
        }]
    },
    {
        question: "What is the correct syntax of For Loops? ",
        answers: [{
            text: 'for (var i = 0 ; i < n ; i++ ) { };',
            correct: true
        }, {
            Text: '"(var i = 0 , i < n , i++ );"',
            correct: false
        }, {
            Text: '"(var i = 0 &&i < n && i++ )"',
            correct: false
        }]
    },
    {
        question: "What Method is used to extract the number of items in an array? ",
        answers: [{
            text: "The extract function",
            correct: false
        }, {
            text: "The length property",
            correct: true
        }, {
            text: "The get method",
            correct: false
        }]
    },
    {
        question: "How do you return the nth item of a string? ",
        answers: [{
            text: 'string.charAt(n)',
            correct: true
        }, {
            text: '"string.nth()"',
            correct: false
        }, {
            text: '"string(nth) ="',
            correct: false
        }]
    },

    {
        question: "How do you concatenate strings in JavaScript? ",
        answers: [{
            text: " stringA && stringB && stringC",
            correct: false
        }, {
            text: "stringA + stringB + stringC ",
            correct: true
        }, {
            text: "stringA.stringB.sringC",
            correct: false
        }]
    },
];

var createQuizContainer = function () {
    // creating a container for the quiz header
    questionsEl.className = "card-quiz"
    questionsEl.id = "questions-section"
    bodyEl = document.getElementsByTagName("BODY")[0];
    bodyEl.appendChild(questionsEl);
};

var startQuizHandler = function (event) {
    //  var testStart = event.target;
    quizHeader.remove();

    // start the timer which will be the score once stopped
    scoreCountdown = setInterval(timer, 1000);

    createQuizContainer();
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
        resultEl.textContent = "Correct";
        divParEl.appendChild(resultEl);

    } else if (answer === "false") {
        var resultEl = document.createElement("p");
        resultEl.textContent = "Incorrect";
        divParEl.appendChild(resultEl);
        timeLeft -= 10;

    }
    if (iValue < 9) {
        setTimeout(function () {
            questionDiv.remove();
            iValue++;
            getQuestions(questionsOb, iValue);
        }, 700);

    } else if (iValue === "9") {
        questionDiv.remove();
        clearInterval(scoreCountdown);
        counterEl.remove();
        getInitials();
    }
};

// var countdown = setInterval(timer, 1000);
var timer = function () {
    if (timeLeft > 0) {
        counterEl.textContent = "Time: " + timeLeft;
        timeLeft--;
    } else if (timeLeft === 0 || timeLeft < 0) {
        questionsEl.innerHTML = "<h4>Your score has reached Zero , Please Try again</h4>";
        setTimeout(function () {
            location.reload();
        }, 1500);


    }
};

var getInitials = function () {
    var finalScore = timeLeft + 1;
    questionsEl.innerHTML = "<p>All Done!<br />Your Final score is " + finalScore + "</p>"
    var formEl = document.createElement("form");
    formEl.method = "POST";
    formEl.innerHTML =
        "<div class='input-field'><label for='initials'>Please enter your Initials <br /></label><input type='text' name='initials' id='initials'/></div><div id='initials-button'></div><button id='initials-btn' type='button'>Submit</button>"
    questionsEl.appendChild(formEl);
    var submitButtonEl = document.querySelector("#initials-btn");

    if (submitButtonEl) {
        submitButtonEl.addEventListener("click", submitScoreHandler);
    };

};

var submitScoreHandler = function (event) {
    event.preventDefault();

    var score = (timeLeft + 1);
    var savedInitials = localStorage.getItem("highscore");
    var savedScore = localStorage.getItem("initials");

    if (savedScore > score) {
        savedHighScore = savedScore + ' : ' + savedInitials;

    } else {
        localStorage.setItem("highscore", score);
        var initials = document.querySelector("#initials").value;
        localStorage.setItem("initials", initials);
    };

    var savedHighScore = savedScore + ' : ' + savedInitials;



    // render high scores
    renderHighScore(savedHighScore);
};

var renderHighScore = function (savedHighScore) {

    userInputEl = document.querySelector("#questions-section");
    userInputEl.innerHTML = "<h2>High Scores<br /></h2><p>" + savedHighScore + "<br /></p><button id='clear-btn' type='button'>Go Back</button>";
    var goBackButtonEl = document.querySelector("#clear-btn");

    goBackButtonEl.addEventListener("click", clearButtonHandler);

};

var clearButtonHandler = function (event) {
    location.reload();
};


// event handlers
quizButtonEl.addEventListener("click", startQuizHandler);