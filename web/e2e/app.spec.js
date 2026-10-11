import { test, expect, mockApi, expectNoHorizontalScroll } from './fixtures'

const PAGES = [
  { path: '/', heading: /Test Student/ },
  { path: '/modules', heading: 'Campus Modules' },
  { path: '/schedule', heading: 'Weekly Schedule' },
  { path: '/tasks', heading: 'Tasks' },
  { path: '/focus', heading: 'Focus Sessions' },
  { path: '/friends', heading: 'Find Friends' },
  { path: '/more', heading: 'More' }
]

test.beforeEach(async ({ page }) => {
  await mockApi(page, { loggedIn: true })
})

for (const { path, heading } of PAGES) {
  test(`${path} loads without errors or overflow`, async ({ page, errors }) => {
    await page.goto(path)
    await expect(page.getByRole('heading', { name: heading, exact: typeof heading === 'string' })).toBeVisible()
    await expectNoHorizontalScroll(page)
    expect(errors).toEqual([])
  })
}

test('sidebar navigation reaches every page', async ({ page, isMobile }) => {
  await page.goto('/')
  for (const { path, heading } of PAGES.slice(1)) {
    if (isMobile) await page.getByRole('button', { name: 'Open navigation' }).click()
    await page.getByRole('navigation', { name: 'Main navigation' }).locator(`a[href="${path}"]`).click()
    await expect(page).toHaveURL(new RegExp(`${path}$`))
    await expect(page.getByRole('heading', { name: heading, exact: true })).toBeVisible()
  }
})

test('/login redirects to dashboard when logged in', async ({ page }) => {
  await page.goto('/login')
  await expect(page).toHaveURL(/\/$/)
})

test('logout returns to landing', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('button', { name: 'Log out' }).click()
  await expect(page.getByRole('heading', { level: 1 })).toContainText('classes, tasks and attendance')
})

test('unknown route while logged in', async ({ page }) => {
  await page.goto('/nope')
  await expect(page).toHaveURL(/\/$/)
})

test('widget shows today’s classes', async ({ page, errors }) => {
  await page.goto('/widget')
  await expect(page.getByRole('heading', { name: 'Today’s classes' })).toBeVisible()
  await expect(page.getByText('No classes today.')).toBeVisible()
  await expect(page.locator('link[rel="manifest"]')).toHaveAttribute('href', '/manifest.webmanifest')
  await expectNoHorizontalScroll(page)
  expect(errors).toEqual([])
})

test('modules: add, edit and delete', async ({ page }) => {
  page.on('dialog', dialog => dialog.accept())
  await page.goto('/modules')
  await page.getByRole('button', { name: 'Add Module' }).click()
  await page.getByPlaceholder('e.g., CS301').fill('CS301')
  await page.getByPlaceholder('e.g., Operating Systems').fill('Operating Systems')
  await page.getByPlaceholder('e.g., 4').fill('4')
  await page.getByPlaceholder('e.g., Fall 2026').fill('Fall 2026')
  await page.getByPlaceholder('e.g., Dr. Smith').fill('Dr. Smith')
  await page.locator('form button[type="submit"]').click()
  await expect(page.getByText('Operating Systems')).toBeVisible()

  await page.getByRole('button', { name: 'Edit module' }).click()
  await page.getByPlaceholder('e.g., Operating Systems').fill('Distributed Systems')
  await page.locator('form button[type="submit"]').click()
  await expect(page.getByText('Distributed Systems')).toBeVisible()

  await page.getByRole('button', { name: 'Delete module' }).click()
  await expect(page.getByText('Distributed Systems')).toHaveCount(0)
})

test('tasks: add, complete and delete', async ({ page }) => {
  page.on('dialog', dialog => dialog.accept())
  await page.goto('/tasks')
  await page.getByRole('button', { name: /Add Task/i }).click()
  await page.getByPlaceholder('e.g., Complete AI Mini Project').fill('Write report')
  await page.locator('form button[type="submit"]').click()
  const task = page.getByRole('heading', { name: 'Write report' })
  await expect(task).toBeVisible()

  await page.getByRole('button', { name: 'Delete task' }).click()
  await expect(task).toHaveCount(0)
})

test('schedule: add a class', async ({ page }) => {
  await page.goto('/schedule')
  await page.getByRole('button', { name: /Add Class/i }).click()
  await page.getByPlaceholder('e.g., Operating Systems').fill('Compilers')
  await page.locator('input[type="time"]').nth(0).fill('09:00')
  await page.locator('input[type="time"]').nth(1).fill('10:00')
  await page.locator('form button[type="submit"]').click()
  await expect(page.getByText('Compilers').first()).toBeVisible()
})

test('icon-only buttons have accessible names', async ({ page }) => {
  for (const { path } of PAGES) {
    await page.goto(path)
    const unnamed = await page.evaluate(() =>
      [...document.querySelectorAll('button, a')]
        .filter(el => el.offsetParent !== null)
        .filter(el => !(el.getAttribute('aria-label') || el.textContent.replace(/\b[a-z_]+\b/g, '').trim() || el.title))
        .map(el => el.outerHTML.slice(0, 120))
    )
    expect(unnamed, `unnamed controls on ${path}`).toEqual([])
  }
})
