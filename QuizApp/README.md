# Interactive Quiz App 📝

A fully functional JavaScript quiz application demonstrating core JavaScript concepts, DOM manipulation, and interactive features.

## Features ✨

- **5 JavaScript Questions**: Test your knowledge of JavaScript fundamentals
- **Scoring System**: Track correct answers in real-time
- **Timer**: 5-minute countdown timer with automatic timeout
- **Progress Bar**: Visual indicator of quiz progress
- **Navigation**: Move between questions with Previous/Next buttons
- **Review Results**: Detailed feedback on each question with explanations
- **Responsive Design**: Works on desktop and mobile devices

## Project Structure 📁

```
QuizApp/
├── index.html      # HTML structure and quiz markup
├── styles.css      # Styling and responsive design
├── script.js       # JavaScript logic and interactivity
└── README.md       # This file
```

## JavaScript Concepts Demonstrated 🎓

### 1. **Data Types**
```javascript
// Various data types in the quiz
const quizQuestions = [...];  // Array
const quizState = { ... };    // Object
const timeRemaining = 300;    // Number
const quizActive = false;     // Boolean
```

### 2. **Control Flow**
```javascript
// if/else statements in displayResults()
if (percentage === 100) {
    message = '🎉 Perfect Score!';
} else if (percentage >= 80) {
    message = '🌟 Excellent!';
}

// for loops for rendering options
quizQuestions.options.forEach((option, index) => {
    // Render option...
});
```

### 3. **Functions**
```javascript
// Modular, reusable functions
function startQuiz() { ... }
function nextQuestion() { ... }
function calculateScore() { ... }
```

### 4. **Arrays & Objects**
```javascript
// Array of question objects
const quizQuestions = [
    {
        id: 1,
        question: "...",
        options: ["A", "B", "C", "D"],
        correctAnswer: 0
    },
    // More questions...
];

// State management with objects
const quizState = {
    currentQuestion: 0,
    score: 0,
    answers: [],
    timeRemaining: 300
};
```

### 5. **DOM APIs**
```javascript
// Selecting elements
const startBtn = document.getElementById('start-btn');
const optionsContainer = document.getElementById('options-container');

// Creating elements
const optionDiv = document.createElement('div');

// Manipulating content
questionText.textContent = question.question;
optionDiv.innerHTML = `<input type="radio">`;

// Event handling
startBtn.addEventListener('click', startQuiz);

// Modifying classes
optionDiv.classList.add('selected');
optionDiv.classList.toggle('correct', isCorrect);
```

## How to Use 🚀

1. **Open the Quiz**
   - Open `index.html` in your web browser

2. **Start the Quiz**
   - Click the "Start Quiz" button on the welcome screen

3. **Answer Questions**
   - Read each question carefully
   - Select one of the four options
   - Click "Next" to proceed (or "Previous" to go back)

4. **Submit & Review**
   - On the last question, click "Submit"
   - Review your score and detailed results
   - See explanations for each answer

5. **Restart**
   - Click "Restart Quiz" to try again

## Timer & Scoring ⏱️

- **Time Limit**: 5 minutes (300 seconds)
- **Scoring**: 1 point per correct answer
- **Total Points**: 5 points possible
- **Auto-submit**: If time runs out, the quiz automatically submits

## Key Functions 🔧

| Function | Purpose |
|----------|---------|
| `startQuiz()` | Initializes and starts a new quiz |
| `renderQuestion()` | Displays current question and options |
| `selectOption(index)` | Records user's answer selection |
| `nextQuestion()` | Advances to next question |
| `previousQuestion()` | Goes back to previous question |
| `finishQuiz()` | Calculates final score |
| `displayResults()` | Shows results screen |
| `startTimer()` | Begins countdown timer |
| `handleTimeout()` | Handles quiz timeout |

## Quiz Questions 📚

The quiz covers these JavaScript topics:

1. **Variable Declaration**: `var`, `let`, `const`
2. **Data Types**: String, Number, Boolean, Object, undefined, null, Symbol
3. **Array Methods**: `Array.isArray()`
4. **typeof Operator**: Understanding type checking
5. **Loop Types**: `for`, `while`, `for...in`, `for...of`

## Styling Highlights 🎨

- **Gradient Background**: Purple gradient (`#667eea` to `#764ba2`)
- **Smooth Animations**: Fade-in effects for screen transitions
- **Hover Effects**: Interactive hover states on options
- **Color Coding**: 
  - Green for correct answers
  - Red for incorrect answers
  - Blue for neutral/selected states

## Browser Compatibility 🌐

Works on all modern browsers that support:
- ES6 JavaScript
- CSS Grid & Flexbox
- CSS Animations
- DOM APIs

## Responsive Design 📱

- **Desktop**: Full layout with all features
- **Tablet**: Optimized spacing and button sizes
- **Mobile**: Stacked layout, touch-friendly buttons

## Future Enhancements 🚀

- Add more question categories
- Implement difficulty levels
- Add sound effects
- Leaderboard system
- Shuffle questions randomly
- Save progress to localStorage
- Add more detailed explanations with code examples

---

**Happy Learning! 🎉**
