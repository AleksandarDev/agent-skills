# AGENTS.md

## Project overview

This repository contains Enterwell's reusable AI agent skills. Each skill is a self-contained Markdown instruction file using the Agent Skills format.

The repository is documentation-oriented: skills use Markdown with YAML frontmatter and may include supporting scripts. There is no application runtime, package manager, or build system. The uier monitor includes a dependency-free Node.js helper and tests using Node's built-in test runner.

## Repository layout

- `README.md` - repository overview, skill format documentation, and the canonical list of available skills.
- `skills/` - root directory for all reusable skills.
- `skills/<skill-name>/SKILL.md` - one skill per directory, with YAML frontmatter followed by Markdown instructions.
- `skills/uier-monitor/README.md` - installation, capabilities, project setup, and source attribution.
- `skills/uier-monitor/scripts/` - watcher, tests, and generator for the companion recovery skill.
- `skills/uier-monitor-script/SKILL.md` - generated helper recovery skill; do not edit directly.
- `LICENSE` - MIT license for the repository.

## Setup and installation

No dependency installation is required. The uier monitor helper and its tests require Node.js 18 or later.

## Development commands

From the repository root, regenerate the recovery skill after helper changes:

```sh
node skills/uier-monitor/scripts/build-script-skill.mjs
```

Keep the helper's `VERSION`, `MONITOR_VERSION` in its `SKILL.md`, and skill metadata aligned.

When adding tooling in the future, document the exact commands in both `README.md` when user-facing and this file when agent-facing.

## Testing instructions

For uier monitor changes, run these local checks (no uier or GitHub credentials needed):

```sh
node skills/uier-monitor/scripts/build-script-skill.mjs --check
node --check skills/uier-monitor/scripts/monitor.mjs
node --test skills/uier-monitor/scripts/monitor.test.mjs
```

For documentation-only changes, manually review changed Markdown for correctness, links, formatting, and consistency with the Agent Skills format.

## Code style and conventions

- Keep each skill in its own directory under `skills/`.
- Name skill directories with lowercase kebab-case, matching the `name` field in `SKILL.md`.
- Each skill must define `SKILL.md`.
- `SKILL.md` files should start with YAML frontmatter containing at least the skill name, description, compatibility, license, and metadata such as author and version when applicable.
- Keep skill instructions practical, concise, and agent-facing.
- Avoid inventing unsupported commands, repository structure, or behavior in skill documentation.

## Architecture notes

The repository is intentionally flat:

- `README.md` documents the collection and lists available skills.
- `skills/` contains the skill implementations.
- A skill's `SKILL.md` is the source of truth for how and when that skill should be used.

There are no nested packages or application services. The uier monitor's standalone watcher is copied into the reviewed project's Git common directory at runtime. Its companion `uier-monitor-script/SKILL.md` embeds a generated copy for installations without script files.

## Security and safety rules

- Do not add secrets, tokens, credentials, private URLs, or sensitive internal values to skills or documentation.
- Do not introduce external network calls, install scripts, generated artifacts, or vendored dependencies unless explicitly required.
- Do not modify licensing information casually.
- Preserve the AGPL-3.0-only license files and source attribution for both extracted uier monitor skills; the root MIT license does not relicense them.
- Do not run the monitor against live feedback as part of packaging or validation. Its tests use local fixtures.
- Do not delete or rename skills without updating all references.
- Treat `README.md` as the public index for this collection.

## Pull request checklist

Before considering work complete:

- Review changed Markdown for clarity, formatting, and accurate links.
- Ensure every new skill is listed in the `README.md` "Available skills" table.
- When removing a skill, update `README.md` to remove its table entry and any other references.
- Confirm each added or changed skill has a valid `skills/<skill-name>/SKILL.md` file.
- Confirm skill directory names and frontmatter `name` values stay consistent.
- Run the uier monitor checks above when changing its instructions, helper, or generated companion.

## Agent workflow rules

- Inspect existing patterns before editing skills or repository documentation.
- Prefer small, focused changes.
- Do not perform broad rewrites unless requested.
- Keep `README.md` synchronized with skill additions, removals, renames, and path changes.
- Preserve existing public skill names and paths unless the task explicitly requires changing them.
- Call out skipped checks in the final response when no automated validation exists.

## Known pitfalls

- Markdown and frontmatter review is manual; the helper tests do not prove that an agent follows skill instructions correctly.
- The companion recovery skill must be regenerated after helper changes; `--check` detects drift.
- The `README.md` available-skills table can become stale if skills are added or removed without updating it.

## Nested instructions

No nested `AGENTS.md` files are currently needed. Add one only if a subdirectory gains meaningfully different tooling, commands, safety rules, or ownership boundaries.
