function reverseNumber(num) {
    let reversed = 0;
    let ten = 10;
    while (num !== 0) {
        reversed *= ten;
        reversed += num % ten;
        num -= num % ten;
        num /= ten;
    }
    return reversed;
}

function forEach(arr, func) {
    for (let i = 0; i < arr.length; i++) {
        func(arr[i]);
    }
}

function map(arr, func) {
    let mappedArray = [];
    forEach(arr, (el) => mappedArray.push(func(el)))
    return mappedArray;
}

function filter(arr, func) {
    let filteredArray = [];
    forEach(arr, (el) => {
        if (func(el)) {
            filteredArray.push(el);
        }
    })
    return filteredArray;
}


function getAdultAppleLovers(data) {
    let eighteen = 18;
    const filtered = filter(data, people => people.favoriteFruit === 'apple' && people.age >= eighteen);
    return map(filtered, people => people.name);
}

function getKeys(obj) {
    let newArray = [];
    for (const key in obj) {
        if (obj[key]) {
            newArray.push(key);
        }
    }
    return newArray;
}

function getValues(obj) {
    let newArray = [];
    for (let value in obj) {
        if (obj[value]) {
            newArray.push(obj[value]);
        }
    }
    return newArray;
}

function showFormattedDate(dateObj) {
    let eight = 8;
    let nine = 9;
    let four = 4;
    let five = 5;
    let six = 6;
    let eleven = 11;
    let twelve = 12;
    let thirteen = 13;
    let fourteen = 14;
    let date = dateObj.toString();
    let output = `It is ${date[eight]}${date[nine]} of ${date[four]}${date[five]}${date[six]}, `;
    output += `${date[eleven]}${date[twelve]}${date[thirteen]}${date[fourteen]}`;
    return output;
}