import { TransformCase } from './collect'

var index = function(input, options) {
    if (!options) options = {}
    return TransformCase(input, options)
}

export default index
