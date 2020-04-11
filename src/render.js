import { isExactMatch } from './utilities'
import { RENDER_MODEL } from './constants'
//import yads from '../node_modules/yads/index.js'
import yads from 'yads'

/**
 * Solve the problem that concatenated numbers loose menaing:
 * delimit the numbers with the output delimiter or the delimiter that matches /\w/
 * @private
 * @param {Array} words
 * @returns {Array} enhanced words
 */
const delimitNumbers = (words, delimitOutput) => {
    const delimitedNumbers = /(\d)[-:,./](\d)/g
    let delimiter = delimitOutput || '_'
    return words.map(word =>
        word.match(delimitedNumbers)
            ? word
                  .replace(delimitedNumbers, `$1${delimiter}$2`)
                  .replace(delimitedNumbers, `$1${delimiter}$2`)
            : word,
    )
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
 * Exchange all diacritics for their base character(s)
 * @private
 * @param {String} line
 * @returns {String} changed string
 */
const simplifyDiacritics = line => {
    return yads.combining(line)
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

const patterns = function(words, options) {
    /**
     * Iterative transformation
     * @private
     * @param {Object} model
     * @returns {String} transformed words
     */
    const transform = model => {
        const currentWords = model.preprocess(words, model.delimitOutput)
        const transformation = currentWords.map((word, index) => {
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
            line = simplifyDiacritics(line)
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

export { patterns }
