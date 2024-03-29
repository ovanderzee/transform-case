import { wordCollector } from './collect'

describe('camelCase is a capMarkedRegexpWord pattern', () => {
    test('with only common letters', () => {
        const camel = wordCollector('A sentence, text for humans.', {}).camelCase()
        const nonWordMatch = camel.match(/\W/g)
        const wordMatch = camel.match(/[a-zA-Z0-9]/g)

        expect(nonWordMatch).toBeFalsy()
        expect(wordMatch && wordMatch.length).toBe(camel.length)
    })
    test('the first word is all lowercase', () => {
        const camelTest = wordCollector('This sentence, text for humans.', {})
        const camelCase = camelTest.camelCase()
        const len1 = camelTest.words[0].length
        const firstWord = camelCase.substr(0, len1)

        expect(firstWord).toBe(firstWord.toLowerCase())
    })
    test('the next words is capitalised lowercase', () => {
        const camelTest = wordCollector('A sentence, text for humans.', {})
        const camelCase = camelTest.camelCase()
        const len1 = camelTest.words[0].length
        const len2 = camelTest.words[1].length

        const secondWord = camelCase.substr(len1, len2 - 1)
        const secondWord1 = secondWord.charAt(0)
        const secondWordN = secondWord.substr(1)

        expect(secondWord1).toBe(secondWord1.toUpperCase())
        expect(secondWordN).toBe(secondWordN.toLowerCase())
    })
    test('remove delimiter between numbers', () => {
        const camelTest = wordCollector('By the way, use version 11.7.2.', {})
        const camelCase = camelTest.camelCase()

        expect(camelCase).toBe('byTheWayUseVersion1172')
    })
})

describe('conversion of capMarkedRegexpWord patterns', () => {
    test('example matches', () => {
        const cmrwTest = wordCollector('By the way, use version 11.7.2.', {})

        expect(cmrwTest.camelCase()).toBe('byTheWayUseVersion1172')
        expect(cmrwTest.pascalCase()).toBe('ByTheWayUseVersion1172')
    })
})

describe('humanTitle is a pattern', () => {
    const title = wordCollector('A sentence, text for humans.', {}).humanTitle()

    test('with punctuation', () => {
        expect(title.includes('Sentence,')).toBeTruthy()
        expect(title.includes('Humans.')).toBeTruthy()
    })
    test('where all words start with capitals', () => {
        const wordStartMatch = title.match(/\w+/g)
        const wordStartSequence = (wordStartMatch && wordStartMatch.map((word) => word.charAt(0))) || []

        expect(wordStartSequence.join().match(/[a-z]/)).toBeFalsy()
    })
})

describe('humanSentence is a pattern', () => {
    const sentence = wordCollector('A sentence, text for humans.', {}).humanSentence()
    test('with punctuation', () => {
        expect(sentence.includes('sentence,')).toBeTruthy()
        expect(sentence.includes('humans.')).toBeTruthy()
    })
    test('where only the first word starts with a capital', () => {
        expect(sentence.match(/^[A-Z][a-z ,;:.]+/)).toBeTruthy()
    })
})

describe('snakeCase is a delimitedLowerCase pattern', () => {
    const snakeTest = wordCollector('This sentence, text for humans.', {})
    const snakeCase = snakeTest.snakeCase()
    test('with only regexp-word letters', () => {
        const nonWordMatch = snakeCase.match(/\W/g)
        const wordMatch = snakeCase.match(/[a-zA-Z0-9_]/g)

        expect(nonWordMatch).toBeFalsy()
        expect(wordMatch && wordMatch.length).toBe(snakeCase.length)
    })
    test('the first word is all lowercase', () => {
        const len1 = snakeTest.words[0].length
        const firstWord = snakeCase.substr(0, len1)

        expect(firstWord).toBe(firstWord.toLowerCase())
    })
    test('the next words are all lowercase', () => {
        const len1 = snakeTest.words[0].length
        const len2 = snakeTest.words[1].length

        const secondWord = snakeCase.substr(len1, len2 - 1)
        const secondWord1 = secondWord.charAt(0)
        const secondWordN = secondWord.substr(1)

        expect(secondWord1).toBe(secondWord1.toLowerCase())
        expect(secondWordN).toBe(secondWordN.toLowerCase())
    })
    test('remove diacritics', () => {
        const diacriticals = wordCollector('Cañón, coöperation, exposé, façade, résumé, all have diacritics', {})
        const aidIda = diacriticals.snakeCase()

        expect(aidIda).toBe('canon_cooperation_expose_facade_resume_all_have_diacritics')
    })
    test('decompose ligatures and dighraphs, replace lettervariations with their baseletter', () => {
        const compositions = wordCollector(
            // fl    ae     ij     longS h-stroke o-slash eth
            '\ufb02 \u00e6 \u0133 \u017f \u0127  \u00f8  \u00f0   ',
            {},
        )
        const omCop = compositions.snakeCase()

        expect(omCop).toBe('fl_ae_ij_s_h_o_d')
    })
})

describe('conversion of delimitedLowerCase patterns', () => {
    test('example matches', () => {
        const dlcTest = wordCollector('By the way, use version 11.7.2.', {})

        expect(dlcTest.dotCase()).toBe('by.the.way.use.version.11.7.2')
        expect(dlcTest.paramCase()).toBe('by-the-way-use-version-11-7-2')
        expect(dlcTest.pathCase()).toBe('by/the/way/use/version/11/7/2')
        expect(dlcTest.searchCase()).toBe('by+the+way+use+version+11+7+2')
        expect(dlcTest.snakeCase()).toBe('by_the_way_use_version_11_7_2')
        expect(dlcTest.spaceCase()).toBe('by the way use version 11 7 2')
    })
})

describe('conversion of other technical patterns', () => {
    test('example matches', () => {
        const otherTest = wordCollector('By the way, use version 11.7.2.', {})

        expect(otherTest.constantCase()).toBe('BY_THE_WAY_USE_VERSION_11_7_2')
        expect(otherTest.headerCase()).toBe('By-The-Way-Use-Version-11-7-2')
    })

    test('should not lead to double seperators', () => {
        const testText = wordCollector('the man &dagger; above', {})

        expect(testText.pathCase()).toBe('the/man/above')
        expect(testText.pathCase()).not.toBe('the/man//above')
    })
})
