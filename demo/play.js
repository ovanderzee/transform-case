const methods = Object.values(transformCase('example'))
    .filter(value => typeof value === 'function')
const delimiters = ' .:;,-+_/|\\&'.split('')

window.onload = function () {
    const methodSelect = document.getElementById('method')
    methodSelect.innerHTML = methods
        .map(method => `<option>${method.name}</option>`)
        .join('')
    const entryText = document.getElementById('entry')
    const yieldText = document.getElementById('yield')

    const delimit = document.getElementById('delimit')
    const preserve = document.getElementById('preserve')
    const delimitInput = document.getElementById('delimitInput')
    delimitInput.innerHTML += delimiters
        .map(delimiter => `<option value="${delimiter}"
            ${delimiter === ' ' ? ' selected ' : ''}>
            ${delimiter === ' ' ? '(space)' : delimiter}</option>`)
        .join('')
    const delimitLetterNumber = document.getElementById('delimitLetterNumber')
    const delimitLowerUpper = document.getElementById('delimitLowerUpper')
    const delimitNumberLetter = document.getElementById('delimitNumberLetter')
    const delimitUpperLower = document.getElementById('delimitUpperLower')
    const delimitUpperUpperLower = document.getElementById('delimitUpperUpperLower')

    const displayStorage = function () {
        const localStored = localStorage.getItem('transform-case-entries') || '[]'
        const localStoredPhrases = JSON.parse(localStored)
        localStore.innerHTML = localStoredPhrases.map(phrase => {
            return `<label>${phrase}</label>`
        }).join('')
    }
    const retrieveEntry = function (event) {
        if (event.target.parentNode === this) {
            entryText.value = event.target.innerText
        }
    }
    const updateStorage = function () {
        const localStored = localStorage.getItem('transform-case-entries') || '[]'
        const localStoredSet = new Set(JSON.parse(localStored))
        localStoredSet.add(entryText.value.trim())
        const currentPhrases = JSON.stringify(Array.from(localStoredSet))
        localStorage.setItem('transform-case-entries', currentPhrases)
        displayStorage()
    }
    const resetStorage = function () {
        localStorage.removeItem('transform-case-entries')
        localStore.innerHTML = ''
    }

    const wordList = document.getElementById('words')
    const localStore = document.getElementById('local-store')
    localStore.addEventListener('click', retrieveEntry)
    const clearButton = document.getElementById('clear-button')
    clearButton.addEventListener('click', resetStorage)
    const storeButton = document.getElementById('store-button')
    storeButton.addEventListener('click', updateStorage)

    const getOptions = function () {
        const options = {}
        options.delimit = delimit.value ? [delimit.value] : []
        options.preserve = preserve.value ? [preserve.value] : []
        options.delimitInput = delimitInput.value
        options.delimitLetterNumber = delimitLetterNumber.checked
        options.delimitLowerUpper = delimitLowerUpper.checked
        options.delimitNumberLetter = delimitNumberLetter.checked
        options.delimitUpperLower = delimitUpperLower.checked
        options.delimitUpperUpperLower = delimitUpperUpperLower.checked
        return options
    }

    const showTime = function () {
        console.log('normalisation')
        console.log('origin', transformCase(entryText.value)._origin)
        console.log('options', transformCase(entryText.value).options)
        console.log('phrase', transformCase(entryText.value)._phrase)
        console.log('words', transformCase(entryText.value).words)
        console.log('method', methodSelect.value)
        yieldText.innerHTML = transformCase(entryText.value, getOptions())[methodSelect.value]()

        wordList.innerHTML = transformCase(entryText.value)
            .words
            .map(word => `<li>${word}</li>`)
            .join('')
    }
    entryText.oninput = function () {
        this.style.height = ''
        this.style.height = this.scrollHeight + 4 + 'px'
        showTime()
    }
    delimit.oninput = showTime
    preserve.oninput = showTime
    delimitInput.oninput = showTime
    delimitLetterNumber.onchange = showTime
    delimitLowerUpper.onchange = showTime
    delimitNumberLetter.onchange = showTime
    delimitUpperLower.onchange = showTime
    delimitUpperUpperLower.onchange = showTime
    methodSelect.onchange = showTime

    showTime()
    displayStorage()
};
