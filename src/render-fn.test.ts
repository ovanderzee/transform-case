import { normaliseQuotes, simplifyVariations, toUpper, toLower } from './render-fn'

describe('normaliseQuotes converts curly quotes and backtics', () => {
    test('in case of backticks', () => {
        const specials = 'these `special` quotes'

        expect(normaliseQuotes(specials)).toBe("these 'special' quotes")
    })

    test('in case of curly single quotes', () => {
        const curlies = 'single ‘curly’ quotes'

        expect(normaliseQuotes(curlies)).toBe("single 'curly' quotes")
    })

    test('in case of curly double quotes', () => {
        const curlies = 'double “curly” quotes'

        expect(normaliseQuotes(curlies)).toBe('double "curly" quotes')
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
