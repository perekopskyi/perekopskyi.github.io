---
paths:
  - "src/components/**/*.tsx"
---

# Components rules

All React components must:

- Define a TypeScript `interface` for their props named `<ComponentName>Props`.
- Be exported as a named export (never a default export). Helper components used by only one file stay unexported.
- Use arrow functions.
- Render content from `src/data/*` instead of hard-coding copy.
- Render the same markup on the server and the client (they are prerendered): no `Date`, `window`, `localStorage`, or media-query checks during render.
