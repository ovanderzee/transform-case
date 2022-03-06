export type Chunk = string | Regex

export interface RuntimeOptions {
    delimit: Chunk[],
    preserve: Chunk[],
    delimitLetterNumber: boolean,
    delimitLowerUpper: boolean,
    delimitNumberLetter: boolean,
    delimitUpperLower: boolean,
    delimitUpperUpperLower: boolean,
    delimitInput: string,
    delimitOutput: string,
}

export interface UserOptions {
    delimit?: Chunk[],
    preserve?: Chunk[],
    delimitLetterNumber?: boolean,
    delimitLowerUpper?: boolean,
    delimitNumberLetter?: boolean,
    delimitUpperLower?: boolean,
    delimitUpperUpperLower?: boolean,
    delimitInput?: string,
    delimitOutput?: string,
}

export interface RenderModel {
    preprocess: (words: string[]) => string[]
    postProcess: (line: string) => string
    firstWordFirstChar: (word: string) => string
    firstWordNextChars: (word: string) => string
    nextWordsFirstChar: (word: string) => string
    nextWordsNextChars: (word: string) => string
}

export interface RunData {
    input: string,
    standardised: string[],
    isAlphaNumeric: boolean,
}
