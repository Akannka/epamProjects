function isEquals(a, b) {
    return a === b;
}

function isBigger(a, b) {
    return a > b;
}

function storeNames(...args) {
    let newArray = [];
    newArray.push(...args);
    return newArray;

}

function getDifference(a, b) {
    if (a < b) {
        let c = a;
        a = b;
        b = c;
    }
    return a - b;
}

function negativeCount(arr) {
    let neg = 0;
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] < 0) {
            neg += 1;
        }
    }
    return neg;
}

function letterCount(str, letter) {
    let count = 0;
    for (let i = 0; i < str.length; i++) {
        if (str[i] === letter) {
            count += 1;
        }
    }
    return count;
}

function countPoints(arr) {
    let counter = 0;
    let threePoints = 3;
    for (let i = 0; i < arr.length; i++) {
        let points = arr[i].split(':');
        if (+points[0] > +points[1]) {
            counter += threePoints;
        } else if (+points[0] < +points[1]) {
            counter += 0;
        } else if (+points[0] === +points[1]) {
            counter += 1;
        }
    }
    return counter;
}