export interface TransformOptions {
    delimit: RegExp[]
    preserve: RegExp[]
    delimitLetterNumber: boolean
    delimitLowerUpper: boolean
    delimitNumberLetter: boolean
    delimitUpperLower: boolean
    delimitUpperUpperLower: boolean
    delimitInput: string
    delimitOutput: string
}

export interface UserOptions {
    delimit?: (string | RegExp)[]
    preserve?: (string | RegExp)[]
    delimitLetterNumber?: boolean
    delimitLowerUpper?: boolean
    delimitNumberLetter?: boolean
    delimitUpperLower?: boolean
    delimitUpperUpperLower?: boolean
    delimitInput?: string
    delimitOutput?: string
}

export interface RenderModel {
    delimitOutput: string
    preprocess: (line: string, delimiter: string) => string
    postProcess: (line: string) => string
    firstWordFirstChar: (word: string) => string
    firstWordNextChars: (word: string) => string
    nextWordsFirstChar: (word: string) => string
    nextWordsNextChars: (word: string) => string
}

export interface RenderMethods {
    camelCase: () => string
    pascalCase: () => string
    humanSentence: () => string
    humanTitle: () => string
    dotCase: () => string
    paramCase: () => string
    pathCase: () => string
    searchCase: () => string
    snakeCase: () => string
    spaceCase: () => string
    constantCase: () => string
    headerCase: () => string
}

export interface TransformCase extends RenderMethods {
    _origin: any
    _phrase: any
    options: TransformOptions
    words: string[]
}
