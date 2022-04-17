import { NUMERIC_DELIMITERS, PUNCTUATION_CHARS } from './constants'
import asciiFolder from 'fold-to-ascii'

/**
 * Solve the problem that concatenated numbers loose meaning:
 * delimit the numbers with the output delimiter or the delimiter that matches /\w/
 * @private
 * @param {String} word
 * @returns {Array} enhanced words
 */
const delimitNumbers = (word: string, delimitOutput: string): string => {
    const currentNumericDelimiters = NUMERIC_DELIMITERS.replace(
        delimitOutput,
        '',
    )

    // replace all numeric delimiters between digits
    const currentNumericDelimiterRegex = new RegExp(
        '(\\d)[' + currentNumericDelimiters + ']+(\\d)',
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
const normaliseQuotes = (line: string): string => {
    return line.replace(/[‘’`]/g, "'").replace(/[“”]/g, '"')
}

/**
 * Remove all punctuation from a string
 * @private
 * @param {String} line
 * @returns {String} stripped string
 */
const removePunctuation = (line: string, delimitOutput: string): string => {
    const currentPunctuation = PUNCTUATION_CHARS.replace(delimitOutput, '')

    // remove all punctuation between alphabetic characters
    const AAPunctRegex = new RegExp(
        '(\\D)[' + PUNCTUATION_CHARS + ']+(\\D)',
        'g',
    )
    // - between alphabetic characters and digits
    const ADPunctRegex = new RegExp(
        '(\\D)[' + PUNCTUATION_CHARS + ']+(\\d)',
        'g',
    )
    // - between digits and alphabetic characters
    const DAPunctRegex = new RegExp(
        '(\\d)[' + PUNCTUATION_CHARS + ']+(\\D)',
        'g',
    )
    // remove all punctuation but the delimiter between digits
    const DDPunctRegex = new RegExp(
        '(\\d)[' + currentPunctuation + ']+(\\d)',
        'g',
    )
    // remove all leading punctuation
    const leadPunctRegex = new RegExp('^[' + PUNCTUATION_CHARS + ']+', '')
    // remove all trailing punctuation
    const trailPunctRegex = new RegExp('[' + PUNCTUATION_CHARS + ']+$', '')

    line = line.replace(AAPunctRegex, '$1$2')
    line = line.replace(AAPunctRegex, '$1$2')
    line = line.replace(ADPunctRegex, '$1$2')
    line = line.replace(DAPunctRegex, '$1$2')
    if (!NUMERIC_DELIMITERS.includes(delimitOutput)) {
        line = line.replace(DDPunctRegex, '$1$2')
        line = line.replace(DDPunctRegex, '$1$2')
    }
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
const simplifyVariations = (line: string): string => {
    return asciiFolder.foldReplacing(line)
}

/**
 * Transform helper functions
 * @private
 * @param {String} word
 * @returns {String} transformed word
 */
const toLower = (word: string): string => word.toLowerCase()
const toUpper = (word: string): string => word.toUpperCase()

export {
    delimitNumbers,
    normaliseQuotes,
    removePunctuation,
    simplifyVariations,
    toLower,
    toUpper,
}
