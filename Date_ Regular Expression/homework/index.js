function getAge(birthDate) {
    let ownYears = 2021;
    let ownMonth = 9;
    let ownDay = 22;
    let today = new Date(ownYears, ownMonth, ownDay);
    let age = today.getFullYear() - birthDate.getFullYear();
    let m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || m === 0 && today.getDate() < birthDate.getDate()) {
        age--;
    }
    return age;
}


function getWeekDay(weekDay) {
    const dayWeek = new Date(weekDay).getDay();
    return ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][dayWeek];
}


function getAmountDaysToNewYear() {
    let today = new Date();
    let thousand = 1000;
    let seconds = 60;
    let minute = 60;
    let hours = 24;
    let newYear = new Date(today.getFullYear() + 1, 0, 1);
    let oneDay = thousand * seconds * minute * hours;
    return Math.round((newYear.getTime() - today.getTime()) / oneDay);
}


function getProgrammersDay(year) {
    let progDay;
    let ownMonth = 8;
    let firstDay = 13;
    let secondDay = 12;
    let intercalary = 4;
    if (year % intercalary !== 0) {
        progDay = new Date(year, ownMonth, firstDay);
    } else {
        progDay = new Date(year, ownMonth, secondDay);
    }
    return `${progDay.getDate()} Sep, ${year} (${getWeekDay(progDay)})`
}


function howFarIs(nextDate) {
    nextDate = nextDate.toLowerCase();
    let week = 7;
    let currentDay = new Date().getDay();
    let specifiedWeekday = nextDate.charAt(0).toUpperCase() + nextDate.slice(1);
    let weekdays = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    let numberNextDate = weekdays.indexOf(nextDate);
    let number;
    if (numberNextDate < currentDay) {
        numberNextDate += week;
    }
    number = numberNextDate - currentDay;
    if (number === 0) {
        return `Hey, today is ${specifiedWeekday} =)`
    } else {
        return ` It's ${number} day(s) left till ${specifiedWeekday}`;
    }
}


function isValidIdentifier(str) {
    let pattern = /^[^0-9][a-zA-Z0-9_$]+$/g;
    return pattern.test(str);
}


function capitalize(str) {
    let re = /(\b[a-z](?!\s))/g;
    str = str.replace(re, function (x) {
        return x.toUpperCase();
    });
    return str;
}


function isValidAudioFile(str) {
    const file = /^[A-Za-z]+\.(aac|mp3|flac|alac){1}/g;
    return file.test(str);
}


function getHexadecimalColors(str) {
    let arr = [];
    let regexp = /#(?:[0-9a-f]{3}){1,2}\b/gi;
    let matchAll = str.match(regexp);
    if (matchAll !== null) {
        arr = Array.from(matchAll);
    }
    return arr;
}


function isValidPassword(str) {
    const password = /^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z]).{8,}$/g;
    return password.test(str);
}

function addThousandsSeparators(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');


}


function getAllUrlsFromText(text) {
    let arr = [];
    const url = /https:[/][/][a-zA-Z0-9\-\.]+\.[a-zA-Z]*/g;
    if (text === undefined) {
        arr = 'error';
    } else {
        let matchAll = text.match(url);
        if (matchAll !== null) {
            arr = Array.from(matchAll);
        }
    }
    return arr;
}

