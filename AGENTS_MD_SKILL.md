# Skill: Generate a Project-Specific AGENTS.md

## Purpose

Use this skill to create or improve a root-level `AGENTS.md` file for a software project. The file should help future AI coding agents understand how to work safely and effectively in the repository.

`AGENTS.md` is not a replacement for `README.md`. It should contain concise, durable, repo-specific instructions for agents: how to set up the project, run tests, understand the structure, follow conventions, and avoid risky changes.

## When to use this skill

Use this skill when the user asks to:

- Create an `AGENTS.md` file.
- Improve or audit an existing `AGENTS.md` file.
- Generate AI-agent instructions for a repository.
- Convert repo setup, testing, and contribution knowledge into agent-facing documentation.
- Prepare a project for local AI coding agents such as Codex, Claude Code, Cursor agents, or similar tools.

## Inputs

Expected inputs may include:

- Access to the project repository.
- Existing `README.md`, docs, or contribution guides.
- Package manager files.
- Build, test, lint, formatter, framework, Docker, and CI configuration files.
- Source and test directory structure.
- Existing agent instruction files such as `AGENTS.md`, `CLAUDE.md`, `.cursorrules`, Cursor rules, Copilot instructions, or similar.

If running inside the project, inspect the repository directly. If the repository is not available, ask the user for the relevant files or produce a template clearly marked as needing verification.

## Core principles

1. Do not invent facts.
2. Prefer exact commands over vague descriptions.
3. Keep instructions practical and repo-specific.
4. Avoid duplicating the README unless the information is useful for coding agents.
5. Mark uncertain items as `Verify:` rather than guessing.
6. Do not include secrets, tokens, credentials, or sensitive internal values.
7. Keep the document concise, usually under about 150 lines.
8. Preserve useful existing instructions, but remove outdated or speculative content.
9. Align the final checklist with CI whenever CI configuration exists.
10. Document safety boundaries around generated files, migrations, destructive commands, external services, and production data.

## Repository inspection process

When running in the project context, inspect the following before writing `AGENTS.md`:

1. Top-level files and directories.
2. README files and docs.
3. Package and dependency files, such as:
   - `package.json`
   - `pnpm-lock.yaml`
   - `yarn.lock`
   - `package-lock.json`
   - `pyproject.toml`
   - `requirements.txt`
   - `uv.lock`
   - `Cargo.toml`
   - `go.mod`
   - `pom.xml`
   - `build.gradle`
   - `Gemfile`
   - `composer.json`
   - `mix.exs`
4. Build and task files, such as:
   - `Makefile`
   - `Taskfile.yml`
   - `justfile`
   - npm scripts
   - framework CLIs
5. Test configuration and test directories.
6. Linting and formatting configuration.
7. Type checking configuration.
8. Docker, Compose, devcontainer, or local service files.
9. CI workflows, especially GitHub Actions, GitLab CI, CircleCI, Buildkite, or similar.
10. Deployment and infrastructure files, if relevant.
11. Environment examples, such as `.env.example`.
12. Source entry points and major architectural directories.
13. Generated-code locations and generation commands.
14. Existing agent instruction files.
15. Subdirectories that may require their own nested `AGENTS.md`.

## Required `AGENTS.md` structure

Create the root-level `AGENTS.md` using these sections in this order.

### 1. Project overview

Briefly describe:

- What the project does.
- The project type, such as web app, API service, library, CLI, mobile app, monorepo, infrastructure repo, or data project.
- Main languages, frameworks, and runtimes.
- Important runtime assumptions.

### 2. Repository layout

List important directories and files. Focus on what an AI coding agent needs before editing.

Include:

- Source directories.
- Test directories.
- Configuration directories.
- Documentation directories.
- Generated, vendored, or build output directories.
- Package or app boundaries in a monorepo.

### 3. Setup and installation

Document exact setup commands discovered from the repository.

Include:

- Dependency installation.
- Required runtimes or package managers when clearly implied.
- Environment file setup.
- Database or service initialization, if documented.

Use `Verify:` for commands that are likely but not confirmed.

### 4. Development commands

Document commands for:

