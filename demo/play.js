const contents = Object.entries(transformCase('example'))
const methods = contents.filter(pair => (typeof pair[1] === 'function'))
const delimiters = ' .:;,-+_/|\\&'.split('')

window.onload = function () {
    const methodSelect = document.getElementById('method')
    methods.forEach(method => {
        methodSelect.innerHTML += `<option>${method[0]}</option>`
    });
    const entryText = document.getElementById('entry')
    const yieldText = document.getElementById('yield')

    const delimit = document.getElementById('delimit')
    const preserve = document.getElementById('preserve')
    const delimitInput = document.getElementById('delimitInput')
    delimiters.forEach(delimit => {
        delimitInput.innerHTML += `<option value="${delimit}"
            ${delimit === ' ' ? ' selected ' : ''}>
            ${delimit === ' ' ? '(space)' : delimit}</option>`
    });
    const delimitLetterNumber = document.getElementById('delimitLetterNumber')
    const delimitLowerUpper = document.getElementById('delimitLowerUpper')
    const delimitNumberLetter = document.getElementById('delimitNumberLetter')
    const delimitUpperLower = document.getElementById('delimitUpperLower')
    const delimitUpperUpperLower = document.getElementById('delimitUpperUpperLower')

    getOptions = function () {
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
        yieldText.innerHTML = transformCase(entryText.value, getOptions())[methodSelect.value]()
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
};
