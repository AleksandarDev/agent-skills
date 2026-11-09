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

Use tooling with native Agent Skills support when available:

- [`vercel-labs/skills`](https://github.com/vercel-labs/skills) (recommended for non-UI workflows).
- [`gh skill install`](https://cli.github.com/manual/gh_skill_install) (alternative for non-UI workflows).
- Manual installation: copy the desired skill directory into your skills folder as documented in the [Agent Skills specification](https://agentskills.io/).
- [Codex skills](https://developers.openai.com/codex/skills).
- [Claude skills](https://support.claude.com/en/articles/12512180-use-skills-in-claude).

Use the `SKILL.md` file in each skill directory as the source of truth for what the skill does and how an agent should invoke it.

### Install uier monitor in another project

Run from the GitHub repository that owns the website reviewed with uier:

```sh
npx skills add Enterwell/agent-skills --skill uier-monitor
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

The collection uses [MIT](LICENSE) unless a skill declares a different license.
The extracted `uier-monitor` and `uier-monitor-script` directories retain
**AGPL-3.0-only** from uier, with their own license files and
[source attribution](skills/uier-monitor/README.md#source-license-and-maintenance).
