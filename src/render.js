import { isExactMatch } from 'my-lib'
import { RENDER_MODEL } from './constants'
import asciiFolder from 'fold-to-ascii'

/**
 * Solve the problem that concatenated numbers loose meaning:
 * delimit the numbers with the output delimiter or the delimiter that matches /\w/
 * @private
 * @param {String} word
 * @returns {Array} enhanced words
 */
const delimitNumbers = (word, delimitOutput) => {
    const allNumericDelimiters = '-:,./'
    const currentNumericDelimiters = allNumericDelimiters.replace(
        delimitOutput,
        '',
    )

    // replace all numeric delimiters between digits
    const currentNumericDelimiterRegex = new RegExp(
        '(\\d)[' + currentNumericDelimiters + '](\\d)',
        'g',
    )

    const delimiter = delimitOutput || '_'
    return word.match(currentNumericDelimiterRegex)
        ? word
              .replace(currentNumericDelimiterRegex, `$1${delimiter}$2`)
              .replace(currentNumericDelimiterRegex, `$1${delimiter}$2`)
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
const removePunctuation = (line, delimitOutput) => {
    const allPunctuation = '…,:;[\\](){}\\-‐–—\'".!?'
    const currentPunctuation = allPunctuation
        .replace('\\' + delimitOutput, '')
        .replace(delimitOutput, '')

    // remove all punctuation between non-digits
    const allPunctRegex = new RegExp('(\\D)[' + allPunctuation + '](\\D)', 'g')
    // remove all leading punctuation
    const leadPunctRegex = new RegExp('^[' + allPunctuation + ']', '')
    // remove all trailing punctuation
    const trailPunctRegex = new RegExp('[' + allPunctuation + ']$', '')
    // remove all punctuation but the delimiter between digits
    const currentPunctRegex = new RegExp(
        '(\\d)[' + currentPunctuation + '](\\d)',
        'g',
    )

    line = line.replace(allPunctRegex, '$1$2')
    line = line.replace(allPunctRegex, '$1$2')
    line = line.replace(currentPunctRegex, '$1$2')
    line = line.replace(leadPunctRegex, '')
    line = line.replace(trailPunctRegex, '')

    return line
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
            const toPreserve = options.preserve.some(regex =>
                isExactMatch(word, regex),
            )
            if (index === 0) {
                // first word
                return toPreserve
                    ? word
                    : model.firstWordFirstChar(word.substr(0, 1)) +
                          model.firstWordNextChars(word.substr(1))
            } else {
                // successive words
                return toPreserve
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
            word = normaliseQuotes(word)
            word = removePunctuation(word, delimitOutput)
            return word
        },
        postProcess: function(line, delimitOutput) {
            line = simplifyVariations(line)
            return line
        },
    }

    /****************************************
     * cap-marked words
     ****************************************/

    /**
     * capMarkedWords base pattern
     * @param {Function} firstWordFirstChar
     * @param {Function} nextWordsFirstChar
     * @private
     * @returns {String} transformed words
     */
    const capMarkedWords = (firstWordFirstChar, nextWordsFirstChar) => {
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
        return capMarkedWords(toLower, toUpper)
    }
    const pascalCase = () => {
        return capMarkedWords(toUpper, toUpper)
    }

    /****************************************
     * Human, linguistic patterns
     ****************************************/

    /**
     * humanSentence pattern
     * @returns {String} transformed words
     */
    const humanSentence = () => {
        const model = Object.assign({}, RENDER_MODEL, {
            delimitOutput: ' ',
            firstWordFirstChar: toUpper,
            firstWordNextChars: toLower,
            nextWordsFirstChar: toLower,
            nextWordsNextChars: toLower,
        })
        return transform(model)
    }

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

    /****************************************
     * delimitedLowerCase patterns
     ****************************************/

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
    const searchCase = () => {
        return delimitedLowerCase('+')
    }
    const snakeCase = () => {
        return delimitedLowerCase('_')
    }
    const spaceCase = () => {
        return delimitedLowerCase(' ')
    }

    /****************************************
     * other variable related patterns
     ****************************************/

    /**
     * constantCase pattern
     * @param {String} delimimter
     * @returns {String} constantCase transformed words
     */
    const constantCase = () => {
        const model = Object.assign({}, RENDER_MODEL, techProcessing, {
            delimitOutput: '_',
            firstWordFirstChar: toUpper,
            firstWordNextChars: toUpper,
            nextWordsFirstChar: toUpper,
            nextWordsNextChars: toUpper,
        })
        return transform(model)
    }

    /**
     * headerCase pattern
     * @private
     * @param {String} delimimter
     * @returns {String} headerCase transformed words
     */
    const headerCase = () => {
        const model = Object.assign({}, RENDER_MODEL, techProcessing, {
            delimitOutput: '-',
            firstWordFirstChar: toUpper,
            firstWordNextChars: toLower,
            nextWordsFirstChar: toUpper,
            nextWordsNextChars: toLower,
        })
        return transform(model)
    }

    return {
        camelCase: camelCase,
        pascalCase: pascalCase,
        humanSentence: humanSentence,
        humanTitle: humanTitle,
        dotCase: dotCase,
        paramCase: paramCase,
        pathCase: pathCase,
        searchCase: searchCase,
        snakeCase: snakeCase,
        spaceCase: spaceCase,
        constantCase: constantCase,
        headerCase: headerCase,
    }
}

export { patternRendering }
