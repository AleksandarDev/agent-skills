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

## How to use skills

Use tooling with native Agent Skills support when available:

- [`vercel-labs/skills`](https://github.com/vercel-labs/skills) (recommended for non-UI workflows).
- [`gh skill install`](https://cli.github.com/manual/gh_skill_install) (alternative for non-UI workflows).
- Manual installation: copy the desired skill directory into your skills folder as documented in the [Agent Skills specification](https://agentskills.io/).
- [Codex skills](https://developers.openai.com/codex/skills).
- [Claude skills](https://support.claude.com/en/articles/12512180-use-skills-in-claude).

Use the `SKILL.md` file in each skill directory as the source of truth for what the skill does and how an agent should invoke it.
