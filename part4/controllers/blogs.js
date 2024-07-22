const middleware = require('../utils/middleware')
const blogsRouter = require('express').Router()
const Blog = require('../models/Blog')
const User = require('../models/User')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.post('/', middleware.userExtractor, async (request, response) => {
  const user = await User.findById(request.user.id)
  if (!user) {
    return response.status(404).json({ error: 'the user dont exists' })
  }
  request.body.user = user.id

  const blog = new Blog(request.body)
  const newBlog = await blog.save()

  response.status(201).json(newBlog)
})

blogsRouter.get('/:id', middleware.userExtractor, async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if (!blog){
    return response.status(404).end()
  }
  response.json(blog)
})

blogsRouter.delete('/:id', middleware.userExtractor, async (request, response) => {
  const blog = await Blog.findById(request.params.id)

  if (request.user.id !== blog.user.toString()){
    return response.status(403).end()
  }
  await blog.deleteOne()
  response.status(204).end()
})

blogsRouter.put('/:id', middleware.userExtractor, async (request, response) => {
  const blog = await Blog.findById(request.params.id)

  if (request.user.id !== blog.user.toString()){
    return response.status(403).end()
  }

  blog.likes = request.body.likes
  blog.updateOne()
  response.json(blog)
})

module.exports = blogsRouter