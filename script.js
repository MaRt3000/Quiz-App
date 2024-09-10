let currentQuestionIndex = 0;
let score = 0;
const totalQuestions = 10;



// Timer variables
let timer;
let seconds = 0;

// Leaderboard array to store user info
let leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];

window.onload = () => {

    updateLeaderboard(); // Update leaderboard on page load
}

function startQuiz() {
    currentQuestionIndex = 1;
    score = 0;
    showSection('question-1');
    startTimer();
}

// Function to start the timer
function startTimer() {
    timer = setInterval(function() {
        seconds++;
        document.getElementById('timer').textContent = "Time: " + formatTime(seconds);
    }, 1000);
}

// Function to format the time as MM:SS
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
}



function showSection(sectionClass) {
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });
    document.querySelector('.' + sectionClass).classList.add('active');
}

function checkAnswer(questionClass, isCorrect) {
    if (isCorrect) {
        score++;
    }

    if (currentQuestionIndex < totalQuestions) {
        currentQuestionIndex++;
        showSection('question-' + currentQuestionIndex);
    } else {
        
        showResult();
    }
    
}

function showResult() {
    if (score === totalQuestions) {
        showSection('win-screen');
    } else {
        showSection('lose-screen');
    }
    
}
function showResult() {
    clearInterval(timer);  // Stop the timer
     const userName = prompt("Enter your name:");  // Ask for user name

   // Store the user data in leaderboard
    const user = {
        name: userName,
        time: seconds
    };
    leaderboard.push(user);

    // Update the leaderboard UI
    updateLeaderboard();

    // Optionally reset the quiz and timer
    resetQuiz();
// Function to update the leaderboard display
function updateLeaderboard() {
    const leaderboardList = document.getElementById('leaderboard-list');
    leaderboardList.innerHTML = '';  // Clear current leaderboard

    // Sort leaderboard by time spent (ascending)
    leaderboard.sort((a, b) => a.time - b.time);

    // Display updated leaderboard
    leaderboard.forEach((user, index) => {
        const li = document.createElement('li');
        li.textContent = `${index + 1}. ${user.name} - Time: ${formatTime(user.time)}`;
        leaderboardList.appendChild(li);
    });
}

// Function to reset the quiz and timer
function resetQuiz() {
    seconds = 0;
    document.getElementById('timer').textContent = "Time: 00:00";
    // Reset quiz content if necessary (this can be customized based on your quiz logic)
}

    if (score === totalQuestions) {
        document.getElementById('score-display').textContent = score;
        showSection('win-screen');
    } else {
        document.getElementById('score-display-lose').textContent = score;
        showSection('lose-screen');
    }
}
// Function to clear the leaderboard
const clearLeaderboard = () => {
    leaderboard = []; // Clear the local leaderboard array
    localStorage.removeItem('leaderboard'); // Remove leaderboard from localStorage
    updateLeaderboard(); // Update the leaderboard display
}





/*const finishQuiz = score => {
    clearInterval(timer);
    const name = prompt("Enter your name:");
    leaderboard.push({ name, time: seconds, score });
    saveLeaderboard();
    updateLeaderboard();
}

const saveLeaderboard = () => {
    localStorage.setItem('leaderboard', JSON.stringify(leaderboard));
}

const updateLeaderboard = () => {
    leaderboard.sort((a, b) => b.score - a.score || a.time - b.time); // Sort by score, then by time
    document.getElementById('leaderboard').innerHTML = leaderboard.map((u, i) => 
        `<li>${i + 1}. ${u.name} - Score: ${u.score}, Time: ${formatTime(u.time)}</li>`
    ).join('');
}*/