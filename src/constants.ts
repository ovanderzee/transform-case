import { TransformOptions, RenderModel } from './types'

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
const INTAKE_OPTIONS: TransformOptions = {
    delimit: [],
    preserve: [],
    delimitLetterNumber: true,
    delimitLowerUpper: true,
    delimitNumberLetter: true,
    delimitUpperLower: false,
    delimitUpperUpperLower: true,
    delimitInput: '',
    delimitOutput: ' ',
}

/*
 * Render model, with do-nothing-functions, to be exchanged by the pattern finally
 * @member {Function} preprocess
      do operations in fresh words array, for pure alphaNumeric patterns
 * @member {Function} postProcess
      do operations in string, just before delivery, for pure alphaNumeric patterns
 * @member {Function} firstWordFirstChar - transform word parts
 * @member {Function} firstWordNextChars - transform word parts
 * @member {Function} nextWordsFirstChar - transform word parts
 * @member {Function} nextWordsNextChars - transform word parts
 */
const RENDER_MODEL: RenderModel = {
    delimitOutput: '',
    preprocess: (word, delimiter) => word.replace(' ', delimiter),
    postProcess: (line) => line,
    firstWordFirstChar: (word) => word,
    firstWordNextChars: (word) => word,
    nextWordsFirstChar: (word) => word,
    nextWordsNextChars: (word) => word,
}

const SPACE_REGEX =
    /[\u0009-\u000D \u00A0\u2000-\u200A\u2028\u2029\u202F\u205F\u3000]+/g
const CONTROL_REGEX =
    /[\u0000-\u0008\u000E-\u001F\u007F-\u009F\u200B-\u200F\u202A-\u202E\u2060-\u206F]+/g // eslint-disable-line no-control-regex
//     const controlChars = new RegExp('[\u0000-\u001f,\u007f-\u009f]')

export { INTAKE_OPTIONS, RENDER_MODEL, SPACE_REGEX, CONTROL_REGEX }
