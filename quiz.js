const questions = [
    {
        question: "Who invented java programming ?",
        answers: [
            {text: "James Gosling", correct: true},
             {text: "Dennis Ritchie", correct: false},
              {text: "Guido van Rossum", correct: false},
               {text: "Bjarne Stroustrup", correct: false},
            
        ]
    },
    {
        question: "Which component is used to compile , debug and execute the java programs ?",
        answers: [
            {text: "JRE", correct: false},
             {text: "JIT", correct: false},
              {text: "JDK", correct: true},
               {text: "JVM", correct: false},
            
        ]

    },
    {
        question: "Which of these can't be used for a variable name in java?",
        answers: [
            {text: "identifier & keyword", correct: false },
             {text: "keyword", correct: true},
              {text: "identifier", correct: false},
               {text: "none of the mentioned", correct: false},
            
        ]
    },
    {
        question: "What is the extension of java code files?",
        answers: [
            {text: " .js", correct:false},
             {text: " .txt", correct: false},
              {text: " .class", correct: false},
               {text: " .java", correct: true},
            
        ]
    },
    {
        question: "Which of the following is not an oops concept in java?",
        answers: [
            {text: "Inheritance", correct: false},
             {text: "Polymorphism", correct: false},
              {text: "Compilation", correct: true},
               {text: "Encapsulation", correct: false},
            
        ]
    }
];
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;


function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }
    else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = ` you scored ${score} out  of ${questions.length}!`;
    nextButton.innerHTML = " play Again";
    nextButton.style.display = "block";
}



function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }
    else{
        showScore();
    }
}



nextButton.addEventListener("click", () => {
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }
    else{
        startQuiz();
    }
})
startQuiz();