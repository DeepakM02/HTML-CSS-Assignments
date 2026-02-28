
const MIN_QUESTION = 5;
const MAX_QUESTION = 20;
const API_BASE = 'https://opentdb.com/api.php?difficulty=easy&type=multiple';

const topics = [
    { "id": "any", "name": "Any" },
    { "id": "9", "name": "General Knowledge" },
    { "id": "10", "name": "Books" },
    { "id": "11", "name": "Film" },
    { "id": "12", "name": "Music" },
    { "id": "13", "name": "Musicals & Theatres" },
    { "id": "14", "name": "Television" },
    { "id": "15", "name": "Video Games" },
    { "id": "16", "name": "Board Games" },
    { "id": "17", "name": "Science & Nature" },
    { "id": "18", "name": "Computers" },
    { "id": "19", "name": "Mathematics" },
    { "id": "20", "name": "Mythology" },
    { "id": "21", "name": "Sports" },
    { "id": "22", "name": "Geography" },
    { "id": "23", "name": "History" },
    { "id": "24", "name": "Politics" },
    { "id": "25", "name": "Art" },
    { "id": "26", "name": "Celebrities" },
    { "id": "27", "name": "Animals" },
    { "id": "28", "name": "Vehicles" },
    { "id": "29", "name": "Comics" },
    { "id": "30", "name": "Gadgets" },
    { "id": "31", "name": "Japanese Anime & Manga" },
    { "id": "32", "name": "Cartoon & Animations" }
]

const state = {
    section: 'setup',
    topic: null,
    questions: [],
    count: 0,
    score: 0,
    loading: false,
    currentIndex: 0,
}

document.addEventListener("DOMContentLoaded", function () {
    const select = document.getElementById("select-topic");

    const placeholder = document.createElement('option');
    placeholder.textContent = "Select a topic...";
    placeholder.value = "";
    placeholder.disabled = true;
    placeholder.selected = true;
    select.appendChild(placeholder);
    select.value = "any";

    topics.forEach((topic) => {
        const option = document.createElement('option');
        option.textContent = topic.name;
        option.value = topic.id;
        select.appendChild(option);
    });

    const input = document.getElementById("question-count");
    const errorMsg = document.getElementById("errorMsg");
    const submitBtn = document.getElementById("start-quiz");

    input.addEventListener("input", function () {
        const value = input.value.trim();
        if (!value) {
            showError("This field is required!")
        } else if (value < MIN_QUESTION || value > MAX_QUESTION) {
            showError(`Number must be between ${MIN_QUESTION} and ${MAX_QUESTION}!`)
        } else {
            clearError();
        }
    })

    function showError(message) {
        errorMsg.textContent = message;
        errorMsg.classList.add("show");
        input.classList.add("invalid");
        submitBtn.disabled = true;
    }

    function clearError() {
        errorMsg.textContent = '';
        errorMsg.classList.remove("show");
        input.classList.remove("invalid");
        submitBtn.disabled = false;
    }
});


function showError(message) {
    const errorMsg = document.getElementById("errorMsg");

    errorMsg.textContent = message;
    errorMsg.classList.add("show");
}

function clearError() {
    const errorMsg = document.getElementById("errorMsg");

    errorMsg.textContent = '';
    errorMsg.classList.remove("show");
}

// fetching questions and handling errors
async function fetchQuestions(topicID, count) {
    let API_URL = `${API_BASE}&amount=${count}`

    if(topicID != 'any') {
        API_URL += `&category=${topicID}`

    }
    const response = await fetch(API_URL);
    try {
        if (!response.ok) {
            throw new Error("Server error while fetching data!");
        }
        const data = await response.json();
        if (!data.results || !data.results.length) {
            throw new Error("No questions found! Try another topic.");

        }
        transformData(data.results);
        return true;
    } catch (error) {
        showError(error);
        return false;
    }
}

function transformData(questions) {
    questions.slice(0, state.count).forEach(result => {
        state.questions.push({
            question: result.question,
            answer: result.correct_answer
        })
    })
}

// 
async function onStartQuiz() {

    // disable submit button if loading screen visible
    if (state.loading) {
        const submitBtn = document.getElementById("start-quiz");
        submitBtn.setAttribute("disabled", true);
        return;
    }
    resetState(); // reset state if case if restart quiz

    const selectTopic = document.getElementById("select-topic");
    const questionCount = document.getElementById("question-count");

    const topic = selectTopic.value;
    const count = parseInt(questionCount.value);

    if (!(topic || count)) {
        alert("Please select a topic and enter the questio count!");
        return;
    }
    state.topic = topic;
    state.count = count;
    state.currentIndex = 0;
    state.loading = true;
    showScreen('loading-screen');
    const result = await fetchQuestions(topic, count);
    hideScreen('loading-screen');
    state.loading = false;

    if (result) {
        state.section = 'quiz';
        renderQuiz();
        renderQuestion();
    }
}

function renderQuiz() {
    hideScreen("setup-screen")
    showScreen("quiz-screen")
}

function renderQuestion() {
    const question = state.questions[state.currentIndex].question;
    document.getElementsByClassName("card")[0].style.cursor = "pointer";
    document.getElementById("card-front").classList.remove("hidden");
    document.getElementById("card-back").classList.add("hidden");
    document.getElementById("answer-controls").classList.add("hidden");

    document.getElementById("question-number").textContent = `Question ${state.currentIndex + 1} of ${state.count}`
    document.getElementById("card-front").textContent = `${question}`;
}

function flipCard() {
    document.getElementsByClassName("card")[0].classList.add('flip');
    document.getElementsByClassName("card")[0].style.cursor = "";
    document.getElementById("card-back").classList.remove('hidden');


    const answer = state.questions[state.currentIndex].answer;
    document.getElementById("card-back").innerHTML = `<b>Answer:</b> &nbsp;${answer}`;

    document.getElementById("answer-controls").classList.remove("hidden");

}

function markCorrect() {
    state.score++;
    nextCard();
}

function markWrong() {
    nextCard();
}

function nextCard() {
    document.getElementsByClassName("card")[0].classList.remove('flip');
    if (state.currentIndex + 1 == state.questions.length) {
        // show result screen
        renderResult();

    } else {
        state.currentIndex++;
        renderQuestion();
    }
}
function hideScreen(id) {
    document.getElementById(id).classList.add('hidden');
}

function showScreen(id) {
    document.getElementById(id).classList.remove('hidden');
}

function renderResult() {
    hideScreen('quiz-screen');
    showScreen("result-screen");

    const element = document.getElementById("result");

    element.innerHTML = `<b>Result:</b> <b>${state.score}</b> correct out of <b>${state.questions.length}</b>`;
}

function resetState() {
    hideScreen('quiz-screen');
    hideScreen('result-screen');
}

function onStartAgain() {
    resetState();
    showScreen('setup-screen')
}

