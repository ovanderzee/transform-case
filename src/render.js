import { isExactMatch } from './utilities'
import { RENDER_MODEL } from './constants'
import asciiFolder from 'fold-to-ascii'

/**
 * Solve the problem that concatenated numbers loose menaing:
 * delimit the numbers with the output delimiter or the delimiter that matches /\w/
 * @private
 * @param {String} word
 * @returns {Array} enhanced words
 */
const delimitNumbers = (word, delimitOutput) => {
    const delimitedNumbers = /(\d)[-:,./](\d)/g
    const delimiter = delimitOutput || '_'
    return word.match(delimitedNumbers)
        ? word
              .replace(delimitedNumbers, `$1${delimiter}$2`)
              .replace(delimitedNumbers, `$1${delimiter}$2`)
        : word
}

/**
 * Convert curly single quotes and backticks to straight single quotes,
 * convert curly double quotes to straight double quotes
 * @private
 * @param {String} line
 * @returns {String} normalised string
 */
const normaliseQuotes = line => {
    return line.replace(/‘’`/g, "'").replace(/“”/g, '"')
}

/**
 * Remove all punctuation from a string
 * @private
 * @param {String} line
 * @returns {String} stripped string
 */
const removePunctuation = line => {
    return normaliseQuotes(line).replace(/[…,:;[\](){}\-‐–—'".!?]/g, '')
}

/**
 * Remove all diacritics and decompose ligatures
 * @private
 * @param {String} line
 * @returns {String} changed string
 */
const simplifyVariations = line => {
    return asciiFolder.foldReplacing(line)
}

/**
 * Transform helper functions
 * @private
 * @param {String} word
 * @returns {String} transformed word
 */
const asIs = word => word
const toLower = word => word.toLowerCase()
const toUpper = word => word.toUpperCase()

const patternRendering = function(words, options) {
    /**
     * Iterative transformation
     * @private
     * @param {Object} model
     * @returns {String} transformed words
     */
    const transform = model => {
        const transformation = words.map((word, index) => {
            word = model.preprocess(word, model.delimitOutput)
            if (index === 0) {
                return options.preserve.some(regex => isExactMatch(word, regex))
                    ? word
                    : model.firstWordFirstChar(word.substr(0, 1)) +
                          model.firstWordNextChars(word.substr(1))
            } else {
                return options.preserve.some(regex => isExactMatch(word, regex))
                    ? word
                    : model.nextWordsFirstChar(word.substr(0, 1)) +
                          model.nextWordsNextChars(word.substr(1))
            }
        })
        return model.postProcess(transformation.join(model.delimitOutput))
    }

    const techProcessing = {
        preprocess: delimitNumbers,
        postProcess: function(line) {
            line = removePunctuation(line)
            line = simplifyVariations(line)
            return line
        },
    }

    /**
     * camelCase pattern
     * @param {Object} model
     * @returns {String} transformed words
     */
    const camelCase = () => {
        const model = Object.assign({}, RENDER_MODEL, techProcessing, {
            delimitOutput: '',
            firstWordFirstChar: toLower,
            firstWordNextChars: toLower,
            nextWordsFirstChar: toUpper,
            nextWordsNextChars: toLower,
        })
        return transform(model)
    }

    /**
     * humanTitle pattern
     * @param {Object} model
     * @returns {String} transformed words
     */
    const humanTitle = () => {
        const model = Object.assign({}, RENDER_MODEL, {
            delimitOutput: ' ',
            firstWordFirstChar: toUpper,
            nextWordsFirstChar: toUpper,
        })
        return transform(model)
    }

    /**
     * snakeCase pattern
     * @param {Object} model
     * @returns {String} transformed words
     */
    const snakeCase = () => {
        const model = Object.assign({}, RENDER_MODEL, techProcessing, {
            delimitOutput: '_',
            firstWordFirstChar: toLower,
            firstWordNextChars: toLower,
            nextWordsFirstChar: toLower,
            nextWordsNextChars: toLower,
        })
        return transform(model)
    }

    return {
        camelCase: camelCase,
        humanTitle: humanTitle,
        snakeCase: snakeCase,
    }
}

export { patternRendering }
