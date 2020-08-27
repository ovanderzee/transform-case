/*
 * Intake options
 * @member {Array} delimit - units to be kept together - should be like a human word
 *    @member {String || RegExp}
 * @member {Array} preserve - units to be kept together and be protected - should be like a human word
 *    @member {String || RegExp}
 * @member {String} delimitInput - character to delimit input
 * @member {Boolean} delimitLetterNumber - insert delimiter in this transition in pure alphaNumeric patterns
 * @member {Boolean} delimitLowerUpper - insert delimiter in this transition in pure alphaNumeric patterns
 * @member {Boolean} delimitNumberLetter - insert delimiter in this transition in pure alphaNumeric patterns
 * @member {Boolean} delimitUpperLower - insert delimiter in this transition in pure alphaNumeric patterns
 * @member {Boolean} delimitUpperUpperLower - insert delimiter in this transition in pure alphaNumeric patterns
 * @member {String} delimitOutput - character to delimit output
 */
const INTAKE_OPTIONS = {
    delimit: [],
    preserve: [],
    delimitInput: '',
    delimitLetterNumber: true,
    delimitLowerUpper: true,
    delimitNumberLetter: true,
    delimitUpperLower: false,
    delimitUpperUpperLower: true,
    delimitOutput: ' ',
}

/*
 * Render model, with do-nothing-functions, to be exchanged by the pattern fimally
 * @member {Function} preprocess
      do operations in fresh words array, for pure alphaNumeric patterns
 * @member {Function} postProcess
      do operations in string, just before delivery, for pure alphaNumeric patterns
 * @member {Function} firstWordFirstChar - transform word parts
 * @member {Function} firstWordNextChars - transform word parts
 * @member {Function} nextWordsFirstChar - transform word parts
 * @member {Function} nextWordsNextChars - transform word parts
 */
const RENDER_MODEL = {
    preprocess: words => words,
    postProcess: line => line,
    firstWordFirstChar: word => word,
    firstWordNextChars: word => word,
    nextWordsFirstChar: word => word,
    nextWordsNextChars: word => word,
}

const REGEXP_SPECIAL_CHARS = '()*+?[\\'
const NUMERIC_DELIMITERS = '-:,./'
const PUNCTUATION_CHARS = '…,:;[\\](){}\\-‐–—\'".!?'

export {
    INTAKE_OPTIONS,
    RENDER_MODEL,
    REGEXP_SPECIAL_CHARS,
    NUMERIC_DELIMITERS,
    PUNCTUATION_CHARS,
}
