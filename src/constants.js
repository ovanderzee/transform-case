/*
 * Intake options
 * @member {Array} preserve - [keep1, keep2]
 * @member {Object} replace - {toReplace1: replacement1, toReplace2: replacement2}
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
 * Render model, with do-nothing-functions
 */
const RENDER_MODEL = {
    postProcess: word => word,
    firstWordFirstChar: word => word,
    firstWordNextChars: word => word,
    nextWordsFirstChar: word => word,
    nextWordsNextChars: word => word,
}

export { INTAKE_OPTIONS, RENDER_MODEL }
