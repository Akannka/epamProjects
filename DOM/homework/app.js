const appRoot = document.getElementById('app-root')

const loadForm = app => {
    let header = document.createElement('h1')
    header.setAttribute('class', 'app__header')
    header.textContent = 'Countries Search'

    let form = document.createElement('form')
    form.setAttribute('class', 'app-form app__form')

    let formBox = document.createElement('div')
    formBox.setAttribute('class', 'app-form__box app-form__types')
    let formValuesBox = document.createElement('div')
    formValuesBox.setAttribute('class', 'app-form__box app-form__values')

    let typesDesc = document.createElement('div')
    typesDesc.setAttribute('class', 'app-form__desc')
    typesDesc.textContent = 'Please choose the type of search:'

    let typesButtons = document.createElement('div')
    typesButtons.setAttribute('class', 'app-form__types-btns')

    let firstTypesItem = document.createElement('div')
    firstTypesItem.setAttribute('class', 'app-form__types-item')
    let secondTypesItem = document.createElement('div')
    secondTypesItem.setAttribute('class', 'app-form__types-item')

    let firstRadio = document.createElement('input')
    setAttributes(firstRadio, {
        'class': 'app-form__types-radio',
        'type': 'radio', 'name': 'type', 'id': 'regionType'
    })
    firstRadio.dataset.type = 'regions'

    let secondRadio = document.createElement('input')
    setAttributes(secondRadio, {
        'class': 'app-form__types-radio',
        'type': 'radio', 'name': 'type', 'id': 'languageType'
    })
    secondRadio.dataset.type = 'languages'

    let firstLabel = document.createElement('label')
    setAttributes(firstLabel, { 'class': 'app-form__types-label', 'for': 'regionType' })
    firstLabel.textContent = 'By Region'

    let secondLabel = document.createElement('label')
    setAttributes(secondLabel, { 'class': 'app-form__types-label', 'for': 'languageType' })
    secondLabel.textContent = 'By Language'

    let descText = document.createElement('div')
    descText.setAttribute('class', 'app-form__desc')
    descText.textContent = 'Please choose search query:'

    let selectValues = document.createElement('select')
    setAttributes(selectValues, {
        'class': 'app-form__values-select',
        'name': 'values', 'id': 'tableValues', 'disabled': true
    })

    let selectOption = document.createElement('option')
    selectOption.dataset.value = 'default'
    selectOption.textContent = 'Select value'

    selectValues.append(selectOption)
    formValuesBox.append(descText)
    formValuesBox.append(selectValues)
    firstTypesItem.append(firstRadio)
    firstTypesItem.append(firstLabel)
    secondTypesItem.append(secondRadio)
    secondTypesItem.append(secondLabel)
    typesButtons.append(firstTypesItem)
    typesButtons.append(secondTypesItem)
    formBox.append(typesDesc)
    formBox.append(typesButtons)
    form.append(formBox)
    form.append(formValuesBox)
    app.append(header)
    app.append(form)
}

loadForm(appRoot)

function setAttributes(el, attrs) {
    for (let key in attrs) {
        if (key) {
            el.setAttribute(key, attrs[key])
        }
    }
}

let typeBtns = appRoot.querySelectorAll('.app-form__types-radio')
let selectValues = appRoot.querySelector('.app-form__values-select')
let activeType, sortName, sortArea

function changeTypes() {
    if (selectValues.disabled) {
        selectValues.disabled = false
    }

    activeType = this.dataset.type
    appendValues(activeType)
    loadEmpty(activeType)
}

const appendValues = type => {
    let values = type === 'regions' ? externalService.getRegionsList() : externalService.getLanguagesList()

    selectValues.querySelectorAll('option').forEach(option => {
        if (option.dataset.value === 'default') {
            return
        }

        option.remove()
    })

    values.forEach(value => {
        let option = document.createElement('option')

        option.dataset.value = value
        option.textContent = value

        selectValues.append(option)
    })
}

const loadEmpty = () => {
    let options = selectValues.querySelectorAll('option')

    if (options[selectValues.selectedIndex].dataset.value === 'default' &&
        !appRoot.contains(document.querySelector('.app__empty'))) {
        if (appRoot.contains(document.querySelector('.app__table'))) {
            document.querySelector('.app__table').remove()
        }

        let labelEmpty = document.createElement('div')

        labelEmpty.textContent = 'No items, please choose search query'
        labelEmpty.setAttribute('class', 'app__empty')
        appRoot.append(labelEmpty)

        return
    }
}

