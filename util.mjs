import { open } from 'node:fs/promises'

export async function forEachLine(p, f) {
  for await (const l of (await open(p)).readLines())
    f(l)
}

import { describe, it } from 'node:test'
import assert from 'node:assert/strict'

export function testFunction(f, as) {
  describe(`Test function ${f.name}`, () => {
    for(const [i, o] of as)
      it(
        `for ${JSON.stringify(i)} should return ${JSON.stringify(o)}`,
        () => assert.strictEqual(f(i), o))
  })
}

export function toNumbers(a) { return a.map(Number).filter((x) => !isNaN(x)) }
export function matchToNumbers(s, r) { return toNumbers(s.match(r)) }

