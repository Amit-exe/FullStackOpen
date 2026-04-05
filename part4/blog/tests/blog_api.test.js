const assert = require("node:assert")
const {test,after,beforeEach} = require("node:test")
const mongoose = require("mongoose")
const supertest = require("supertest")
const Blog = require("../models/blog")
const User = require("../models/user")
const app = require("../app")
const { log } = require("node:console")
const bcrypt = require('bcrypt')
const api = supertest(app)


const initialNotes = [
{
"title": "Node patterns",
"author": "Mike Devis",
"url": "https://nodepatterns.com",
"likes": 11,

},
{
"title": "React patterns",
"author": "Michael Chan",
"url": "https://reactpatterns.com",
"likes": 8,
}
]

beforeEach(async () => {
  await Blog.deleteMany({})
  let noteObject = new Blog(initialNotes[0])
  await noteObject.save()
  noteObject = new Blog(initialNotes[1])
  await noteObject.save()


   await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
})


test("blog id are returned as id", async ()=>{
    const blogs = await api.get('/api/blogs').
    expect(200).
    expect('Content-Type', /application\/json/)

    const firstNote = blogs.body[0]

  
  assert.ok(firstNote.id, 'id should be defined')
  
  
  assert.strictEqual(firstNote._id, undefined, '_id should be removed')
   
})





test.only("creates a new blog post", async ()=>{

    const user = await api.post('/api/user/login').send({username:"root",password:"sekret"})

    console.log(user.body,"gfgfgfgfgf");
    

    const newblog = {
        "title": "mongo patterns",
        "author": "Irish Carol",
        "url": "https://mongopatterns.com",
        "likes": 8,
        
        }

    await api.post('/api/blogs').
    send(newblog).
    set('Authorization', `Bearer ${user.body.token}`).
    expect(201).
    expect('Content-Type', /application\/json/)

    const blogs = await api.get('/api/blogs')
    
    const blogTitles = blogs.body.map(e=>e.title)
    
  assert.strictEqual(blogs.body.length, initialNotes.length+1   )
   assert(blogTitles.includes("mongo patterns"))
})


test("creates a new blog post without like property", async ()=>{

    const newblog = {
        "title": "mongo patterns",
        "author": "Irish Carol",
        "url": "https://mongopatterns.com",
        }

    const createdBlog = await api.post('/api/blogs').
    send(newblog).
    expect(201).
    expect('Content-Type', /application\/json/)

    const blogs = await api.get('/api/blogs')
    
  
    assert.strictEqual(blogs.body.length, initialNotes.length+1   )
    assert.strictEqual(createdBlog.body.likes, 0, 'likes should default to 0');

})


test("creates a new blog post without the title or url properties", async ()=>{

    const newblog = {
        "author": "Irish Carol",
        "url": "https://mongopatterns.com",
        }

    const createdBlog = await api.post('/api/blogs').
    send(newblog).
    expect(400).
    expect('Content-Type', /application\/json/)

    const blogs = await api.get('/api/blogs')
    
 
    assert.strictEqual(blogs.body.length, initialNotes.length  )

})


test("delete a blog", async ()=>{
    const blogs = await api.get('/api/blogs')
    const firstBlogId = blogs.body[0].id
    const deleteBlog = await api.delete(`/api/blogs/${firstBlogId}`).
    expect(204)
    const blogsN = await api.get('/api/blogs')

    assert.strictEqual(blogsN.body.length, initialNotes.length - 1 )

})


test("update a blog", async ()=>{
    const blogs = await api.get('/api/blogs')
    const updates = {
    "title": "Updated title",
    "author":"Josh High"

}
    const firstBlogId = blogs.body[0].id
    const updateteBlog = await api.patch(`/api/blogs/${firstBlogId}`).send(updates).
    expect(200)
    const blogsn = await api.get('/api/blogs')
    const blogTitles = blogsn.body.map(e=>e.title)
    console.log(blogTitles);
    
    assert(blogTitles.includes("Updated title"))

})

after(async () => {
  await mongoose.connection.close()
})


