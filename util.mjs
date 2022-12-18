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


