const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')
const { blogs } = require('../utils/list_helper')

describe ('favorite blog', () => {
  test('of a bigger list is calculated right', () => {
    const result = listHelper.favoriteBlog(blogs)
    const favorite = {
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      likes: 12
    }
    assert.deepStrictEqual(favorite, result)
  })

  test('of empty list is null', () => {
    const result = listHelper.favoriteBlog([])
    assert.strictEqual(result, null)
  })
})