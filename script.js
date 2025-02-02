// window.addEventListener('load', () => {
//     // Wait for the page to load and then fade out the loading screen
//     setTimeout(() => {
//         const loadingScreen = document.querySelector('.loading');
//         loadingScreen.classList.add('fade-out');
        
//         // After the fade-out effect completes, navigate to the second page
//         setTimeout(() => {
//             window.location.href = "game-.html"; // Replace with your second page URL
//         }, 1000); // Delay navigation until after the fade-out
//     }, 2000); // Show the loading screen for 2 seconds before fading out
// });

window.addEventListener('load', function() {
    const spinner = document.getElementById('spinner');
    
    // Show the spinner immediately after the page loads
    spinner.style.display = 'block';

    // Set a timeout to simulate a loading period and navigate after 5 seconds
    setTimeout(function() {
        // Hide the spinner after 5 seconds
        spinner.style.display = 'none';

        // Navigate to the game page
        window.location.href = 'category.html'; // Replace with your actual game page URL
    }, 3000); // Delay of 5 seconds before navigation
});



const cardsArray = [
    '🍎', '🍎', '🍋‍🟩','🍋‍🟩', '🍒', '🍒', '🍓', '🍓','🥝','🥝',
    '🍊', '🍊', '🍍', '🍍', '🍉', '🍉', '🍇', '🍇','🥑','🥑',
];

let shuffledCards = [];
let flippedCards = [];
let matchedCards = [];
let timerInterval;
let seconds = 0;

// Elements
const gameBoard = document.getElementById('game-board');
const timerDisplay = document.getElementById('timer');
const resetButton = document.getElementById('reset-btn');
const difficultySelect = document.getElementById('difficulty');

// Reset the game
resetButton.addEventListener('click', resetGame);

// Shuffle the cards
function shuffleCards() {
    shuffledCards = [...cardsArray];
    shuffledCards.sort(() => Math.random() - 0.5);
    displayCards();
}

// Display the cards on the board
function displayCards() {
    gameBoard.innerHTML = ''; // Clear the board
    shuffledCards.forEach((card, index) => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.setAttribute('data-id', index);
        cardElement.innerHTML = '';
        cardElement.addEventListener('click', () => flipCard(cardElement));
        gameBoard.appendChild(cardElement);
    });
}

// Flip a card
function flipCard(card) {
    if (card.classList.contains('flipped') || flippedCards.length === 2) return;

    const cardId = card.getAttribute('data-id');
    card.innerHTML = shuffledCards[cardId];
    card.classList.add('flipped');
    flippedCards.push(card);

    // Check if two cards are flipped
    if (flippedCards.length === 2) {
        checkForMatch();
    }
}

// Check if the two flipped cards match
function checkForMatch() {
    const [firstCard, secondCard] = flippedCards;

    if (firstCard.innerHTML === secondCard.innerHTML) {
        firstCard.classList.add('matched');
        secondCard.classList.add('matched');
        matchedCards.push(firstCard, secondCard);
        flippedCards = [];
    } else {
        setTimeout(() => {
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');
            firstCard.innerHTML = '';
            secondCard.innerHTML = '';
            flippedCards = [];
        }, 1000);
    }

    // Check if all cards are matched
    if (matchedCards.length === shuffledCards.length) {
        clearInterval(timerInterval);
        alert(`You won! Time: ${seconds} seconds`);
    }
    if (matchedCards.length === shuffledCards.length) {
        clearInterval(timerInterval);
        localStorage.setItem('finalTime', seconds);
        location.href = 'result.html';
    }
}



// Start the timer
function startTimer() {
    timerInterval = setInterval(() => {
        seconds++;
        timerDisplay.textContent = seconds;
    }, 1000);
}

// Reset the game
function resetGame() {
    clearInterval(timerInterval);
    seconds = 0;
    timerDisplay.textContent = seconds;
    matchedCards = [];
    flippedCards = [];
    shuffleCards();
    startTimer();
}

// Update the grid based on difficulty
difficultySelect.addEventListener('change', () => {
    const difficulty = difficultySelect.value;
    switch (difficulty) {
        case 'easy':
            shuffledCards.length = 16; // 4x4 grid
            break;
        case 'medium':
            shuffledCards.length = 24; // 6x4 grid
            break;
        case 'hard':
            shuffledCards.length = 36; // 6x6 grid
            break;
    }
    shuffleCards();
});

// Initialize the game
shuffleCards();
startTimer();


// var body = document.getElementsByTagName('body')[0];
// var removeLoading = function() {
//     // In a production application you would remove the loading class when your
//     // application is initialized and ready to go.  Here we just artificially wait
//     // 3 seconds before removing the class.
//     setTimeout(function() {
//         body.className = body.className.replace(/loading/, '');
//     }, 3000);
// };
// removeLoading();
