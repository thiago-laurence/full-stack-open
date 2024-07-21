const { test, describe, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/Blog')

beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObjects = helper.initialBlogs
    .map(b => new Blog(b))
  const promiseArray = blogObjects.map(b => b.save())
  await Promise.all(promiseArray)
})


describe('Blogs test', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    assert.strictEqual(response.body.length, helper.initialBlogs.length)
  })

  test('identifier field is named \'id\'', async () => {
    const response = await api.get('/api/blogs')

    assert(response.body[0].id)
  })

  test('a valid blog can be added', async () => {
    const newBlog = {
      title: 'async/await simplifies making async calls',
      author: 'Martin Fowler',
      url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
      likes: 12
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    const response = await api.get('/api/blogs')
    const contents = response.body.map(r => r.title)
    assert.strictEqual(response.body.length, helper.initialBlogs.length + 1)
    assert(contents.includes('async/await simplifies making async calls'))
  })

  test('if likes property is missing, it will default to 0', async () => {
    const newBlog = {
      title: 'async/await simplifies making async calls',
      author: 'Martin Fowler',
      url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    }

    const savedBlog = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    assert.strictEqual(savedBlog.body.likes, 0)
  })

  test('if title or url properties are missing, it will return 400 Bad Request', async () => {
    const invalidBlogs = [
      {
        author: 'Martin Fowler',
        likes: 2
      },
      {
        title: 'async/await simplifies making async calls',
        author: 'Martin Fowler',
        likes: 2
      },
      {
        author: 'Martin Fowler',
        url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
        likes: 2
      }
    ]

    const promiseArray = invalidBlogs.map(b => {
      return api
        .post('/api/blogs')
        .send(b)
        .expect(400)
    })
    await Promise.all(promiseArray)
  })
})

after(async () => {
  await mongoose.connection.close()
})