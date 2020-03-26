import { TransformCase } from '../src/collect'

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
    test('works with RegExp', () => {
        const preserve = new TransformCase('preserveMax2006andMAX2017', {
            preserve: [/Max\d{4}/gi],
        })

        expect(preserve.humanTitle()).toBe('Preserve Max2006 And MAX2017')
    })
})

describe('delimiting a puts up an array of words', () => {
    test('to deal with a letter - number transition', () => {
        const delimitCase = new TransformCase('max14')

        expect(delimitCase.words[0]).toBe('max')
        expect(delimitCase.words[1]).toBe('14')
    })
    test('to deal with a lowercase - uppercase transition', () => {
        const delimitCase = new TransformCase('OnScreenness')

        expect(delimitCase.words[0]).toBe('On')
        expect(delimitCase.words[1]).toBe('Screenness')
    })
    test('to deal with a number - letter transition', () => {
        const delimitCase = new TransformCase('4Four')

        expect(delimitCase.words[0]).toBe('4')
        expect(delimitCase.words[1]).toBe('Four')
    })
    test('to deal with a uppercase - lowercase transition', () => {
        const delimitCase = new TransformCase('Capital')

        expect(delimitCase.words[0]).toBe('Capital')
    })
    test('to deal with a uppercase - uppercase plus lowercase transition', () => {
        const delimitCase = new TransformCase('ISpy')

        expect(delimitCase.words[0]).toBe('I')
        expect(delimitCase.words[1]).toBe('Spy')
    })
})
