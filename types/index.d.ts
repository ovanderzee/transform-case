interface ModuleCache {
    input: string;
    normalised: string;
    revised: string;
    isAlphaNumeric: boolean;
}
interface TransformOptions {
    delimit: RegExp[];
    preserve: RegExp[];
    delimitLetterNumber: boolean;
    delimitLowerUpper: boolean;
    delimitNumberLetter: boolean;
    delimitUpperLower: boolean;
    delimitUpperUpperLower: boolean;
    delimitInput: string;
    delimitOutput: string;
}
interface UserOptions {
    delimit?: (string | RegExp)[];
    preserve?: (string | RegExp)[];
    delimitLetterNumber?: boolean;
    delimitLowerUpper?: boolean;
    delimitNumberLetter?: boolean;
    delimitUpperLower?: boolean;
    delimitUpperUpperLower?: boolean;
    delimitInput?: string;
    delimitOutput?: string;
}
interface RenderMethods {
    camelCase: () => string;
    pascalCase: () => string;
    humanSentence: () => string;
    humanTitle: () => string;
    dotCase: () => string;
    paramCase: () => string;
    pathCase: () => string;
    searchCase: () => string;
    snakeCase: () => string;
    spaceCase: () => string;
    constantCase: () => string;
    headerCase: () => string;
}
interface TransformCase extends RenderMethods {
    _origin: ModuleCache;
    _phrase: string;
    options: TransformOptions;
    words: string[];
}

declare const index: (input: string, options?: UserOptions) => TransformCase;

export { index as default };
