// https://adventofcode.com/2022/day/3

import { open } from 'node:fs/promises'
import { describe, it } from 'node:test'
import assert from 'node:assert/strict'

function testFunction(f, as) {
  describe(`Test function ${f.name}`, () => {
    for(const [i, o] of as)
      it(
        `for ${JSON.stringify(i)} should return ${JSON.stringify(o)}`,
        () => assert.strictEqual(f(i), o))
  })
}

function getFailed(l) {
  let i = l.length
  const s = new Set(), m = i / 2

  while(--i >= m) s.add(l[i])

  do if(s.has(l[i])) return l[i]
  while(i--)

  throw Error(`Should not happen: ${l}`)
}

testFunction(getFailed, [
  ['vJrwpWtwJgWrhcsFMMfFFhFp', 'p'],
  ['jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL', 'L'],
  ['PmmdzqPrVvPwwTWBwg', 'P'],
  ['wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn', 'v'],
  ['ttgJtRGJQctTZtZT', 't'],
  ['CrZsJsPPZsGzwwsLwLmpwMDw', 's'],
  ['QBLPSLQQWmLtTBtBSjZfsbwbHzpjGzHfpzzw', 'j'],
  ['GtSbbtlttvvtBvtHBmqqNqVVwsVgCmRw', 'B']
])

function getPriority(c) {
  c = c.charCodeAt(0)
  return c - (c >= 97 ? 96 : 38)
}

testFunction(getPriority, [
  ['p', 16],
  ['L', 38],
  ['P', 42],
  ['v', 22],
  ['t', 20],
  ['s', 19],
  ['r', 18],
  ['Z', 52]
])

function getMask(l, i) {
  let m = ''
  while(m.length < l)
    m += Number(i === undefined || m.length === i)
  return Number('0x' + m)
}

function findCommon(ls) {
  const o = {}, max = getMask(ls.length)
  for(let i = ls.length - 1; i >= 0; i--) {
    const m = getMask(ls.length, i)
    for(const c of ls[i]) {
      o[c] |= m
      if(o[c] === max) return c
    }
  }
  throw Error(`Should not happen: ${ls}`)
}

testFunction(findCommon, [
  [
    [
      'vJrwpWtwJgWrhcsFMMfFFhFp',
      'qHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL',
      'PmmdzqPrVvPwwTWBwg'
    ],
    'r'
  ],
  [
    [
      'wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn',
      'ttgJtRGJQctTZtZT',
      'CrZsJsPPZsGzwwsLwLmpwMDw'
    ],
    'Z'
  ]
])

let res1 = 0, res2 = 0
const group = []

for await (const l of (await open('3.txt')).readLines()) {
  res1 += getPriority(getFailed(l))
  group.push(l)
  if(group.length === 3) {
    res2 += getPriority(findCommon(group))
    group.length = 0
  }
}

console.log('Part One: ', res1)
console.log('Part Two: ', res2)
