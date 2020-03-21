import {
    isDigit,
    isLetter,
    isLower,
    isUpper,
    isPureAlphaNumeric,
} from '../src/utilities'

describe('isDigit accepts any integer number', () => {
    test('isDigit accepts numbers 0 through 9 as string', () => {
        expect(isDigit('0')).toBeTruthy()
        expect(isDigit('4')).toBeTruthy()
    })

    test('isDigit rejects other numbers as string', () => {
        expect(isDigit('11')).toBeFalsy()
        expect(isDigit('NaN')).toBeFalsy()
        expect(isDigit('Infinity')).toBeFalsy()
    })

    test('isDigit rejects numbers as number', () => {
        expect(isDigit('-4')).toBeFalsy()
        expect(isDigit(0)).toBeFalsy()
        expect(isDigit(4)).toBeFalsy()
        expect(isDigit(17)).toBeFalsy()
        expect(isDigit(NaN)).toBeFalsy()
        expect(isDigit(Infinity)).toBeFalsy()
    })

    test('isDigit rejects other types', () => {
        expect(isDigit('')).toBeFalsy()
        expect(isDigit(' ')).toBeFalsy()
        expect(isDigit('xyz')).toBeFalsy()
        expect(isDigit(false)).toBeFalsy()
        expect(isDigit(true)).toBeFalsy()
        expect(isDigit(undefined)).toBeFalsy()
        expect(isDigit([])).toBeFalsy()
        expect(isDigit([1, 2, 3])).toBeFalsy()
        expect(isDigit(null)).toBeFalsy()
        expect(isDigit({})).toBeFalsy()
        expect(isDigit({ a: 1, b: 2, c: 3 })).toBeFalsy()
    })
})

describe('isLetter accepts any letter', () => {
    test('isLetter accepts lowercases, uppercases, including those with diacritics', () => {
        expect(isLetter('a')).toBeTruthy()
        expect(isLetter('A')).toBeTruthy()
        expect(isLetter('á')).toBeTruthy()
        expect(isLetter('Á')).toBeTruthy()
        // expect(isLetter('a´')).toBeTruthy()
        // expect(isLetter('A´')).toBeTruthy()
    })

    test('isLetter rejects other strings', () => {
        expect(isLetter('')).toBeFalsy()
        expect(isLetter(' ')).toBeFalsy()
        expect(isLetter('@')).toBeFalsy()
        expect(isLetter('_')).toBeFalsy()
        expect(isLetter('xyz')).toBeFalsy()
        expect(isLetter('0')).toBeFalsy()
        expect(isLetter('4')).toBeFalsy()
        expect(isLetter('17')).toBeFalsy()
    })

    test('isLetter rejects other types', () => {
        expect(isLetter(0)).toBeFalsy()
        expect(isLetter(4)).toBeFalsy()
        expect(isLetter(17)).toBeFalsy()
        expect(isLetter(false)).toBeFalsy()
        expect(isLetter(true)).toBeFalsy()
        expect(isLetter(undefined)).toBeFalsy()
        expect(isLetter([])).toBeFalsy()
        expect(isLetter([1, 2, 3])).toBeFalsy()
        expect(isLetter(null)).toBeFalsy()
        expect(isLetter({})).toBeFalsy()
        expect(isLetter({ a: 1, b: 2, c: 3 })).toBeFalsy()
    })
})

describe('isLower accepts uppercase letters', () => {
    test('isLower accepts uppercase letters, including those with diacritics', () => {
        expect(isLower('a')).toBeTruthy()
        expect(isLower('á')).toBeTruthy()
        // expect(isLower('a´')).toBeTruthy()
    })

    test('isLower rejects other strings', () => {
        expect(isLower('')).toBeFalsy()
        expect(isLower(' ')).toBeFalsy()
        expect(isLower('@')).toBeFalsy()
        expect(isLower('_')).toBeFalsy()
        expect(isLower('xyz')).toBeFalsy()
        expect(isLower('XYZ')).toBeFalsy()
        expect(isLower('0')).toBeFalsy()
        expect(isLower('4')).toBeFalsy()
        expect(isLower('17')).toBeFalsy()
    })

    test('isLower rejects other types', () => {
        expect(isLower(0)).toBeFalsy()
        expect(isLower(4)).toBeFalsy()
        expect(isLower(17)).toBeFalsy()
        expect(isLower(false)).toBeFalsy()
        expect(isLower(true)).toBeFalsy()
        expect(isLower(undefined)).toBeFalsy()
        expect(isLower([])).toBeFalsy()
        expect(isLower([1, 2, 3])).toBeFalsy()
        expect(isLower(null)).toBeFalsy()
        expect(isLower({})).toBeFalsy()
        expect(isLower({ a: 1, b: 2, c: 3 })).toBeFalsy()
    })
})

