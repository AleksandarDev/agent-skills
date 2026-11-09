# AGENTS.md

## Project overview

This repository contains Enterwell's reusable AI agent skills. Each skill is a self-contained Markdown instruction file using the Agent Skills format.

The repository is documentation-oriented: skills use Markdown with YAML frontmatter and may include supporting scripts and tests. There is no repository-wide application runtime, package manager, or build system. Each skill documents its own requirements and commands.

## Repository layout

- `README.md` - repository overview, skill format documentation, and the canonical list of available skills.
- `skills/` - root directory for all reusable skills.
- `skills/<skill-name>/SKILL.md` - one skill per directory, with YAML frontmatter followed by Markdown instructions.
- `skills/<skill-name>/README.md` - optional installation, usage, requirements, and maintenance documentation.
- `skills/<skill-name>/scripts/` - optional executable helpers, tests, and generators.
- `skills/<skill-name>/references/` - optional detailed instructions loaded when needed.
- `skills/<skill-name>/assets/` - optional templates and other output resources.
- `skills/<skill-name>/LICENSE` - optional license copy for standalone distribution.
- `LICENSE` - MIT license for the repository.

## Setup and installation

No repository-wide dependency installation is required. Check the skill's documentation for any runtimes, external tools, credentials, or dependencies it needs.

## Development commands

There are no repository-wide build or run commands. Document exact helper, test, and generation commands in the relevant skill's documentation, including where to run them from. Keep skill-specific paths and commands out of this collection-wide guide.

When changing generated resources, edit their source, run the documented generator, and keep any related versions and checksums aligned.

## Testing instructions

For executable helper changes, run the affected skill's documented syntax checks, tests, and generated-resource consistency checks. Prefer local fixtures that do not require credentials or mutate external services.

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

Each skill owns its supporting resources and documents any relationships with other skills. Generated files must identify their source and regeneration command. Do not assume that a skill's runtime, installation layout, or external integrations apply to the rest of the collection.

## Security and safety rules

- Do not add secrets, tokens, credentials, private URLs, or sensitive internal values to skills or documentation.
- Do not introduce external network calls, install scripts, generated artifacts, or vendored dependencies unless explicitly required.
- Do not modify licensing information casually.
- Keep license metadata, standalone license copies, and source attribution consistent with the repository license and any explicit rights-holder authorization.
- Packaging or validating a skill does not authorize running its workflow against live services.
- Do not delete or rename skills without updating all references.
- Treat `README.md` as the public index for this collection.

## Pull request checklist

Before considering work complete:

- Review changed Markdown for clarity, formatting, and accurate links.
- Ensure every new skill is listed in the `README.md` "Available skills" table.
- When removing a skill, update `README.md` to remove its table entry and any other references.
- Confirm each added or changed skill has a valid `skills/<skill-name>/SKILL.md` file.
- Confirm skill directory names and frontmatter `name` values stay consistent.
- Run the affected skills' documented checks, including generation checks when applicable.

## Agent workflow rules

- Inspect existing patterns before editing skills or repository documentation.
- Prefer small, focused changes.
- Do not perform broad rewrites unless requested.
- Keep `README.md` synchronized with skill additions, removals, renames, and path changes.
- Preserve existing public skill names and paths unless the task explicitly requires changing them.
- Call out skipped checks in the final response when no automated validation exists.

## Known pitfalls

- Markdown and frontmatter review is manual; helper tests do not prove that an agent follows skill instructions correctly.
- Generated resources can become stale when their source changes; use the skill's documented generation and consistency checks.
- The `README.md` available-skills table can become stale if skills are added or removed without updating it.

## Nested instructions

No nested `AGENTS.md` files are currently needed. Add one only if a subdirectory gains meaningfully different tooling, commands, safety rules, or ownership boundaries.
