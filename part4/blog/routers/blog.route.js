const {getBlogs,createBlog, deleteBlog} = require("../controllers/blog.controller")
const blogRouter = require('express').Router()

blogRouter.get('/', (request, response) => 
  getBlogs(request,response)
)

blogRouter.post('/', (request, response) => 
  createBlog(request,response)
)

blogRouter.delete('/:id', (request, response) => 
  deleteBlog(request,response)
)

module.exports = blogRouter