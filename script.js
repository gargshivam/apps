const optionsContainer = document.getElementById('options-container');
const nextButton = document.getElementById('next-button');
const startButton = document.getElementById('start-button');
const questionDisplay = document.getElementById('question');
const scoreDisplay = document.getElementById('score');
let score = 0;
let shuffledQuestions = [];
let currentQuestionIndex = -1;

const questionsURL = 'https://raw.githubusercontent.com/gargshivam/apps/main/questionbank.json';

let questions = [];

async function fetchQuestions() {
    try {
        const response = await fetch(questionsURL);
        const data = await response.json();
        questions = data.questions;
        startGame();
    } catch (error) {
        console.error('Error fetching questions:', error);
    }
}

function startGame() {
    shuffledQuestions = shuffleArray(questions);
    currentQuestionIndex = -1;
    score = 0;
    updateScore();
    nextQuestion();
}

function shuffleArray(array) {
    const shuffledArray = array.slice();
    for (let i = shuffledArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < shuffledQuestions.length) {
        const currentQuestion = shuffledQuestions[currentQuestionIndex];
        displayQuestion(currentQuestion);
    } else {
        showGameOverMessage();
        resetGame();
    }
}

function displayQuestion(question) {
    questionDisplay.textContent = question.question;

    optionsContainer.innerHTML = '';

    question.options.forEach((option, index) => {
        const optionButton = document.createElement('button');
        optionButton.textContent = option;
        optionButton.addEventListener('click', () => checkAnswer(index, question.correctAnswer));
        optionsContainer.appendChild(optionButton);
    });

    nextButton.style.display = 'none';
}

function checkAnswer(selectedOptionIndex, correctAnswerIndex) {
    if (selectedOptionIndex === correctAnswerIndex) {
        score++;
        showCongratulationMessage();
    } else {
        showMotivationMessage();
    }

    updateScore();
    nextButton.style.display = 'block';
}

function updateScore() {
    scoreDisplay.textContent = 'Score: ' + score;
}

function showCongratulationMessage() {
    alert('Congratulations! Your answer is correct!');
}

function showMotivationMessage() {
    alert('Oops! That\'s not correct. Keep trying!');
}

function showGameOverMessage() {
    alert('Game Over! Your final score is: ' + score);
}

function resetGame() {
    nextButton.style.display = 'none';
}

startButton.addEventListener('click', () => fetchQuestions());
nextButton.addEventListener('click', () => nextQuestion());

function showCongratulationMessage() {
    Swal.fire({
        icon: 'success',
        title: 'Awesome!',
        text: 'Your answer is correct! 🌟',
        timer: 2000, // Adjust the timer as needed
        timerProgressBar: true,
        showConfirmButton: false,
        onOpen: () => {
            // You can add a sound for congratulation (adjust the sound file path)
            const audio = new Audio('congratulation.mp3');
            audio.play();
        }
    });
}

function showMotivationMessage() {
    Swal.fire({
        icon: 'error',
        title: 'Oops!',
        text: 'That\'s not correct. Keep trying! 💪',
        timer: 2000, // Adjust the timer as needed
        timerProgressBar: true,
        showConfirmButton: false,
        onOpen: () => {
            // You can add a sound for motivation (adjust the sound file path)
            const audio = new Audio('motivation.mp3');
            audio.play();
        }
    });
}
// ...
