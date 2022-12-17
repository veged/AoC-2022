// https://adventofcode.com/2022/day/1

import { readFileSync } from 'node:fs'

const INPUT = String(readFileSync('1.txt')).split('\n\n')

function toNumbers(l) { return l.split('\n').map(Number) }
function sum(a) { return a.reduce((r, x) => r + x, 0) }
function toNumbersSum(l) { return sum(toNumbers(l)) }
function max(a) { return Math.max.apply(null, a) }

console.log('Part One: ', max(INPUT.map(toNumbersSum)))

console.log( 'Part Two: ', sum(INPUT.map(toNumbersSum).sort((a, b) => b - a).slice(0, 3)))


