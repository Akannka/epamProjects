/* START TASK 1: Your code goes here */

let cells = document.querySelectorAll('.task1__table-cell')

function changeColor() {
    let row = this.closest('tr')
    let rowCells = row.querySelectorAll('.task1__table-cell'), activeIndex
    let isYellow = false

    if(this.classList.contains('task1__table-cell_special')) {
        let allCells = document.querySelectorAll('.task1__table-cell')
        allCells.forEach(cell => {
            if(!cell.classList.contains('task1__table-cell_changed')) {
                cell.style.backgroundColor = 'yellow'
                cell.classList.add('task1__table-cell_yellow', 'task1__table-cell_changed')
            }
        })
        document.querySelector('.task1__table').style.backgroundColor = 'yellow'
        return
    }

    rowCells.forEach((item, index) => {
        if(item === this) {
            activeIndex = index
        }

        if(item.classList.contains('task1__table-cell_yellow')) {
            isYellow = true
        }
    })

    if(activeIndex === 0) {
        if(isYellow) {
            return
        }

        rowCells.forEach(item => {
            item.classList.add('task1__table-cell_blue', 'task1__table-cell_changed')
        })
        return
    }

    this.style.backgroundColor = 'yellow'
    this.classList.add('task1__table-cell_yellow', 'task1__table-cell_changed')
}

cells.forEach(cell => cell.addEventListener('click', changeColor))

/* END TASK 1 */

/* START TASK 2: Your code goes here */

let input = document.querySelector('.task2__form-inp')
let form = document.querySelector('.task2__form')
let btn = document.querySelector('.task2__form-btn')

function showMessage(isValid) {
    if(!isValid) {
        btn.disabled = true
        input.classList.add('task2__form-inp_error')

        if(!form.contains(document.querySelector('.task2__form-info'))) {
            let info = document.createElement('div')
            info.setAttribute('class', 'task2__form-info')
            info.textContent = 'Typed number does not follow format +380*********'

            form.prepend(info)
            return
        }

        let info = document.querySelector('.task2__form-info')
        info.classList.remove('task2__form-info_success')
        info.textContent = 'Typed number does not follow format +380*********'

        return
    }

    document.querySelector('.task2__form-info').remove()
    input.classList.remove('task2__form-inp_error')
    btn.disabled = false
}

function showSuccessMessage(e) {
    e.preventDefault()

    let info = document.createElement('div')
    info.setAttribute('class', 'task2__form-info')
    info.textContent = 'Data was successfully sent'
    info.classList.add('task2__form-info_success')

    form.prepend(info)
}

function validatePhone() {
    showMessage(/\+380\d{9}\b/.test(this.value))
}

input.addEventListener('keydown', validatePhone)
input.addEventListener('keyup', validatePhone)
btn.addEventListener('click', showSuccessMessage)

/* END TASK 2 */

/* START TASK 3: Your code goes here */

let court = document.querySelector('.task3__court')
let ball = document.querySelector('.task3__ball')
let wrapper = document.querySelector('.task3__wrapper')

function moveBall(e) {
    let half = 2, team, goal = false
    let hoopStart = 30, hoopEnd = 45, hoopYStart = 155, hoopYEnd = 170

    if(e.offsetX > court.clientWidth / half) {
        team = 'A'
    } else {
        team = 'B'
    }

    if((e.offsetX > hoopStart && e.offsetX < hoopEnd || 
    e.offsetX > court.clientWidth - hoopEnd && e.offsetX < court.clientWidth - hoopStart) &&
    (e.offsetY > hoopYStart && e.offsetY < hoopYEnd)) {
        goal = true
    }

    const notifEvent = new CustomEvent('throw', { detail: { team, goal } })
    wrapper.addEventListener('throw', showNotification)
    wrapper.dispatchEvent(notifEvent)

    ball.style.left = e.offsetX + 'px'
    ball.style.top = e.offsetY + 'px'
}

function showNotification(customEvent) {
    if(wrapper.contains(document.querySelector('.task3__info'))) {
        document.querySelector('.task3__info').remove()
    }

    let timeoutTime = 4000
    let notif = document.createElement('div')
    notif.classList.add('task3__info', `task3__info_${customEvent.detail.team}`)

    if(!customEvent.detail.goal) {
        notif.textContent = `Team ${customEvent.detail.team} missed`
    } else {
        notif.textContent = `Team ${customEvent.detail.team} score!`

        let scores = document.querySelectorAll('.task3__score-item') 
        scores.forEach(score => {
            if(score.dataset.team === customEvent.detail.team) {
                let count = Number(score.querySelector('span').textContent)
                score.querySelector('span').textContent = ++count
            }
        })
    }

    wrapper.append(notif)

    setTimeout(() => {
        notif.remove()
        ball.style.left = '50%'
        ball.style.top = '50%'
    }, timeoutTime)
}

court.addEventListener('click', moveBall)

/* END TASK 3 */