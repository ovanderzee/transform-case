import { TransformCase } from './transformCase'

var index = function(input, options) {
    if (!options) options = {}
    return new TransformCase(input, options)
}

export default index
