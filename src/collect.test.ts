import { wordCollector } from './collect'
import * as char from './characters'

describe('there will be no unexpected characters in the output', () => {
    //                  null (ctrl)       tab (spc)    punctuation spc (spc)   esc (ctrl)       bom (ctrl)
    const input = 'A' + char.nill + 'B' + char.tab + 'C' + char.puncsp + 'D' + char.esc + 'E' + char.bom + 'F'
    const output = wordCollector(input, {})._phrase

    test('three control characters are filtered', () => {
        expect(output).toBe('AB C DEF')
        expect(input.length - output.length).toBe(3)
    })

    // \u0009-\u000D === HTAB              LF              VT             FF               CR
    const tabsAndEndings = '1' + char.tab + '2' + char.lf + '3' + char.vt + '4' + char.ff + '5' + char.cr + '6'
    const spaced = wordCollector(tabsAndEndings, {})._phrase

    test('tabs and endings may occur accidental but needed to separate words', () => {
        expect(spaced).toBe('1 2 3 4 5 6')
        expect(tabsAndEndings.length).toBe(spaced.length)
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
    test('works with RegExp, overriding the alphanumeric delimiting', () => {
        const delimit = wordCollector('tRexFace', {
            delimit: [/trex/gi],
        })

        expect(delimit.words).toStrictEqual(['tRex', 'Face'])
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
        const preserve = wordCollector('fastend fusts', {
            preserve: [/f\w{1}st/gi],
        })

        expect(preserve.humanTitle()).toBe('fast End fust S')
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

describe('the normalised line is composed depending on the entry of a delimiter', () => {
    const lineIn = '____Message___in__a___bottle____'
    const lineOut = 'Message_in_a_bottle'

    test('with the correct delimiter the line is deduped', () => {
        const delimiter = '_'
        const collection = wordCollector(lineIn, { delimitInput: delimiter })
        const delimitInput = collection.options.delimitInput
        const normalised = collection._origin.normalised

        expect(delimitInput).toBe(delimiter)
        expect(normalised).toBe(lineOut)
    })

    test('with a useless delimiter the line is not deduped', () => {
        const delimiter = '+'
        const collection = wordCollector(lineIn, { delimitInput: delimiter })
        const delimitInput = collection.options.delimitInput
        const normalised = collection._origin.normalised

        expect(delimitInput).toBe(delimiter)
        expect(normalised).toBe(lineIn)
    })

    test('without a delimiter the line is not deduped', () => {
        const delimiter = ''
        const collection = wordCollector(lineIn, { delimitInput: delimiter })
        const delimitInput = collection.options.delimitInput
        const normalised = collection._origin.normalised

        expect(delimitInput).toBe(delimiter)
        expect(normalised).toBe(lineIn)
    })
})