- Running the app locally.
- Starting local services.
- Builds.
- Watch mode.
- Database migrations.
- Code generation.
- Documentation or Storybook.
- Package-specific workflows in monorepos.

### 5. Testing instructions

Document:

- Full test suite command.
- Focused test command.
- Unit, integration, and end-to-end test commands.
- Required services for tests.
- Test framework names.
- Test file locations.

### 6. Code style and conventions

Document conventions visible in code or config:

- Formatter and lint rules.
- Type checking expectations.
- Naming conventions.
- Import conventions.
- File organization.
- Architectural patterns.
- Dependency boundaries.
- Error handling patterns.
- State management patterns, if applicable.

Avoid generic style advice unless it is clearly reflected in the project.

### 7. Architecture notes

Explain the major design structure:

- Important modules or packages.
- Application layers.
- Data flow.
- API boundaries.
- Database access patterns.
- Background jobs.
- Client/server boundaries.
- Shared libraries.
- External integrations.

Keep this section focused on helping agents avoid breaking project structure.

### 8. Security and safety rules

Document rules for:

- Secrets and environment files.
- Production data.
- Destructive commands.
- Migrations.
- Generated files.
- Credentials.
- External APIs and services.
- Lockfiles.
- Vendored dependencies.
- Files agents should not edit casually.

### 9. Pull request checklist

List checks an agent should run before considering work complete.

Examples:

- Format.
- Lint.
- Type check.
- Unit tests.
- Integration tests.
- End-to-end tests.
- Build.
- Docs updated.
- Migrations included or documented.
- Generated files regenerated.
- Screenshots added for UI changes.

Align this checklist with CI jobs when CI exists.

### 10. Agent workflow rules

Include explicit AI-agent behavior rules, such as:

- Inspect existing patterns before editing.
- Prefer small, focused changes.
- Do not perform broad refactors unless requested.
- Update or add tests for behavior changes.
- Do not modify generated, vendored, lock, or migration files unless necessary and justified.
- Preserve public APIs unless the task explicitly requires changing them.
- Call out risky assumptions in the final response.
- Explain skipped checks and why they were skipped.

### 11. Known pitfalls

List repo-specific gotchas discovered during inspection:

- Flaky tests.
- Non-obvious setup steps.
- Legacy code areas.
- Generated code traps.
- Naming inconsistencies.
- Hidden service dependencies.
- Environment assumptions.
- Deployment quirks.

Do not invent pitfalls. Omit this section’s details or write `None documented yet.` if no pitfalls are found.

### 12. Nested instructions

Document whether nested `AGENTS.md` files exist or are recommended.

Use nested files when subdirectories have meaningfully different:

- Languages.
- Frameworks.
- Build commands.
- Test commands.
- Safety rules.
- Ownership boundaries.
- Generated-code rules.

If nested files already exist, list their locations and summarize their scope.

## Output requirements

The final `AGENTS.md` should:

- Be written in Markdown.
- Be concise and skimmable.
- Use clear headings.
- Prefer bullets and command blocks.
- Include exact commands where known.
- Avoid speculation.
- Avoid secrets.
- Avoid unnecessary prose.
- Distinguish root commands from package-specific commands in monorepos.
- Mark uncertain details with `Verify:`.

## Local-agent prompt

Use this prompt when asking a local AI coding agent to generate the file from inside a project:

