export type AgentRun = {
  id: string
  type: string
  description: string
  model: string
  startedAt: number
}
export type SiteStatus = {
  site: string
  quotaToday: number
  publishedToday: number
  remainingToday: number
  pendingKeywords: number
  error?: string
}

declare module 'claude-code' {
  interface PluginState {
    'site-agents': { runs: AgentRun[]; sites: SiteStatus[]; models: Record<string, string>; checkedAt: number }
  }
}
