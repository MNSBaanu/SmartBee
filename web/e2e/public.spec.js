import { test, expect, mockApi, expectNoHorizontalScroll } from './fixtures'

test.beforeEach(async ({ page }) => {
  await mockApi(page)
})

test.describe('Landing page', () => {
  test('renders hero, features and footer without errors', async ({ page, errors }) => {
    await page.goto('/')
    await expect(page).toHaveTitle(/.+/)
    await expect(page.getByRole('heading', { level: 1 })).toContainText('classes, tasks and attendance')
    await expect(page.locator('.landing-card')).toHaveCount(8)
    await expect(page.locator('.landing-foot')).toContainText('MNS Baanu')
    await expect(page.locator('img[src="/hero-bee.png"]')).toBeVisible()
    const broken = await page.evaluate(() =>
      [...document.images].filter(img => img.complete && img.naturalWidth === 0).map(img => img.src)
    )
    expect(broken, 'broken images').toEqual([])
    expect(errors).toEqual([])
  })

  test('has no horizontal scroll', async ({ page }) => {
    await page.goto('/')
    await expectNoHorizontalScroll(page)
  })

  test('Get started navigates to login', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('link', { name: 'Get started free' }).first().click()
    await expect(page).toHaveURL(/\/login$/)
    await expect(page.getByRole('heading', { name: 'Welcome back' })).toBeVisible()
  })

  test('in-page anchors point at existing sections', async ({ page }) => {
    await page.goto('/')
    for (const id of ['features', 'how']) {
      await expect(page.locator(`#${id}`)).toHaveCount(1)
    }
  })

  test('has no dead # links', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('a[href="#"]')).toHaveCount(0)
  })
})

test.describe('Login page', () => {
  test('show password toggles input type', async ({ page }) => {
    await page.goto('/login')
    const password = page.getByPlaceholder('Password')
    await expect(password).toHaveAttribute('type', 'password')
    await page.getByRole('button', { name: 'Show password' }).click()
    await expect(password).toHaveAttribute('type', 'text')
    await page.getByRole('button', { name: 'Hide password' }).click()
    await expect(password).toHaveAttribute('type', 'password')
  })

  test('wrong password shows an error', async ({ page }) => {
    await page.goto('/login')
    await page.getByPlaceholder('Email').fill('student@test.dev')
    await page.getByPlaceholder('Password').fill('wrongpass1')
    await page.getByRole('button', { name: 'Log in' }).click()
    await expect(page.locator('.auth-error')).toHaveText('Invalid email or password')
  })

  test('valid login opens the dashboard', async ({ page, errors }) => {
    await page.goto('/login')
    await page.getByPlaceholder('Email').fill('student@test.dev')
    await page.getByPlaceholder('Password').fill('password123')
    await page.getByRole('button', { name: 'Log in' }).click()
    await expect(page.getByRole('heading', { name: /Test Student/ })).toBeVisible()
    expect(errors).toEqual([])
  })

  test('register mode shows name field and signs up', async ({ page }) => {
    await page.goto('/login')
    await page.getByRole('button', { name: 'Create an account' }).click()
    await expect(page.getByRole('heading', { name: 'Create your account' })).toBeVisible()
    await page.getByPlaceholder('Name').fill('New Bee')
    await page.getByPlaceholder('Email').fill('new@test.dev')
    await page.getByPlaceholder('Password').fill('password123')
    await page.getByRole('button', { name: 'Sign up' }).click()
    await expect(page.getByRole('heading', { name: /New Bee/ })).toBeVisible()
  })

  test('short password is blocked by validation', async ({ page }) => {
    await page.goto('/login')
    await page.getByPlaceholder('Email').fill('student@test.dev')
    await page.getByPlaceholder('Password').fill('short')
    await page.getByRole('button', { name: 'Log in' }).click()
    await expect(page).toHaveURL(/\/login$/)
    await expect(page.locator('.auth-error')).toHaveCount(0)
  })

  test('has no horizontal scroll', async ({ page }) => {
    await page.goto('/login')
    await expectNoHorizontalScroll(page)
  })

  test('unknown route shows login', async ({ page }) => {
    await page.goto('/does-not-exist')
    await expect(page.getByRole('heading', { name: 'Welcome back' })).toBeVisible()
  })
})
