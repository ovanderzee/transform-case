import { wordCollector } from './collect'
import { UserOptions, TransformCase } from './types'

const index = function (input: string, options?: UserOptions): TransformCase {
    if (!options) options = {}
    return wordCollector(input, options)
}

export default index
