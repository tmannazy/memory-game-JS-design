/*
 * Create a list that holds all of your cards
 */

const cardz = document.querySelector('.deck'); // Select the unordered list and put it in a variable
let clickedOver = []; // Create a variable that puts the entire list of unordered list elements in an array
let cardMovesCount = 0; // Keep track of moves
let clockStatus = true; // Boolean that holds the status 
let intervalId; // Delay for the counter
let time = 0; // 
let matchedCards = document.getElementsByClassName('match');
let modal = document.getElementById('modal-background');
cardList = document.getElementsByClassName('card');
cardListing = [...cardList];
let closeIcon = document.querySelector('.close');






/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}



/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */



// Shuffles the card and replaces their position
function shuffleCard() {
    const reshuffle = Array.from(document.querySelectorAll('.deck li'));
    // console.log('Cards to shuffle', reshuffle);
    const reshuffledCards = shuffle(reshuffle);
    // console.log('Cards reshuffled', reshuffledCards);
    for (anyCard of reshuffledCards) {
        cardz.appendChild(anyCard);
    }
}
shuffleCard();


// Add an event listener to the variable created and target it
cardz.addEventListener('click', function(event) {
    const clickOver = event.target;

    // Checks for a card class, length and function that defines what should be done
    if (cardBehavior(clickOver)) {
        cardMoves(clickOver);
        addClickedOver(clickOver);
        if (clockStatus) {
            startClock();
            clockStatus = false;
        }
    }

    function cardBehavior(clickOver) {
        return (
            clickOver.classList.contains('card') &&
            !clickOver.classList.contains('match') &&
            clickedOver.length < 2 &&
            !clickedOver.includes(clickOver)
        );
    }

    if (clickedOver.length === 2) {
        cardMatch(clickOver);
        movesCount();
        scoreCard();
        startClock();
        stopClock();
    }
});

// This function toggles the cards by opening it and displaying the content.
function cardMoves(clickOver) {
    clickOver.classList.toggle('open');
    clickOver.classList.toggle('show');
}


// This function adds a new clicked item to the empty array created above.
function addClickedOver(clickOver) {
    clickedOver.push(clickOver);
}

// This function checks for card match and unmatch
function cardMatch(clickOver) {
    if (clickedOver[0].firstElementChild.className ===
        clickedOver[1].firstElementChild.className) {
        clickedOver[0].classList.toggle('match');
        clickedOver[1].classList.toggle('match')
        console.log('Card Match!');
        clickedOver = [];
    } else {
        setTimeout(function time() { // Timeout for card
            clickedOverSelect(clickedOver[0]);
            clickedOverSelect(clickedOver[1]);
            console.log('Card Unmatch!');
            clickedOver = [];
        }, 1000);

    }
}

// Card Unmatch function
function clickedOverSelect(card) {
    card.classList.toggle('open');
    card.classList.toggle('show');
}

function movesCount() { // Increment the moves after 2 cards are selected
    cardMovesCount++;
    const movesWording = document.querySelector('.moves');
    movesWording.innerHTML = cardMovesCount;
}

function scoreCard() { // 
    if (cardMovesCount === 12 || cardMovesCount === 30) {
        starHide();
    }
}
// removeScoreCard();
function starHide() {
    const stars = document.querySelectorAll('.stars li');
    for (let aStar of stars) {
        if (aStar.style.display !== 'none') {
            aStar.style.display = 'none';
            break;
        }
    }
}

// Span element for clock
const addTime = document.querySelector('.score-panel');
const addSpan = document.createElement('span');
const getStars = document.querySelector('.stars');
addTime.insertBefore(addSpan, getStars);
addSpan.setAttribute('class', 'clock');
addSpan.textContent = '0:00';

function startClock() {
    intervalId = setInterval(function() {
        time++;
        timeDisplay();
    }, 1000)
}

// Game Time display function
function timeDisplay() {
    const clock = document.querySelector('.clock');
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    clock.innerHTML = time;

    if (seconds < 10) {
        clock.innerHTML = `${minutes}:0${seconds}`;
    } else {
        clock.innerHTML = `${minutes}:${seconds}`;
    }
}
// startClock();

// function stopClock() {

// }


function congratulations() {
    if (matchedCards.length === 16) {
        clearInterval(intervalId);
        finalTime = timer.innerHTML;
        modal.classList.add('show');

        var starRating = document.querySelector('.stars').innerHTML;

        document.getElementById('finalMove').innerHTML = cardMovesCount;
        document.getElementById('starRating').innerHTML = starRating;
        document.getElementById('totalTime').innerHTML = finalTime;

        closeModal();
    };
}

function closeModal() {
    closeIcon.addEventListener('click', function(event) {
        modal.classList.remove('show');
        shuffleCard();
    });
}

function newGame() {
    modal.classList.remove('show');
    shuffleCard();
}


for (i = 0; i < cardListing.length; i++) {
    cardList = cardListing[i];
    // cardList.addEventListener('click', cardMoves);
    // cardList.addEventListener('click', clickedOverSelect);
    cardList.addEventListener('click', congratulations);
}


/*
const cardz = document.querySelectorAll('.card');
// console.log(cardz);

for (let cards of cardz) {
    cards.addEventListener('click', function() {
        console.log(' Card List!');

    })
}
*/

/*
function cardFunction() {
    const card = getElementsByClassName('card');
    if (card.classList.contains('card')) {
        card.classList.toggle('open');
        card.classList.toggle('show');
        console.log('A card was clicked!');
    }
}
const cardEvent = document.querySelector('.deck');
// const viewOnly = cardEvent.addEventListener('click', cardFunction(), => );
cardFunction();
 */