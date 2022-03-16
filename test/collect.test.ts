import { wordCollector } from '../src/collect'

describe('there will be no unexpected characters in the output', () => {
    //               null   tab    esc   0space  bom
    const input = 'A\u0000B\u0009C\u001bD\u200bE\ufeffF'
    const output = wordCollector(input, {})._phrase

    test('all whitespace becomes an ordinary space', () => {
        // about tab and escape isn't it?
        expect(input.match(/\s/g).length).toBe(output.match(/ /g).length)
    })
    test('control characters are filtered', () => {
        // about null, zero-space and byte-order-mark
        expect(input.length).toBeGreaterThan(output.length)
    })

    const untrimmed = `  X
      Y    `
    const trimmed = wordCollector(untrimmed, {})._phrase
    test('leading and trailing spaces are trimmed', () => {
        expect(trimmed).toBe('X Y')
    })
})

describe(`delimit option keeps a lettercombination as a word
        and processes it according to the pattern`, () => {
    const line = 'Forever thinking'
    const normal = wordCollector(line, {})
    test('outcome without options', () => {
        expect(normal.humanTitle()).toBe('Forever Thinking')
    })
    const delimit = wordCollector(line, { delimit: ['thin'] })
    test('to create a new word', () => {
        expect(delimit.humanTitle()).toBe('Forever Thin King')
        expect(delimit.camelCase()).toBe('foreverThinKing')
    })
    test('works with RegExp', () => {
        const delimit = wordCollector('fastfistfust', {
            delimit: [/f\w{1}st/gi],
        })

        expect(delimit.humanTitle()).toBe('Fast Fist Fust')
    })
})

describe(`preserve option keeps a lettercombination as a word
        and protects it's case`, () => {
    const line = 'DOMRectangle'
    const normal = wordCollector(line, {})
    test('outcome without options', () => {
        expect(normal.humanTitle()).toBe('DOM Rectangle')
        expect(normal.pascalCase()).toBe('DomRectangle')
    })
    const preserve = wordCollector('DOMRectangle', { preserve: ['angle'] })
    test('to create a new word', () => {
        expect(preserve.humanTitle()).toBe('DOM Rect angle')
    })
    test('to be tricky in a cap-marked transformation', () => {
        expect(preserve.pascalCase()).toBe('DomRectangle')
    })
    test('works with RegExp', () => {
        const preserve = wordCollector('fastfistfust', {
            preserve: [/f\w{1}st/gi],
        })

        expect(preserve.humanTitle()).toBe('fast fist fust')
    })
})

describe('delimiting a puts up an array of words', () => {
    test('to deal with a letter - number transition', () => {
        const delimitCase = wordCollector('max14', {})

        expect(delimitCase.words[0]).toBe('max')
        expect(delimitCase.words[1]).toBe('14')
    })
    test('to deal with a lowercase - uppercase transition', () => {
        const delimitCase = wordCollector('OnScreenness', {})

        expect(delimitCase.words[0]).toBe('On')
        expect(delimitCase.words[1]).toBe('Screenness')
    })
    test('to deal with a number - letter transition', () => {
        const delimitCase = wordCollector('4Four', {})

        expect(delimitCase.words[0]).toBe('4')
        expect(delimitCase.words[1]).toBe('Four')
    })
    test('not to deal with a uppercase - lowercase transition', () => {
        const delimitCase = wordCollector('Capital', {})

        expect(delimitCase.words[0]).toBe('Capital')
    })
    test('not to deal with a uppercase - uppercase transition', () => {
        const delimitCase = wordCollector('CSSFontFaceRule', {})

        expect(delimitCase.words[0]).toBe('CSS')
    })
    test('to deal with a uppercase - uppercase plus lowercase transition', () => {
        const delimitCase = wordCollector('ISpy', {})

        expect(delimitCase.words[0]).toBe('I')
        expect(delimitCase.words[1]).toBe('Spy')
    })
})
