const loginWith = async (page, username, password)  => {
  await page.getByTestId('username').fill(username)
  await page.getByTestId('password').fill(password)
  await page.getByRole('button', { name: 'Login' }).click()
}
  
const createBlog = async (page, blog) => {
  await page.getByTestId('form-title').fill(blog.title)
  await page.getByTestId('form-author').fill(blog.author)
  await page.getByTestId('form-url').fill(blog.url)
  await page.getByRole('button', { name: 'Create' }).click()
  await page.getByText(blog.title).waitFor()
}
  
export { loginWith, createBlog }