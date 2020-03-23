import { TransformCase } from '../src/transformCase'

describe('delimit keeps a lettercombination as a word and processes according to the pattern', () => {
    const delimit = new TransformCase('CSSFontFaceRule', { delimit: ['CSS'] })
    test('to be a word', () => {
        expect(delimit.humanTitle()).toBe('CSS Font Face Rule')
    })
    test('to be converted to fit the pattern', () => {
        expect(delimit.camelCase()).toBe('cssFontFaceRule')
    })
})

describe('preserve keeps a lettercombination as a word and protects the case', () => {
    const preserve = new TransformCase('DOMRect', { preserve: ['DOM'] })
    test('to be a word', () => {
        expect(preserve.humanTitle()).toBe('DOM Rect')
        expect(preserve.camelCase()).toBe('DOMRect')
    })
    test('to break a pattern rule', () => {
        expect(preserve.camelCase()).not.toBe('domRect')
    })
})

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
