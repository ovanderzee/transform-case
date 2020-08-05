import { TransformCase } from '../src/collect'

describe('there will be no unexpected characters in the output', () => {
    //               null   tab    esc   0space  bom
    const input = 'A\u0000B\u0009C\u001bD\u200bE\ufeffF'
    const output = new TransformCase(input).phrase

    test('all whitespace becomes an ordinary space', () => {
        // about tab and zero-space
        expect(input.match(/\s/g).length).toBe(output.match(/ /g).length)
    })
    test('control characters are filtered', () => {
        // about null, zero-space and byte-order-mark
        expect(input.length).toBeGreaterThan(output.length)
    })

    const untrimmed = `  X
      Y    `
    const trimmed = new TransformCase(untrimmed).phrase
    test('leading and trailing spaces are trimmed', () => {
        expect(trimmed).toBe('X Y')
    })
})

describe('delimit keeps a lettercombination as a word and processes according to the pattern', () => {
    const normal = new TransformCase('Forever thinking')
    test('to be a word', () => {
        expect(normal.humanTitle()).toBe('Forever Thinking')
    })
    const delimit = new TransformCase('Forever thinking', { delimit: ['thin'] })
    test('to be a word', () => {
        expect(delimit.humanTitle()).toBe('Forever Thin King')
    })
    test('to be converted to fit the pattern', () => {
        expect(delimit.camelCase()).toBe('foreverThinKing')
    })
    test('works with RegExp', () => {
        const delimit = new TransformCase('fastfistfust', {
            delimit: [/f\w{1}st/gi],
        })

        expect(delimit.snakeCase()).toBe('fast_fist_fust')
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
    test('not to deal with a uppercase - lowercase transition', () => {
        const delimitCase = new TransformCase('Capital')

        expect(delimitCase.words[0]).toBe('Capital')
    })
    test('not to deal with a uppercase - uppercase transition', () => {
        const delimitCase = new TransformCase('CSSFontFaceRule')

        expect(delimitCase.words[0]).toBe('CSS')
    })
    test('to deal with a uppercase - uppercase plus lowercase transition', () => {
        const delimitCase = new TransformCase('ISpy')

        expect(delimitCase.words[0]).toBe('I')
        expect(delimitCase.words[1]).toBe('Spy')
    })
})
