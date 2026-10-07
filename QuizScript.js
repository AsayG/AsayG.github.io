/*

Author: Gideon Asay
Date:9/30/2026


*/

// 1. Question Bank
const quizData = [
    {
        question: "What phone do I have?",
        options: ["Pixel 8a", "Moterola g stylus", "Pixel 10 pro", "Pixel 10 pro xl"],
        correct: 3
    },
    {
        question: "What is my favorite pokemon?",
        options: ["Pikachu", "Charizard", "Piplup", "Charmander"],
        correct: 1
    },
    {
        question: "What is my favorite single player video game?",
        options: ["Spiderman miles morales", "Tomb Raider", "Spiderman 2", "Guardians of the Galaxy"],
        correct: 0
    },
    {
        question: "What is my favorite multiplayer video game?",
        options: ["Rounds", "Golf it", "Bople Battle", "ultimate chicken horse"],
        correct: 3
    },
    {
        question: "What is my skill level in beat saber?",
        options: ["Hard", "Expert", "Normal", "Expert +"],
        correct: 1
    },
    {
        question: "What operating system do I use on my computer?",
        options: ["Windows 10", "macOS", "Linux", "Windows 11"],
        correct: 2
    },
    {
        question: "What is the name of the school that I go to?",
        options: ["South west technical college", "SUU", "No School", "Southwest Education Academy"],
        correct: 0
    },
    {
        question: "Am I a good cook?",
        options: ["Yes", "Mostly", "Sometimes", "Never"],
        correct: 1
    },
    {
        question: "What is my favorite color?",
        options: ["Red", "Blue", "Green", "Yellow"],
        correct: 1
    },
    {
        question: "How tall am I?",
        options: ["5ft 8in", "5ft 11in", "5ft 9in", "5ft 7in"],
        correct: 3
    },
    {
        question: "What is my middle name?",
        options: ["Timmothy", "Joel", "Thomas", "John"],
        correct: 2
    },
    {
        question: "When is my birthday?",
        options: ["January 18th", "February 28th", "February 14th", "June 28th"],
        correct: 1
    },
    {
        question: "What was my pets name?",
        options: ["Lola", "Buddy", "Domino", "Max"],
        correct: 0
    },
    {
        question: "What is the size of my shoe?",
        options: ["Size 10", "Size 11", "Size 9 1/2", "Size 9"],
        correct: 0
    },
    {
        question: "Do I sing when listening to music?",
        options: ["Yes", "When I'm alone", "If it's a good song", "Rarely"],
        correct: 1
    },
    {
        question: "How big is my forehead?",
        options: ["Gigantic", "Large", "5 Fingers thick", "Average"],
        correct: 3
    },
    {
        question: "How is my Pc processor cooled?",
        options: ["Air cooling", "Liquid cooling", "Passive cooling"],
        correct: 1
    },
    {
        question: "How big is the TV in my room?",
        options: ["50 inches", "60 inches", "55 inches", "No TV in my room"],
        correct: 2
    },
    {
        question: "What car do I drive?",
        options: ["Ford Fusion", "Ford Explorer", "Ford Mustang", "Ford Focus"],
        correct: 0
    },


];

// 2. DOM Elements
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const nextBtn = document.getElementById('next-btn');
const quizScreen = document.getElementById('quiz-screen');
const resultScreen = document.getElementById('result-screen');
const scoreText = document.getElementById('score-text');

const restartBtn = document.getElementById('restart-btn');

// 3. State Management
let currentQuestionIndex = 0;
let score = 0;

// 4. Start/Restart Game Cycle
function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    resultScreen.classList.add('hidden');
    quizScreen.classList.remove('hidden');
    showQuestion();
}

// 5. Render Question and Choice Buttons
function showQuestion() {
    nextBtn.classList.add('hidden');
    optionsContainer.innerHTML = ''; // Clear old buttons

    let currentData = quizData[currentQuestionIndex];
    questionText.innerText = currentData.question;

    // Loop through answers to dynamically create buttons
    currentData.options.forEach((optionText, index) => {
        const button = document.createElement('button');
        button.innerText = optionText;
        button.classList.add('btn', 'option-btn');
        
        // Listen for user select clicks
        button.addEventListener('click', () => selectOption(button, index));
        
        optionsContainer.appendChild(button);
    });
}

// 6. Handle Answer Selections
function selectOption(selectedButton, index) {
    const correctAnswerIndex = quizData[currentQuestionIndex].correct;
    
    if (index === correctAnswerIndex) {
        selectedButton.classList.add('correct');
        score++;
    } else {
        selectedButton.classList.add('wrong');
        // Instantly highlight the correct choice to teach the user
        optionsContainer.children[correctAnswerIndex].classList.add('correct');
    }

    // Freeze input controls by disabling all option buttons
    Array.from(optionsContainer.children).forEach(button => {
        button.disabled = true;
    });

    nextBtn.classList.remove('hidden');
}

// 7. Navigation Actions
nextBtn.addEventListener('click', () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizData.length) {
        showQuestion();
    } else {
        showResults();
    }
});

// 8. End Game Results View
function showResults() {
    quizScreen.classList.add('hidden');
    resultScreen.classList.remove('hidden');
    scoreText.innerText = `You scored ${score} out of ${quizData.length}!`;
}

// 9. Attach Restart Trigger
restartBtn.addEventListener('click', startQuiz);

// Initialize application lifecycle on runtime boot
startQuiz();
