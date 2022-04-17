import { removePunctuation } from './render-fn'
import { NUMERIC_DELIMITERS, PUNCTUATION_CHARS } from './constants'

const NUMERIC_PUNCTUATION_COMMON = '.'
const NUMERIC_PUNCTUATION_FOREIGN = '>'
//const NUMERIC_UNIQUE = '/'
const PUNCTUATION_UNIQUE = '!'

describe('removePunctuation testing requires a sanity check', () => {
    test(`Both NUMERIC_DELIMITERS and PUNCTUATION_CHARS need to include a "${NUMERIC_PUNCTUATION_COMMON}"`, () => {
        const isCommon =
            NUMERIC_DELIMITERS.includes(NUMERIC_PUNCTUATION_COMMON) &&
            PUNCTUATION_CHARS.includes(NUMERIC_PUNCTUATION_COMMON)

        expect(isCommon).toBeTruthy()
    })

    test(`Both NUMERIC_DELIMITERS and PUNCTUATION_CHARS need to lack a "${NUMERIC_PUNCTUATION_FOREIGN}"`, () => {
        const isForeign =
            !NUMERIC_DELIMITERS.includes(NUMERIC_PUNCTUATION_FOREIGN) &&
            !PUNCTUATION_CHARS.includes(NUMERIC_PUNCTUATION_FOREIGN)

        expect(isForeign).toBeTruthy()
    })

    test(`PUNCTUATION_CHARS, but not NUMERIC_DELIMITERS includes a "${PUNCTUATION_UNIQUE}"`, () => {
        const isUnique =
            !NUMERIC_DELIMITERS.includes(PUNCTUATION_UNIQUE) && PUNCTUATION_CHARS.includes(PUNCTUATION_UNIQUE)

        expect(isUnique).toBeTruthy()
    })
})

// alle combinaties tegen elkara
// ook word_separator erbij betrekken
// PUNCTUATION_UNIQUE em NUMERIC_PUNCTUATION_FOREIGN moetn niet blijven staan ?
// als het camel of pascal is : _
// als het anders is : de delimitOut

describe('removePunctuation removes all punctuation - except the given one - from a string', () => {
    test('in normal use', () => {
        const word =
            "That means: When you use a semicolon, you use it instead of the ands, buts, and ors; you don't need both."

        expect(removePunctuation(word, ' ')).toBe(
            'That means When you use a semicolon you use it instead of the ands buts and ors you dont need both',
        )
    })

    test('using a NUMERIC_PUNCTUATION_COMMON character', () => {
        const word = 'a.2.c.4.5.6.g.h.i'

        expect(removePunctuation(word, NUMERIC_PUNCTUATION_COMMON)).toBe('a2c4.5.6ghi')
    })

    test('using a NUMERIC_PUNCTUATION_FOREIGN character', () => {
        const word = 'a>2>c>4>5>6>g>h>i'

        expect(removePunctuation(word, NUMERIC_PUNCTUATION_FOREIGN)).toBe('a>2>c>4>5>6>g>h>i')
    })

    test('using a PUNCTUATION_UNIQUE character', () => {
        const word = 'a!2!c!4!5!6!g!h!i'

        expect(removePunctuation(word, PUNCTUATION_UNIQUE)).toBe('a2c4!5!6ghi')
    })

    //     test('replacing a NUMERIC_PUNCTUATION_COMMON character', () => {
    //         const word = 'a.2.c.4.5.6.g.h.i'
    //
    //         expect(removePunctuation(word, NUMERIC_PUNCTUATION_FOREIGN)).toBe('a2c456ghi')
    //     })
    //
    //     test('replacing a PUNCTUATION_UNIQUE character', () => {
    //         const word = 'a!2!c!4!5!6!g!h!i'
    //
    //         expect(removePunctuation(word, NUMERIC_PUNCTUATION_FOREIGN)).toBe('a2c456ghi')
    //     })
    //
    //     test('replacing by a NUMERIC_PUNCTUATION_COMMON character', () => {
    //         const word = 'a>2>c>4>5>6>g>h>i'
    //
    //         expect(removePunctuation(word, NUMERIC_PUNCTUATION_COMMON)).toBe('a>2>c>4>5>6>g>h>i')
    //     })
    //
    //     test('replacing by a PUNCTUATION_UNIQUE character', () => {
    //         const word = 'a>2>c>4>5>6>g>h>i'
    //
    //         expect(removePunctuation(word, PUNCTUATION_UNIQUE)).toBe('a>2>c>4>5>6>g>h>i')
    //     })
})
