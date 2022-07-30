import { isAlphaNumeric, isExactMatch } from 'my-lib'
import {
    dedupe,
    tidy,
    delimitWords,
    delimitChunks,
    normaliseProtections,
} from './collect-fn'
import { TransformOptions, UserOptions, TransformCase } from './types'
import { INTAKE_OPTIONS } from './constants'
import { patternRendering } from './render'

/**
 * Transform a camelcase object-key to title
 * @param {String} line
 * @param {Object} options
 * @returns {Object} - the 'prototype' / methods and some variables
 */
const wordCollector = function (
    line: string,
    userOptions: UserOptions,
): TransformCase {
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
    const _origin = {
        input: line,
        normalised: normalisedLine,
        revised: normalisedLine,
        isAlphaNumeric: isAlphaNumeric(normalisedLine),
    }

    // different routes for technical (transition-delimited) from
    //     linguistic transforms (character-delimited)
    const delimiter = _origin.isAlphaNumeric
        ? options.delimitOutput
        : options.delimitInput || options.delimitOutput

    // preserve, delimit - these strings must be kept together
    const chunks = [
        ...normalisedProtections.preserve,
        ...normalisedProtections.delimit,
    ]
    if (chunks.length) {
        _origin.revised = delimitChunks(_origin.normalised, chunks, delimiter)
    }

    const self = {
        _origin: _origin,
        options: options,
        _phrase: '',
        words: [] as string[],
    }

    // produce an array with words
    if (_origin.isAlphaNumeric) {
        const parts = _origin.revised.split(delimiter)
        self._phrase = parts
            .map((part) =>
                chunks.some((regex) => isExactMatch(part, regex))
                    ? part
                    : delimitWords(part, options),
            )
            .join(delimiter)
    } else {
        self._phrase = _origin.revised
    }
    self.words = self._phrase.split(delimiter)

    return Object.assign(self, patternRendering(self.words, options))
}

export { wordCollector }