describe('isUpper accepts uppercase letters', () => {
    test('isUpper accepts uppercase letters, including those with diacritics', () => {
        expect(isUpper('A')).toBeTruthy()
        expect(isUpper('Á')).toBeTruthy()
        // expect(isUpper('A´')).toBeTruthy()
    })

    test('isUpper rejects other strings', () => {
        expect(isUpper('')).toBeFalsy()
        expect(isUpper(' ')).toBeFalsy()
        expect(isUpper('@')).toBeFalsy()
        expect(isUpper('_')).toBeFalsy()
        expect(isUpper('xyz')).toBeFalsy()
        expect(isUpper('XYZ')).toBeFalsy()
        expect(isUpper('0')).toBeFalsy()
        expect(isUpper('4')).toBeFalsy()
        expect(isUpper('17')).toBeFalsy()
    })

    test('isUpper rejects other types', () => {
        expect(isUpper(0)).toBeFalsy()
        expect(isUpper(4)).toBeFalsy()
        expect(isUpper(17)).toBeFalsy()
        expect(isUpper(false)).toBeFalsy()
        expect(isUpper(true)).toBeFalsy()
        expect(isUpper(undefined)).toBeFalsy()
        expect(isUpper([])).toBeFalsy()
        expect(isUpper([1, 2, 3])).toBeFalsy()
        expect(isUpper(null)).toBeFalsy()
        expect(isUpper({})).toBeFalsy()
        expect(isUpper({ a: 1, b: 2, c: 3 })).toBeFalsy()
    })
})

describe('isPureAlphaNumeric accepts any combination of letters or digits', () => {
    test('isPureAlphaNumeric accepts any combination of letters or digits, regardsless of casing and diacritics', () => {
        expect(isPureAlphaNumeric('abcdefg')).toBeTruthy()
        expect(isPureAlphaNumeric('Abcdefg')).toBeTruthy()
        expect(isPureAlphaNumeric('ABCDEFG')).toBeTruthy()
        expect(isPureAlphaNumeric('1234567')).toBeTruthy()
        expect(isPureAlphaNumeric('abc123')).toBeTruthy()
        expect(isPureAlphaNumeric('Abc123')).toBeTruthy()
        expect(isPureAlphaNumeric('ABC123')).toBeTruthy()
        expect(isPureAlphaNumeric('123abc')).toBeTruthy()
        expect(isPureAlphaNumeric('123Abc')).toBeTruthy()
        expect(isPureAlphaNumeric('123ABC')).toBeTruthy()
    })

    test('isPureAlphaNumeric rejects other strings', () => {
        expect(isPureAlphaNumeric('')).toBeFalsy()
        expect(isPureAlphaNumeric('abc ')).toBeFalsy()
        expect(isPureAlphaNumeric(' 123')).toBeFalsy()
        expect(isPureAlphaNumeric('@A1')).toBeFalsy()
        expect(isPureAlphaNumeric('c3_')).toBeFalsy()
    })

    test('isPureAlphaNumeric rejects other types', () => {
        expect(isPureAlphaNumeric(0)).toBeFalsy()
        expect(isPureAlphaNumeric(4)).toBeFalsy()
        expect(isPureAlphaNumeric(17)).toBeFalsy()
        expect(isPureAlphaNumeric(false)).toBeFalsy()
        expect(isPureAlphaNumeric(true)).toBeFalsy()
        expect(isPureAlphaNumeric(undefined)).toBeFalsy()
        expect(isPureAlphaNumeric([])).toBeFalsy()
        expect(isPureAlphaNumeric([1, 2, 3])).toBeFalsy()
        expect(isPureAlphaNumeric(null)).toBeFalsy()
        expect(isPureAlphaNumeric({})).toBeFalsy()
        expect(isPureAlphaNumeric({ a: 1, b: 2, c: 3 })).toBeFalsy()
    })
})
