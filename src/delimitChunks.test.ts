import { delimitChunks } from '../src/collect-fn'

describe('delimitChunks extracts new words from delimited text', () => {
    const lineIn = 'A fair weather affair with despair'
    let delimiter!: string
    beforeEach(() => {
        delimiter = ' '
    })

    test('without delimitable chunk', () => {
        const chunks: RegExp[] = []
        const revised = delimitChunks(lineIn, chunks, delimiter)

        expect(revised).toBe(lineIn)
    })

    test('with one delimitable chunk', () => {
        const chunks = [/air/g]
        const revised = delimitChunks(lineIn, chunks, delimiter)
        const expected = 'A f air weather aff air with desp air'

        expect(revised).toBe(expected)
    })

    test('with a regular expression', () => {
        const chunks = [/w[aeiou]+th/g]
        const revised = delimitChunks(lineIn, chunks, delimiter)
        const expected = 'A fair weath er affair with despair'

        expect(revised).toBe(expected)
    })

    test('with multiple chunks', () => {
        const chunks = [/air/g, /w[aeiou]+th/g]
        const revised = delimitChunks(lineIn, chunks, delimiter)
        const expected = 'A f air weath er aff air with desp air'

        expect(revised).toBe(expected)
    })

    test('with overlapping chunk first', () => {
        const chunks = [/fair/g, /air/g]
        const revised = delimitChunks(lineIn, chunks, delimiter)
        const expected = 'A fair weather af fair with desp air'

        expect(revised).toBe(expected)
    })

    test('with overlapping chunk last', () => {
        const chunks = [/air/g, /fair/g]
        const revised = delimitChunks(lineIn, chunks, delimiter)
        const expected = 'A f air weather aff air with desp air'

        expect(revised).toBe(expected)
    })
})
