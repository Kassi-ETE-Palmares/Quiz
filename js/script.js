
const questions = [
    {
        question: "Qual planeta é conhecido como Planeta Vermelho?",
        options: ["Vênus", "Marte", "Júpiter", "Mercúrio"],
        answer: 1
    },
    {
        question: "Quanto é 15% de 200?",
        options: ["15", "20", "30", "35"],
        answer: 2
    },
    {
        question: "Qual é o maior oceano do planeta?",
        options: ["Atlântico", "Índico", "Ártico", "Pacífico"],
        answer: 3
    },
    {
        question: "Em que ano ocorreu a Proclamação da República no Brasil?",
        options: ["1822", "1888", "1889", "1891"],
        answer: 2
    },
    {
        question: "Qual linguagem estrutura uma página web?",
        options: ["HTML", "CSS", "SQL", "Python"],
        answer: 0
    }
];

const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");

const startButton = document.getElementById("start-button");
const nextButton = document.getElementById("next-button");
const restartButton = document.getElementById("restart-button");

const questionCounter = document.getElementById("question-counter");
const scoreElement = document.getElementById("score");
const questionText = document.getElementById("question-text");
const answerList = document.getElementById("answer-list");
const feedback = document.getElementById("feedback");
const progressFill = document.getElementById("progress-fill");

let currentQuestion = 0;
let score = 0;
let answered = false;

function startQuiz() {
    currentQuestion = 0;
    score = 0;
    answered = false;

    scoreElement.textContent = score;

    startScreen.classList.add("hidden");
    resultScreen.classList.add("hidden");
    quizScreen.classList.remove("hidden");

    showQuestion();
}

function showQuestion() {
    answered = false;

    const item = questions[currentQuestion];

    questionCounter.textContent =
        `Pergunta ${currentQuestion + 1} de ${questions.length}`;

    questionText.textContent = item.question;
    feedback.textContent = "";
    progressFill.style.width =
        `${(currentQuestion / questions.length) * 100}%`;

    nextButton.disabled = true;

    nextButton.textContent =
        currentQuestion === questions.length - 1
            ? "Ver resultado"
            : "Próxima pergunta";

    answerList.replaceChildren();

    item.options.forEach((option, index) => {
        const button = document.createElement("button");

        button.className = "answer-button";
        button.textContent =
            `${String.fromCharCode(65 + index)}. ${option}`;

        button.addEventListener("click", () => {
            checkAnswer(index);
        });

        answerList.appendChild(button);
    });
}

function checkAnswer(selectedIndex) {
    if (answered) return;

    answered = true;

    const item = questions[currentQuestion];
    const buttons = answerList.querySelectorAll("button");
    const correct = selectedIndex === item.answer;

    buttons.forEach((button, index) => {
        button.disabled = true;

        if (index === item.answer) {
            button.classList.add("correct");
        }

        if (index === selectedIndex && !correct) {
            button.classList.add("incorrect");
        }
    });

    if (correct) {
        score++;
        scoreElement.textContent = score;
        feedback.textContent = "Resposta correta! Muito bem!";
    } else {
        feedback.textContent =
            `Resposta incorreta. A resposta certa é: ${item.options[item.answer]}.`;
    }

    progressFill.style.width =
        `${((currentQuestion + 1) / questions.length) * 100}%`;

    nextButton.disabled = false;
}

function nextQuestion() {
    if (!answered) return;

    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        showQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    quizScreen.classList.add("hidden");
    resultScreen.classList.remove("hidden");

    const percentage = Math.round(
        (score / questions.length) * 100
    );

    document.getElementById("final-score").textContent =
        `${score} de ${questions.length} acertos (${percentage}%)`;

    let message;

    if (percentage === 100) {
        message = "Excelente! Você acertou todas as perguntas!";
    } else if (percentage >= 60) {
        message = "Muito bem! Você teve um bom resultado.";
    } else {
        message = "Continue estudando e tente novamente!";
    }

    document.getElementById("result-message").textContent = message;
    document.getElementById("result-title").textContent =
        "Quiz finalizado!";
}

startButton.addEventListener("click", startQuiz);
nextButton.addEventListener("click", nextQuestion);
restartButton.addEventListener("click", startQuiz);
