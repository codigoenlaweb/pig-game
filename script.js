'use strict';

//  VARIABLES
    //  PLAYER 0
const score0El = document.querySelector('#score--0');
const current0El = document.querySelector('#current--0');
const player0 = document.querySelector('.player--0');

    //  PLAYER 1
const score1El = document.querySelector('#score--1');
const current1El = document.querySelector('#current--1');
const player1 = document.querySelector('.player--1');

    //  COMPONENTES
const diceEl = document.querySelector('.dice');
const newGame = document.querySelector('.btn--new');
const roll = document.querySelector('.btn--roll');
const hold = document.querySelector('.btn--hold');

    //  NUMBER
let currentScore = 0;
let score = [0, 0];
let activePlayer = 0;

    //  booleans
let playing = true;
//  END VARIABLES

//  FUCTION
    //  FUNCTION TEXT CONTENT ACTIVEPLAYER CURRENT SCORE
function textCurrentPlayerActive() {
    document.querySelector(`#current--${activePlayer}`).textContent = currentScore;
}

    //  FUNCTION TEXT CONTENT ACTIVEPLAYER CURRENT SCORE
function backGroundPlayerActive() {
    player0.classList.toggle('player--active')
    player1.classList.toggle('player--active')
}
    //  FUNCTION TEXT CONTENT ACTIVEPLAYER SCORE
function textScorePlayerActive() {
    score[activePlayer] += currentScore;
    document.querySelector(`#score--${activePlayer}`).textContent = score[activePlayer];
}

    //  FUCTION ROLLING DICE
const rolling = () => {
    if (playing) {
            //  1. GENERATING A RANDOM DICE ROLL
        let dice = Math.trunc(Math.random() * 6) + 1;   //  NUMBER RANDON DICE

            //  2.  DISPLAY DICE
        diceEl.src = `dice-${dice}.png`;    //  SRC= 'DICE'
        diceEl.classList.remove('hidden');  //  REMOVE CLASS HIDDEN

            // 3. CHECK FOR ROLLED
        if (dice !== 1) {
            currentScore += dice;
            textCurrentPlayerActive();
        }else{
            //  SWITCH TO NEXT PLAYER
            currentScore = 0;
            textCurrentPlayerActive();
            activePlayer = activePlayer === 0 ? 1 : 0;
            backGroundPlayerActive();
        }
    }

}

//  SAVE
const save = () => {
    //  ADD CURRENT SCORE TO ACTIVE PLAYER SCORE
    textScorePlayerActive();
    // REMOVE CURRENT SCORE TO ACTIVE PLAYER
    currentScore = 0;
    textCurrentPlayerActive();

    // IF THE WINNER
    if (score[activePlayer] >= 50) {
        // FINISH GAME
        playing = false;
        document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
        diceEl.classList.add('hidden');

    }else{
        activePlayer = activePlayer === 0 ? 1 : 0;
        backGroundPlayerActive();
    }
}

//  RESET
const reset = () => {
    // RESETTING TO INITIAL SETTINGS
    playing = true;
    diceEl.classList.add('hidden');
    document.querySelector(`.player--${activePlayer}`).classList.remove('player--winner');
    score[0] = 0;
    score[1] = 0;
    score0El.textContent = score[0];
    score1El.textContent = score[1];
    currentScore = 0;
    current1El.textContent = currentScore;
    current0El.textContent = currentScore;
    player0.classList.add('player--active')
    player1.classList.remove('player--active')
    activePlayer= 0;
}

//  END FUCTION




//  CONDITIONS START
diceEl.classList.add('hidden');

//  END CONDITIONS START


//  ADD EVENT LISTENER
    //  ROLLING DICE FUNCIONALITY
roll.addEventListener('click', rolling);

    //  HOLD SAVE
hold.addEventListener('click', save)

    //  NEW GAME
newGame.addEventListener('click', reset)

