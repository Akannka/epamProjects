let eventName = prompt('Enter the event name, please :', 'meeting');

function validation() {
    let formName = document.getElementById('name').value;
    let formTime = document.getElementById('time').value;
    let formPlace = document.getElementById('place').value;

    if (isEmpty(formName) || isEmpty(formTime) || isEmpty(formPlace)) {
        alert('Input all data');
    } else if (validateTime(formTime)) {
        alert('Enter time in format hh:mm');
    } else {
        console.log(`${formName} has a ${eventName} today at ${formTime} somewhere in ${formPlace}`);
    }
}
function isEmpty(str) {
    return str === null || str.length === 0;
}

function validateTime(formTime) {
    let checkTime = /^(2[0-3]|[01]?[0-9]):([0-5]?[0-9])$/;
    return !formTime.match(checkTime);
}

function convert() {
    let euroAmount = prompt('Input amount of euro, please: ');
    let dollarAmount = prompt('Input amount of dollar, please: ');
    let uahFromEuro = 33.41;
    let uahFromDollar = 27.43;
    let commaNum = 2;
    if (checkIfPositive(euroAmount, dollarAmount)) {
        let txt = `${euroAmount} euros are equal ${calculateUAH(euroAmount, uahFromEuro).toFixed(commaNum)}hrns, `;
        txt += `${dollarAmount} dollars are equal ${calculateUAH(dollarAmount, uahFromDollar).toFixed(commaNum)}hrns`;
        alert(txt);
    } else {
        alert('Values should be positive numbers');
    }

}
function checkIfPositive(_euroAmount, _dollarAmount) {
    return Math.sign(_euroAmount) === 1 && Math.sign(_dollarAmount) === 1;
}

function calculateUAH(_amountOfMoney, _uah) {
    let convertedMoney = _amountOfMoney * _uah;
    return convertedMoney;
}