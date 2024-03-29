import { isDigit, isLetter, isLower, isUpper } from 'my-lib'
import { decodeHTML } from 'entities'
import { TransformOptions } from './types'
import { SPACE_REGEX, CONTROL_REGEX } from './constants'

/**
 * remove extraneous and doubled characters
 * @private
 * @param {String} line
 * @param {String} char
 * @returns {String} cleaned line
 */
export const dedupe = (line: string, char: string): string => {
    // escape sensitive chars:
    char = '\\' + char
    const leading = new RegExp(`^[${char}]+`)
    const trailing = new RegExp(`[${char}]+$`)
    const doubling = new RegExp(`[${char}]+`, 'g')

    if (char.length > 1) char = char.substr(-1)
    return line
        .replace(doubling, char)
        .replace(leading, '')
        .replace(trailing, '')
}

/**
 * Get rid of html entities
 * @private
 * @param {String} line
 * @param {String} separator
 * @returns {String} stripped string
 */
export const decodeHtmlEntities = (line: string): string => {
    const allEntities = /&([A-Za-z]+|#[0-9]+|#x[A-Fa-f0-9]+);/g
    const decoder = (entity: string): string => decodeHTML(entity)
    return line.replace(allEntities, decoder)
}

/**
 * Transform whitespace to spaces, then clear all control characters
 * @private
 * @param {String} line
 * @returns {String} cleaned line
 */
export const tidy = (line: string): string => {
    line = decodeHtmlEntities(line)
    return line.replace(SPACE_REGEX, ' ').trim().replace(CONTROL_REGEX, '')
}

/**
 * Test need to insert a delimiter in pureAlphaNumeric input
 * @private
 * @param {String} prev - previous character
 * @param {String} curr - current character
 * @param {String} next - character following current
 * @param {Object} options
 * @returns {String} Need to insert a delimiter
 */
const needToInsertDelimiter = (
    prev: string,
    curr: string,
    next: string,
    options: TransformOptions,
): boolean => {
    const letNum =
        options.delimitLetterNumber && isLetter(prev) && isDigit(curr)
    const lowUp = options.delimitLowerUpper && isLower(prev) && isUpper(curr)
    const numLet =
        options.delimitNumberLetter && isDigit(prev) && isLetter(curr)
    const upLow = options.delimitUpperLower && isUpper(prev) && isLower(curr)
    const upUpLow =
        options.delimitUpperUpperLower &&
        isUpper(prev) &&
        isUpper(curr) &&
        isLower(next)

    const needToDelimit = letNum || lowUp || numLet || upLow || upUpLow
    return needToDelimit
}

/**
 * Put separator before each concatenated word, in pureAlphaNumeric input
 * @private
 * @param {String} line
 * @param {Object} options
 * @returns {String} phrase of seperated words
 */
export const delimitWords = (
    line: string,
    options: TransformOptions,
): string => {
    let phrase = line[0]
    for (let i = 1; i < line.length; i++) {
        if (
            needToInsertDelimiter(
                line[i - 1],
                line[i],
                line[i + 1] || '',
                options,
            )
        ) {
            phrase += options.delimitOutput
        }
        phrase += line[i]
    }
    return phrase
}

/**
 * Find optional delimit and preserved chunks and delimit these,
 * @private
 * @param {String} line
 * @param {String[]} rules
 * @param {String} delimiter
 * @returns {String} phrase of separated words
 */
export const delimitChunks = (
    line: string,
    rules: RegExp[],
    delimiter: string,
): string => {
    const usedMatches = new Set()
    rules.forEach((rule) => {
        const words = line.split(delimiter)
        const foundMatches = new Set()
        line = words
            .map((word) => {
                const treated = word.replace(rule, (match) => {
                    foundMatches.add(match)
                    const used = usedMatches.has(word)
                    return used ? match : delimiter + match + delimiter
                })
                return treated
            })
            .join(delimiter)
        // store found matches
        foundMatches.forEach((match) => usedMatches.add(match))
    })

    line = dedupe(line, delimiter)
    return line
}

/**
 * Convert protected strings to regular expressions
 * @param {String[] | RegExp[]} protections
 * @returns {RegExp[]} - normalised array
 */
export const normaliseProtections = (
    protections: (string | RegExp)[],
): RegExp[] =>
    protections.map((pt) => (typeof pt === 'string' ? new RegExp(pt, 'g') : pt))
