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
        const line = transformation.join(model.delimitOutput)
        return model.postProcess(line, model.delimitOutput)
    }

    const techProcessing = {
        preprocess: function(word, delimitOutput) {
            word = delimitNumbers(word, delimitOutput)
            word = removePunctuation(word)
            return word
        },
        postProcess: function(line, delimitOutput) {
            line = simplifyVariations(line)
            return line
        },
    }

    /**
     * cap-marked regexp word
     */

    /**
     * capMarkedRegexpWord pattern
     * @param {Function} firstWordFirstChar
     * @param {Function} nextWordsFirstChar
     * @private
     * @returns {String} transformed words
     */
    const capMarkedRegexpWord = (firstWordFirstChar, nextWordsFirstChar) => {
        const model = Object.assign({}, RENDER_MODEL, techProcessing, {
            delimitOutput: '',
            firstWordFirstChar: firstWordFirstChar,
            firstWordNextChars: toLower,
            nextWordsFirstChar: nextWordsFirstChar,
            nextWordsNextChars: toLower,
        })
        return transform(model)
    }

    const camelCase = () => {
        return capMarkedRegexpWord(toLower, toUpper)
    }
    const pascalCase = () => {
        return capMarkedRegexpWord(toUpper, toUpper)
    }

    /**
     * Human, linguistic patterns
     */

    /**
     * humanTitle pattern
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
     * delimitedLowerCase patterns
     */

    /**
     * delimitedLowerCase base pattern
     * @private
     * @param {String} delimimter
     * @returns {String} delimitedLowerCase transformed words
     */
    const delimitedLowerCase = delimimter => {
        const model = Object.assign({}, RENDER_MODEL, techProcessing, {
            delimitOutput: delimimter,
            firstWordFirstChar: toLower,
            firstWordNextChars: toLower,
            nextWordsFirstChar: toLower,
            nextWordsNextChars: toLower,
        })
        return transform(model)
    }

    const dotCase = () => {
        return delimitedLowerCase('.')
    }
    const paramCase = () => {
        return delimitedLowerCase('-')
    }
    const pathCase = () => {
        return delimitedLowerCase('/')
    }
    const snakeCase = () => {
        return delimitedLowerCase('_')
    }
    const spaceCase = () => {
        return delimitedLowerCase(' ')
    }

    return {
        camelCase: camelCase,
        pascalCase: pascalCase,
        humanTitle: humanTitle,
        dotCase: dotCase,
        paramCase: paramCase,
        pathCase: pathCase,
        snakeCase: snakeCase,
        spaceCase: spaceCase,
    }
}

export { patternRendering }
