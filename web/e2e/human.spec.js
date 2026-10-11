import { test, expect, mockApi, expectNoHorizontalScroll } from './fixtures'

async function goTo(page, isMobile, label) {
  if (isMobile) await page.getByRole('button', { name: 'Open navigation' }).click()
  await page.getByRole('navigation', { name: 'Main navigation' }).getByRole('link', { name: label }).click()
}

test('a new student signs up and uses the whole app', async ({ page, isMobile, errors }) => {
  page.on('dialog', dialog => dialog.accept())
  await page.clock.install({ time: new Date('2026-10-12T09:30:00') })
  await mockApi(page)

  await page.goto('/')
  await page.mouse.wheel(0, 1500)
  await page.getByRole('link', { name: 'Get started free' }).first().click()
  await page.getByRole('button', { name: 'Create an account' }).click()
  await page.getByPlaceholder('Name').pressSequentially('New Bee')
  await page.getByPlaceholder('Email').pressSequentially('new@test.dev')
  await page.getByPlaceholder('Password').pressSequentially('password123')
  await page.keyboard.press('Enter')
  await expect(page.getByRole('heading', { name: /New Bee/ })).toBeVisible()

  await goTo(page, isMobile, 'Modules')
  await page.getByRole('button', { name: 'Add Module' }).click()
  await page.getByPlaceholder('e.g., CS301').fill('CS301')
  await page.getByPlaceholder('e.g., Operating Systems').fill('Operating Systems')
  await page.getByPlaceholder('e.g., 4').fill('4')
  await page.getByPlaceholder('e.g., Fall 2026').fill('Fall 2026')
  await page.getByPlaceholder('e.g., Dr. Smith').fill('Dr. Smith')
  await page.locator('form button[type="submit"]').click()
  await expect(page.getByText('Operating Systems')).toBeVisible()

  await goTo(page, isMobile, 'Tasks')
  await page.getByRole('button', { name: /Add Task/i }).click()
  await page.getByPlaceholder('e.g., Complete AI Mini Project').fill('Write OS report')
  await page.locator('#dueDate').fill('2030-01-15')
  await page.locator('form button[type="submit"]').click()
  const task = page.locator('.task-card', { hasText: 'Write OS report' })
  await expect(task).toBeVisible()
  await page.getByRole('checkbox', { name: 'Mark Write OS report as complete' }).click()
  await expect(task).toHaveClass(/task-done/)

  await goTo(page, isMobile, 'Schedule')
  await page.getByRole('button', { name: /Add Class/i }).click()
  await page.getByPlaceholder('e.g., Operating Systems').fill('Operating Systems')
  await page.locator('#day').selectOption('Monday')
  await page.locator('#start').fill('09:00')
  await page.locator('#end').fill('10:00')
  await page.getByPlaceholder('e.g., Room B-204').fill('B-204')
  await page.locator('form button[type="submit"]').click()
  await expect(page.getByText('Operating Systems').first()).toBeVisible()

  for (const label of ['Focus', 'Friends', 'More', 'Dashboard']) {
    await goTo(page, isMobile, label)
    await expect(page.getByRole('heading').first()).toBeVisible()
    await expectNoHorizontalScroll(page)
  }

  await page.reload()
  await goTo(page, isMobile, 'Tasks')
  await expect(page.locator('.task-card', { hasText: 'Write OS report' })).toHaveClass(/task-done/)

  await page.goto('/widget')
  await expect(page.getByText('Monday · 1 class')).toBeVisible()
  await expect(page.getByText('Now · until 10:00 · B-204')).toBeVisible()
  await expectNoHorizontalScroll(page)

  await page.goto('/')
  await page.getByRole('button', { name: 'Log out' }).click()
  await expect(page.getByRole('heading', { level: 1 })).toContainText('classes, tasks and attendance')

  expect(errors).toEqual([])
})

test('a returning student logs in with the keyboard only', async ({ page, errors }) => {
  await mockApi(page)
  await page.goto('/login')
  await page.getByPlaceholder('Email').focus()
  await page.keyboard.type('student@test.dev')
  await page.keyboard.press('Tab')
  await page.keyboard.type('password123')
  await page.keyboard.press('Enter')
  await expect(page.getByRole('heading', { name: /Test Student/ })).toBeVisible()
  expect(errors).toEqual([])
})

test('clicking every button on every page never crashes', async ({ page, errors }) => {
  test.setTimeout(300000)
  page.on('dialog', dialog => dialog.dismiss())
  await mockApi(page, { loggedIn: true })
  for (const path of ['/', '/modules', '/schedule', '/tasks', '/focus', '/friends', '/more', '/widget']) {
    await page.goto(path)
    await expect(page.getByRole('heading').first()).toBeVisible()
    const count = await page.locator('main button:visible, .widget button:visible').count()
    for (let i = 0; i < count; i++) {
      await page.goto(path)
      await expect(page.getByRole('heading').first()).toBeVisible()
      const button = page.locator('main button:visible, .widget button:visible').nth(i)
      if (!(await button.count()) || (await button.isDisabled())) continue
      await button.click({ timeout: 2000 }).catch(() => {})
      await page.keyboard.press('Escape')
      await expect(page.locator('#root')).not.toBeEmpty()
    }
  }
  expect(errors).toEqual([])
})
