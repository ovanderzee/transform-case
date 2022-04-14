import { delimitWords } from './collect-fn'
import { INTAKE_OPTIONS } from './constants'

describe('delimitWords extracts new words from alpha-numeric ](case-delimited) text', () => {
    const lineIn = '2BrothersONThe4thFloor'
    const offOptions = Object.assign({}, INTAKE_OPTIONS, {
        delimitLetterNumber: false,
        delimitLowerUpper: false,
        delimitNumberLetter: false,
        delimitUpperLower: false,
        delimitUpperUpperLower: false,
    })

    test('when a letter is followed by a number', () => {
        const options = Object.assign({}, offOptions, { delimitLetterNumber: true })
        const phrase = delimitWords(lineIn, options)

        expect(phrase).toBe('2BrothersONThe 4thFloor')
    })

    test('when a lowercase character is followed by a uppercase character', () => {
        const options = Object.assign({}, offOptions, { delimitLowerUpper: true })
        const phrase = delimitWords(lineIn, options)

        expect(phrase).toBe('2Brothers ONThe4th Floor')
    })

    test('when a number is followed by a letter', () => {
        const options = Object.assign({}, offOptions, { delimitNumberLetter: true })
        const phrase = delimitWords(lineIn, options)

        expect(phrase).toBe('2 BrothersONThe4 thFloor')
    })

    test('when a uppercase character is followed by a lowercase character', () => {
        const options = Object.assign({}, offOptions, { delimitUpperLower: true })
        const phrase = delimitWords(lineIn, options)

        expect(phrase).toBe('2B rothersONT he4thF loor')
    })

    test('when a double uppercase character is followed by a lowercase character', () => {
        const options = Object.assign({}, offOptions, { delimitUpperUpperLower: true })
        const phrase = delimitWords(lineIn, options)

        expect(phrase).toBe('2BrothersON The4thFloor')
    })

    test('when standard rules apply', () => {
        const options = INTAKE_OPTIONS
        const phrase = delimitWords(lineIn, options)

        expect(phrase).toBe('2 Brothers ON The 4 th Floor')
    })
})