```text
You are running inside the root of this software project.

Your task is to inspect the repository and generate a high-quality AGENTS.md file for future AI coding agents working in this repo.

Do not invent facts. Infer only from files that actually exist. When uncertain, write a short “Verify:” note rather than guessing.

First, inspect the repository structure and relevant files, including but not limited to:
- README files
- package manager files such as package.json, pnpm-lock.yaml, yarn.lock, package-lock.json, pyproject.toml, requirements.txt, uv.lock, Cargo.toml, go.mod, pom.xml, build.gradle, Gemfile, composer.json, mix.exs, etc.
- configuration files for linting, formatting, testing, TypeScript, bundlers, frameworks, Docker, CI, and deployment
- test directories and test config files
- source directories and application entry points
- scripts, Makefiles, task runners, and CI workflows
- existing docs, contributing guides, architecture notes, and environment examples
- nested AGENTS.md, CLAUDE.md, Cursor rules, Copilot instructions, or similar agent instruction files

Create or replace a root-level AGENTS.md.

Use this structure and keep it concise:

# AGENTS.md

## Project overview
Summarize what this project is, its primary purpose, major frameworks/languages, and important runtime assumptions.

## Repository layout
List the important directories and files. Focus on what an AI coding agent needs to know before editing.

## Setup and installation
Document exact install/setup commands discovered from the repo. Include prerequisites only if they are clearly implied by files.

## Development commands
Document commands for running the app, local services, builds, watchers, migrations, code generation, storybooks, docs, or similar workflows.

## Testing instructions
Document how to run the full test suite and common focused test commands. Mention test frameworks and test locations. Include any required setup for integration or end-to-end tests.

## Code style and conventions
Document formatting, linting, typing, naming, architecture, import, file organization, and dependency conventions that are visible in the codebase or config.

## Architecture notes
Explain important boundaries and patterns: major modules, layers, services, packages, data flow, API structure, state management, database access, background jobs, or other project-specific design choices.

## Security and safety rules
Document rules for secrets, environment files, production data, destructive commands, migrations, generated files, credentials, external services, and anything agents should avoid changing casually.

## Pull request checklist
List the checks an agent should run before considering work complete: tests, linting, formatting, type checks, builds, docs updates, migration notes, generated files, screenshots, etc.

## Agent workflow rules
Give explicit instructions for AI agents working in this repo:
- Inspect existing patterns before editing.
- Prefer small, focused changes.
- Do not perform broad refactors unless requested.
- Update or add tests for behavior changes.
- Do not modify generated, vendored, lock, or migration files unless necessary and justified.
- Preserve public APIs unless the task explicitly requires changing them.
- Call out risky assumptions in the final response.

## Known pitfalls
List repo-specific gotchas discovered during inspection: flaky tests, non-obvious commands, generated code, legacy areas, naming traps, environment assumptions, or deployment quirks.

## Nested instructions
If any subdirectories need their own AGENTS.md because they use different languages, frameworks, commands, or safety rules, mention them here. If nested AGENTS.md files already exist, list their locations and summarize their scope.

Quality requirements:
- Keep the file practical and under roughly 150 lines unless the project truly requires more.
- Prefer exact commands over vague descriptions.
- Do not duplicate the README unless the information is agent-relevant.
- Do not include generic advice that applies to every repo.
- Do not include secrets or sensitive values.
- If a command is inferred but not confirmed, mark it as “Verify:”.
- If the repo has multiple packages/apps, distinguish commands by package or directory.
- If the project uses workspaces or a monorepo layout, explain where commands should be run from.
- If there are generated files, document how to regenerate them and whether agents should edit them directly.
- If CI exists, align the checklist with CI jobs.
- Preserve existing useful AGENTS.md content if one already exists, but remove outdated, duplicated, or speculative instructions.

After writing AGENTS.md, print:
1. A short summary of what you created.
2. Any assumptions or “Verify:” items.
3. Suggested nested AGENTS.md files, if useful.
```

## Review checklist for the generated file

Before considering the skill complete, verify that `AGENTS.md` answers these questions:

- What is this project?
- Where is the important code?
- How does an agent install dependencies?
- How does an agent run the project locally?
- How does an agent run tests?
- How does an agent run linting, formatting, type checks, and builds?
- What conventions should the agent follow?
- What architecture boundaries should the agent preserve?
- What files or commands are risky?
- What must be checked before a PR is complete?
- Are there repo-specific pitfalls?
- Are nested instruction files needed?

## Failure modes to avoid

Avoid generating an `AGENTS.md` that:

- Is mostly generic advice.
- Copies the README without making it agent-focused.
- Omits test or setup commands that exist in the repo.
- Invents commands not supported by project files.
- Includes secrets or sensitive values.
- Encourages broad refactors.
- Ignores CI configuration.
- Fails to mention generated files or migrations.
- Is too long for an agent to use efficiently.
- Hides uncertainty instead of marking `Verify:` items.
