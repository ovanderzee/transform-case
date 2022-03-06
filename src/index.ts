import { TransformCase } from './collect'
import { UserOptions } from './types'

var index = function (input: string, options: UserOptions) {
    if (!options) options = {}
    return TransformCase(input, options)
}

export default index
