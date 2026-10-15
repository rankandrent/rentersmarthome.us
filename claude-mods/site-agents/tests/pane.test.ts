import { expect, test } from 'claude-code/testing'

for (const surface of ['terminal', 'desktop'] as const) {
  test(`workflow pane shows every step (${surface})`, async $ => {
    const ui = await $.ui.mount({
      plugin: 'site-agents',
      surface,
      component: 'Pane',
      props: { title: 'Agent workflow', isFocused: true, bodyColumns: 120 },
      requestId: 'site-agents',
    })
    for (const step of ['Keyword', 'Products', 'Brief', 'Writer', 'QA', 'Publish']) {
      expect(await ui.find({ type: 'Text', text: new RegExp(step) })).toBeDefined()
    }
    expect(await ui.find({ type: 'Text', text: /No agent runs yet/ })).toBeDefined()
  })
}
