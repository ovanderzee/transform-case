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
        delimit: [word1, word2, ...],
        preserve: [word1, word2, ...],
        replace: {word1: replacement1, word2: replacement2, ...}
    }
    delimit: {Array} - keeps a letter-combination as a word which will be processesed according to the pattern
    preserve: {Array} - keeps a letter-combination as a word and protects the case
    replace: {Object} - replaces a letter-combination as if the original input had been different

## Demo

.../transform-case/demo/demo.html
