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
    return response.status(404).json({ error: 'the user does not exists' })
  }
  request.body.user = user.id

  const blog = new Blog(request.body)
  const newBlog = await (await blog.save()).populate('user', { username: 1, name: 1 })

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

blogsRouter.put('/:id', async (request, response) => {
  if (!request.token) {
    return response.status(401).json({ error: 'token missing' })
  }

  const { likes, title, author, url } = request.body
  const updatedBlog = await Blog
    .findByIdAndUpdate(
      request.params.id,
      { likes, title, author, url },
      { new: true, runValidators: true, context: 'query' }
    )
    .populate('user', { username: 1, name: 1 })

  if (!updatedBlog) {
    return response.status(404).json({ error: 'the blog does not exist' })
  }

  response.json(updatedBlog)
})

module.exports = blogsRouter