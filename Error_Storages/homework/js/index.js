function visitLink(path) {
    if (!localStorage.getItem('Page1')) {
        localStorage.setItem('Page1', '0');
    }
    if (!localStorage.getItem('Page2')) {
        localStorage.setItem('Page2', '0');
    }
    if (!localStorage.getItem('Page3')) {
        localStorage.setItem('Page3', '0');
    }

    if (path === 'Page1') {
        localStorage[path]++;
    } else if (path === 'Page2') {
        localStorage[path]++;
    } else {
        localStorage[path]++;
    }
}

function viewResults() {
    let ul = document.createElement('ul')
    for (let key in localStorage) {
        if (localStorage.hasOwnProperty(key)) {
            let list = document.createElement('li')
            list.appendChild(document.createTextNode(
                `You visited ${key} ${localStorage.getItem(key)} time(s)`
            ))
            ul.appendChild(list);
        }
    }
    document.getElementById('content').appendChild(ul);

    localStorage.clear();
}
