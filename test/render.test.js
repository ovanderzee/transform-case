import { TransformCase } from '../src/collect'

describe('camelCase is a pattern', () => {
    test('with only common letters', () => {
        const camel = new TransformCase(
            'A sentence, text for humans.',
        ).camelCase()
        const nonWordMatch = camel.match(/\W/g)
        const wordMatch = camel.match(/[a-zA-Z0-9]/g)

        expect(nonWordMatch).toBeFalsy()
        expect(wordMatch.length).toBe(camel.length)
    })
    test('the first word is all lowercase', () => {
        const camelTest = new TransformCase('This sentence, text for humans.')
        const camelCase = camelTest.camelCase()
        const len1 = camelTest.words[0].length
        const firstWord = camelCase.substr(0, len1)

        expect(firstWord).toBe(firstWord.toLowerCase())
    })
    test('the next words is capitalised lowercase', () => {
        const camelTest = new TransformCase('A sentence, text for humans.')
        const camelCase = camelTest.camelCase()
        const len1 = camelTest.words[0].length
        const len2 = camelTest.words[1].length

        const secondWord = camelCase.substr(len1, len2 - 1)
        const secondWord1 = secondWord.charAt(0)
        const secondWordN = secondWord.substr(1)

        expect(secondWord1).toBe(secondWord1.toUpperCase())
        expect(secondWordN).toBe(secondWordN.toLowerCase())
    })
})

describe('humanTitle is a pattern', () => {
    test('with punctuation', () => {
        const title = new TransformCase(
            'A sentence, text for humans.',
        ).humanTitle()

        expect(title.includes('.')).toBeTruthy()
    })
    test('where all words start with capitals', () => {
        const title = new TransformCase(
            'A sentence, text for humans.',
        ).humanTitle()
        const wordStartSequence = title
            .match(/\w+/g)
            .map(word => word.charAt(0))

        expect(wordStartSequence.join().match(/[a-z]/)).toBeFalsy()
    })
})
