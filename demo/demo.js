window.transforms = []
var options = new Object()
window.transforms.push( [options, transformCase(`camelCasedInput`, options)] )
var options = new Object()
window.transforms.push( [options, transformCase(`A human sentence, with punctuation marks.`, options)] )

var options = new Object()
window.transforms.push( [options, transformCase(` with
    redundant whitespace`, options)] )

var options = new Object()
window.transforms.push( [options, transformCase(`CUSTOMCaseAuto`, options)] )
var options = {delimit: ['CUSTOM'],}
window.transforms.push( [options, transformCase(`CUSTOMCaseDelimiting`, options)] )
var options = {delimit: ['CUSTOM'], delimitInput: '+'}
window.transforms.push( [options, transformCase(`CUSTOMCase+Delimiting`, options)] )
var options = {delimit: ['CUSTOM', 'Case'], delimitInput: '\\'}
window.transforms.push( [options, transformCase(`CUSTOMCase\\Delimiting`, options)] )
var options = {preserve: ['CUSTOM'],}
window.transforms.push( [options, transformCase(`CUSTOMCasePreserving`, options)] )

var options = new Object()
window.transforms.push( [options, transformCase(`1Number2Chunk`, options)] )
var options = {preserve: [/Max\d{4}/ig],}
window.transforms.push( [options, transformCase(`preserveMax2006andMAX2017`, options)] )
var options = {delimitInput: '_'}
window.transforms.push( [options, transformCase(`the_numbers_stand_off_in_version_0.1.0`, options)] )
var options = {}
window.transforms.push( [options, transformCase(`Cañón, coöperation, exposé,  façade, résumé, all have diacritics`, options)] )

const addCell = function (tagName, content) {
    let cell = document.createElement(tagName)
    cell.textContent = content
    return cell
}

const readable = function (options) {
    const objEntries = Object.entries(options)
    for (let [key, value] of objEntries) {
        if (value instanceof Array) {
            for (let [index, member] of value.entries()) {
                if (member instanceof RegExp) {
                    value[index] = member.toString()
                }
            }
        }
    }
    return options
}

window.onload = function () {
    let tableWidth = (transforms.length + 1) * 112
    document.querySelector('table').style.width = tableWidth + 'px'
    const trs = document.getElementsByTagName('tr')
    for (let [index, value] of transforms.entries()) {
        let options = readable(value[0])
        let transform = value[1]
        console.log(transform)
        trs[0].appendChild(addCell('th', transform._origin.input))
        trs[1].appendChild(addCell('td', JSON.stringify(options).replace(/[{[:;]/g, '$& ').replace(/[}\]]/g, ' $&')))
        trs[2].appendChild(addCell('td', transform._phrase))
        trs[3].appendChild(addCell('td', transform.camelCase()))
        trs[4].appendChild(addCell('td', transform.pascalCase()))
        trs[5].appendChild(addCell('td', transform.humanTitle()))
        trs[6].appendChild(addCell('td', transform.humanSentence()))
        trs[7].appendChild(addCell('td', transform.dotCase()))
        trs[8].appendChild(addCell('td', transform.paramCase()))
        trs[9].appendChild(addCell('td', transform.pathCase()))
        trs[10].appendChild(addCell('td', transform.searchCase()))
        trs[11].appendChild(addCell('td', transform.snakeCase()))
        trs[12].appendChild(addCell('td', transform.spaceCase()))
        trs[13].appendChild(addCell('td', transform.constantCase()))
        trs[14].appendChild(addCell('td', transform.headerCase()))
    }
    let fixedHeadings = []
    for (let tr of trs) {
        let headCell = tr.querySelector('th')
        let headStyle = window.getComputedStyle(headCell)
        let headCopy = headCell.cloneNode(true)
        headCopy.style.width = `${headCell.clientWidth + headStyle.borderLeftWidth}px`
        let vBorder = parseInt(headStyle.borderTopWidth) + parseInt(headStyle.borderBottomWidth)
        headCopy.style.height = `${headCell.clientHeight + vBorder}px`
        fixedHeadings.push(headCopy)
    }
    for (let index = 0; index < trs.length; index++) {
        let headCell = trs[index].querySelector('th')
        let headCopy = fixedHeadings[index]
        headCopy.style.position = 'absolute'
        trs[index].insertBefore(headCopy, headCell)
    }
}
