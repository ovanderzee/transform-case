import {
    // dedupe,
    // tidy,
    // insertDelimiter,
    // delimitWords,
    delimitChunks,
} from '../src/collect-fn'

describe('delimitChunks extracts new words from delimited text', () => {
    const lineIn = 'A fair weather affair with despair'

    test('without delimitable chunk', () => {
        const chunks = []

        expect(delimitChunks(lineIn, chunks, ' ')).toBe(lineIn)
    })

    test('with a null-string all character are delimited', () => {
        const chunks = ['']

        expect(delimitChunks(lineIn, chunks, ' ')).toBe(
            'A f a i r w e a t h e r a f f a i r w i t h d e s p a i r',
        )
    })

    test('with one delimitable chunk', () => {
        const chunks = ['air']

        expect(delimitChunks(lineIn, chunks, ' ')).toBe(
            'A f air weather aff air with desp air',
        )
    })

    test('with a regular expression', () => {
        const chunks = [/w[aeiou]+th/g]

        expect(delimitChunks(lineIn, chunks, ' ')).toBe(
            'A fair weath er affair with despair',
        )
    })

    test('with multiple chunks', () => {
        const chunks = ['air', /w[aeiou]+th/g]

        expect(delimitChunks(lineIn, chunks, ' ')).toBe(
            'A f air weath er aff air with desp air',
        )
    })

    test('with overlapping chunk first', () => {
        const chunks = ['fair', 'air']

        expect(delimitChunks(lineIn, chunks, ' ')).toBe(
            'A fair weather af fair with desp air',
        )
    })

    test('with overlapping chunk last', () => {
        const chunks = ['air', 'fair']

        expect(delimitChunks(lineIn, chunks, ' ')).toBe(
            'A f air weather aff air with desp air',
        )
    })
})
