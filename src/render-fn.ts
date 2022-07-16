import asciiFolder from 'fold-to-ascii'
import { isDigit, isLetter } from 'my-lib'

/**
 * Convert curly single quotes and backticks to straight single quotes,
 * convert curly double quotes to straight double quotes
 * @private
 * @param {String} word
 * @returns {String} normalised string
 */
const normaliseQuotes = (word: string): string => {
    return word.replace(/[‘’`]/g, "'").replace(/[“”]/g, '"')
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
 * Get rid of html entities
 * @private
 * @param {String} word
 * @param {String} separator
 * @returns {String} stripped string
 */
const stripHtmlEntities = (word: string, separator: string): string => {
    const space = ' '
    word = word.replace(/&([A-Za-z]+|#[A-Za-z0-9]+);/g, space)
    return word.trim().replace(/\s+/g, separator)
}

/**
 * Remove control chars, punctuation, symbols etc. from a string
 * @private
 * @param {String} word
 * @param {String} separator
 * @returns {String} stripped string
 */
const stripSigns = (word: string, separator: string): string => {
    const chars = word.match(/./g) || []
    const space = ' '
    const stripped = chars.map((char) => {
        const isUseful =
            char.match(/[A-Za-z0-9]/) || isLetter(char) || isDigit(char)
        return isUseful ? char : space
    })
    return stripped.join('').trim().replace(/\s+/g, separator)
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
    normaliseQuotes,
    simplifyVariations,
    stripHtmlEntities,
    stripSigns,
    toLower,
    toUpper,
}
