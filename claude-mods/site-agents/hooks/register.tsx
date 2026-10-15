import { atom, read, update } from 'claude-code'
import type { EngineInterface, Register } from 'claude-code'

import type { AgentRun, SiteStatus } from '../types'

const PANE = 'site-agents'
const SITE_DIRS = ['/home/user/rentersmarthome.us', '/home/user/best-tripod.com']
const ROSTER = ['keyword-agent', 'product-agent', 'brief-agent', 'writer-agent', 'qa-agent', 'publisher-agent']

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
      .run(['grep', '-H', '^model:', ...ROSTER.map(n => `${dir}/.claude/agents/${n}.md`)])
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

function ago(ms: number) {
  const s = Math.max(0, Math.round((Date.now() - ms) / 1000))
  return s < 60 ? `${s}s` : `${Math.round(s / 60)}m`
}

export const register: Register = on => {
  on('session.start', async ($, e, next) => {
    await $.command.register({ name: 'sites', description: "Today's posting status per site and the agents working on it" })
    void $.ui.open({ id: PANE, title: 'Site agents' })
    void refresh($)
    return next(e)
  })

  on('command.run', { command: 'sites' }, async $ => {
    await refresh($)
    await $.ui.open({ id: PANE, title: 'Site agents' })
    const list = await read($, sites)
    const live = (await $.agent.list().catch(() => [])).filter(a => ROSTER.includes(a.type) && ['pending', 'running', 'waiting'].includes(a.status))
    const lines = list.map(s =>
      s.error
        ? `${s.site}: status error (${s.error})`
        : `${s.site}: ${s.publishedToday}/${s.quotaToday} posts today, ${s.remainingToday} left, ${s.pendingKeywords} keywords queued`,
    )
    lines.push(live.length ? `Working now: ${live.map(a => `${a.type} (${a.description})`).join(', ')}` : 'No site agent is running right now.')
    return { text: lines.join('\n') || 'No site repos found.' }
  })

  on('agent.spawn', async ($, e, next) => {
    const res = await next(e)
    try {
      if (ROSTER.includes(e.subagentType) && 'agentId' in res && res.agentId) {
        const run: AgentRun = { id: res.agentId, type: e.subagentType, description: e.description, model: res.model, startedAt: Date.now() }
        await update($, runs, list => [...list, run].slice(-30))
        await $.ui.status(`${e.subagentType} started (${res.model})`)
      }
    } catch {
      // bookkeeping only; never block a spawn
    }
    return res
  })

  on('turn.complete', async ($, e, next) => {
    const res = await next(e)
    const id = (e as { agentId?: string }).agentId
    if (id && (await read($, runs)).some(r => r.id === id)) {
      const run = (await read($, runs)).find(r => r.id === id)
      await $.ui.status(undefined)
      if (run?.type === 'publisher-agent') void refresh($)
    }
    return res
  })

  on('ui.render', { component: 'Pane', requestId: PANE }, async ($, e) => {
    const { Box, Text } = $.ui.resolve(e)
    const list = await read($, sites)
    const modelMap = await read($, models)
    const history = await read($, runs)
    const at = await read($, checkedAt)
    const agents = await $.agent.list().catch(() => [])
    const statusOf = (id: string) => agents.find(a => a.id === id)?.status ?? 'completed'
    const busy = new Set(history.filter(r => ['pending', 'running', 'waiting'].includes(statusOf(r.id))).map(r => r.type))

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
        {at > 0 && <Text dimColor>checked {ago(at)} ago · /sites to refresh</Text>}
        <Text> </Text>
        <Text bold>Agents</Text>
        {ROSTER.map(name => (
          <Text color={busy.has(name) ? 'green' : undefined} dimColor={!busy.has(name)}>
            {busy.has(name) ? '● working ' : '○ idle    '} {name} · {modelMap[name] ?? '?'}
          </Text>
        ))}
        <Text> </Text>
        <Text bold>Recent runs</Text>
        {history.length === 0 && <Text dimColor>No agent runs yet this session.</Text>}
        {history.slice(-8).reverse().map(r => (
          <Text dimColor={statusOf(r.id) !== 'running'}>
            {statusOf(r.id)} {r.type} ({r.model}) {r.description} · {ago(r.startedAt)} ago
          </Text>
        ))}
      </Box>
    )
  })
}
