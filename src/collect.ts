import { isAlphaNumeric, isExactMatch } from 'my-lib'
import {
    dedupe,
    tidy,
    delimitWords,
    delimitChunks,
    normaliseProtections,
} from './collect-fn'
import { TransformOptions, UserOptions } from './types'
import { INTAKE_OPTIONS } from './constants'
import { patternRendering } from './render'

/**
 * Transform a camelcase object-key to title
 * @param {String} line
 * @param {Object} options
 * @returns {Object} - the 'prototype' / methods and some variables
 */
const TransformCase = function (line: string, userOptions: UserOptions) {
    if (!line) return

    const emptyProtection: RegExp[] = []
    const normalisedProtections = {
        delimit: userOptions.delimit
            ? normaliseProtections(userOptions.delimit)
            : emptyProtection,
        preserve: userOptions.preserve
            ? normaliseProtections(userOptions.preserve)
            : emptyProtection,
    }

    const options: TransformOptions = Object.assign(
        {},
        INTAKE_OPTIONS,
        userOptions,
        normalisedProtections,
    )

    const normalisedLine = options.delimitInput
        ? dedupe(tidy(line), options.delimitInput)
        : tidy(line)

    // prepare
    const origin = {
        input: line,
        normalised: normalisedLine,
        revised: normalisedLine,
        isAlphaNumeric: isAlphaNumeric(normalisedLine),
    }

    // different routes for technical (transition-delimited) from
    //     linguistic transforms (character-delimited)
    const delimiter = origin.isAlphaNumeric
        ? options.delimitOutput
        : options.delimitInput || options.delimitOutput

    // preserve, delimit - these strings must be kept together
    const chunks: RegExp[] = []
    chunks.concat(options.preserve, options.delimit)
    if (chunks.length) {
        origin.revised = delimitChunks(origin.normalised, chunks, delimiter)
    }

    const self = {
        origin: origin,
        options: options,
        phrase: '',
        words: [] as string[],
    }

    // produce an array with words
    if (origin.isAlphaNumeric) {
        let parts = origin.revised.split(delimiter)
        self.phrase = parts
            .map((part) =>
                options.preserve.some((regex) => isExactMatch(part, regex))
                    ? part
                    : delimitWords(part, options),
            )
            .join(delimiter)
        self.words = self.phrase.split(delimiter)
    } else {
        self.phrase = origin.revised
        self.words = origin.revised.split(delimiter)
    }

    return Object.assign(self, patternRendering(self.words, options))
}

export { TransformCase }
