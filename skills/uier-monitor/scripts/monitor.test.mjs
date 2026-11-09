import { test } from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';

// Exercise the actual standalone script without invoking its CLI or network.
const source = readFileSync(new URL('./monitor.mjs', import.meta.url), 'utf8')
    .replace(/^import .*;$/gm, '').replaceAll('import.meta.url', '"file:///monitor.mjs"')
    .split('// Last, so every module-level constant')[0];
function fixture(items, entries) {
    const context = vm.createContext({ process: { argv: [] }, Date, Set, Map });
    vm.runInContext(source, context);
    context.entries = entries;
    vm.runInContext('allPages = async () => ({ items: entries });', context);
    return { reconcile: context.reconcile, state: { project: { id: 'project' }, items }, seen: {}, found: [] };
}

test('reconcile recovers replies for asked, rejected and ready items, including resolved threads', async () => {
    for (const item of [{ decision: 'asked' }, { decision: 'rejected' }, { decision: 'accepted', stage: 'ready' }]) {
        const entry = { id: 'thread', replyCount: 2, stage: 'open' };
        const f = fixture({ thread: item }, [entry]);
        await f.reconcile(null, f.state, f.seen, f.found);
        assert.equal(f.found.filter(hit => hit.type === 'reply').length, 0); // migration seeds a baseline
        f.found.length = 0;
        entry.replyCount++;
        entry.resolved = true;
        entry.stage = 'done';
        await f.reconcile(null, f.state, f.seen, f.found);
        assert.equal(f.found.filter(hit => hit.type === 'reply').length, 1);
        f.found.length = 0;
        await f.reconcile(null, f.state, f.seen, f.found);
        assert.equal(f.found.filter(hit => hit.type === 'reply').length, 0);
    }
});

test('feed replies deduplicate reconcile and still advance the reply baseline', async () => {
    const entry = { id: 'thread', replyCount: 1 };
    const f = fixture({ thread: { decision: 'asked' } }, [entry]);
    await f.reconcile(null, f.state, f.seen, f.found);
    entry.replyCount++;
    f.found.push({ type: 'reply', commentId: 'thread' });
    await f.reconcile(null, f.state, f.seen, f.found);
    assert.equal(f.found.length, 1);
    f.found.length = 0;
    await f.reconcile(null, f.state, f.seen, f.found);
    assert.equal(f.found.length, 0);
});

test('skipped, active and untracked resolved threads do not produce reply wakes', async () => {
    const entries = ['skipped', 'active', 'closed'].map(id => ({ id, replyCount: 1, resolved: id === 'closed' }));
    const f = fixture({ skipped: { decision: 'skipped', stage: 'ready' }, active: { decision: 'accepted', stage: 'progress' } }, entries);
    await f.reconcile(null, f.state, f.seen, f.found);
    f.found.length = 0;
    entries.forEach(entry => entry.replyCount++);
    await f.reconcile(null, f.state, f.seen, f.found);
    assert.equal(f.found.filter(hit => hit.type === 'reply' || hit.type === 'untracked').length, 0);
});

const helper = fileURLToPath(new URL('./monitor.mjs', import.meta.url));
function cli(args, options = {}) {
    return execFileSync(process.execPath, [helper, ...args], { encoding: 'utf8', ...options });
}

test('CLI preserves saved decisions across patches and drains the inbox once', t => {
    const dir = mkdtempSync(join(tmpdir(), 'uier-monitor-state-'));
    t.after(() => rmSync(dir, { recursive: true, force: true }));
    cli(['patch', '--state', dir, '-'], { input: JSON.stringify({
        project: { id: 'example-project', name: 'Example feedback' },
        items: { first: { decision: 'accepted', stage: 'open' } },
        watch: { wakes: 1, wakeAt: '2026-01-01T00:00:00Z' },
        queue: ['first'],
    }) });
    cli(['patch', '--state', dir, '-'], { input: JSON.stringify({
        watch: { wakes: 2, wakeAt: null }, queue: ['first', 'second'],
    }) });
    const state = JSON.parse(readFileSync(join(dir, 'state.json'), 'utf8'));
    assert.equal(state.items.first.decision, 'accepted');
    assert.equal(state.project.name, 'Example feedback');
    assert.deepEqual(state.watch, { wakes: 2 });
    assert.deepEqual(state.queue, ['first', 'second']);
    assert.ok(Number.isFinite(Date.parse(state.updatedAt)));
    writeFileSync(join(dir, 'inbox.json'), JSON.stringify([{ type: 'reply', commentId: 'first' }]));
    assert.deepEqual(JSON.parse(cli(['take', '--state', dir])).items, [{ type: 'reply', commentId: 'first' }]);
    assert.deepEqual(JSON.parse(cli(['take', '--state', dir])).items, []);
    assert.equal(JSON.parse(readFileSync(join(dir, 'state.json'), 'utf8')).items.first.decision, 'accepted');
});

test('project state is shared across isolated Git worktrees', t => {
    const dir = mkdtempSync(join(tmpdir(), 'uier-monitor-worktrees-'));
    t.after(() => rmSync(dir, { recursive: true, force: true }));
    const checkout = join(dir, 'site');
    const worktree = join(dir, 'fix');
    execFileSync('git', ['init', '--quiet', '--initial-branch=main', checkout]);
    const git = args => execFileSync('git', args, { cwd: checkout, encoding: 'utf8', stdio: 'pipe' });
    git(['-c', 'user.name=Fixture', '-c', 'user.email=fixture@example.com', '-c', 'commit.gpgsign=false',
        'commit', '--allow-empty', '--quiet', '-m', 'fixture']);
    git(['worktree', 'add', '--quiet', '-b', 'fix', worktree]);
    cli(['patch', '--project', 'example-project', '{"items":{"first":{"decision":"accepted"}}}'], { cwd: checkout });
    cli(['patch', '--project', 'example-project', '{"items":{"second":{"decision":"asked"}}}'], { cwd: worktree });
    const commonDir = git(['rev-parse', '--path-format=absolute', '--git-common-dir']).trim();
    const state = JSON.parse(readFileSync(join(commonDir, 'uier-monitor/example-project/state.json'), 'utf8'));
    assert.deepEqual(state.items, { first: { decision: 'accepted' }, second: { decision: 'asked' } });
});
