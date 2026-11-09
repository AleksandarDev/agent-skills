# uier monitor

Turn feedback on a website reviewed with [uier](https://uier.io) into changes in that
website's GitHub repository. Install this skill in the repository that owns the site;
you do not need a checkout of the uier application.

## What it enables

- Triage new feedback: accept a change, ask for clarification, explain a rejection,
  identify duplicates, or recognize an already delivered fix.
- Group related small fixes and coordinate isolated fix sessions, up to six at once
  when the coding agent supports them. Agents without isolation work serially.
- Assign feedback to the person running the monitor, attach working agents, and
  keep their working indicators alive while fix sessions run.
- Open PRs, attach each PR to its uier threads, check reviews and CI, and merge when
  authorized by the monitoring request and repository rules.
- Follow GitHub Actions or GitHub deployment records, including deployments that
  contain several merged changes, before reporting completion.
- Reply in uier with the commit, PR, and session; mark objective fixes done or
  request another person's verification when appropriate.
- Resume from saved state after a context reset. A standalone watcher polls for
  events while the model is idle; unattended continuation depends on the host agent.

The watcher currently supports **GitHub**, through `gh`. uier can review sites whose
code is hosted elsewhere, but this monitor does not automate GitLab or Azure DevOps PRs.
Custom deployment systems need project-specific acceptance instructions; missing
deployment evidence keeps feedback pending.

## Install

From the target project's checkout, use the [skills CLI](https://github.com/vercel-labs/skills#install-a-skill):

```sh
npx skills add Enterwell/agent-skills --skill uier-monitor
```

The CLI requires Node.js 22.20 or later. Choose your coding agent when prompted.
Installation is project-local by default. Add `-g` for an installation shared across
your projects:

```sh
npx skills add Enterwell/agent-skills --skill uier-monitor -g
```

The complete `uier-monitor` directory includes the helper and needs no companion.
If your installer copies only `SKILL.md`, also install the recovery skill:

```sh
npx skills add Enterwell/agent-skills --skill uier-monitor-script
```

Alternatively, copy the **whole** `skills/uier-monitor/` directory into your coding
agent's skill directory. Keep `scripts/`, this README, and `LICENSE` with it.
Restart or refresh the agent's skill discovery if needed. Installation alone starts
no monitoring and grants no write or merge authorization.

## Requirements and connection

- A local Git checkout of the website's repository and its normal development tools.
- Node.js 18 or later for the dependency-free helper. Use the application's pinned
  runtime for application work; it may differ from the helper's minimum.
- GitHub CLI (`gh`), authenticated for the target repository, with the access needed
  to read checks and deployments and perform the requested PR work.
- A uier account with access to the project's feedback and permission to triage it.
- A coding agent with terminal access and the uier MCP tools connected.

Connect the agent to `https://uier.io/api/mcp` using the setup shown in
**uier → Account → Coding agents**. For Claude Code:

```sh
claude mcp add --transport http uier https://uier.io/api/mcp
```

Then open `/mcp`, select uier, and authenticate. Other clients can use a uier access
token according to their client setup. The orchestrator connection needs these
operations for the full workflow:

| Operation | Scope | Used for |
| --- | --- | --- |
| Read feedback | `feedback:read` | Projects, threads, packets, and events |
| Read screenshots | `screenshots:read` | Visual context for fixes |
| Reply to feedback | `feedback:reply` | Questions, decisions, and completion replies |
| Change status | `feedback:status` | Progress, completion, and verification requests |
| Assign feedback | `feedback:assign` | Assignment, agent attachment, working indicators, and PR links |

The standalone watcher cannot reuse the agent's OAuth session. Create a separate
access token under **Account → Coding agents → Access tokens**, limited to the
project and to **Read feedback**, **Read screenshots**, and **Assign feedback**.
The last operation lets the watcher attach agents and renew their working indicators;
this token cannot reply or change feedback status.

The skill requests the watcher token through the host's secret-input mechanism when
available. The helper stores it in macOS Keychain (`security`) or Linux Secret Service
(`secret-tool`), under service `uier-mcp` and the project id. You can also provide
`UIER_MCP_TOKEN` in the environment that launches the agent. Never commit tokens or
paste their values into a prompt, command line, or repository configuration.

`UIER_MCP_TOKEN` takes precedence over keychain storage. If a token-based MCP client
already uses that variable for its broader orchestrator grants, keep that credential
in place. Store the restricted watcher token in the keychain and unset the variable
**only for helper processes** (`env -u UIER_MCP_TOKEN node …`), so they use the keychain
token. Without a keychain, provide the restricted value through the helper process's
secret environment. Do not replace the MCP client's token with a watcher-only token;
the orchestrator would lose permission to reply or update status.

Without a watcher token, the agent can still use its connected MCP tools. It checks
feedback every 15 minutes while the helper follows GitHub, which uses more model
tokens and does not maintain working indicators. Without a helper, monitoring also
depends on a scheduler supported by the host. A host that cannot continue after a
turn cannot provide unattended monitoring.

## Start, resume, inspect, and stop

In Claude Code, use the skill command. In other clients, ask for the skill by name:

```text
/uier-monitor Example website feedback
Use the uier-monitor skill to monitor Example website feedback in this repository.
```

Use the exact project name or its id. Starting again resumes the saved run.

```text
/uier-monitor Example website feedback max=2
/uier-monitor Example website feedback status
/uier-monitor Example website feedback stop
```

`status` reads saved state. `stop` stops the watcher and PR subscriptions; already
running fix sessions finish their handoff. It does not cancel work, revoke tokens,
close PRs, or undo auto-merge already enabled. State remains available for resume.
`tick` is the equivalent resume argument used after a context reset.

| Option | Meaning |
| --- | --- |
| `max=N` | Maximum simultaneous sessions; default 6, capped by host capacity |
| `scope=mine` | The person's own comments; the default |
| `scope=assigned` | Also include comments a member assigned to the person |
| `also=u_…,u_…` | Other accounts the person has confirmed are theirs |
| `reviewer=u_…` | Another account to verify fixes to the person's own comments |
| `claude=<instance>`, `openai=<instance>` | Provider instances for T3 Code sessions |

Starting or resuming monitoring authorizes assignment to yourself, feedback replies
and status updates, fix sessions, PRs, merges or auto-merge, and bounded transient
deployment retries **within the requested scope**. State a narrower scope in the
request when needed, for example: "Open PRs for these fixes; do not merge."
Repository protections and existing user restrictions still apply. The skill asks
before merging protected infrastructure changes and does not authorize deletion,
force pushes, secret changes, or assigning someone else.

The agent cannot confirm a verification request through MCP. For your own comments,
provide `reviewer=` to ask another account; otherwise it reports what to check and
marks the fix done, and you can reopen it if needed.

## Configure each project

The monitor reads `docs/uier-monitor.md` or `.uier/monitor.md` in the target repository
before detecting its workflow. These notes override detection within the person's
request and the repository's rules. They are optional, but useful when automation
cannot infer the development or release process.

Document the relevant settings in prose:

- Which uier project and site belong to this repository.
- PR target branch, required checks and approvals, merge method, and whether merges
  are authorized. PRs are the default; direct pushes require an explicit repository rule.
- Deployment workflow or GitHub environment, path exclusions, and runtime acceptance
  checks. Identify manual or unsupported deployment systems explicitly.
- Protected files that need approval before merging.
- Runtime, package manager, setup commands, focused tests, and mandatory pre-PR checks.
- Area documentation and port allocation rules for concurrent checkouts.

The monitor does not assume uier's source layout, `main`, pnpm, a particular UI kit,
or a specific CI check. Repository-required checks apply to small fixes too.

## Saved state and troubleshooting

The helper and state live outside tracked files, shared by all worktrees:

```text
<absolute git common dir>/uier-monitor/
  monitor.mjs
  fix-session.md
  <projectId>/
    state.json
    inbox.json
    watch.json
    watch.log
    watch.pid
    briefs/
    logs/
```

For a local status check, run from the target repository and replace `<projectId>`:

```sh
node "$(git rev-parse --path-format=absolute --git-common-dir)/uier-monitor/monitor.mjs" status --project '<projectId>'
```

If access expires, replace the watcher token and run `check` through the skill.
Missing working indicators usually mean the token lacks Assign feedback, or the host
cannot keep the watcher running. Keep state for resume; do not commit feedback packets,
screenshots, or logs, which can contain private project information.

## Source, license, and maintenance

Extracted from [signalco-io/uier at `41a5bf6`](https://github.com/signalco-io/uier/tree/41a5bf689e6fba8051e0eb5f6ec96006c17afcc2/.claude/skills/uier-monitor)
(helper version 1.1.1). The shared version is 1.1.2: it adapts the instructions and
source paths for installation in other projects; watcher behavior is unchanged.
The extracted monitor and companion skill are released under **MIT** with the
rights holder's authorization, matching the collection; see [LICENSE](LICENSE).

Edit `SKILL.md` and `scripts/monitor.mjs` here. When the helper changes, bump its
`VERSION`, `MONITOR_VERSION` and skill metadata, then regenerate the companion skill.
From the collection root:

```sh
node skills/uier-monitor/scripts/build-script-skill.mjs
node skills/uier-monitor/scripts/build-script-skill.mjs --check
node --check skills/uier-monitor/scripts/monitor.mjs
node --test skills/uier-monitor/scripts/monitor.test.mjs
```

The generator embeds the helper and its SHA-256 in
[`uier-monitor-script`](../uier-monitor-script/SKILL.md); do not edit that copy directly.
The tests use local fixtures without contacting uier or GitHub.
