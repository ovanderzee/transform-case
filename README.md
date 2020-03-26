# TransformCase

Here is the case and seperation transformer that is of use
when your texts do not confine to english.
TransformCase will work with diacritics as well as curly quotes.

## Install

Install the package as npm package. Provided are
a umd-formatted file (dist folder)
and an es-module (module folder):

    "dist/transformCase.js",
    "module/transformCase.js",

## Usage

Call the module with an output pattern like this:

    transformCase('markMyWords').humanTitle() will render: 'Mark My Words'.

    transformCase('A sentence, text for humans.').camelCase() will render: 'aSentenceTextForHumans'.

With a second argument, an options object can be passed:

    {
        delimit: [word-or-regex1, word-or-regex2, ...],
        preserve: [word-or-regex1, word-or-regex2, ...],
        replace: {word1: replacement1, word2: replacement2, ...}
    }
    delimit: {Array}
        keeps a letter-combination or a regular expression match as a delimited word,
        the word will be processed according to the pattern
    preserve: {Array}
        keeps a letter-combination or a regular expression match as a delimited word and protects the case
    replace: {Object}
        replaces each occurrence of a letter-combination,
        as if the original input had been different

Options for pure alphanumeric input

    delimitLetterNumber: {Boolean}
        delimit when a letter is followed by a number (default: true)
    delimitLowerUpper: {Boolean}
        delimit when a lowercase is followed by a uppercase (default: true)
    delimitNumberLetter: {Boolean}
        delimit when a number is followed by a letter (default: true)
    delimitUpperLower: {Boolean}
        delimit when a uppercase is followed by a lowercase (default: false)
    delimitUpperUpperLower: {Boolean}
        delimit when a uppercase is followed by a uppercase plus lowercase (default: true)

## Demo

.../transform-case/demo/demo.html
