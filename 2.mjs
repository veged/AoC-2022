// https://adventofcode.com/2022/day/2

import { forEachLine } from './util.mjs'

const RULES1 = {
    A: {
      X: 1 + 3,
      Y: 2 + 6,
      Z: 3 + 0,
    },
    B: {
      X: 1 + 0,
      Y: 2 + 3,
      Z: 3 + 6,
    },
    C: {
      X: 1 + 6,
      Y: 2 + 0,
      Z: 3 + 3,
    },
  },
  RULES2 = {
    A: {
      X: 3 + 0,
      Y: 1 + 3,
      Z: 2 + 6,
    },
    B: {
      X: 1 + 0,
      Y: 2 + 3,
      Z: 3 + 6,
    },
    C: {
      X: 2 + 0,
      Y: 3 + 3,
      Z: 1 + 6,
    },
  }

let res1 = 0, res2 = 0

await forEachLine('2.txt', ([p1, _, p2]) => {
  res1 += RULES1[p1][p2]
  res2 += RULES2[p1][p2]
})

console.log('Part One: ', res1)
console.log('Part Two: ', res2)
