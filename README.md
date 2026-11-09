# agent-skills

Enterwell's official collection of reusable AI agent skills.

## Skill format

Skills in this repository use the [Agent Skills](https://agentskills.io/) format: each skill lives in its own directory and defines a `SKILL.md` file with YAML frontmatter followed by Markdown instructions.

```text
skills/<skill-name>/
└── SKILL.md
```

The frontmatter describes metadata such as the skill name, description, compatibility, license, author, and version. The Markdown body contains the instructions an agent should follow when the skill is invoked.

## Available skills

| Skill | Path | Description |
| --- | --- | --- |
| Generate AGENTS.md | [`skills/generate-agents-md/SKILL.md`](skills/generate-agents-md/SKILL.md) | Creates or improves a project-specific `AGENTS.md` file for AI coding agents. |
| uier monitor | [`skills/uier-monitor/SKILL.md`](skills/uier-monitor/SKILL.md) | Triages website feedback, coordinates fixes and PRs, tracks deployment, and reports back in uier. [Installation and usage](skills/uier-monitor/README.md). |
| uier monitor script | [`skills/uier-monitor-script/SKILL.md`](skills/uier-monitor-script/SKILL.md) | Optional helper recovery for uier monitor installations that omit script files. |

## How to use skills

Install with [Vercel's skills CLI](https://github.com/vercel-labs/skills) (recommended for non-UI workflows). From your project directory, run:

```sh
npx skills@latest add enterwell/agent-skills
```

The CLI lets you choose which skills and coding agents to install for, then places the skills in the appropriate directories. By default, skills are installed for the current project; add `-g` to install globally and share them across projects.

For project installations, the CLI creates a `skills-lock.json` file to track installed skills. To update installed skills, run:

```sh
npx skills@latest update
```

Other installation options and agent-specific documentation:

- [`gh skill install`](https://cli.github.com/manual/gh_skill_install) (alternative for non-UI workflows).
- Manual installation: copy the desired skill directory into your skills folder as documented in the [Agent Skills specification](https://agentskills.io/).
- [Codex skills](https://developers.openai.com/codex/skills).
- [Claude skills](https://support.claude.com/en/articles/12512180-use-skills-in-claude).

Use the `SKILL.md` file in each skill directory as the source of truth for what the skill does and how an agent should invoke it.

### Install uier monitor in another project

Run from the GitHub repository that owns the website reviewed with uier:

```sh
npx skills@latest add enterwell/agent-skills --skill uier-monitor
```

Add `-g` to share the installation across projects. The [uier monitor guide](skills/uier-monitor/README.md)
covers MCP setup, watcher credentials, permissions, start/resume/status/stop commands,
and repository-specific configuration. Installation does not start monitoring.

## Validation

The uier monitor helper has no npm dependencies. With Node.js 18 or later, run:

```sh
node skills/uier-monitor/scripts/build-script-skill.mjs --check
node --check skills/uier-monitor/scripts/monitor.mjs
node --test skills/uier-monitor/scripts/monitor.test.mjs
```

After editing the helper, regenerate its companion with
`node skills/uier-monitor/scripts/build-script-skill.mjs`.
Review Markdown, frontmatter, and relative links for all skill changes.

## License

The collection and its skills use [MIT](LICENSE). Standalone skill directories may
include a copy of the license alongside their source attribution.
