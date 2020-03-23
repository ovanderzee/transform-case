import {
    isDigit,
    isLetter,
    isLower,
    isUpper,
    isPureAlphaNumeric,
} from './utilities.js'
import { INTAKE_OPTIONS, RENDER_MODEL } from './constants.js'

/*
 * Clean the line from extraneous characters
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
 * @param {String} prev - previous character
 * @param {String} curr - current character
 * @param {Object} options
 * @returns {String} Need to insert a delimiter
 */
const insertDelimiter = (prev, curr, next, options) => {
    let letNum, lowUp, numLet, upLow, upUpLow, upUpNum
    letNum = options.delimitLetterNumber && isLetter(prev) && isDigit(curr)
    lowUp = options.delimitLowerUpper && isLower(prev) && isUpper(curr)
    numLet = options.delimitNumberLetter && isDigit(prev) && isLetter(curr)
    upLow = options.delimitUpperLower && isUpper(prev) && isLower(curr)
    upUpLow =
        options.delimitUpperUpperLower &&
        isUpper(prev) &&
        isUpper(curr) &&
        isLower(next)
    upUpNum =
        options.delimitUpperUpperNumber &&
        isUpper(prev) &&
        isUpper(curr) &&
        isLower(next)

    let delimit = letNum || lowUp || numLet || upLow || upUpLow || upUpNum
    // if (delimit) console.log(`delimit ${prev} - ${curr}${next}`)
    return delimit
}

/* Put seperator before each concatenated word
 * @param {String} line
 * @param {Object} options
 * @returns {String} phrase of seperated words
 */
const delimitWords = (line, options) => {
    // console.log(`delimit ${line} using\n`, options)
    let phrase = line[0]
    for (let i = 1; i < line.length; i++) {
        if (insertDelimiter(line[i - 1], line[i], line[i + 1] || '', options)) {
            phrase += options.delimitOutput
        }
        phrase += line[i]
    }
    return phrase
}

const normaliseQuotes = line => {
    return line.replace(/‘’`/g, "'").replace(/“”/g, '"')
}

const removePunctuation = line => {
    return normaliseQuotes(line).replace(/[…,:;[\](){}\-‐–—'".!?]/g, '')
}

/**
 * Transform a camelcase object-key to title
 * @param {String} line
 * @param {Object} options
 */
const TransformCase = function(line, userOptions) {
    if (!line) return

    const options = Object.assign({}, INTAKE_OPTIONS, userOptions)

    // prepare
    this.orgin = {
        input: line,
    }
    line = line.trim().replace(/\s+/g, ' ')
    if (options.delimitInput) {
        this.orgin.normalised = clean(line, options.delimitInput)
    } else {
        this.orgin.normalised = line
    }
    this.orgin.isPureAlphaNumeric = isPureAlphaNumeric(this.orgin.normalised)
    let revised = this.orgin.normalised

    // distinguish between technical from linguistic transforms
    let delimiter
    if (options.delimitInput) {
        // delimit by given character
        delimiter = options.delimitInput
    } else if (this.orgin.isPureAlphaNumeric) {
        // delimit by case transition
        delimiter = options.delimitOutput
    } else {
        // delimit by non-letter-non-digit character
        // most abundant nonAlphaNumeric as delimiter?
        // intersect used nonAlphaNumerics and a most popular list?
        delimiter = options.delimitOutput
    }

    // replace regardsless of delimiting
    const replaceEntries = Object.entries(options.replace)
    if (options.replace && replaceEntries.length) {
        for (let [key, value] of replaceEntries) {
            revised = revised.replace(new RegExp(key, 'g'), value)
        }
    }

    // preserve, delimit - these strings must be kept together - should be a human word
    const kepings = [].concat(options.preserve, options.delimit)
    if (kepings.length) {
        kepings.forEach(keep => {
            revised = revised.replace(
                new RegExp(keep, 'g'),
                delimiter + keep + delimiter,
            )
        })
        revised = clean(revised, delimiter)
    }

    // produce an array with words
    if (options.delimitInput) {
        // delimit by given character
        this.phrase = revised
        this.words = revised.split(options.delimitInput)
    } else if (this.orgin.isPureAlphaNumeric) {
        // delimit by case transition
        let parts = revised.split(options.delimitOutput)
        this.phrase = parts
            .map(pt =>
                options.preserve.includes(pt) ? pt : delimitWords(pt, options),
            )
            .join(options.delimitOutput)
        this.words = this.phrase.split(options.delimitOutput)
    } else {
        // delimit by non-letter-non-digit character
        this.phrase = revised
        this.words = revised.split(options.delimitOutput)
    }

    const toLower = word => word.toLowerCase()
    const toUpper = word => word.toUpperCase()

    const transform = model => {
        let transformation = this.words.map((word, index) => {
            if (index === 0) {
                return options.preserve.includes(word)
                    ? word
                    : model.firstWordFirstChar(word.substr(0, 1)) +
                          model.firstWordNextChars(word.substr(1))
            } else {
                return options.preserve.includes(word)
                    ? word
                    : model.nextWordsFirstChar(word.substr(0, 1)) +
                          model.nextWordsNextChars(word.substr(1))
            }
        })
        return model.postProcess(transformation.join(model.delimitOutput))
    }

    this.camelCase = () => {
        const model = Object.assign({}, RENDER_MODEL, {
            postProcess: removePunctuation,
            delimitOutput: '',
            firstWordFirstChar: toLower,
            firstWordNextChars: toLower,
            nextWordsFirstChar: toUpper,
            nextWordsNextChars: toLower,
        })
        return transform(model)
    }

    this.humanTitle = () => {
        const model = Object.assign({}, RENDER_MODEL, {
            delimitOutput: ' ',
            firstWordFirstChar: toUpper,
            nextWordsFirstChar: toUpper,
        })
        return transform(model)
    }
}

export { TransformCase }
