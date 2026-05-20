let playerName = "";

let currentQuestion =
    questions[Math.floor(Math.random() * questions.length)];

let hintIndex = 0;

let score = 0;
let streak = 0;
let missCount = 0;

let timeLeft = 30;
let timer;

const startBtn =
    document.getElementById("start-btn");

const nicknameInput =
    document.getElementById("nickname");

const startScreen =
    document.getElementById("start-screen");

const gameScreen =
    document.getElementById("game-screen");

const rankingList =
    document.getElementById("ranking-list");

const hintBox = document.getElementById("hint-box");
const hintBtn = document.getElementById("hint-btn");
const answerBtn = document.getElementById("answer-btn");
const answerInput = document.getElementById("answer-input");
const result = document.getElementById("result");
const timerText = document.getElementById("timer");
const missText = document.getElementById("miss");

const correctSound =
    document.getElementById("correct-sound");

const wrongSound =
    document.getElementById("wrong-sound");

const scoreText = document.createElement("p");

gameScreen.appendChild(scoreText);

updateScore();

loadRanking();

startBtn.addEventListener("click", () => {

    playerName =
        nicknameInput.value.trim();

    if (playerName === "") {

        alert("ニックネームを入力してください");

        return;

    }

    startScreen.style.display = "none";

    gameScreen.style.display = "block";

    startTimer();

});

hintBtn.addEventListener("click", () => {

    if (hintIndex < currentQuestion.hints.length) {

        hintBox.textContent =
            currentQuestion.hints[hintIndex];

        hintIndex++;

    }

});

answerBtn.addEventListener("click", checkAnswer);

answerInput.addEventListener("keydown", (event) => {

    if (event.key === "Enter") {

        checkAnswer();

    }

});

function checkAnswer() {

    const userAnswer =
        answerInput.value.trim();

    if (userAnswer === currentQuestion.answer) {

        correctSound.play();

        score += 20;

        streak++;

        if (streak >= 2) {

            score += 10;

        }

        result.textContent = "正解！";

        updateScore();

        nextQuestion();

    } else {

        wrongSound.play();

        score -= 5;

        streak = 0;

        missCount++;

        missText.textContent =
            "ミス : " + missCount + " / 2";

        result.textContent =
            "不正解！";

        updateScore();

        if (missCount >= 2) {

            gameOver();

        }

    }

}

function updateScore() {

    scoreText.textContent =
        "スコア : " + score;

}

function nextQuestion() {

    clearInterval(timer);

    currentQuestion =
        questions[Math.floor(Math.random() * questions.length)];

    hintIndex = 0;

    hintBox.textContent =
        "ヒントがここに表示されます";

    answerInput.value = "";

    timeLeft = 30;

    startTimer();

}

function startTimer() {

    timerText.textContent =
        "残り時間 : " + timeLeft;

    timer = setInterval(() => {

        timeLeft--;

        timerText.textContent =
            "残り時間 : " + timeLeft;

        if (timeLeft <= 0) {

            clearInterval(timer);

            wrongSound.play();

            score -= 5;

            missCount++;

            missText.textContent =
                "ミス : " + missCount + " / 2";

            updateScore();

            if (missCount >= 2) {

                gameOver();

            } else {

                nextQuestion();

            }

        }

    }, 1000);

}

async function gameOver() {

    clearInterval(timer);

    await fetch(
        "https://historical-figure-quiz.onrender.com/save-score",
        {
            method: "POST",

            headers: {
                "Content-Type":
                    "application/json"
            },

            body: JSON.stringify({
                name: playerName,
                score: score
            })

        }
    );

    alert("ゲームオーバー");

    location.reload();

}

async function loadRanking() {

    const response =
        await fetch(
            "https://historical-figure-quiz.onrender.com/"
        );

    const rankings =
        await response.json();

    rankingList.innerHTML = "";

    rankings.forEach((player) => {

        const li =
            document.createElement("li");

        li.textContent =
            player.name +
            " : " +
            player.score;

        rankingList.appendChild(li);

    });

}