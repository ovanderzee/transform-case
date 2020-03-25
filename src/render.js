import { RENDER_MODEL } from './constants'

/**
 * Convert curly single quotes and backticks to straight single quotes,
 * convert curly double quotes to straight double quotes
 */
const normaliseQuotes = line => {
    return line.replace(/‘’`/g, "'").replace(/“”/g, '"')
}

/**
 * Remove all puctuation from a string
 */
const removePunctuation = line => {
    return normaliseQuotes(line).replace(/[…,:;[\](){}\-‐–—'".!?]/g, '')
}

const asIs = word => word
const toLower = word => word.toLowerCase()
const toUpper = word => word.toUpperCase()

const patterns = function(words, options) {
    const transform = model => {
        let transformation = words.map((word, index) => {
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

    const camelCase = () => {
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

    const humanTitle = () => {
        const model = Object.assign({}, RENDER_MODEL, {
            delimitOutput: ' ',
            firstWordFirstChar: toUpper,
            nextWordsFirstChar: toUpper,
        })
        return transform(model)
    }

    return {
        camelCase: camelCase,
        humanTitle: humanTitle,
    }
}

export { patterns }
