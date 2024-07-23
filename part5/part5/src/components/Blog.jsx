const Blog = ({ blog }) => (
  <div>
    <p>
      "{ blog.title }" - { blog.author }
      { ": " + blog.likes } likes.
    </p>
  </div>  
)

export default Blog