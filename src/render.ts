import { isExactMatch } from 'my-lib'
import { TransformOptions, RenderModel, RenderMethods } from './types'
import {
    normaliseQuotes,
    simplifyVariations,
    stripHtmlEntities,
    stripSigns,
    toLower,
    toUpper,
} from './render-fn'
import { RENDER_MODEL } from './constants'

const patternRendering = function (
    words: string[],
    options: TransformOptions,
): RenderMethods {
    /**
     * Iterative transformation
     * @private
     * @param {Object} model
     * @returns {String} transformed words
     */
    const transform = (model: RenderModel): string => {
        const transformation = words.map((word, index) => {
            word = model.preprocess(word, model.delimitOutput)
            const toPreserve = options.preserve.some((regex) =>
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
        return model.postProcess(line)
    }

    const techProcessing = {
        preprocess: function (word: string, delimitOutput: string): string {
            word = simplifyVariations(word)
            word = normaliseQuotes(word)
            word = stripHtmlEntities(word, delimitOutput)
            word = stripSigns(word, delimitOutput)
            return word
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
    const capMarkedWords = (
        firstWordFirstChar: (word: string) => string,
        nextWordsFirstChar: (word: string) => string,
    ): string => {
        const model = Object.assign({}, RENDER_MODEL, techProcessing, {
            delimitOutput: '',
            firstWordFirstChar: firstWordFirstChar,
            firstWordNextChars: toLower,
            nextWordsFirstChar: nextWordsFirstChar,
            nextWordsNextChars: toLower,
        })
        return transform(model)
    }

    const camelCase = (): string => {
        return capMarkedWords(toLower, toUpper)
    }
    const pascalCase = (): string => {
        return capMarkedWords(toUpper, toUpper)
    }

    /****************************************
     * Human, linguistic patterns
     ****************************************/

    /**
     * humanSentence pattern
     * @returns {String} transformed words
     */
    const humanSentence = (): string => {
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
    const humanTitle = (): string => {
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
     * @param {String} delimitOutput
     * @returns {String} delimitedLowerCase transformed words
     */
    const delimitedLowerCase = (delimitOutput: string): string => {
        const model = Object.assign({}, RENDER_MODEL, techProcessing, {
            delimitOutput: delimitOutput,
            firstWordFirstChar: toLower,
            firstWordNextChars: toLower,
            nextWordsFirstChar: toLower,
            nextWordsNextChars: toLower,
        })
        return transform(model)
    }

    const dotCase = (): string => {
        return delimitedLowerCase('.')
    }
    const paramCase = (): string => {
        return delimitedLowerCase('-')
    }
    const pathCase = (): string => {
        return delimitedLowerCase('/')
    }
    const searchCase = (): string => {
        return delimitedLowerCase('+')
    }
    const snakeCase = (): string => {
        return delimitedLowerCase('_')
    }
    const spaceCase = (): string => {
        return delimitedLowerCase(' ')
    }

    /****************************************
     * other variable related patterns
     ****************************************/

    /**
     * constantCase pattern
     * @param {String} delimiter
     * @returns {String} constantCase transformed words
     */
    const constantCase = (): string => {
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
    const headerCase = (): string => {
        const model = Object.assign({}, RENDER_MODEL, techProcessing, {
            delimitOutput: '-',
            firstWordFirstChar: toUpper,
            firstWordNextChars: toLower,
            nextWordsFirstChar: toUpper,
            nextWordsNextChars: toLower,
        })
        return transform(model)
    }

    const renderMethods: RenderMethods = {
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

    return renderMethods
}

export { patternRendering }
