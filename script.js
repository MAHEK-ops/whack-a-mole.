const gameContainer = document.getElementById("game-container");
const scoreDisplay = document.getElementById("score");
const timerDisplay = document.getElementById("timer");
const popSound = document.getElementById("popSound");
const startButton = document.getElementById("startButton");
const gameOverPopup = document.getElementById("game-over-popup");
const finalScore = document.getElementById("final-score");
const playAgainButton = document.getElementById("play-again");

let score = 0;
let timeLeft = 20;
let gameInterval;
let timerInterval;
let gameStarted = false;

function createHoles() {
    for (let i = 0; i < 6; i++) {
        const hole = document.createElement("div");
        hole.classList.add("hole");

        const doghouse = document.createElement("div");
        doghouse.classList.add("doghouse");

        const dog = document.createElement("img");
        dog.src = "dog.png";
        dog.classList.add("dog");

        hole.appendChild(doghouse);
        hole.appendChild(dog);
        gameContainer.appendChild(hole);
    }
}

function popDog() {
    const holes = document.querySelectorAll(".hole");
    const randomIndex = Math.floor(Math.random() * holes.length);
    const randomHole = holes[randomIndex];
    const dog = randomHole.querySelector(".dog");

    dog.classList.add("show");
    setTimeout(() => {
        dog.classList.remove("show");
    }, 1000);
}

function whackDog(event) {
    if (event.target.classList.contains("dog")) {
        event.target.classList.remove("show");
        score++;
        scoreDisplay.textContent = "Score: " + score;
        showPaw(event.clientX, event.clientY);

      
        popSound.currentTime = 0;
        popSound.volume = 1.0;
        popSound.play();
    }
}

function showPaw(x, y) {
    const paw = document.createElement("img");
    paw.src = "paw.png";  
    paw.classList.add("paw");
    paw.style.left = `${x - 25}px`;
    paw.style.top = `${y - 25}px`;
    document.body.appendChild(paw);

    setTimeout(() => {
        paw.remove();
    }, 300);
}

function startTimer() {
    timerInterval = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = "Time Left: " + timeLeft + "s";
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            clearInterval(gameInterval);
            gameOver();
        }
    }, 1000);
}

function gameOver() {
    finalScore.textContent = "Final Score: " + score;
    gameOverPopup.classList.add("show");
}

function startGame() {
    if (!gameStarted) {
        score = 0;
        timeLeft = 20;
        scoreDisplay.textContent = "Score: " + score;
        timerDisplay.textContent = "Time Left: " + timeLeft + "s";
        gameStarted = true;
        createHoles();
        gameInterval = setInterval(popDog, 1000);
        startTimer();
        startButton.style.display = "none";
    }
}

function playAgain() {
    gameOverPopup.classList.remove("show");
    score = 0;
    timeLeft = 20;
    scoreDisplay.textContent = "Score: " + score;
    timerDisplay.textContent = "Time Left: " + timeLeft + "s";
    gameStarted = false;
    startButton.style.display = "block"; 
}

startButton.addEventListener("click", startGame);
gameContainer.addEventListener("click", whackDog);
playAgainButton.addEventListener("click", playAgain);


