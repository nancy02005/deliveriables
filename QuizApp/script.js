// Quiz data
var quizQuestions = [
    {
        question: "What is the correct way to declare a variable in JavaScript?",
        options: [
            "var name = 'John';",
            "variable name = 'John';",
            "name = 'John';",
            "declare name = 'John';"
        ],
        correctAnswer: 0,
        explanation: "The correct answer is 'var name = 'John';'."
    },
    {
        question: "Which of these is NOT a JavaScript data type?",
        options: [
            "String",
            "Boolean",
            "Character",
            "Number"
        ],
        correctAnswer: 2,
        explanation: "There is no 'Character' data type in JavaScript."
    },
    {
        question: "What does Array.isArray([1, 2, 3]) return?",
        options: [
            "true",
            "false",
            "undefined",
            "'[1, 2, 3]'"
        ],
        correctAnswer: 0,
        explanation: "Array.isArray checks if a value is an array."
    },
    {
        question: "What will console.log(typeof undefined) show?",
        options: [
            "'null'",
            "'undefined'",
            "'void'",
            "null"
        ],
        correctAnswer: 1,
        explanation: "typeof undefined returns the string 'undefined'."
    },
    {
        question: "Which loop is best for object properties?",
        options: [
            "for loop",
            "while loop",
            "for...in loop",
            "forEach loop"
        ],
        correctAnswer: 2,
        explanation: "for...in is used to loop through object properties."
    }
];

// Quiz state
var currentQuestion = 0;
var score = 0;
var answers = [];
var timeLeft = 300;
var timerId = null;

// DOM elements
var startScreen = document.getElementById('start-screen');
var quizScreen = document.getElementById('quiz-screen');
var resultsScreen = document.getElementById('results-screen');
var timeoutScreen = document.getElementById('timeout-screen');

var startBtn = document.getElementById('start-btn');
var prevBtn = document.getElementById('prev-btn');
var nextBtn = document.getElementById('next-btn');
var restartBtn = document.getElementById('restart-btn');
var timeoutRestartBtn = document.getElementById('timeout-restart-btn');

var timerDisplay = document.getElementById('timer');
var scoreDisplay = document.getElementById('score');
var totalQuestionsDisplay = document.getElementById('total-questions');
var questionNumber = document.getElementById('question-number');
var questionText = document.getElementById('question-text');
var optionsContainer = document.getElementById('options-container');
var progressFill = document.getElementById('progress-fill');
var finalScore = document.getElementById('final-score');
var scoreMessage = document.getElementById('score-message');
var resultsDetails = document.getElementById('results-details');
var timeoutScore = document.getElementById('timeout-score');

// Show one screen and hide the others
function showScreen(screenId) {
    startScreen.style.display = 'none';
    quizScreen.style.display = 'none';
    resultsScreen.style.display = 'none';
    timeoutScreen.style.display = 'none';

    document.getElementById(screenId).style.display = 'block';
}

// Format time as MM:SS
function formatTime(seconds) {
    var minutes = Math.floor(seconds / 60);
    var secs = seconds % 60;

    if (secs < 10) {
        secs = '0' + secs;
    }

    return minutes + ':' + secs;
}

// Update the timer text
function updateTimerDisplay() {
    timerDisplay.innerHTML = formatTime(timeLeft);
}

// Update the progress bar
function updateProgressBar() {
    var progress = ((currentQuestion + 1) / quizQuestions.length) * 100;
    progressFill.style.width = progress + '%';
}

// Update the navigation buttons
function updateNavigationButtons() {
    if (currentQuestion === 0) {
        prevBtn.disabled = true;
    } else {
        prevBtn.disabled = false;
    }

    if (currentQuestion === quizQuestions.length - 1) {
        nextBtn.innerHTML = 'Submit';
    } else {
        nextBtn.innerHTML = 'Next';
    }
}

// Show the current question and its choices
function showQuestion() {
    var question = quizQuestions[currentQuestion];

    questionNumber.innerHTML = 'Question ' + (currentQuestion + 1) + ' of ' + quizQuestions.length;
    questionText.innerHTML = question.question;
    optionsContainer.innerHTML = '';

    for (var i = 0; i < question.options.length; i++) {
        var optionButton = document.createElement('button');
        optionButton.type = 'button';
        optionButton.className = 'option-btn';
        optionButton.innerHTML = question.options[i];

        optionButton.onclick = function(index) {
            return function() {
                selectAnswer(index);
            };
        }(i);

        if (answers[currentQuestion] === i) {
            optionButton.style.backgroundColor = '#4caf50';
            optionButton.style.color = '#fff';
        }

        optionsContainer.appendChild(optionButton);
    }

    updateProgressBar();
    updateNavigationButtons();
}

