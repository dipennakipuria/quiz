const questions = [                                            // all qus for quiz
    {
        question: "What is the capital of France?",
        choices: ["Berlin", "Madrid", "Paris", "Lisbon"],
        correct: "Paris"
    },
    {
        question: "What is 2 + 2?",
        choices: ["3", "4", "5", "6"],
        correct: "4"
    },
    {
        question: "Which planet is known as the Red Planet?",
        choices: ["Earth", "Mars", "Jupiter", "Saturn"],
        correct: "Mars"
    },
    {
        question: "What is the largest ocean on Earth?",
        choices: ["Atlantic", "Indian", "Arctic", "Pacific"],
        correct: "Pacific"
    },
    {
        question: "Who wrote 'To Kill a Mockingbird'?",
        choices: ["Harper Lee", "Mark Twain", "Ernest Hemingway", "F. Scott Fitzgerald"],
        correct: "Harper Lee"
    },
    {
        question: "What is the smallest prime number?",
        choices: ["0", "1", "2", "3"],
        correct: "2"
    },
    {
        question: "Who painted the Mona Lisa?",
        choices: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Claude Monet"],
        correct: "Leonardo da Vinci"
    },
    {
        question: "What is the capital of Japan?",
        choices: ["Seoul", "Beijing", "Tokyo", "Bangkok"],
        correct: "Tokyo"
    },
    {
        question: "What is the chemical symbol for water?",
        choices: ["H2O", "CO2", "NaCl", "O2"],
        correct: "H2O"
    },
    {
        question: "How many continents are there on Earth?",
        choices: ["5", "6", "7", "8"],
        correct: "7"
    }
];

let currentQuestionIndex = localStorage.getItem('currentQuestionIndex') ? parseInt(localStorage.getItem('currentQuestionIndex')) : 0;
let timeLeft = localStorage.getItem('timeLeft') ? parseInt(localStorage.getItem('timeLeft')) : 600;

const quizContainer = document.getElementById('quiz-container');
const questionContainer = document.getElementById('question-container');
const nextButton = document.getElementById('next-btn');
const timerElement = document.getElementById('time');
const fullscreenButton = document.getElementById('fullscreen-btn');

function openFullscreen() {                            // function about the full screen mode 
    if (quizContainer.requestFullscreen) {
        quizContainer.requestFullscreen();
    } else if (quizContainer.mozRequestFullScreen) {  
        quizContainer.mozRequestFullScreen();
    } else if (quizContainer.webkitRequestFullscreen) {  
        quizContainer.webkitRequestFullscreen();
     
    }
}

function renderQuestion() {
    questionContainer.innerHTML = '';
    const questionData = questions[currentQuestionIndex];
    const questionElement = document.createElement('div');
    questionElement.innerHTML = `<h2>${questionData.question}</h2>`;
    
    questionData.choices.forEach(choice => {
        const choiceElement = document.createElement('div');
        choiceElement.innerHTML = `
            <input type="radio" name="choice" value="${choice}">
            <label>${choice}</label>
        `;
        questionElement.appendChild(choiceElement);
    });

    questionContainer.appendChild(questionElement);
}

function startTimer() {
    const timer = setInterval(() => {
        timeLeft--;
        localStorage.setItem('timeLeft', timeLeft);
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        timerElement.textContent = `Time left: ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        
        if (timeLeft <= 0) {
            clearInterval(timer);                 //  handle the end of the quiz
            alert('Time is up!');
           
        }
    }, 1000);
}

function checkFullscreen() {
    if (!document.fullscreenElement) {
        quizContainer.classList.add('hidden');
        fullscreenButton.classList.remove('hidden');
    } else {
        quizContainer.classList.remove('hidden');
        fullscreenButton.classList.add('hidden');
    }
}

nextButton.addEventListener('click', () => {
    const selectedChoice = document.querySelector('input[name="choice"]:checked');
    if (selectedChoice) {
        
        currentQuestionIndex++;
        localStorage.setItem('currentQuestionIndex', currentQuestionIndex);

        if (currentQuestionIndex < questions.length) {
            renderQuestion();
        } else {
            alert('Quiz completed!');
         
        }
    } else {
        alert('Please select an answer.');
    }
});

document.addEventListener('fullscreenchange', checkFullscreen);

renderQuestion();
startTimer();
checkFullscreen();
