import { removePunctuation } from './render-fn'

describe('purpose of removePunctuation', () => {
    test(`Leading punctuation is removed`, () => {
        const word = '...dots'

        expect(removePunctuation(word, ' ')).toBe('dots')
    })

    test(`Trailing punctuation is removed`, () => {
        const word = 'semicolon;'

        expect(removePunctuation(word, ' ')).toBe('semicolon')
    })

    test(`Punctuation between letters is removed`, () => {
        const word = "l'europe"

        // when replacement is in PUNCTUATION_CHARS
        expect(removePunctuation(word, '-')).toBe('leurope')
        // when replacement is found character
        expect(removePunctuation(word, "'")).toBe('leurope')
        // when replacement is in SEPERATION_CHARS
        expect(removePunctuation(word, '_')).toBe('leurope')
        // when replacement is in NUMERIC_DELIMITERS
        expect(removePunctuation(word, '/')).toBe('leurope')
    })

    test(`Punctuation between a letter and a cypher is removed`, () => {
        const word = 'super-70s'

        expect(removePunctuation(word, ' ')).toBe('super70s')
    })

    test(`Punctuation between a cypher and a letter is removed`, () => {
        const word = '99-luftballons'

        expect(removePunctuation(word, '-')).toBe('99luftballons')
    })

    test(`Repetitive punctuation between letters is removed`, () => {
        const word = 'word-a-word'

        expect(removePunctuation(word, '/')).toBe('wordaword')
    })
})

describe('removePunctuation works different between digits', () => {
    test(`Punctuation between numbers is removed when replacement is punctuation`, () => {
        const word = '2.71'

        expect(removePunctuation(word, ';')).toBe('271')
    })

    test(`Punctuation between numbers is removed when replacement is a seperator`, () => {
        const word = '2.71'

        expect(removePunctuation(word, '=')).toBe('271')
    })

    test(`Punctuation between numbers stays when replacement is the found character`, () => {
        const word = '2.71'

        expect(removePunctuation(word, '.')).toBe('2.71')
    })

    test(`Punctuation between numbers stays when replacement is a numeric delimiter`, () => {
        const word = '2.71'

        expect(removePunctuation(word, '/')).toBe('2.71')
    })
})
