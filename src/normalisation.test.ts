import { decodeHtmlEntities, dedupe, tidy } from './collect-fn'
import * as char from './characters'

describe('dedupe removes extraneous and doubled characters', () => {
    let delimiter!: string
    beforeEach(() => {
        delimiter = ' '
    })

    test('removes double delimiters and trailing delimiters', () => {
        const lineIn = 'A f air  weather aff air   with desp air '
        const lineOut = 'A f air weather aff air with desp air'

        expect(dedupe(lineIn, delimiter)).toBe(lineOut)
    })

    test('removes leading delimiters', () => {
        const lineIn = '     x'
        const lineOut = 'x'

        expect(dedupe(lineIn, delimiter)).toBe(lineOut)
    })

    test('removes delimiters that need to be escaped', () => {
        const lineIn = '+++Plus++means+more+than+++++++regular+once++'
        const lineOut = 'Plus+means+more+than+regular+once'
        delimiter = '+'

        expect(dedupe(lineIn, delimiter)).toBe(lineOut)
    })
})

describe('decodeHtmlEntities strips remaining characters like punctuation and symbols', () => {
    test('treat html entities as symbols, these will be unreadable anyway', () => {
        expect(decodeHtmlEntities('LEGO&reg;-stores')).toBe('LEGO®-stores')
        expect(decodeHtmlEntities('LEGO&#174;')).toBe('LEGO®')
        expect(decodeHtmlEntities('LEGO&#xae;')).toBe('LEGO®')
        // and in capitals ...
        // bleh... but appears to be granted more often
        expect(decodeHtmlEntities('LEGO&REG;-stores')).toBe('LEGO®-stores')
        expect(decodeHtmlEntities('LEGO&#xAE;')).toBe('LEGO®')
    })

    test('convert entities of accented letters to their base letter', () => {
        // a capital O with umlaut
        expect(decodeHtmlEntities('LEG&Ouml;-stores')).toBe('LEGÖ-stores')

        // not a letter
        expect(decodeHtmlEntities('LEG&dagger;-stores')).toBe('LEG†-stores')
    })
})

describe('tidy cleans out rare characters', () => {
    /* eslint-disable prettier/prettier */

    test('it replaces inner tab, nbsp etc.', () => {
        const lineIn = 'A' + char.tab + char.nbsp + char.puncsp + 'Z'
        const lineOut = 'A Z'

        expect(tidy(lineIn)).toBe(lineOut)
    })

    test('it removes trailing and leading space', () => {
        const lineIn = char.tab + char.nbsp + 'MN' + char.tab + char.nbsp
        const lineOut = 'MN'

        expect(tidy(lineIn)).toBe(lineOut)
    })

    test('it removes trailing and leading space', () => {
        const lineIn = char.esc + 'I' + char.zwsp + 'R' + char.zwj
        const lineOut = 'IR'

        expect(tidy(lineIn)).toBe(lineOut)
    })

    /* eslint-enable prettier/prettier */
})
