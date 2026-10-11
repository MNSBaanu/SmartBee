import { test as base, expect } from '@playwright/test'

const USER = { id: 1, name: 'Test Student', email: 'student@test.dev' }

export async function mockApi(page, { loggedIn = false } = {}) {
  const store = { modules: [], tasks: [], schedule: [] }
  let nextId = 1

  await page.route('http://mock-api.test/api/**', async route => {
    const req = route.request()
    const path = new URL(req.url()).pathname.replace('/api', '')
    const method = req.method()
    const body = req.postDataJSON?.() ?? null
    const ok = (data, status = 200) =>
      route.fulfill({ status, contentType: 'application/json', body: JSON.stringify({ success: true, data }) })
    const fail = (message, status) =>
      route.fulfill({ status, contentType: 'application/json', body: JSON.stringify({ success: false, message }) })

    if (path === '/auth/login') {
      return body.password === 'password123' ? ok({ user: USER, token: 'test-token' }) : fail('Invalid email or password', 401)
    }
    if (path === '/auth/register') return ok({ user: { ...USER, name: body.name }, token: 'test-token' }, 201)
    if (path === '/auth/me') return ok(USER)

    const [, resource, id] = path.split('/')
    const list = store[resource]
    if (!list) return fail('Not found', 404)
    if (method === 'GET') return ok(list)
    if (method === 'POST') {
      const item = { id: nextId++, completed: false, ...body }
      list.push(item)
      return ok(item, 201)
    }
    const index = list.findIndex(item => String(item.id) === id)
    if (index < 0) return fail('Not found', 404)
    if (method === 'DELETE') {
      list.splice(index, 1)
      return ok(null)
    }
    list[index] = { ...list[index], ...body }
    return ok(list[index])
  })

  if (loggedIn) await page.addInitScript(() => localStorage.setItem('smartbee_token', 'test-token'))
  return store
}

export const test = base.extend({
  errors: async ({ page }, use) => {
    const errors = []
    page.on('pageerror', err => errors.push(`pageerror: ${err.message}`))
    page.on('console', msg => msg.type() === 'error' && errors.push(`console: ${msg.text()}`))
    page.on('dialog', dialog => {
      errors.push(`dialog: ${dialog.message()}`)
      dialog.dismiss()
    })
    await use(errors)
  }
})

export async function expectNoHorizontalScroll(page) {
  const { overflow, culprits } = await page.evaluate(() => ({
    overflow: document.documentElement.scrollWidth - window.innerWidth,
    culprits: [...document.querySelectorAll('body *')]
      .filter(el => el.getBoundingClientRect().right > window.innerWidth + 1)
      .slice(0, 3)
      .map(el => `${el.tagName.toLowerCase()}.${[...el.classList].join('.')}`)
  }))
  expect(overflow, `page scrolls horizontally; overflowing: ${culprits.join(', ')}`).toBeLessThanOrEqual(0)
}

export { expect }
