import { normaliseQuotes, simplifyVariations, stripSigns, toUpper, toLower } from './render-fn'

describe('normaliseQuotes converts curly quotes and backtics', () => {
    test('in case of backticks', () => {
        const specials = '`special`'

        expect(normaliseQuotes(specials)).toBe("'special'")
    })

    test('in case of curly single quotes', () => {
        const singles = '‘curly’'

        expect(normaliseQuotes(singles)).toBe("'curly'")
    })

    test('in case of curly double quotes', () => {
        const doubles = '“curly”'

        expect(normaliseQuotes(doubles)).toBe('"curly"')
    })
})

describe('simplifyVariations breaks down combined characters', () => {
    test('in case of diacritics', () => {
        const withDiacritics = 'Cañón, coöperation, exposé, façade, all have diacritics'

        expect(simplifyVariations(withDiacritics)).toBe('Canon, cooperation, expose, facade, all have diacritics')
    })

    test('in case of ligatures', () => {
        const withLigatures = 'Een \u0133sje kostte \ufb020,75'

        expect(simplifyVariations(withLigatures)).toBe('Een ijsje kostte fl0,75')
    })
})

describe('stripSigns strips remaining characters like punctuation and symbols', () => {
    test('in case of replacement (delimited lowercase)', () => {
        const sep = '+'

        expect(stripSigns('_draak_', sep)).toBe('draak')
        expect(stripSigns('__draak__', sep)).toBe('draak')
        expect(stripSigns('_d_raak', sep)).toBe('d+raak')
        expect(stripSigns('__d__raak__', sep)).toBe('d+raak')
    })

    test('in case of removal (cap-marked words)', () => {
        const sep = ''

        expect(stripSigns('_draak_', sep)).toBe('draak')
        expect(stripSigns('__draak__', sep)).toBe('draak')
        expect(stripSigns('_d_raak', sep)).toBe('draak')
        expect(stripSigns('__d__raak__', sep)).toBe('draak')
    })

    test('use cases', () => {
        const sep = '/'

        expect(stripSigns("nine'o'clock", sep)).toBe('nine/o/clock')
        expect(stripSigns('semicolon;', sep)).toBe('semicolon')
    })

    test('hence decimal separators are lost for cap-marked-word transformations', () => {
        const sep = ''

        expect(stripSigns('3.1415926535', sep)).toBe('31415926535')
        expect(stripSigns('1,23e+45', sep)).toBe('123e45')
    })
})

describe('Simple case conversion should not regard the source casing', () => {
    const allCaps = 'UPPER'
    const allCommon = 'lower'
    const capitalised = 'Capitol'
    const mixedCase = 'MiXeD'

    test('when converting to uppercase', () => {
        expect(toUpper(allCaps)).toBe('UPPER')
        expect(toUpper(allCommon)).toBe('LOWER')
        expect(toUpper(capitalised)).toBe('CAPITOL')
        expect(toUpper(mixedCase)).toBe('MIXED')
    })

    test('when converting to lowercase', () => {
        expect(toLower(allCaps)).toBe('upper')
        expect(toLower(allCommon)).toBe('lower')
        expect(toLower(capitalised)).toBe('capitol')
        expect(toLower(mixedCase)).toBe('mixed')
    })
})
