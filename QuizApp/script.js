// Quiz questions and answers
var quizQuestions = [
  {
    question: "What is the correct way to declare a variable in JavaScript?",
    options: [
      "var name = 'John';",
      "variable name = 'John';",
      "name = 'John';",
      "declare name = 'John';"
    ],
    correctAnswer: 0
  },
  {
    question: "Which of these is NOT a JavaScript data type?",
    options: ["String", "Boolean", "Character", "Number"],
    correctAnswer: 2
  },
  {
    question: "What does Array.isArray([1, 2, 3]) return?",
    options: ["true", "false", "undefined", "'[1, 2, 3]'"],
    correctAnswer: 0
  },
  {
    question: "What will console.log(typeof undefined) show?",
    options: ["'null'", "'undefined'", "'void'", "null"],
    correctAnswer: 1
  },
  {
    question: "Which loop is best for object properties?",
    options: ["for loop", "while loop", "for...in loop", "forEach loop"],
    correctAnswer: 2
  }
];

var currentQuestion = 0;
var answers = [];
var timeLeft = 300;
var timerId = null;

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
var timeoutScore = document.getElementById('timeout-score');

function showScreen(screenId) {
  startScreen.style.display = 'none';
  quizScreen.style.display = 'none';
  resultsScreen.style.display = 'none';
  timeoutScreen.style.display = 'none';

  document.getElementById(screenId).style.display = 'block';
}

function formatTime(seconds) {
  var minutes = Math.floor(seconds / 60);
  var secs = seconds % 60;
  if (secs < 10) {
    secs = '0' + secs;
  }
  return minutes + ':' + secs;
}

function updateTimerDisplay() {
  timerDisplay.textContent = formatTime(timeLeft);
}

function updateScoreDisplay() {
  var answeredCount = 0;
  for (var i = 0; i < answers.length; i++) {
    if (answers[i] !== null) {
      answeredCount++;
    }
  }
  scoreDisplay.textContent = answeredCount;
}

function updateProgress() {
  var percent = ((currentQuestion + 1) / quizQuestions.length) * 100;
  progressFill.style.width = percent + '%';
}

function showQuestion() {
  var question = quizQuestions[currentQuestion];
  questionNumber.textContent = 'Question ' + (currentQuestion + 1) + ' of ' + quizQuestions.length;
  questionText.textContent = question.question;
  optionsContainer.innerHTML = '';

  for (var i = 0; i < question.options.length; i++) {
    var button = document.createElement('button');
    button.type = 'button';
    button.className = 'option-btn';
    button.textContent = question.options[i];

    if (answers[currentQuestion] === i) {
      button.className += ' selected';
    }

    button.onclick = (function(index) {
      return function() {
        selectAnswer(index);
      };
    })(i);

    optionsContainer.appendChild(button);
  }

  prevBtn.disabled = currentQuestion === 0;
  nextBtn.textContent = currentQuestion === quizQuestions.length - 1 ? 'Submit' : 'Next';
  updateProgress();
}

function selectAnswer(index) {
  answers[currentQuestion] = index;
  updateScoreDisplay();

  var buttons = optionsContainer.querySelectorAll('.option-btn');
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].className = 'option-btn';
    if (i === index) {
      buttons[i].className += ' selected';
    }
  }
}

function nextQuestion() {
  if (answers[currentQuestion] === null) {
    alert('Please select an answer before moving forward.');
    return;
  }

  if (currentQuestion === quizQuestions.length - 1) {
    finishQuiz();
  } else {
    currentQuestion++;
    showQuestion();
  }
}

function previousQuestion() {
  if (currentQuestion > 0) {
    currentQuestion--;
    showQuestion();
  }
}

function getScore() {
  var total = 0;
  for (var i = 0; i < quizQuestions.length; i++) {
    if (answers[i] === quizQuestions[i].correctAnswer) {
      total++;
    }
  }
  return total;
}

function finishQuiz() {
  stopTimer();
  var score = getScore();
  finalScore.textContent = score;

  if (score === quizQuestions.length) {
    scoreMessage.textContent = 'Perfect score!';
  } else if (score >= quizQuestions.length * 0.8) {
    scoreMessage.textContent = 'Great job!';
  } else if (score >= quizQuestions.length * 0.6) {
    scoreMessage.textContent = 'Good work!';
  } else {
    scoreMessage.textContent = 'Keep practicing and try again.';
  }

  showScreen('results-screen');
}

function startTimer() {
  stopTimer();
  updateTimerDisplay();

  timerId = setInterval(function() {
    timeLeft--;
    if (timeLeft < 0) {
      stopTimer();
      timeoutScore.textContent = getScore();
      showScreen('timeout-screen');
    } else {
      updateTimerDisplay();
    }
  }, 1000);
}

function stopTimer() {
  if (timerId !== null) {
    clearInterval(timerId);
    timerId = null;
  }
}

function resetQuiz() {
  currentQuestion = 0;
  timeLeft = 300;
  answers = [];
  for (var i = 0; i < quizQuestions.length; i++) {
    answers[i] = null;
  }
  updateTimerDisplay();
  updateScoreDisplay();
}

function startQuiz() {
  resetQuiz();
  showQuestion();
  startTimer();
  showScreen('quiz-screen');
}

startBtn.addEventListener('click', startQuiz);
nextBtn.addEventListener('click', nextQuestion);
prevBtn.addEventListener('click', previousQuestion);
restartBtn.addEventListener('click', startQuiz);
timeoutRestartBtn.addEventListener('click', startQuiz);

document.addEventListener('DOMContentLoaded', function() {
  totalQuestionsDisplay.textContent = quizQuestions.length;
  updateTimerDisplay();
  showScreen('start-screen');
});
