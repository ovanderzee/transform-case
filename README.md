# TransformCase

Here is the case and seperation transformer that
transliterates diacriticals and ligatures
when your texts originate from other languages than english.

## Install

Install the package as npm package. Provided are
a umd-formatted file (dist folder) to require or just read
and an es-module (module folder) to import:

    "dist/transformCase.js",
    "module/transformCase.js",

## Usage

Call the module with an output pattern like this:

    transformCase('A sentence, text for humans.').camelCase() will render: 'aSentenceTextForHumans'.

    transformCase('A sentence, text for humans.').pascalCase() will render: 'ASentenceTextForHumans'.

    transformCase('markMyWords').humanTitle() will render: 'Mark My Words'.

    transformCase('A sentence, text for humans.').dotCase() will render: 'a.sentence.text.for.humans'.

    transformCase('A sentence, text for humans.').paramCase() will render: 'a-sentence-text-for-humans'.

    transformCase('A sentence, text for humans.').pathCase() will render: 'a/sentence/text/for/humans'.

    transformCase('A sentence, text for humans.').snakeCase() will render: 'a_sentence_text_for_humans'.

    transformCase('A sentence, text for humans.').spaceCase() will render: 'a sentence text for humans'.


With a second argument, an options object can be passed:

    {
        delimit: [word-or-regex1, word-or-regex2, ...],
        preserve: [word-or-regex1, word-or-regex2, ...],
    }
    delimit: {Array}
        keeps a letter-combination or a regular expression match as a delimited word,
        the word will be processed according to the pattern
    preserve: {Array}
        keeps a letter-combination or a regular expression match as a delimited word and protects the case

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
