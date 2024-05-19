const startButton = document.getElementById('startButton');
const scoreDisplay = document.getElementById('score');
const timerDisplay = document.getElementById('timer');
const duck = document.getElementById('duck');
const leaderboard = document.getElementById('leaderboard');
let score = 0;
let timer;
let timeLeft = 60;
let difficulty = 'easy';

function startGame() {
    score = 0;
    scoreDisplay.textContent = score;
    if (difficulty === 'easy') {
        duck.style.top = `${Math.random() * 350}px`;
        duck.style.left = `${Math.random() * 350}px`;
    } else {
        duck.style.top = `${Math.random() * 300}px`;
        duck.style.left = `${Math.random() * 300}px`;
    }
    duck.addEventListener('click', catchDuck);
    timer = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = timeLeft;
        if (timeLeft === 0) {
            clearInterval(timer);
            duck.removeEventListener('click', catchDuck);
            saveScore();
            showLeaderboard();
        }
    }, 1000);
}

function catchDuck() {
    score++;
    scoreDisplay.textContent = score;
    if (difficulty === 'easy') {
        duck.style.top = `${Math.random() * 350}px`;
        duck.style.left = `${Math.random() * 350}px`;
    } else {
        duck.style.top = `${Math.random() * 300}px`;
        duck.style.left = `${Math.random() * 300}px`;
    }
}

function saveScore() {
    const playerName = prompt('Введите ваше имя');
    const leaderboardData = JSON.parse(localStorage.getItem('leaderboard')) || [];
    leaderboardData.push({
        name: playerName,
        score: score
    });
    localStorage.setItem('leaderboard', JSON.stringify(leaderboardData));
}

function showLeaderboard() {
    leaderboard.innerHTML = '';
    const leaderboardData = JSON.parse(localStorage.getItem('leaderboard')) || [];
    leaderboardData.sort((a, b) => b.score - a.score);
    leaderboardData.forEach((player, index) => {
        if (index != 10) {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${index + 1}. ${player.name}</td>
                <td>${player.score}</td>
            `;
            leaderboard.appendChild(row);
        }
    });
}

startButton.addEventListener('click', () => {
    timeLeft = 60;
    timerDisplay.textContent = timeLeft;
    difficulty = document.getElementById('difficulty').value;
    startGame();
});
