// Copyright 2026 Xiuyue Zhao (Elara)
// SPDX-License-Identifier: Apache-2.0
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readdir, readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';

const root = fileURLToPath(new URL('../', import.meta.url));
const readJSON = async path => JSON.parse(await readFile(join(root, path), 'utf8'));
const manifest = await readJSON('EXPORT-MANIFEST.json');
const pkg = await readJSON('package.json');

// Match the distribution's .gitignore, and omit Git metadata and the manifest itself.
async function listContent(relative = '') {
  const files = [];
  for (const entry of await readdir(join(root, relative), { withFileTypes: true })) {
    if (['.git', 'node_modules', '.DS_Store'].includes(entry.name) || entry.name.endsWith('.log')) continue;
    const path = relative ? `${relative}/${entry.name}` : entry.name;
    if (path === 'EXPORT-MANIFEST.json') continue;
    if (entry.isDirectory()) files.push(...await listContent(path));
    else files.push(path);
  }
  return files;
}

assert.equal(manifest.distribution, pkg.name, 'Manifest distribution must match package.json');
assert.equal(manifest.version, pkg.version, 'Manifest version must match package.json');
assert.deepEqual(
  manifest.files.map(file => file.path).sort(),
  (await listContent()).sort(),
  'Manifest must list every distribution file exactly once',
);

for (const file of manifest.files) {
  const bytes = await readFile(join(root, file.path));
  assert.equal(bytes.length, file.bytes, `${file.path}: byte count mismatch`);
  assert.equal(createHash('sha256').update(bytes).digest('hex'), file.sha256, `${file.path}: SHA256 mismatch`);
}

console.log(`Manifest: ${manifest.files.length} content files match their byte counts and SHA256 hashes.`);
