import {
    isDigit,
    isLetter,
    isLower,
    isUpper,
    isPureAlphaNumeric,
    isExactMatch,
} from './utilities'
import { INTAKE_OPTIONS } from './constants'
import { patterns } from './render'

/*
 * Clean the line from extraneous characters
 * @private
 * @param {String} line
 * @param {String} delimiter
 * @returns {String} cleaned line
 */
const clean = (line, delimiter) => {
    const leading = new RegExp('^' + delimiter)
    const trailing = new RegExp(delimiter + '$')
    const doubling = new RegExp(delimiter + delimiter, 'g')
    return line
        .replace(leading, '')
        .replace(trailing, '')
        .replace(doubling, delimiter)
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

/* Change all 'units' in regex to deal with variable digits
 * @param {String || RegExp} unit
 * @returns {RegExp}
 */
const stringToRegexp = unit => {
    if (typeof unit === 'string') return new RegExp(unit, 'g')
    if (unit instanceof RegExp) return unit
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
    line = line.trim().replace(/\s+/g, ' ')
    if (options.delimitInput) {
        self.orgin.normalised = clean(line, options.delimitInput)
    } else {
        self.orgin.normalised = line
    }
    self.orgin.isPureAlphaNumeric = isPureAlphaNumeric(self.orgin.normalised)
    let revised = self.orgin.normalised

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
        revised = clean(revised, delimiter)
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

    return Object.assign(self, patterns(self.words, options))
}

export { TransformCase }
