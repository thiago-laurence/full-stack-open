const _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return null
  }
  const result = blogs.reduce((favorite, blog) => favorite.likes >= blog.likes ? favorite : blog, blogs[0])
  return {
    title: result.title,
    author: result.author,
    likes: result.likes
  }
}

const mostBlogs = (blogs) => {
  if (_.isEmpty(blogs)) {
    return null
  }
  const blogCounts = _.countBy(blogs, 'author')
  const author = _.maxBy(_.keys(blogCounts), (author) => blogCounts[author])
  return {
    author,
    blogs: blogCounts[author]
  }
}

const mostLikes = (blogs) => {
  if (_.isEmpty(blogs)) {
    return null
  }
  const likes = _.chain(blogs)
    .groupBy('author')
    .map((blogs, author) => ({
      author,
      likes: _.sumBy(blogs, 'likes')
    }))
    .maxBy('likes')
    .value()

  return likes
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}