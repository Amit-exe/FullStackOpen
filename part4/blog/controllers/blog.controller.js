const { default: mongoose } = require("mongoose")
const Blog = require("../models/blog")
const User = require('../models/user')


const getBlogs = async (request, response) => {
  // await Blog.deleteMany({})
   const blogs = await Blog.find({}).populate('user',{username:1,name:1})
    response.json(blogs)
  
}

const createBlog= async (request, response) => {



  const user = await User.findById(request.user)
  
  
  if (!user) {
    return response.status(400).json({ error: 'userId missing or not valid' })
  }

  if(!request.body.url || !request.body.title)
    return response.status(400).json({message:"url or title missing"})

  request.body.user = user._id
  delete request.body.userId
  const blog = new Blog(request.body)

  const result = await blog.save()


  user.blogs = user.blogs.concat(result._id)
  await user.save()
  response.status(201).json(result)
  
}

const deleteBlog= async (request, response) => {

 
  const user = await User.findById(request.user)

  if (!user) {
    return response.status(401).json({ error: 'user not found' })
  }

  const id = request.params.id

  
  if(!id || !mongoose.isValidObjectId(id))
    return response.status(400).json({message:"id missing or incorrect"})
  
  console.log(user,request.user);
  

  // user.blogs contains ObjectIds, so we need to convert them to strings to compare with the string id
  const hasBlog = user.blogs.some(blogId => blogId.toString() === id)
  if(!hasBlog)
    return response.status(403).json({message:"forbidden"})

  const blog = await Blog.findByIdAndDelete(id)
  if(!blog)
    return response.status(404).json({message:"blog not found"})
  
  return response.status(204).end()
  
}

const updateBlog= async (request, response) => {
  const id = request.params.id
  if(!id || !mongoose.isValidObjectId(id))
    return response.status(400).json({message:"id missing or incorrect"})
  
  const updates = request.body
  const blog = await Blog.findByIdAndUpdate(id,updates,  { returnDocument: 'after' }  )
  if(!blog)
    return response.status(404).json({message:"blog not found"})
  
  return response.status(200).json(blog)
  
}


module.exports = {getBlogs,createBlog,deleteBlog,updateBlog}