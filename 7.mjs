// https://adventofcode.com/2022/day/7

import { forEachLine } from './util.mjs'

const UP = Symbol('..'),
  SIZE = Symbol('size'),
  parse = /^(?:(?:\$ (cd|ls))|(\d+)|dir)(?: (.*))?$/,
  allDirs = [],
  atMost100kDirs = new Set()

function newDir(up) {
  const d = { [UP]: up, [SIZE]: 0 }
  allDirs.push(d)
  atMost100kDirs.add(d)
  return d
}

function incSize(d, s) {
  while(d) {
    (d[SIZE] += s) >= 1e5 && atMost100kDirs.delete(d)
    d = d[UP]
  }
}

const ROOT = newDir()
let curr = ROOT

await forEachLine('7.txt', (l) => {
  const [_, cmd, size, name] = l.match(parse)
  switch(cmd) {
    case 'cd':
      switch(name) {
        case '/':
          curr = ROOT
          break
        case '..':
          curr = curr[UP]
          break
        default:
          curr = curr[name] ??= newDir(curr)
      }
      break
    case 'ls':
      break
    default:
      size
        ? incSize(curr, curr[name] = Number(size))
        : (curr[name] = newDir(curr))
  }
})

let res1 = 0
for(const d of atMost100kDirs) res1 += d[SIZE]
console.log('Part One: ', res1)

const needed = 3e7 - (7e7 - ROOT[SIZE])
let res2 = Infinity
for(const d of allDirs) {
  const s = d[SIZE]
  s >= needed && s < res2 && (res2 = s)
}
console.log('Part Two: ', res2)
