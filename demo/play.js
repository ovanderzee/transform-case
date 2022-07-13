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
            entryText.dispatchEvent(new Event('input'));
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

    const localStore = document.getElementById('local-store')
    localStore.addEventListener('click', retrieveEntry)
    const clearButton = document.getElementById('clear-button')
    clearButton.addEventListener('click', resetStorage)
    const storeButton = document.getElementById('store-button')
    storeButton.addEventListener('click', updateStorage)
    const wordList = document.getElementById('words')
    const callClause = document.getElementById('call')

    const getOptions = function () {
        const options = {}
        // differing from defaults
        if (delimit.value) options.delimit = [delimit.value]
        if (preserve.value) options.preserve = [preserve.value]
        if (delimitInput.value) options.delimitInput = delimitInput.value
        if (!delimitLetterNumber.checked) options.delimitLetterNumber = delimitLetterNumber.checked
        if (!delimitLowerUpper.checked) options.delimitLowerUpper = delimitLowerUpper.checked
        if (!delimitNumberLetter.checked) options.delimitNumberLetter = delimitNumberLetter.checked
        if (delimitUpperLower.checked) options.delimitUpperLower = delimitUpperLower.checked
        if (!delimitUpperUpperLower.checked) options.delimitUpperUpperLower = delimitUpperUpperLower.checked
        return options
    }

    const showTime = function () {
        console.log('normalisation')
        const dataCollection = transformCase(entryText.value, getOptions())
        const optionsText = JSON.stringify(getOptions())
            .replace(/^{"/, `{\n\t\t"`)
            .replace(/":(".+?"|\w+?),"/g, `":$1,\n\t\t"`)
            .replace(/}$/, `\n\t}`)
        callClause.innerHTML = `transformCase(\n\t'${entryText.value}', \n\t${optionsText}\n).${methodSelect.value}()`
        console.log('origin', dataCollection._origin)
        console.log('options', dataCollection.options)
        console.log('phrase', dataCollection._phrase)
        console.log('words', dataCollection.words)
        console.log('method', methodSelect.value)
        yieldText.innerHTML = dataCollection[methodSelect.value]()

        wordList.innerHTML = dataCollection
            .words
            .map(word => `<li>${word}</li>`)
            .join('')
    }

    const entryTextChange = function () {
        this.style.height = ''
        this.style.height = this.scrollHeight + 4 + 'px'
        showTime()
    }

    entryText.oninput = entryTextChange
    entryText.onpaste = entryTextChange
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
