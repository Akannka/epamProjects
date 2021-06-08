let minRange = 0;
let maxRange = 8;
let prize = 100;
let totalPrize = 0;
let oneHundread = 100;
let two = 2;
let four = 4;
let answer = confirm('Do you want to play a game?');

if (!answer) {
    alert('You did not become a billionaire, but can.');
} else {
    game(totalPrize);
}

function game(_totalPrize) {
    alert(`Choose a roulette pocket number from ${minRange} to ${maxRange}`);
    let number = randomNumber(minRange, maxRange);
    let userNumber;
    let attempts = 3;
    let continueAnswer = true;
    let i = 0;
    let winner = false;
    totalPrize += _totalPrize;
    while (winner || i < attempts) {
        userNumber = +prompt(`Attempts left: ${attempts - i} \nTotal prize: ${totalPrize}$ 
Possible prize on current attempt: ${prize}$ 
Enter the number, please: `);
        if (number === userNumber) {
            winner = true;
            continueAnswer = confirm(`Congratulation, you won! Your prize is: ${prize}$. Do you want to continue?`);
            _totalPrize += prize;
            newBetterGame(continueAnswer, _totalPrize);
        } else {
            prize = prize / two;
        }
        i++;
    }
    if (!winner) {
        answer = confirm('Do you want to play a game?');
        if (!answer) {
            alert('You did not become a billionaire, but can.');
        } else {
            prize = oneHundread;
            game(totalPrize);
        }
    }

}
function newBetterGame(continueAnswer, _totalPrize) {
    if (!continueAnswer) {
        alert(`Thank you for your participation. Your prize is: ${prize} $`);
    } else {
        maxRange += four;
        prize *= two;
        game(_totalPrize);
    }
}

function randomNumber(min, max) {
    return parseInt(Math.random() * (max - min) + min);
}




