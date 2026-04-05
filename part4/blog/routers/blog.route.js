const {getBlogs,createBlog, deleteBlog,updateBlog} = require("../controllers/blog.controller")
const blogRouter = require('express').Router()
const {userExtractor} = require("../utils/middleware")
blogRouter.get('/', (request, response) => 
  getBlogs(request,response)
)

blogRouter.post('/', userExtractor, (request, response) => 
  createBlog(request,response)
)

blogRouter.delete('/:id', userExtractor, (request, response) => 
  deleteBlog(request,response)
)


blogRouter.patch('/:id', (request, response) => 
  updateBlog(request,response)
)

module.exports = blogRouter