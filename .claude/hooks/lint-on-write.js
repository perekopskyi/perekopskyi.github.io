#!/usr/bin/env node
import { execSync } from 'node:child_process'

let input = ''
process.stdin.on('data', d => (input += d))
process.stdin.on('end', () => {
  const { tool_input } = JSON.parse(input)
  const file = tool_input.file_path
  if (!file || !/\.(jsx?|tsx?)$/.test(file)) process.exit(0)

  try {
    execSync(`npx eslint "${file}"`, { stdio: 'pipe' })
    process.exit(0) // clean — allow normally
  } catch (err) {
    console.log(
      JSON.stringify({
        decision: 'block',
        reason: `ESLint errors in ${file} — fix all of them before doing anything else:\n\n${err.stdout.toString()}\nEdit ${file} to resolve every lint error, then verify the file is clean.`,
      })
    )
    process.exit(0) // exit 0 so the JSON above is actually read
  }
})
