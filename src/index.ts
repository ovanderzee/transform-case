import { TransformCase } from './collect'
import { UserOptions } from './types'

const index = function (input: string, options: UserOptions) {
    if (!options) options = {}
    return TransformCase(input, options)
}

export default index
