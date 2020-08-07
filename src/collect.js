import { isAlphaNumeric, isExactMatch } from 'my-lib'
import {
    dedupe,
    tidy,
    insertDelimiter,
    delimitWords,
    delimitChunks,
} from './functions'
import { INTAKE_OPTIONS } from './constants'
import { patternRendering } from './render'

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
    self.orgin.isAlphaNumeric = isAlphaNumeric(self.orgin.standardised)
    let revised = self.orgin.standardised

    // distinguish between technical from linguistic transforms
    let delimiter
    if (self.orgin.isAlphaNumeric) {
        // assume technical phrase, or this is one human word
        // delimit by case transition
        delimiter = options.delimitOutput
    } else {
        // assume human input or technical/coded when input delimiter is given
        // delimit by specified delimiter, (default: a space)
        delimiter = options.delimitInput || options.delimitOutput
    }

    // preserve, delimit - these strings must be kept together - should be like a human word
    const chunks = [].concat(options.preserve, options.delimit)
    if (chunks.length) {
        revised = delimitChunks(revised, chunks, delimiter)
    }

    // produce an array with words
    if (self.orgin.isAlphaNumeric) {
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