// Save the chosen answer
function selectAnswer(index) {
    answers[currentQuestion] = index;

    var buttons = optionsContainer.getElementsByTagName('button');

    for (var i = 0; i < buttons.length; i++) {
        if (i === index) {
            buttons[i].style.backgroundColor = '#4caf50';
            buttons[i].style.color = '#fff';
        } else {
            buttons[i].style.backgroundColor = '#fff';
            buttons[i].style.color = '#333';
        }
    }
}

// Go to next question
function nextQuestion() {
    if (answers[currentQuestion] === null || answers[currentQuestion] === undefined) {
        alert('Please select an answer before going to the next question.');
        return;
    }

    if (currentQuestion < quizQuestions.length - 1) {
        currentQuestion = currentQuestion + 1;
        showQuestion();
    } else {
        finishQuiz();
    }
}

// Go to previous question
function previousQuestion() {
    if (currentQuestion > 0) {
        currentQuestion = currentQuestion - 1;
        showQuestion();
    }
}

// Calculate the final score
function finishQuiz() {
    stopTimer();

    score = 0;

    for (var i = 0; i < quizQuestions.length; i++) {
        if (answers[i] === quizQuestions[i].correctAnswer) {
            score = score + 1;
        }
    }

    showResults();
}

// Show the results page
function showResults() {
    finalScore.innerHTML = score;
    scoreDisplay.innerHTML = score;

    var percentage = (score / quizQuestions.length) * 100;
    var message = '';

    if (percentage === 100) {
        message = 'Perfect score! Great job!';
    } else if (percentage >= 80) {
        message = 'Excellent! You know the topic well.';
    } else if (percentage >= 60) {
        message = 'Good job! Keep practicing.';
    } else if (percentage >= 40) {
        message = 'Nice try! Review the answers and try again.';
    } else {
        message = 'Keep learning! You can do better next time.';
    }

    scoreMessage.innerHTML = message;
    resultsDetails.innerHTML = '';

    for (var i = 0; i < quizQuestions.length; i++) {
        var item = document.createElement('div');
        item.className = 'result-item';

        var userAnswerText = 'Not answered';
        if (answers[i] !== null && answers[i] !== undefined) {
            userAnswerText = quizQuestions[i].options[answers[i]];
        }

        var correctAnswerText = quizQuestions[i].options[quizQuestions[i].correctAnswer];
        var resultText = '';

        if (answers[i] === quizQuestions[i].correctAnswer) {
            resultText = 'Correct';
        } else {
            resultText = 'Incorrect';
        }

        item.innerHTML = '<strong>Q' + (i + 1) + ': ' + resultText + '</strong><br>' +
            quizQuestions[i].question + '<br>' +
            '<strong>Your answer:</strong> ' + userAnswerText + '<br>' +
            '<strong>Correct answer:</strong> ' + correctAnswerText + '<br>' +
            '<em>' + quizQuestions[i].explanation + '</em>';

        resultsDetails.appendChild(item);
    }

    showScreen('results-screen');
}

// Start the timer
function startTimer() {
    stopTimer();

    timerId = setInterval(function() {
        timeLeft = timeLeft - 1;
        updateTimerDisplay();

        if (timeLeft <= 0) {
            stopTimer();
            timeoutScore.innerHTML = score;
            showScreen('timeout-screen');
        }
    }, 1000);
}

// Stop the timer
function stopTimer() {
    if (timerId !== null) {
        clearInterval(timerId);
        timerId = null;
    }
}

// Reset quiz values
function resetQuiz() {
    currentQuestion = 0;
    score = 0;
    answers = [];

    for (var i = 0; i < quizQuestions.length; i++) {
        answers[i] = null;
    }

    timeLeft = 300;
    scoreDisplay.innerHTML = '0';
    updateTimerDisplay();
}

// Start the quiz
function startQuiz() {
    resetQuiz();
    showQuestion();
    startTimer();
    showScreen('quiz-screen');
}

// Add events
startBtn.addEventListener('click', startQuiz);
nextBtn.addEventListener('click', nextQuestion);
prevBtn.addEventListener('click', previousQuestion);
restartBtn.addEventListener('click', startQuiz);
timeoutRestartBtn.addEventListener('click', startQuiz);

// Setup on page load
document.addEventListener('DOMContentLoaded', function() {
    totalQuestionsDisplay.innerHTML = quizQuestions.length;
    updateTimerDisplay();
    showScreen('start-screen');
});