const loadTable = type => {
    let options = selectValues.querySelectorAll('option')

    if (appRoot.contains(document.querySelector('.app__table'))) {
        document.querySelector('.app__table').remove()

        if (options[selectValues.selectedIndex].dataset.value === 'default') {
            loadEmpty()
            return
        }
    }

    if (appRoot.contains(document.querySelector('.app__empty'))) {
        document.querySelector('.app__empty').remove()
    }


    let table = document.createElement('table')
    let thead = document.createElement('thead')
    let tbody = document.createElement('tbody')

    let activeValue = options[selectValues.selectedIndex].dataset.value
    let values = type === 'regions' ?
        externalService.getCountryListByRegion(activeValue) :
        externalService.getCountryListByLanguage(activeValue)

    let thName = document.createElement('th')
    let thCapital = document.createElement('th')
    let thRegion = document.createElement('th')
    let thLangs = document.createElement('th')
    let thArea = document.createElement('th')
    let thFlag = document.createElement('th')

    thName.setAttribute('class', 'app__sort app__table-name')
    thArea.setAttribute('class', 'app__sort app__table-area')

    thName.textContent = 'Country name'
    thCapital.textContent = 'Capital'
    thRegion.textContent = 'World Region'
    thLangs.textContent = 'Languages'
    thArea.textContent = 'Area'
    thFlag.textContent = 'Flag'

    let ths = [thName, thCapital, thRegion, thLangs, thArea, thFlag]
    ths.forEach(th => {
        thead.append(th)
    })


    values.forEach(region => {
        let row = document.createElement('tr')
        let tdName = document.createElement('td')
        tdName.setAttribute('class', 'app__item-name')
        let tdCapital = document.createElement('td')
        let tdRegion = document.createElement('td')
        let tdLangs = document.createElement('td')
        let tdArea = document.createElement('td')
        tdArea.setAttribute('class', 'app__item-area')
        let tdFlag = document.createElement('td')

        let img = document.createElement('img')
        img.setAttribute('src', region.flagURL)
        img.setAttribute('alt', 'flag')

        tdName.textContent = region.name
        tdCapital.textContent = region.capital
        tdRegion.textContent = region.region

        let langs = ''
        for (let key in region.languages) {
            if (key) {
                if (langs === '') {
                    langs += region.languages[key]
                    continue
                }

                langs += ', ' + region.languages[key]
            }
        }
        tdLangs.textContent = langs

        tdArea.textContent = region.area
        tdFlag.append(img)

        let tds = [tdName, tdCapital, tdRegion, tdLangs, tdArea, tdFlag]
        tds.forEach(td => {
            row.append(td)
        })

        tbody.append(row)
    })

    table.setAttribute('class', 'app__table')
    table.append(thead)
    table.append(tbody)
    appRoot.append(table)

    sortName = appRoot.querySelector('.app__table-name')
    sortName.addEventListener('click', sortByName)
    sortName.classList.remove('app__table-name_desc')
    sortName.classList.remove('app__table-name_asc')

    sortArea = appRoot.querySelector('.app__table-area')
    sortArea.addEventListener('click', sortByArea)
    sortArea.classList.remove('app__table-area_desc')
    sortArea.classList.remove('app__table-area_asc')

    sortByName()
}

const sortByName = () => {
    sortArea.classList.remove('app__table-area_desc')
    sortArea.classList.remove('app__table-area_asc')

    if (!sortName.classList.contains('app__table-name_asc')) {
        sortName.classList.add('app__table-name_asc')
        sortName.classList.remove('app__table-name_desc')
    } else {
        sortName.classList.add('app__table-name_desc')
        sortName.classList.remove('app__table-name_asc')
    }
    let tbody = document.querySelector('.app__table tbody')
    let rows = tbody.querySelectorAll('tr')
    let names = []

    rows.forEach(row => {
        names.push(row.querySelector('.app__item-name').textContent)
    })

    if (sortName.classList.contains('app__table-name_asc')) {
        names.sort()
    } else {
        names.sort().reverse()
    }

    names.forEach(name => {
        rows.forEach(row => {
            if (row.querySelector('.app__item-name').textContent === name) {
                tbody.append(row)
            }
        })
    })
}

const sortByArea = () => {
    sortName.classList.remove('app__table-name_desc')
    sortName.classList.remove('app__table-name_asc')

    if (!sortArea.classList.contains('app__table-area_asc')) {
        sortArea.classList.add('app__table-area_asc')
        sortArea.classList.remove('app__table-area_desc')
    } else {
        sortArea.classList.add('app__table-area_desc')
        sortArea.classList.remove('app__table-area_asc')
    }

    let tbody = document.querySelector('.app__table tbody')
    let rows = tbody.querySelectorAll('tr')
    let areas = []

    rows.forEach(row => {
        areas.push(Number(row.querySelector('.app__item-area').textContent))
    })

    if (sortArea.classList.contains('app__table-area_asc')) {
        areas.sort((a, b) => a - b)
    } else {
        areas.sort((a, b) => b - a)
    }

    areas.forEach(area => {
        rows.forEach(row => {
            if (Number(row.querySelector('.app__item-area').textContent) === area) {
                tbody.append(row)
            }
        })
    })
}

typeBtns.forEach(btn => btn.addEventListener('change', changeTypes))
selectValues.addEventListener('change', () => {
    loadTable(activeType)
})