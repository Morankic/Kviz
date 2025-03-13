document.addEventListener("DOMContentLoaded", function () {
    let category = sessionStorage.getItem("quizCategory");
    let difficulty = sessionStorage.getItem("quizDifficulty");
    let timer = sessionStorage.getItem("quizTimer");

    document.getElementById("quiz-header").textContent = `Quiz: ${category}`;
    document.getElementById("quiz-details").innerHTML = `Difficulty: ${difficulty} <br> Time: ${timer} seconds`;

    let startButton = document.getElementById("start-quiz-button");

    if (startButton) {
        startButton.addEventListener("click", function () {
            startButton.style.display="none";
            document.getElementById("quiz-header").style.display = "none";
            document.getElementById("quiz-details").style.display = "none";
            fetchAndSaveSportQuestions(); 
        });
    } else {
        console.error('Button start-quiz-button doesnt exist in DOM');
    }
});

async function fetchAndSaveSportQuestions() {
    try {
        let response = await fetch('https://the-trivia-api.com/api/questions?categories=sport_and_leisure&limit=5');
        let questions = await response.json();
        localStorage.setItem('sportsQuestions', JSON.stringify(questions));
        console.log('Question stored at localStorage:', questions);
        displayNextQuestion();
    } catch (error) {
        console.error('Error in getting question number:', error);
    }
}

let currentQuestionIndex = 0;
let correctAnswersCount = 0; 

function displayNextQuestion() {
    let storedQuestions = localStorage.getItem('sportsQuestions');
    if (!storedQuestions) {
        console.error('No questions saved in localStorage!');
        return;
    }
    
    let questions = JSON.parse(storedQuestions);
    if (currentQuestionIndex >= questions.length) {
        
        alert(` The end. Correct answers: ${correctAnswersCount} / ${questions.length}`);
        return;
    }
    
    let question = questions[currentQuestionIndex];
    let quizContainer = document.getElementById('quiz-container');
    quizContainer.innerHTML = '';

    let questionEl = document.createElement('div');
    questionEl.textContent = `${question.question}`;

    let answers = [question.correctAnswer, ...question.incorrectAnswers];
    answers.forEach(answer => {
        let btn = document.createElement('button');
        btn.textContent = answer;
        btn.onclick = () => {
            checkAnswer(answer, question.correctAnswer);
        };
        questionEl.appendChild(btn);
    });
    quizContainer.appendChild(questionEl);
}

function checkAnswer(selected, correct) {
    if (selected === correct) {
        alert('Correct');
        correctAnswersCount++;  
    } else {
        alert(`Wrong answer. Correct is: ${correct}`);
    }
    currentQuestionIndex++;
    displayNextQuestion();
}
