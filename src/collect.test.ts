import { wordCollector } from './collect'
import * as char from './characters'

describe('there will be no unexpected characters in the output', () => {
    //                     null             tab           punctuation sp           esc          bom
    const input = 'A' + char.nill + 'B' + char.tab + 'C' + char.puncsp + 'D' + char.esc + 'E' + char.bom + 'F'
    const output = wordCollector(input, {})._phrase

    test('two whitespace characters become ordinary space', () => {
        expect(output.indexOf(char.tab)).toBe(-1)
        expect(output.indexOf(char.puncsp)).toBe(-1)
        expect(output.match(/[ ]/g).length).toBe(2)
    })
    test('two control characters are filtered', () => {
        expect(output.indexOf(char.nill)).toBe(-1)
        expect(output.indexOf(char.esc)).toBe(-1)
        expect(input.length - output.length).toBe(2)
    })
    test('marker characters stay there', () => {
        expect(output.includes(char.bom)).toBeTruthy()
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
        const delimit = wordCollector('pingpongpang', {
            delimit: [/p\w{1}ng/gi],
        })

        expect(delimit.humanTitle()).toBe('Ping Pong Pang')
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
