# AGENTS.md

## Project overview

This repository contains Enterwell's reusable AI agent skills. Each skill is a self-contained Markdown instruction file using the Agent Skills format.

The repository is documentation-oriented: skills are stored as Markdown files with YAML frontmatter, and there is no application runtime, package manager, build system, or test framework currently defined.

## Repository layout

- `README.md` - repository overview, skill format documentation, and the canonical list of available skills.
- `skills/` - root directory for all reusable skills.
- `skills/<skill-name>/SKILL.md` - one skill per directory, with YAML frontmatter followed by Markdown instructions.
- `LICENSE` - MIT license for the repository.

## Setup and installation

No dependency installation is required for the current repository contents.

## Development commands

No build, run, lint, format, or code-generation commands are currently defined in repository files.

When adding tooling in the future, document the exact commands in both `README.md` when user-facing and this file when agent-facing.

## Testing instructions

No automated tests or test framework are currently defined.

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

There are no nested packages, generated files, service boundaries, or runtime components currently documented.

## Security and safety rules

- Do not add secrets, tokens, credentials, private URLs, or sensitive internal values to skills or documentation.
- Do not introduce external network calls, install scripts, generated artifacts, or vendored dependencies unless explicitly required.
- Do not modify licensing information casually.
- Do not delete or rename skills without updating all references.
- Treat `README.md` as the public index for this collection.

## Pull request checklist

Before considering work complete:

- Review changed Markdown for clarity, formatting, and accurate links.
- Ensure every new skill is listed in the `README.md` "Available skills" table.
- When removing a skill, update `README.md` to remove its table entry and any other references.
- Confirm each added or changed skill has a valid `skills/<skill-name>/SKILL.md` file.
- Confirm skill directory names and frontmatter `name` values stay consistent.
- Run any validation commands if future tooling adds them; currently none are defined.

## Agent workflow rules

- Inspect existing patterns before editing skills or repository documentation.
- Prefer small, focused changes.
- Do not perform broad rewrites unless requested.
- Keep `README.md` synchronized with skill additions, removals, renames, and path changes.
- Preserve existing public skill names and paths unless the task explicitly requires changing them.
- Call out skipped checks in the final response when no automated validation exists.

## Known pitfalls

- There is currently no automated validation, so Markdown review is manual.
- The `README.md` available-skills table can become stale if skills are added or removed without updating it.

## Nested instructions

No nested `AGENTS.md` files are currently needed. Add one only if a subdirectory gains meaningfully different tooling, commands, safety rules, or ownership boundaries.
