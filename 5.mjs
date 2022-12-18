// https://adventofcode.com/2022/day/5

import { forEachLine, matchToNumbers } from './util.mjs'

let stacks1, stacks2

function move1(n, f, t) { while(n--) stacks1[t].push(stacks1[f].pop()) }
function move2(n, f, t) { stacks2[t].push(...stacks2[f].splice(-n, n)) }

const parsed = []

await forEachLine('5.txt', (l) => {
  if(!l) {
    stacks1 = parsed.pop().match(/\d+/g).map(() => [])
    stacks2 = stacks1.map(() => [])

    let s
    while(s = parsed.pop())
      s.match(/(...)\s/g).forEach((c, i) => {
        if(c = c.match(/\[(\w)\]/)) {
          stacks1[i].push(c[1])
          stacks2[i].push(c[1])
        }
      })

    return
  }

  if(stacks1) {
    const [n, f, t] = matchToNumbers(l, /^move (\d+) from (\d+) to (\d+)$/)
    move1(n, f - 1, t - 1)
    move2(n, f - 1, t - 1)
  } else
    parsed.push(l + ' ')
})

function joinLast(as) { return as.map((a) => a.at(-1)).join('') }

console.log('Part One: ', joinLast(stacks1))
console.log('Part Two: ', joinLast(stacks2))
