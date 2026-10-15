import { expect, test } from 'claude-code/testing'

for (const surface of ['terminal', 'desktop'] as const) {
  test(`pane lists every site agent (${surface})`, async $ => {
    const ui = await $.ui.mount({
      plugin: 'site-agents',
      surface,
      component: 'Pane',
      props: { title: 'Site agents', isFocused: true, bodyColumns: 80 },
      requestId: 'site-agents',
    })
    for (const name of ['keyword-agent', 'product-agent', 'brief-agent', 'writer-agent', 'qa-agent', 'publisher-agent']) {
      expect(await ui.find({ type: 'Text', text: new RegExp(name) })).toBeDefined()
    }
    expect(await ui.find({ type: 'Text', text: /No agent runs yet/ })).toBeDefined()
  })
}
