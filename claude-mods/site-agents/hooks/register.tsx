import { atom, read, update } from 'claude-code'
import type { EngineInterface, Register } from 'claude-code'

import type { AgentRun, SiteStatus } from '../types'

const PANE = 'site-agents'
const SITE_DIRS = ['/home/user/rentersmarthome.us', '/home/user/best-tripod.com']
// The pipeline, left to right, like an n8n workflow. product and brief run side by side.
const FLOW = ['keyword-agent', 'product-agent', 'brief-agent', 'writer-agent', 'qa-agent', 'publisher-agent']
const SHORT: Record<string, string> = {
  'keyword-agent': 'Keyword',
  'product-agent': 'Products',
  'brief-agent': 'Brief',
  'writer-agent': 'Writer',
  'qa-agent': 'QA',
  'publisher-agent': 'Publish',
}

const runs = atom({ plugin: 'site-agents', key: 'runs' } as const, [] as AgentRun[])
const sites = atom({ plugin: 'site-agents', key: 'sites' } as const, [] as SiteStatus[])
const models = atom({ plugin: 'site-agents', key: 'models' } as const, {} as Record<string, string>)
const checkedAt = atom({ plugin: 'site-agents', key: 'checkedAt' } as const, 0)

async function refresh($: EngineInterface) {
  const found: SiteStatus[] = []
  const modelMap: Record<string, string> = {}
  for (const dir of SITE_DIRS) {
    const site = dir.split('/').pop() ?? dir
    const has = await $.process.run(['test', '-f', `${dir}/scripts/routine.mjs`]).catch(() => ({ exitCode: 1 }))
    if (has.exitCode !== 0) continue
    const r = await $.process
      .run(['node', 'scripts/routine.mjs', 'status'], { cwd: dir, timeoutMs: 20000 })
      .catch((err: unknown) => ({ exitCode: 1, stdout: '', stderr: String(err) }))
    try {
      const s = JSON.parse(r.stdout)
      found.push({ site, quotaToday: s.quotaToday, publishedToday: s.publishedToday, remainingToday: s.remainingToday, pendingKeywords: s.pendingKeywords })
    } catch {
      found.push({ site, quotaToday: 0, publishedToday: 0, remainingToday: 0, pendingKeywords: 0, error: (r.stderr || 'status failed').slice(0, 80) })
    }
    const g = await $.process
      .run(['grep', '-H', '^model:', ...FLOW.map(n => `${dir}/.claude/agents/${n}.md`)])
      .catch(() => ({ stdout: '' }))
    for (const line of String(g.stdout).split('\n')) {
      const m = line.match(/\/([\w-]+)\.md:model:\s*(\S+)/)
      if (m?.[1] && m[2]) modelMap[m[1]] = m[2]
    }
  }
  await update($, sites, () => found)
  await update($, models, prev => ({ ...prev, ...modelMap }))
  await update($, checkedAt, () => Date.now())
}

/** "Products: baby proof rental guide" → "baby proof rental guide" (the post a run belongs to). */
function postOf(description: string) {
  const i = description.indexOf(':')
  return (i >= 0 ? description.slice(i + 1) : description).trim().toLowerCase() || 'post'
}

function dur(ms: number) {
  const s = Math.max(0, Math.round(ms / 1000))
  return s < 60 ? `${s}s` : `${Math.floor(s / 60)}m${String(s % 60).padStart(2, '0')}s`
}

type NodeState = 'idle' | 'running' | 'done' | 'failed'
const COLOR: Record<NodeState, string> = { idle: 'gray', running: 'yellow', done: 'green', failed: 'red' }
const ICON: Record<NodeState, string> = { idle: '○', running: '◐', done: '✓', failed: '✗' }

