import { NUMERIC_DELIMITERS, PUNCTUATION_CHARS } from './constants'
import asciiFolder from 'fold-to-ascii'

/**
 * Solve the problem that concatenated numbers loose meaning:
 * delimit the numbers with the output delimiter or the delimiter that matches /\w/
 * @private
 * @param {String} word
 * @returns {Array} enhanced words
 */
const delimitNumbers = (word, delimitOutput) => {
    const currentNumericDelimiters = NUMERIC_DELIMITERS.replace(
        delimitOutput,
        '',
    )

    // replace all numeric delimiters between digits
    const currentNumericDelimiterRegex = new RegExp(
        '(\\d)[' + currentNumericDelimiters + '](\\d)',
        'g',
    )

    // delimit numbers with an underscore, even in capMarkedWords
    const delimiter = delimitOutput || '_'
    return word.match(currentNumericDelimiterRegex)
        ? word
              .replace(currentNumericDelimiterRegex, `$1${delimiter}$2`)
              .replace(currentNumericDelimiterRegex, `$1${delimiter}$2`)
        : word
}

/**
 * Convert curly single quotes and backticks to straight single quotes,
 * convert curly double quotes to straight double quotes
 * @private
 * @param {String} line
 * @returns {String} normalised string
 */
const normaliseQuotes = (line) => {
    return line.replace(/‘’`/g, "'").replace(/“”/g, '"')
}

/**
 * Remove all punctuation from a string
 * @private
 * @param {String} line
 * @returns {String} stripped string
 */
const removePunctuation = (line, delimitOutput) => {
    const currentPunctuation = PUNCTUATION_CHARS.replace(
        '\\' + delimitOutput,
        '',
    ).replace(delimitOutput, '')

    // remove all punctuation between non-digits
    const allPunctRegex = new RegExp(
        '(\\D)[' + PUNCTUATION_CHARS + '](\\D)',
        'g',
    )
    // remove all leading punctuation
    const leadPunctRegex = new RegExp('^[' + PUNCTUATION_CHARS + ']', '')
    // remove all trailing punctuation
    const trailPunctRegex = new RegExp('[' + PUNCTUATION_CHARS + ']$', '')
    // remove all punctuation but the delimiter between digits
    const currentPunctRegex = new RegExp(
        '(\\d)[' + currentPunctuation + '](\\d)',
        'g',
    )

    line = line.replace(allPunctRegex, '$1$2')
    line = line.replace(allPunctRegex, '$1$2')
    line = line.replace(currentPunctRegex, '$1$2')
    line = line.replace(leadPunctRegex, '')
    line = line.replace(trailPunctRegex, '')

    return line
}

/**
 * Remove all diacritics and decompose ligatures
 * @private
 * @param {String} line
 * @returns {String} changed string
 */
const simplifyVariations = (line) => {
    return asciiFolder.foldReplacing(line)
}

/**
 * Transform helper functions
 * @private
 * @param {String} word
 * @returns {String} transformed word
 */
const toLower = (word) => word.toLowerCase()
const toUpper = (word) => word.toUpperCase()

export {
    delimitNumbers,
    normaliseQuotes,
    removePunctuation,
    simplifyVariations,
    toLower,
    toUpper,
}