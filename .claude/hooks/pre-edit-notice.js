#!/usr/bin/env node
let input = ''
process.stdin.on('data', d => (input += d))
process.stdin.on('end', () => {
  const { tool_input } = JSON.parse(input)
  const file = tool_input.file_path?.split('/').pop() ?? 'a file'
  console.log(
    JSON.stringify({
      systemMessage: `✍️[hook]✍️ About to modify ${file}`,
      hookSpecificOutput: { hookEventName: 'PreToolUse', permissionDecision: 'allow' },
    })
  )
})
