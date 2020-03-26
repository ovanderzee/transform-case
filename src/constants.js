/*
 * Intake options
 * @member {Array} delimit - units to be kept together - should be like a human word
 *    @member {String || RegExp}
 * @member {Array} preserve - units to be kept together and be protected - should be like a human word
 *    @member {String || RegExp}
 * @member {Object} replace - {toReplace1: replacement1, toReplace2: replacement2}
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
    replace: {},
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
 * @member {Function} postProcess - strip function for pure alphaNumeric patterns
 * @member {Function} firstWordFirstChar - transform word parts
 * @member {Function} firstWordNextChars - transform word parts
 * @member {Function} nextWordsFirstChar - transform word parts
 * @member {Function} nextWordsNextChars - transform word parts
 */
const RENDER_MODEL = {
    postProcess: word => word,
    firstWordFirstChar: word => word,
    firstWordNextChars: word => word,
    nextWordsFirstChar: word => word,
    nextWordsNextChars: word => word,
}

export { INTAKE_OPTIONS, RENDER_MODEL }
