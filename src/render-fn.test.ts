import { normaliseQuotes, simplifyVariations, toUpper, toLower } from './render-fn'

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
