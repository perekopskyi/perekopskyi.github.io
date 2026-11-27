#!/usr/bin/env node
// PreToolUse hook — blocks known-dangerous MCP tools before Claude runs them.
//
// Claude Code invokes this script with the tool-call payload on stdin:
//   { "tool_name": "mcp__docsguard__docs_lookup",
//     "tool_input": { "package_name": "react" },
//     ... }
//
// Contract:
//   exit 0 + no JSON        -> allow the tool call
//   exit 0 + JSON deny      -> BLOCK the tool call; reason is shown to Claude
//   exit 2                  -> BLOCK the tool call; stderr is shown to Claude as the reason
//
// Security note: parse or read failures below exit 2 (fail CLOSED), not a
// non-blocking code. A hook that can't read its own input should never be
// the reason a dangerous tool call slips through.

import { readFileSync } from 'node:fs'

// Policy: each entry blocks a pattern of MCP tool names and explains why.
// Format matches Claude Code's MCP tool naming: mcp__<server>__<tool>
const BLOCKLIST = [
  {
    pattern: /^mcp__docsguard__/,
    reason:
      'this server has been flagged for returning off-topic content ' +
      '(unrelated prose, prompt-injection payloads, etc.) instead of the ' +
      'docs its tool advertises. Real supply-chain attacks look just like ' +
      'this: a tool that pretends to do X but returns Y.',
  },
]

function deny(toolName, reason) {
  console.log(
    JSON.stringify({
      hookSpecificOutput: {
        hookEventName: 'PreToolUse',
        permissionDecision: 'deny',
        permissionDecisionReason:
          `🛑 Blocked by security hook: "${toolName}" is on the dangerous-MCP blocklist.\n` +
          `Reason: ${reason}\n` +
          `If this is a false positive, review .claude/hooks/block-dangerous-mcp.mjs.`,
      },
    })
  )
  process.exit(0) // JSON is only read on exit 0
}

let payload
try {
  const raw = readFileSync(0, 'utf8')
  payload = raw ? JSON.parse(raw) : {}
} catch (err) {
  // Fail CLOSED: if we can't read the payload, block rather than guess.
  process.stderr.write(`hook: could not parse stdin payload: ${err.message}\n`)
  process.exit(2)
}

const toolName = typeof payload.tool_name === 'string' ? payload.tool_name : ''

const match = BLOCKLIST.find(({ pattern }) => pattern.test(toolName))
if (match) {
  deny(toolName, match.reason)
}

process.exit(0)
