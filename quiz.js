document.addEventListener("DOMContentLoaded", function () {
    let category = sessionStorage.getItem("quizCategory");
    let difficulty = sessionStorage.getItem("quizDifficulty");
    let timer = sessionStorage.getItem("quizTimer");

    document.getElementById("quiz-header").textContent = `Quiz: ${category}`;
    document.getElementById("quiz-details").innerHTML = `Diificulty: ${difficulty} <br> Time: ${timer} seconds`;

    setTimeout(function () {

        startQuiz(category);
    }, 3000);

});

function startQuiz(category) {
    if (category === "Sports") {
        let question = "Ko je osvojio Svetsko prvenstvo u fudbalu 2018?";
        let options = ["Francuska", "Brazil", "Nemačka", "Argentina"];

      
        console.log(question); 
        console.log(options);   

       
        document.getElementById("quiz-header").textContent = question;
        document.getElementById("quiz-details").innerHTML = options.map(option => `<button>${option}</button>`).join("<br>");
    }
}
