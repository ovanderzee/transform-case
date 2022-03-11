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
    _origin: any;
    _phrase: any;
    options: TransformOptions;
    words: string[];
}

declare const index: (input: string, options?: UserOptions | undefined) => TransformCase;

export { index as default };
