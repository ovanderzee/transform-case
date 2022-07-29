const METHODS = Object.values(transformCase('example'))
    .filter(value => typeof value === 'function')
const DELIMITERS = ' .:;,-+_/|\\&'.split('')

const storageFn = function (form, entryText, localStore) {

    const update = function () {
        const options = Array.from(form.elements)
            .map(ctrl => {
                const banned = ctrl instanceof HTMLButtonElement ||
                    // ctrl instanceof HTMLOutputElement ||
                    ctrl instanceof HTMLFieldSetElement
                return banned ? '' : `${ctrl.id}=${encodeURIComponent(ctrl.value)}`
            })
            .filter(pair => pair.length)

        const stored = localStorage.getItem('transform-case-entries') || '[]'
        const storedSet = new Set(JSON.parse(stored))
        storedSet.add(options.join('&'))
        const currentPhrases = JSON.stringify(Array.from(storedSet))
        localStorage.setItem('transform-case-entries', currentPhrases)
        location.href.search = '?' + options.join('&')
        display()
    }

    const retrieve = function (event) {
        if (event.target.parentNode === this) {
            const pairs = event.target.dataset.search.split('&')
            pairs.forEach(pair => {
                const data = pair.split('=')
                document.getElementById(data[0]).value = decodeURIComponent(data[1])
            })
            entryText.dispatchEvent(new Event('input'));
        }
    }

    const display = function () {
        const stored = localStorage.getItem('transform-case-entries') || '[]'
        const storedSearches = JSON.parse(stored)
        localStore.innerHTML = storedSearches.map(search => {
            //  const content = decodeURIComponent(search)
            //     .replace(/=(.*?)(&|$)/g, ': "$1", ')
            const srcEntries = search.split('&').map(src => src.split('='))
            const cntObject = Object.fromEntries(srcEntries)
            const entry = decodeURIComponent(cntObject.entry)
            const yield = decodeURIComponent(cntObject.yield)
            const content = `${entry} → ${yield}`
            const title = search.replace(/&/g, '&\n')
            return `<ins data-search="${search}" title="${title}">${content}</ins>`
        }).join('')
    }

    const reset = function () {
        localStorage.removeItem('transform-case-entries')
        localStore.innerHTML = ''
    }

    return {
        update: update,
        retrieve: retrieve,
        display: display,
        reset: reset,
    }
}


window.onload = function () {
    const form = document.getElementsByTagName('FORM')[0]

    const methodSelect = document.getElementById('method')
    methodSelect.innerHTML = METHODS
        .map(method => `<option>${method.name}</option>`)
        .join('')
    const entryText = document.getElementById('entry')
    const yieldText = document.getElementById('yield')

    const delimit = document.getElementById('delimit')
    const preserve = document.getElementById('preserve')
    const delimitInput = document.getElementById('delimitInput')
    delimitInput.innerHTML += DELIMITERS
        .map(delimiter => `<option value="${delimiter}"
            ${delimiter === ' ' ? ' selected ' : ''}>
            ${delimiter === ' ' ? '(space)' : delimiter}</option>`)
        .join('')
    const delimitLetterNumber = document.getElementById('delimitLetterNumber')
    const delimitLowerUpper = document.getElementById('delimitLowerUpper')
    const delimitNumberLetter = document.getElementById('delimitNumberLetter')
    const delimitUpperLower = document.getElementById('delimitUpperLower')
    const delimitUpperUpperLower = document.getElementById('delimitUpperUpperLower')

    const localStore = document.getElementById('local-store')
    const clearButton = document.getElementById('clear-button')
    const storeButton = document.getElementById('store-button')
    const wordList = document.getElementById('words')
    const callClause = document.getElementById('call')

    const storage = storageFn(form, entryText, localStore)
    localStore.addEventListener('click', storage.retrieve)
    clearButton.addEventListener('click', storage.reset)
    storeButton.addEventListener('click', storage.update)

    const stringOrRegexp = function (str) {
        const strSplit = str.split('/')
        let rv
        try {
            if (strSplit.length < 3) {
                throw('not enough members')
            }
            rv = new RegExp(strSplit[1], strSplit[2])
            console.log('regexp', strSplit, rv)
        } catch(e) {
            rv = str
            console.log('string', strSplit, rv)
        }
        console.log(rv)
        return rv
    }

    const getOptions = function () {
        const options = {}
        // differing from defaults
        if (delimit.value) options.delimit = [stringOrRegexp(delimit.value)]
        if (preserve.value) options.preserve = [stringOrRegexp(preserve.value)]
        if (delimitInput.value) options.delimitInput = delimitInput.value
        if (!delimitLetterNumber.checked) options.delimitLetterNumber = delimitLetterNumber.checked
        if (!delimitLowerUpper.checked) options.delimitLowerUpper = delimitLowerUpper.checked
        if (!delimitNumberLetter.checked) options.delimitNumberLetter = delimitNumberLetter.checked
        if (delimitUpperLower.checked) options.delimitUpperLower = delimitUpperLower.checked
        if (!delimitUpperUpperLower.checked) options.delimitUpperUpperLower = delimitUpperUpperLower.checked
        return options
    }

    const showTime = function () {
        console.log('==============')
        const dataCollection = transformCase(entryText.value, getOptions())
        const options = getOptions()
        const delimit0 = options.delimit ? options.delimit[0].toString() : ''
        const preserve0 = options.preserve ? options.preserve[0].toString() : ''
        const optionsText = JSON.stringify(options)
            .replace(/^{"/, `{\n\t\t"`)
            .replace('"\\\\"', '"\\"') // special delimitInput case
            .replace(/"delimit":\[{}\],"/, `"delimit":[${delimit0}],\n\t\t"`) // RegExp in array
            .replace(/"preserve":\[{}\],"/, `"preserve":[${preserve0}],\n\t\t"`) // RegExp in array
            .replace(/":(\[.+?\]),"/g, `":$1,\n\t\t"`) // string in array
            .replace(/":(".+?"),"/g, `":$1,\n\t\t"`) // string
            .replace(/":(\w+),"/g, `":$1,\n\t\t"`) // false, true
            .replace(/}$/, `\n\t}`)
        callClause.innerHTML = `transformCase(\n\t"${entryText.value}", \n\t${optionsText}\n).${methodSelect.value}()`
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
    storage.display()
};
