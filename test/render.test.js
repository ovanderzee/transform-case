import { TransformCase } from '../src/collect'

describe('camelCase is a capMarkedRegexpWord pattern', () => {
    test('with only common letters', () => {
        const camel = new TransformCase(
            'A sentence, text for humans.',
        ).camelCase()
        const nonWordMatch = camel.match(/\W/g)
        const wordMatch = camel.match(/[a-zA-Z0-9]/g)

        expect(nonWordMatch).toBeFalsy()
        expect(wordMatch.length).toBe(camel.length)
    })
    test('the first word is all lowercase', () => {
        const camelTest = new TransformCase('This sentence, text for humans.')
        const camelCase = camelTest.camelCase()
        const len1 = camelTest.words[0].length
        const firstWord = camelCase.substr(0, len1)

        expect(firstWord).toBe(firstWord.toLowerCase())
    })
    test('the next words is capitalised lowercase', () => {
        const camelTest = new TransformCase('A sentence, text for humans.')
        const camelCase = camelTest.camelCase()
        const len1 = camelTest.words[0].length
        const len2 = camelTest.words[1].length

        const secondWord = camelCase.substr(len1, len2 - 1)
        const secondWord1 = secondWord.charAt(0)
        const secondWordN = secondWord.substr(1)

        expect(secondWord1).toBe(secondWord1.toUpperCase())
        expect(secondWordN).toBe(secondWordN.toLowerCase())
    })
    test('replace delimiter between numbers with an underscore to help seperate them', () => {
        const camelTest = new TransformCase('We use version 11.7.2.')
        const camelCase = camelTest.camelCase()

        expect(camelCase).toBe('weUseVersion11_7_2')
    })
})

describe('conversion of capMarkedRegexpWord patterns', () => {
    test('example matches', () => {
        const cmrwTest = new TransformCase('We use version 11.7.2.')

        expect(cmrwTest.camelCase()).toBe('weUseVersion11_7_2')
        expect(cmrwTest.pascalCase()).toBe('WeUseVersion11_7_2')
    })
})

describe('humanTitle is a pattern', () => {
    test('with punctuation', () => {
        const title = new TransformCase(
            'A sentence, text for humans.',
        ).humanTitle()

        expect(title.includes('.')).toBeTruthy()
    })
    test('where all words start with capitals', () => {
        const title = new TransformCase(
            'A sentence, text for humans.',
        ).humanTitle()
        const wordStartSequence = title
            .match(/\w+/g)
            .map(word => word.charAt(0))

        expect(wordStartSequence.join().match(/[a-z]/)).toBeFalsy()
    })
})

describe('humanSentence is a pattern', () => {
    test('with punctuation', () => {
        const sentence = new TransformCase(
            'A sentence, text for humans.',
        ).humanSentence()

        expect(sentence.includes('.')).toBeTruthy()
    })
    test('where only the first word starts with a capital', () => {
        const sentence = new TransformCase(
            'A sentence, text for humans.',
        ).humanSentence()

        expect(sentence.match(/^[A-Z][a-z ,;:.]+/)).toBeTruthy()
    })
})

describe('snakeCase is a delimitedLowerCase pattern', () => {
    test('with only regexp-word letters', () => {
        const snake = new TransformCase(
            'A sentence, text for humans.',
        ).snakeCase()
        const nonWordMatch = snake.match(/\W/g)
        const wordMatch = snake.match(/[a-zA-Z0-9_]/g)

        expect(nonWordMatch).toBeFalsy()
        expect(wordMatch.length).toBe(snake.length)
    })
    test('the first word is all lowercase', () => {
        const snakeTest = new TransformCase('This sentence, text for humans.')
        const snakeCase = snakeTest.snakeCase()
        const len1 = snakeTest.words[0].length
        const firstWord = snakeCase.substr(0, len1)

        expect(firstWord).toBe(firstWord.toLowerCase())
    })
    test('the next words are all lowercase', () => {
        const snakeTest = new TransformCase('A sentence, text for humans.')
        const snakeCase = snakeTest.snakeCase()
        const len1 = snakeTest.words[0].length
        const len2 = snakeTest.words[1].length

        const secondWord = snakeCase.substr(len1, len2 - 1)
        const secondWord1 = secondWord.charAt(0)
        const secondWordN = secondWord.substr(1)

        expect(secondWord1).toBe(secondWord1.toLowerCase())
        expect(secondWordN).toBe(secondWordN.toLowerCase())
    })
    test('remove diacritics', () => {
        const diacriticals = new TransformCase(
            'Cañón, coöperation, exposé, façade, résumé, all have diacritics',
        )
        const aidIda = diacriticals.snakeCase()

        expect(aidIda).toBe(
            'canon_cooperation_expose_facade_resume_all_have_diacritics',
        )
    })
    test('decompose ligatures and dighraphs, replace lettervariations with their baseletter', () => {
        const compositions = new TransformCase(
            // fl    ae     ij     longS h-stroke o-slash eth
            '\ufb02 \u00e6 \u0133 \u017f \u0127  \u00f8  \u00f0   ',
        )
        const omCop = compositions.snakeCase()

        expect(omCop).toBe('fl_ae_ij_s_h_o_d')
    })
})

describe('conversion of delimitedLowerCase patterns', () => {
    test('example matches', () => {
        const dlcTest = new TransformCase('This sentence, text for humans.')

        expect(dlcTest.dotCase()).toBe('this.sentence.text.for.humans')
        expect(dlcTest.paramCase()).toBe('this-sentence-text-for-humans')
        expect(dlcTest.pathCase()).toBe('this/sentence/text/for/humans')
        expect(dlcTest.searchCase()).toBe('this+sentence+text+for+humans')
        expect(dlcTest.snakeCase()).toBe('this_sentence_text_for_humans')
        expect(dlcTest.spaceCase()).toBe('this sentence text for humans')
    })
})

describe('conversion of other technical patterns', () => {
    test('example matches', () => {
        const otherTest = new TransformCase('This sentence, text for humans.')

        expect(otherTest.constantCase()).toBe('THIS_SENTENCE_TEXT_FOR_HUMANS')
        expect(otherTest.headerCase()).toBe('This-Sentence-Text-For-Humans')
    })
})
