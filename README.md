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

Use the `SKILL.md` file as the source of truth. In tools without native Agent Skills support, paste or attach the relevant `SKILL.md` content and ask the agent to follow it.

### Codex UI

1. Open a new task or chat in Codex.
2. Attach or paste the relevant `SKILL.md` content.
3. Ask Codex to use that skill for the task, for example: `Use the Generate AGENTS.md skill to create an AGENTS.md for this repository.`

### VS Code

1. Open the repository in VS Code.
2. Open the relevant `skills/<skill-name>/SKILL.md` file.
3. In your AI assistant chat, reference the open file or paste its contents and ask the assistant to follow the skill instructions.

### JetBrains IDEs

1. Open the repository in your JetBrains IDE.
2. Open the relevant `skills/<skill-name>/SKILL.md` file.
3. In the IDE AI chat, reference the file or paste its contents and ask the assistant to apply the skill to the current project.

### Claude UI

1. Start a Claude conversation or project chat.
2. Upload or paste the relevant `SKILL.md` file.
3. Ask Claude to follow the skill instructions for your task.

### Terminal agents

1. Make this repository, or the selected skill directory, available to the terminal agent.
2. Point the agent at the skill file or paste it into the prompt.
3. Example prompt:

```text
Read skills/generate-agents-md/SKILL.md and follow it to create or improve AGENTS.md for the current repository.
```
