# josehernandez.dev

Personal portfolio built with Next.js (App Router). Every page is generated as static HTML at build time.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build; also checks content/projects.json
```

## Where things live

| Path | What it holds |
| --- | --- |
| `content/projects.json` | Selected Work: every project, its page, and its sections |
| `content/site.json` | Name, bio, email, links, stack, the home page's quick commands |
| `terminal/commands/` | One file per terminal command |
| `public/` | `portrait.jpg` and `resume.pdf` go here |
| `app/globals.css` | All styles |

## Editing Selected Work

Everything about a project is in `content/projects.json`. The file has a schema (`projects.schema.json`), so VS Code autocompletes fields and flags mistakes as you type.

- **Order** in the file is display order. Numbers (01, 02…) come from position, so reorder by moving entries.
- **Add a project:** copy an entry and change `slug` (its URL: `/work/<slug>`, lowercase letters, digits, dashes), `title`, and the rest. It shows up in the list, on its own page, in "next project", and in the terminal's `projects`, `about <n>` and `open <n>`.
- **Remove a project:** delete its entry.
- **Sections** (Overview, Approach…) are a list per project. Each has a `label`, the `file` and `command` shown in the terminal panel, the `output` lines, and the `prose` paragraph under it. Add, remove or rename them freely.
- **Output lines** are plain strings, or `{ "text": "…", "tone": "accent" | "dim" | "error" }` for color.

`npm run build` stops with a message naming the project if a required field is missing or two projects share a slug.

## Adding a terminal command

1. Create `terminal/commands/<name>.ts`:

   ```ts
   import { defineCommand } from '../types';
   import { accent, dim } from '../lines';

   export default defineCommand({
     name: 'hobbies',
     description: 'what I do for fun',
     run: () => [accent('photography'), 'gaming', dim('and sleeping, occasionally')],
   });
   ```

2. Register it in `terminal/commands/index.ts`: import it and add it to the `commands` list. `help` picks it up automatically, in list order.

What a command can do:

- **Return** a string, a colored line (`accent`, `dim`, `error` from `../lines`), an array of either, or nothing. `\n` inside a string breaks the line.
- **Read** `ctx.args` (words after the name), `ctx.rest` (the raw text after the name), `ctx.site`, `ctx.projects` and `ctx.commands`.
- **Act** with `ctx.navigate('/work/leak-watch')` and `ctx.clear()`.
- **Be async**: return a Promise, e.g. to `fetch` something. A thrown error is printed in red.
- **Options:** `usage` (shown in `help` instead of the name, e.g. `'open <n>'`), `aliases` (other names), `hidden: true` (works but stays out of `help`).

`projectFromArgs(ctx, 'verb')` in `terminal/lines.ts` turns `2` or `leak-watch` into a project, or a usage line when it doesn't match.
