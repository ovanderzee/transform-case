# TransformCase

Here is the case and seperation transformer that is of use
when your texts do not confine to english.
TransformCase will work with diacritics as well as curly quotes.

## Install

Install the package as npm package. Provided are
a umd-formatted file (dist folder)
and an es-module (module folder):

    "dist/transformCase.js",
    "module/transformCase.js",

## Usage

transformCase('markMyWords').humanTitle() will render: 'Mark My Words'.

transformCase('A sentence, text for humans.').camelCase() will render: 'aSentenceTextForHumans'.

## Demo

.../transform-case/demo/demo.html
