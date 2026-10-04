#!/bin/sh
set -eu

if [ -f package-lock.json ] && node --input-type=module <<'NODE'
import { readFileSync } from 'node:fs'

const manifest = JSON.parse(readFileSync('package.json', 'utf8'))
const lock = JSON.parse(readFileSync('package-lock.json', 'utf8'))
const root = lock.packages?.['']
const sections = ['dependencies', 'devDependencies', 'optionalDependencies']
const matches = root && sections.every((section) => {
  const expected = manifest[section] ?? {}
  const actual = root[section] ?? {}
  return Object.keys(expected).length === Object.keys(actual).length
    && Object.entries(expected).every(([name, version]) => actual[name] === version)
})

process.exit(matches ? 0 : 1)
NODE
then
  npm ci
else
  npm install
fi
