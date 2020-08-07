import { isDigit, isLetter, isLower, isUpper } from 'my-lib'

/**
 * remove extraneous and doubled characters
 * @private
 * @param {String} line
 * @param {String} char
 * @returns {String} cleaned line
 */
const dedupe = (line, char) => {
    const leading = new RegExp('^' + char)
    const trailing = new RegExp(char + '$')
    const doubling = new RegExp(char + char, 'g')
    return line
        .replace(doubling, char)
        .replace(doubling, char)
        .replace(doubling, char)
        .replace(leading, '')
        .replace(trailing, '')
}

/**
 * Transform whitespace to spaces, then clear all control characters
 * @private
 * @param {String} line
 * @returns {String} cleaned line
 */
const tidy = line => {
    const controlChars = new RegExp('[\u0000-\u001f,\u007f-\u009f]')
    return line
        .trim()
        .replace(/\s+/g, ' ')
        .replace(controlChars, '')
}

/**
 * Test need to insert a delimiter in pureAlphaNumeric input
 * @private
 * @param {String} prev - previous character
 * @param {String} curr - current character
 * @param {Object} options
 * @returns {String} Need to insert a delimiter
 */
const insertDelimiter = (prev, curr, next, options) => {
    let letNum, lowUp, numLet, upLow, upUpLow
    letNum = options.delimitLetterNumber && isLetter(prev) && isDigit(curr)
    lowUp = options.delimitLowerUpper && isLower(prev) && isUpper(curr)
    numLet = options.delimitNumberLetter && isDigit(prev) && isLetter(curr)
    upLow = options.delimitUpperLower && isUpper(prev) && isLower(curr)
    upUpLow =
        options.delimitUpperUpperLower &&
        isUpper(prev) &&
        isUpper(curr) &&
        isLower(next)

    let delimit = letNum || lowUp || numLet || upLow || upUpLow
    return delimit
}

/**
 * Put seperator before each concatenated word, in pureAlphaNumeric input
 * @private
 * @param {String} line
 * @param {Object} options
 * @returns {String} phrase of seperated words
 */
const delimitWords = (line, options) => {
    let phrase = line[0]
    for (let i = 1; i < line.length; i++) {
        if (insertDelimiter(line[i - 1], line[i], line[i + 1] || '', options)) {
            phrase += options.delimitOutput
        }
        phrase += line[i]
    }
    return phrase
}

/**
 * Put seperator before each concatenated word, in pureAlphaNumeric input
 * @private
 * @param {String} line
 * @param {Object} options
 * @returns {String} phrase of seperated words
 */
const delimitChunks = (line, units, delimiter) => {
    units.forEach(unit => {
        line = line.replace(unit, delimiter + '$&' + delimiter)
    })
    line = dedupe(line, delimiter)
    return line
}

export { dedupe, tidy, insertDelimiter, delimitWords, delimitChunks }
