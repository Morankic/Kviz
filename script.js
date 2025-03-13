document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("proceed").addEventListener("click", function () {
        
        let category = document.getElementById("category").value;
        let difficulty = document.getElementById("difficulty").value;
        let timer = document.getElementById("timer").value;
        
        sessionStorage.setItem("quizCategory", category);
        sessionStorage.setItem("quizDifficulty", difficulty);
        sessionStorage.setItem("quizTimer", timer);

        window.location.href = "quiz.html"; 
    });
});
