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
  await Blog.insertMany(helper.initialBlogs)
})


describe('Blogs test', () => {
  describe('properties for blogs', () => {
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

    test('unique identifier property of the blog posts is named id', async () => {
      const response = await api.get('/api/blogs')
      const contents = response.body.map(r => r.id)
      assert(contents)
      assert.strictEqual(contents.length, helper.initialBlogs.length)
    })
  })
  describe('addition of a new blog', () => {
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

    test('blog without \'likes\' is added and it will default 0', async () => {
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

    test('blog without \'title\' or \'url\' is not added', async () => {
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

  describe('deletion of a blog', () => {
    test('succeeds with status code 204 if id is valid', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToDelete = blogsAtStart[0]

      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .expect(204)

      const blogsAtEnd = await helper.blogsInDb()

      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1)

      const contents = blogsAtEnd.map(r => r.title)
      assert(!contents.includes(blogToDelete.title))
    })
  })

  describe('updating a blog', () => {
    test('succeeds for increase likes if id is valid', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToUpdate = blogsAtStart[0]
      blogToUpdate.likes + 1

      const blogUpdated = await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send(blogToUpdate)
        .expect(200)

      assert.strictEqual(blogUpdated.body.likes, blogToUpdate.likes)
    })

    test('fails if blog does not exist', async () => {
      const validNonexistingId = await helper.nonExistingId()

      await api
        .get(`/api/blogs/${validNonexistingId}`)
        .expect(404)
    })
  })
})

after(async () => {
  await mongoose.connection.close()
})