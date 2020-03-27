/**
 * Helper Test for being a string with length 1
 * @private
 * @param {String} char
 * @returns {Boolean} is a number 0-9
 */
const isChar = char => {
    return Boolean(char && typeof char === 'string' && char.length === 1)
}

/**
 * Test for being a string representation of a digit
 * @private
 * @param {String} char
 * @returns {Boolean} is a number 0-9
 */
const isDigit = char => {
    return isChar(char) && Boolean(char.match(/[0-9]/))
}

/**
 * Test for being a letter
 * @private
 * @param {String} char
 * @returns {Boolaen} char is a letter
 */
const isLetter = char => {
    return isChar(char) && char.toLowerCase() !== char.toUpperCase()
}

/**
 * Test for being a lowercase letter
 * @private
 * @param {String} char
 * @returns {Boolaen} char is a lower-case letter
 */
const isLower = char => {
    return (
        isChar(char) &&
        char === char.toLowerCase() &&
        char !== char.toUpperCase()
    )
}

/**
 * Test for being an uppercase letter
 * @private
 * @param {String} char
 * @returns {Boolaen} char is a upper-case letter
 */
const isUpper = char => {
    return (
        isChar(char) &&
        char === char.toUpperCase() &&
        char !== char.toLowerCase()
    )
}

/**
 * Test for being a string consisting of letters and/or digits
 * @private
 * @param {String} line
 * @returns {Boolean} consists of letters and/or digits only
 */
const isPureAlphaNumeric = line => {
    return (
        line &&
        line.split &&
        !line.split('').some(char => {
            return !(isLetter(char) || isDigit(char))
        })
    )
}

/**
 * Check for a match covering the string entirely
 * @private
 * @param {String} word
 * @param {RegExp} regex
 * @returns {Boolean}
 */
const isExactMatch = (word, regex) => {
    const match = word.match(regex)
    const result = match && match[0] === word
    return result
}

export { isDigit, isLetter, isLower, isUpper, isPureAlphaNumeric, isExactMatch }
