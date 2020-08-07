# TransformCase

Here is the case and seperation transformer that
transliterates diacriticals and ligatures
when your texts are in any Latin script.

## Install

Install the package as npm package. Provided are
a umd-formatted file in the dist folder to require or just read
and an es-module in the module folder to import.

## Usage

A human text can be transformed to a systematic phrase like this:

```js
transformCase('A sentence, text for humans.').camelCase()
```

These will render:

```js
const textIntake = transformCase('A sentence, text for humans.')

textIntake.camelCase()   // ==> 'aSentenceTextForHumans'
textIntake.pascalCase()  // ==> 'ASentenceTextForHumans'
textIntake.dotCase()     // ==> 'a.sentence.text.for.humans'
textIntake.paramCase()   // ==> 'a-sentence-text-for-humans'
textIntake.pathCase()    // ==> 'a/sentence/text/for/humans'
textIntake.searchCase()   // ==> 'a+sentence+text+for+humans'
textIntake.snakeCase()   // ==> 'a_sentence_text_for_humans'
textIntake.spaceCase()   // ==> 'a sentence text for humans'
textIntake.constantCase()// ==> 'THIS_SENTENCE_TEXT_FOR_HUMANS'
textIntake.headerCase()  // ==> 'This-Sentence-Text-For-Humans'
```

A systematic text can be transformed to a human phrase like this:

```js
const textIntake = transformCase('camelCasedInput')
textIntake.humanSentence()  // ==> 'Camel cased input'

const textIntake2 = transformCase('snake_cased_input', {delimitInput: '_'})
textIntake2.humanTitle()     // ==> 'Snake Cased Input'
```

With a second argument, an options object can be passed:

    {
        delimit: [word-or-regex1, word-or-regex2, ...],
        preserve: [word-or-regex1, word-or-regex2, ...],
    }
    delimit: {Array}
        keeps a letter-combination or a regular expression match
        as a delimited word,
        the word will be processed according to the pattern
    preserve: {Array}
        keeps a letter-combination or a regular expression match
        as a delimited word and protects the case

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

## Transformation process

This module has two steps, an intake and a render step.

The intake step
deduplicates whitespace in a space character,
removes control characters,
finds a delimiter,
isolates delimit and preserve options
and ends with an array of words.

The render step is merely choosing a pattern to treat the array of words.
There are three groups of similar patterns:

* Cap-marked words (camelCase, pascalCase)
* Human, linguistic (humanSentence, humanTitle)
* Delimited lowercase (dotCase, paramCase, etcetera)

Apart from the human group, in all patterns
punctuation is stripped,
diacritics are stripped,
ligatures are decomposed
