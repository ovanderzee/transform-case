import { delimitNumbers } from './render-fn'

describe('delimitNumbers keeps numbers from being concatenated', () => {
    test('when numbers are separated by a numeric separator, the separator can be replaced', () => {
        const lineIn = 'We use version 4.6.1.'
        const lineOut = delimitNumbers(lineIn, '/')

        expect(lineOut).toBe('We use version 4/6/1.')
    })

    test('when numbers are separated by a numeric separator leading and trailing separators are not affected', () => {
        const lineIn = 'We use version .4.6.1.'
        const lineOut = delimitNumbers(lineIn, '/')

        expect(lineOut).toBe('We use version .4/6/1.')
    })

    test('when numbers are separated by multiple numeric separators the separator will be a single character', () => {
        const lineIn = 'We use version 4..6..1.'
        const lineOut = delimitNumbers(lineIn, '/')

        expect(lineOut).toBe('We use version 4/6/1.')
    })

    test('when numbers are separated by a numeric separator and a null delimiter was given, the separator will be an underscore', () => {
        const lineIn = 'We use version 4.6.1.'
        const lineOut = delimitNumbers(lineIn, '')

        expect(lineOut).toBe('We use version 4_6_1.')
    })

    test('when a number is separated by a non-numeric separator, there will be no change', () => {
        const lineIn = 'We use version 4#6#1.'
        const lineOut = delimitNumbers(lineIn, '/')

        expect(lineOut).toBe('We use version 4#6#1.')
    })
})
