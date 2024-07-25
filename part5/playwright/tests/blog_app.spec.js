const { test, describe, expect, beforeEach } = require('@playwright/test')
const { loginWith, createBlog } = require('./test_helper')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset')
    await request.post('/api/users', {
      data: {
        name: 'Thiago Laurence',
        username: 'thiago-laurence',
        password: '123'
      }
    })
    await request.post('/api/users', {
      data: {
        name: 'Another user',
        username: 'another-user',
        password: '123'
      }
    })

    await page.goto('/')
  })

  test('front page can be opened and login form is shown', async ({ page }) => {
    const locator = await page.getByText('Log in to application')
    await expect(locator).toBeVisible()
    await expect(await page.getByRole('button', { name: 'Login' })).toBeVisible()
  })
  
  describe('Login, ', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await loginWith(page, 'thiago-laurence', '123')
      await expect(await page.getByText('Thiago Laurence logged-in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await loginWith(page, 'thiago-laurence', 'wrong')
      await expect(await page.getByText('invalid username or password')).toBeVisible()
    })
  })

  describe('When logged in, ', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, 'thiago-laurence', '123')
    })

    test('a blog can be created', async ({ page }) => {
      await page.getByRole('button', { name: 'Create new blog' }).click()
      await createBlog(page, {
        title: 'Blog title',
        author: "Author name",
        url: "http://example.com"
      })
      await expect(await page.getByText('a new blog is added')).toBeVisible()
      await expect(await page.getByText('Blog title')).toBeVisible()
    })

    test('a blog can be liked', async ({ page }) => {title: 'Blog title',
      await page.getByRole('button', { name: 'Create new blog' }).click()
      await createBlog(page, {
        title: 'Blog title',
        author: "Author name",
        url: "http://example.com"
      })
      await page.getByRole('button', { name: 'View' }).click()
      const beforeLike = Number((await page.getByTestId('blog-like').innerText()).split(' ')[0])
      await page.getByRole('button', { name: 'Like' }).click()
      await expect(await page.getByText('like added')).toBeVisible()
      const afterLike = Number((await page.getByTestId('blog-like').innerText()).split(' ')[0])
      await expect(afterLike).toBeGreaterThan(beforeLike)
    })

    test('a blog can be removed by the user who created it', async ({ page }) => {
      await page.getByRole('button', { name: 'Create new blog' }).click()
      await createBlog(page, {
        title: 'Blog title',
        author: "Author name",
        url: "http://example.com"
      })
      await page.getByRole('button', { name: 'View' }).click()
      page.on('dialog', dialog => dialog.accept());
      await page.getByRole('button', { name: 'Remove' }).click()
      
      await expect(await page.getByText('blog removed')).toBeVisible()
      await expect(await page.getByText('Blog title')).not.toBeVisible()
    })

    test('a blog cannot be removed by a user who did not create it', async ({ page }) => {
      await page.getByRole('button', { name: 'Create new blog' }).click()
      await createBlog(page, {
        title: 'Blog title',
        author: "Author name",
        url: "http://example.com"
      })
      await page.getByRole('button', { name: 'Logout' }).click()
      await loginWith(page, 'another-user', '123')
      await page.getByRole('button', { name: 'View' }).click()
      await expect(await page.getByRole('button', { name: 'Remove' })).not.toBeVisible()
    })

    test('blogs are ordered by likes', async ({ page }) => {
      await page.getByRole('button', { name: 'Create new blog' }).click()
      await createBlog(page, { title: 'Blog title 1', author: 'Author name 1', url: 'http://example1.com' })
      await page.getByRole('button', { name: 'Create new blog' }).click()
      await createBlog(page, { title: 'Blog title 2', author: 'Author name 2', url: 'http://example2.com' })
      await page.getByRole('button', { name: 'Create new blog' }).click()
      await createBlog(page, { title: 'Blog title 3', author: 'Author name 3', url: 'http://example3.com' })
      const allViewButtons = await page.getByRole('button', { name: 'View' }).all()
      // The order of array change after each like (for sorted blogs), so we need to click on the buttons in the correct order
      await allViewButtons[2].click() // Blog title 3
      await page.getByRole('button', { name: 'Like' }).click()
      await page.getByText('Blog title 3').waitFor()
      await page.getByRole('button', { name: 'Hide' }).click()
      await allViewButtons[1].click() // Blog title 1
      await page.getByRole('button', { name: 'Like' }).click()
      await page.getByText('Blog title 1').waitFor()
      await page.getByRole('button', { name: 'Like' }).click()
      await page.getByText('Blog title 1').waitFor()
      await page.getByRole('button', { name: 'Hide' }).click()
      const sortedBlogs = await page.locator('.blog-title-author').all()
      await expect(sortedBlogs[0]).toContainText('Blog title 1')
      await expect(sortedBlogs[1]).toContainText('Blog title 3')
      await expect(sortedBlogs[2]).toContainText('Blog title 2')
    })
  })
  
})