document.addEventListener("DOMContentLoaded", function () {
    let category = sessionStorage.getItem("quizCategory");
    let difficulty = sessionStorage.getItem("quizDifficulty");
    let timer = sessionStorage.getItem("quizTimer");
    let quizHeader = document.getElementById("quiz-header");
    let quizDetails = document.getElementById("quiz-details");

    quizHeader.textContent = `Quiz: ${category}`;
    quizDetails.innerHTML = `Difficulty: ${difficulty} <br> Time: ${timer} seconds`;

    let startButton = document.getElementById("start-quiz-button");

    if (startButton) {
        startButton.addEventListener("click", function () {
            startButton.style.display = "none";
            quizHeader.style.display = "none";
            quizDetails.style.display = "none";
            fetchAndSaveQuestions(category);
        });
    } else {
        console.error('Button start-quiz-button does not exist in DOM');
    }
});

async function fetchAndSaveQuestions(category) {
    let categoryMap = {
        "Science": "science",
        "Geography": "geography",
        "Arts & Literature": "arts_and_literature",
        "Sport & Leisure": "sport_and_leisure",
        "Music": "music",
        "History": "history",
        "Food & Drink": "food_and_drink"
    };

    let apiCategory = categoryMap[category] || "general_knowledge"; // Default ako nema kategorije

    try {
        let response = await fetch(`https://the-trivia-api.com/api/questions?categories=${apiCategory}&limit=5`);
        let questions = await response.json();
        localStorage.setItem('quizQuestions', JSON.stringify(questions));
        displayNextQuestion();
    } catch (error) {
        console.error('Error fetching questions:', error);
    }
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

let currentQuestionNumber = 0;
let correctAnswersCount = 0;

function displayNextQuestion() {
    let storedQuestions = localStorage.getItem('quizQuestions');
    if (!storedQuestions) {
        console.error('No questions saved in localStorage!');
        return;
    }

    let questions = JSON.parse(storedQuestions);
    if (currentQuestionNumber >= questions.length) {
        let resultContainer = document.getElementById('quiz-container');
        resultContainer.textContent = `Quiz completed. Correct answers: ${correctAnswersCount} / ${questions.length}`;
        resultContainer.style.fontSize = '2rem';

        let backButton = document.createElement('button');
        backButton.textContent = 'Try again';
        backButton.onclick = function () {
            window.location.href = 'index.html';
        };
        backButton.style.marginTop = '10%';
        backButton.style.padding = '10px 20px';
        backButton.style.cursor = 'pointer';
        backButton.style.height = '15%';
        backButton.style.width = '40%';
        backButton.style.borderRadius = '10%';

        resultContainer.appendChild(backButton);

        return;
    }

    let question = questions[currentQuestionNumber];
    
    let quizContainer = document.getElementById('quiz-container');
    quizContainer.textContent = '';

    let newQuestion = document.createElement('div');
    newQuestion.textContent = `${question.question}`;
    newQuestion.style.fontSize='2rem';

    let answers = [question.correctAnswer, ...question.incorrectAnswers];
    shuffleArray(answers);

    let answersContainer = document.createElement('div');
    answersContainer.style.display = 'grid';
    answersContainer.style.gridTemplateColumns = 'repeat(2, 1fr)';
    answersContainer.style.gap = '10px';
    answersContainer.style.marginTop = '10px';

    answers.forEach(answer => {
        let btn = document.createElement('button');
        btn.textContent = answer;
        btn.onclick = () => {
            checkAnswer(answer, question.correctAnswer, newQuestion);
        };
        answersContainer.appendChild(btn);
    });

    newQuestion.appendChild(answersContainer);
    quizContainer.appendChild(newQuestion);
}

function checkAnswer(selected, correct, questionContainer) {
    let feedbackContainer = document.createElement('div');
    feedbackContainer.style.marginTop = '10px';
    feedbackContainer.style.color = 'white';
    feedbackContainer.style.fontSize='2rem';

    if (selected === correct) {
        feedbackContainer.textContent = 'Correct';
        correctAnswersCount++;
    } else {
        feedbackContainer.textContent = `Wrong answer. Correct is: ${correct}`;
        feedbackContainer.style.color = 'white';
    }
    questionContainer.appendChild(feedbackContainer);

    currentQuestionNumber++;
    setTimeout(() => {
        displayNextQuestion();
    }, 3000);
}