export const register: Register = on => {
  on('session.start', async ($, e, next) => {
    await $.command.register({ name: 'sites', description: "Today's posting status per site and the agent workflow" })
    void $.ui.open({ id: PANE, title: 'Agent workflow' })
    void refresh($)
    return next(e)
  })

  on('command.run', { command: 'sites' }, async $ => {
    await refresh($)
    await $.ui.open({ id: PANE, title: 'Agent workflow' })
    const list = await read($, sites)
    const history = await read($, runs)
    const lines = list.map(s =>
      s.error
        ? `${s.site}: status error (${s.error})`
        : `${s.site}: ${s.publishedToday}/${s.quotaToday} posts today, ${s.remainingToday} left, ${s.pendingKeywords} keywords queued`,
    )
    const live = history.filter(r => !r.endedAt)
    lines.push(live.length ? `Working now: ${live.map(r => `${SHORT[r.type] ?? r.type} (${r.post})`).join(', ')}` : 'No site agent is running right now.')
    return { text: lines.join('\n') || 'No site repos found.' }
  })

  on('agent.spawn', async ($, e, next) => {
    const res = await next(e)
    try {
      if (FLOW.includes(e.subagentType) && 'agentId' in res && res.agentId) {
        const run: AgentRun = {
          id: res.agentId,
          type: e.subagentType,
          description: e.description,
          post: postOf(e.description),
          model: res.model,
          startedAt: Date.now(),
        }
        await update($, runs, list => [...list, run].slice(-60))
        await $.ui.status(`${SHORT[e.subagentType]} started · ${run.post}`)
      }
    } catch {
      // bookkeeping only; never block a spawn
    }
    return res
  })

  on('turn.complete', async ($, e, next) => {
    const res = await next(e)
    try {
      const id = e.agentId
      if (id && (await read($, runs)).some(r => r.id === id && !r.endedAt)) {
        const failed = e.isAborted || e.reason === 'error'
        const score = e.answer.match(/(?:audit|score)[^\d]{0,20}(\d{2,3})/i)?.[1]
        const pass = /"?pass"?\s*[:=]?\s*true|\bQA PASS\b/i.test(e.answer)
        const note = score ? `score ${score}` : pass ? 'pass' : undefined
        let type = ''
        await update($, runs, list =>
          list.map(r => {
            if (r.id !== id) return r
            type = r.type
            return { ...r, endedAt: Date.now(), isError: failed, note }
          }),
        )
        await $.ui.status(undefined)
        await $.ui.toast(`${SHORT[type] ?? 'Agent'} ${failed ? 'failed' : 'done'}${note ? ` (${note})` : ''}`)
        if (type === 'publisher-agent') void refresh($)
      }
    } catch {
      // bookkeeping only
    }
    return res
  })

  on('ui.render', { component: 'Pane', requestId: PANE }, async ($, e) => {
    const { Box, Text } = $.ui.resolve(e)
    const list = await read($, sites)
    const modelMap = await read($, models)
    const history = await read($, runs)
    const wide = (e.props.bodyColumns ?? 80) >= 96

    // One workflow lane per post, newest first.
    const posts: string[] = []
    for (const r of [...history].reverse()) if (!posts.includes(r.post)) posts.push(r.post)

    const node = (post: string, type: string) => {
      const mine = history.filter(r => r.post === post && r.type === type)
      const last = mine.at(-1)
      const state: NodeState = !last ? 'idle' : !last.endedAt ? 'running' : last.isError ? 'failed' : 'done'
      const time = last ? dur((last.endedAt ?? Date.now()) - last.startedAt) : ''
      return (
        <Box borderStyle="round" borderColor={COLOR[state]} flexDirection="column" paddingX={1} minWidth={13}>
          <Text bold color={COLOR[state]}>
            {ICON[state]} {SHORT[type]}
          </Text>
          <Text dimColor>{last?.model ?? modelMap[type] ?? '?'}</Text>
          <Text dimColor>{state === 'idle' ? '—' : `${time}${last?.note ? ` · ${last.note}` : ''}`}</Text>
        </Box>
      )
    }

    const arrow = <Text dimColor>{wide ? ' → ' : '  ↓'}</Text>

    return (
      <Box flexDirection="column">
        <Text bold>Today</Text>
        {list.length === 0 && <Text dimColor>Checking sites…</Text>}
        {list.map(s => (
          <Text>
            {s.error
              ? `${s.site}: status error`
              : `${s.site}  ${s.publishedToday}/${s.quotaToday} posts · ${s.remainingToday} left · ${s.pendingKeywords} keywords`}
          </Text>
        ))}
        <Text> </Text>
        {posts.length === 0 && (
          <Box flexDirection="column">
            <Text bold>Workflow</Text>
            <Box flexDirection={wide ? 'row' : 'column'} alignItems={wide ? 'center' : 'flex-start'}>
              {FLOW.map((t, i) => (
                <Box flexDirection={wide ? 'row' : 'column'} alignItems={wide ? 'center' : 'flex-start'}>
                  {i > 0 && arrow}
                  {node('', t)}
                </Box>
              ))}
            </Box>
            <Text dimColor>No agent runs yet this session.</Text>
          </Box>
        )}
        {posts.slice(0, 4).map(post => (
          <Box flexDirection="column" marginBottom={1}>
            <Text bold>▸ {post}</Text>
            <Box flexDirection={wide ? 'row' : 'column'} alignItems={wide ? 'center' : 'flex-start'}>
              {node(post, 'keyword-agent')}
              {arrow}
              <Box flexDirection="column">
                {node(post, 'product-agent')}
                {node(post, 'brief-agent')}
              </Box>
              {arrow}
              {node(post, 'writer-agent')}
              {arrow}
              {node(post, 'qa-agent')}
              {arrow}
              {node(post, 'publisher-agent')}
            </Box>
          </Box>
        ))}
      </Box>
    )
  })
}
