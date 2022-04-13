import { dedupe, tidy } from './collect-fn'
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
