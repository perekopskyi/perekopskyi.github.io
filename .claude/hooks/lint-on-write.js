#!/usr/bin/env node
// PostToolUse hook: lint a JS/TS file with oxlint right after Claude writes it.
// Uses the project's own binary, so it works without pnpm on PATH.
import { execFileSync } from 'node:child_process'
import { existsSync } from 'node:fs'
import { join } from 'node:path'

let input = ''
process.stdin.on('data', d => (input += d))
process.stdin.on('end', () => {
  const { tool_input } = JSON.parse(input)
  const file = tool_input?.file_path
  if (!file || !/\.(jsx?|mjs|tsx?)$/.test(file)) process.exit(0)

  const projectDir = process.env.CLAUDE_PROJECT_DIR ?? process.cwd()
  const oxlint = join(projectDir, 'node_modules', '.bin', 'oxlint')
  if (!existsSync(oxlint)) process.exit(0) // dependencies not installed yet

  try {
    // execFileSync passes the path as one argument, so file names cannot inject shell syntax.
    execFileSync(oxlint, ['--deny-warnings', file], { cwd: projectDir, stdio: 'pipe' })
    process.exit(0)
  } catch (err) {
    console.log(
      JSON.stringify({
        decision: 'block',
        reason: `oxlint problems in ${file}. Fix all of them before doing anything else:\n\n${err.stdout?.toString() ?? err.message}\nThen verify the file is clean.`,
      })
    )
    process.exit(0) // exit 0 so the JSON above is read
  }
})
