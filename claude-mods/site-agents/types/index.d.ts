export type AgentRun = {
  id: string
  type: string
  description: string
  post: string
  model: string
  startedAt: number
  endedAt?: number
  isError?: boolean
  note?: string
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
