import {
    isDigit,
    isLetter,
    isLower,
    isUpper,
    isPureAlphaNumeric,
    isExactMatch,
} from './utilities'
import { INTAKE_OPTIONS } from './constants'
import { patternRendering } from './render'

/*
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

/*
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

/* Test need to insert a delimiter
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

/* Put seperator before each concatenated word
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
 * Transform a camelcase object-key to title
 * @param {String} line
 * @param {Object} options
 * @returns {Object} - the 'prototype' / methods and some variables
 */
const TransformCase = function(line, userOptions) {
    if (!line) return
    let self = {}
    const options = Object.assign({}, INTAKE_OPTIONS, userOptions)

    // prepare
    self.orgin = {
        input: line,
    }
    if (options.delimitInput) {
        self.orgin.standardised = dedupe(tidy(line), options.delimitInput)
    } else {
        self.orgin.standardised = tidy(line)
    }
    self.orgin.isPureAlphaNumeric = isPureAlphaNumeric(self.orgin.standardised)
    let revised = self.orgin.standardised

    // distinguish between technical from linguistic transforms
    let delimiter
    if (self.orgin.isPureAlphaNumeric) {
        // assume technical phrase, or this is one human word
        // delimit by case transition
        delimiter = options.delimitOutput
    } else {
        // assume human input or technical/coded when input delimiter is given
        // delimit by specified delimiter, (default: a space)
        delimiter = options.delimitInput || options.delimitOutput
    }

    // replace regardsless of delimiting
    const replaceEntries = Object.entries(options.replace)
    if (options.replace && replaceEntries.length) {
        for (let [key, value] of replaceEntries) {
            revised = revised.replace(new RegExp(key, 'g'), value)
        }
    }

    // preserve, delimit - these strings must be kept together - should be like a human word
    const units = [].concat(options.preserve, options.delimit)
    if (units.length) {
        units.forEach(unit => {
            revised = revised.replace(unit, delimiter + '$&' + delimiter)
        })
        revised = dedupe(revised, delimiter)
    }

    // produce an array with words
    if (self.orgin.isPureAlphaNumeric) {
        // assume technical phrase, or this is one human word
        // delimit by case transition
        let parts = revised.split(delimiter)
        self.phrase = parts
            .map(part =>
                options.preserve.some(regex => isExactMatch(part, regex))
                    ? part
                    : delimitWords(part, options),
            )
            .join(delimiter)
        self.words = self.phrase.split(delimiter)
    } else {
        // assume human input or technical/coded when input delimiter is given
        // delimit by specified delimiter, (default: a space)
        self.phrase = revised
        self.words = revised.split(delimiter)
    }

    return Object.assign(self, patternRendering(self.words, options))
}

export { TransformCase }
