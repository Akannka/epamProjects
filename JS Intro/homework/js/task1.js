function validate(_money, _years, _percantageOfYear) {
    if (isNaN(_money) || isNaN(_years) || isNaN(_percantageOfYear) ||
        _money < 1000 || _years < 1 || _percantageOfYear > 100) {
        alert("Invalid input data");
        return false;
    }
    else {
        calculate(_money, _years, _percantageOfYear);
    }
}

function calculate(_money, _years, _percantageOfYear) {
    let totalAmount = _money * (1 + (_percantageOfYear / 100)) ** _years;
    let totalProfit = totalAmount - _money;
    output(i, totalProfit.toFixed(2), totalAmount.toFixed(2));
}

function output(_i, _totalProfit, _totalAmount) {
    alert(`Initial amount: ${money} \nNumber of years: ${years} \nPercantage of year:${percantageOfYear} \n\nTotal profit: ${_totalProfit} \nTotal amount: ${_totalAmount}`);
}

let money = prompt("Please enter your initial amount of money: ");
let years = prompt("Please enter the number of years");
let percantageOfYear = prompt("Please enter percentage of a year");
validate(money, years, percantageOfYear);