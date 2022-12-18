// https://adventofcode.com/2022/day/6

import { testFunction, forEachLine } from './util.mjs'

function incCharCount(m, c) {
  m.set(c, (m.get(c) || 0) + 1)
}

function decCharCount(m, c) {
  const o = m.get(c)
  if(!o) throw Error(`Should not happen: ${m} ${c}`)
  o === 1 ? m.delete(c) : m.set(c, o - 1)
}

function identifyStart(n, s) {
  let i = 0, j = -1
  const m = new Map()
  while(++j < n) incCharCount(m, s[j])

  do {
    if(m.size === n) return j
    decCharCount(m, s[i++])
    incCharCount(m, s[j++])
  } while(j <= s.length)

  throw Error(`Should not happen: ${s}`)
}

const identifyPacketStart = identifyStart.bind(null, 4),
  identifyMessageStart = identifyStart.bind(null, 14)

testFunction(identifyPacketStart, [
  ['mjqjpqmgbljsphdztnvjfqwrcgsmlb', 7],
  ['bvwbjplbgvbhsrlpgdmjqwftvncz', 5],
  ['nppdvjthqldpwncqszvftbrmjlhg', 6],
  ['nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg', 10],
  ['zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw', 11],
  ['abababaxy', 9]
])

testFunction(identifyMessageStart, [
  ['mjqjpqmgbljsphdztnvjfqwrcgsmlb', 19],
  ['bvwbjplbgvbhsrlpgdmjqwftvncz', 23],
  ['nppdvjthqldpwncqszvftbrmjlhg', 23],
  ['nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg', 29],
  ['zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw', 26]
])

await forEachLine('6.txt', (l) => {
  console.log('Part One: ', identifyPacketStart(l))
  console.log('Part Two: ', identifyMessageStart(l))
})
