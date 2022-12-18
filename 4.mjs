// https://adventofcode.com/2022/day/4

import { testFunction, forEachLine, matchToNumbers } from './util.mjs'

function fullyContains([a1, a2, b1, b2]) {
  return Math.abs(Math.sign(a1 - b1) + Math.sign(a2 - b2)) < 2
}

testFunction(fullyContains, [
  [[2,4,6,8], false],
  [[2,3,4,5], false],
  [[5,7,7,9], false],
  [[2,8,3,7], true],
  [[6,6,4,6], true],
  [[2,6,4,8], false],
  [[1,4,1,3], true],
  [[1,3,1,4], true],
  [[1,4,2,4], true],
  [[2,4,1,4], true]
])

function overlaps([a1, a2, b1, b2]) {
  return fullyContains([Math.min(a1, b1), Math.min(a2, b2), Math.max(a1, b1),  Math.max(a1, b1)])
}

testFunction(overlaps, [
  [[2,4,6,8], false],
  [[2,3,4,5], false],
  [[5,7,7,9], true],
  [[2,8,3,7], true],
  [[6,6,4,6], true],
  [[2,6,4,8], true],
  [[1,4,1,3], true],
  [[1,3,1,4], true],
  [[1,4,2,4], true],
  [[2,4,1,4], true],
  [[2,4,1,2], true],
  [[3,4,1,2], false]
])

let res1 = 0, res2 = 0

await forEachLine('4.txt', (l) => {
  const d = matchToNumbers(l, /^(\d+)-(\d+),(\d+)-(\d+)$/)
  res1 += fullyContains(d)
  res2 += overlaps(d)
})

console.log('Part One: ', res1)
console.log('Part Two: ', res2)
