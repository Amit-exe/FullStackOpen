const { default: mongoose } = require("mongoose")
const Blog = require("../models/blog")

const getBlogs = async (request, response) => {
   const blogs = await Blog.find({})
    response.json(blogs)
  
}

const createBlog= async (request, response) => {

  if(!request.body.url || !request.body.title)
    return response.status(400).json({messae:"url or title missing"})

  const blog = new Blog(request.body)

  const result = await blog.save()
  response.status(201).json(result)
  
}

const deleteBlog= async (request, response) => {
  const id = request.params.id
  if(!id || !mongoose.isValidObjectId(id))
    return response.status(400).json({messae:"id missing or incorrect"})
  
  const blog = await Blog.findByIdAndDelete(id)
  if(!blog)
    return response.status(404).json({messae:"blog not found"})
  
  return response.status(204).end()
  
}

module.exports = {getBlogs,createBlog,deleteBlog}