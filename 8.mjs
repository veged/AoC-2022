// https://adventofcode.com/2022/day/8

import { forEachLine } from './util.mjs'

const trees = []

await forEachLine(
  '8.txt',
  (l) => trees.push([...l].map((h, i) => ({ height: Number(h), id : `${i}x${trees.length}` }))))

const X = trees[0].length,
  Y = trees.length,
  visible = new Set(),
  scores = trees.map((r) => r.map(() => 1))

let maxScore = 0

function checkOne({ height, id }, max, d) {
  if(height > max[d]) {
    visible.add(id)
    max[d] = height
  }
}

function check(X, Y, getTree) {
  for(let j = 0; j < Y; j++) {
    const max = { left: -Infinity, right: -Infinity }

    for(
      let left = 0, leftTo = X,
        right = leftTo - 1, rightTo = left - 1;
      left < leftTo || right > rightTo;
      left++, right--) {

      const leftTree = getTree(left, j),
        rightTree = getTree(right, j)

      checkOne(leftTree, max, 'left')
      checkOne(rightTree, max, 'right')

      leftTree.height >= max.right && (leftTo = right)
      rightTree.height >= max.left && (rightTo = left)
    }
  }
}

function updateScore(i, j, c) {
  const r = scores[j][i] *= c
  r > maxScore && (maxScore = r)
  return r
}

function calcOne(heights, height) {
  let r = 0, i = heights.length
  while(--i >= 0) {
    r++
    if(heights[i] >= height) break
  }
  return r
}

function calc(X, Y, getTree, updateScore) {
  for(let j = 0; j < Y; j++) {
    const heightsLeft = [], heightsRight = []

    for(
      let left = 0, leftTo = X,
        right = leftTo - 1, rightTo = left - 1;
      left < leftTo || right > rightTo;
      left++, right--) {

      const { height: leftHeight } = getTree(left, j),
        { height: rightHeight } = getTree(right, j)

      updateScore(left, j, calcOne(heightsLeft, leftHeight))
      heightsLeft.push(leftHeight)

      updateScore(right, j, calcOne(heightsRight, rightHeight))
      heightsRight.push(rightHeight)
    }
  }
}

function getTree(i, j) { return trees[j][i] }
function getTreeFlip(i, j) { return getTree(j, i) }

check(X, Y, getTree)
check(Y, X, getTreeFlip)

calc(X, Y, getTree, updateScore)
calc(Y, X, getTreeFlip, (i, j, c) => updateScore(j, i, c))

console.log('Part One: ', visible.size)
console.log('Part Two: ', maxScore)
