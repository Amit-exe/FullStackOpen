const {test, describe} = require("node:test")
const assert = require("node:assert")
const listHelper = require("../utils/list_helper")

 const blogs = [
  {
    "title": "React patterns",
    "author": "Michael Chan",
    "url": "https://reactpatterns.com",
    "likes": 7
  },
  {
    "title": "Go To Statement Considered Harmful",
    "author": "Edsger W. Dijkstra",
    "url": "http://www.u.arizona.edu",
    "likes": 5
  },
  {
    "title": "Canonical string reduction",
    "author": "Edsger W. Dijkstra",
    "url": "http://www.cs.utexas.edu",
    "likes": 12
  },
  {
    "title": "First class tests",
    "author": "Robert C. Martin",
    "url": "http://blog.cleancoder.com",
    "likes": 10
  },
  {
    "title": "TDD harms architecture",
    "author": "Robert C. Martin",
    "url": "http://blog.cleancoder.com",
    "likes": 0
  },
  {
    "title": "Type wars",
    "author": "Robert C. Martin",
    "url": "http://blog.cleancoder.com",
    "likes": 2
  }
]

test("dummy returns 1",()=>{
    const result = listHelper.dummy(blogs);

    assert.strictEqual(result,1)
})


describe("total likes",()=>{

test("total likes of  empty blog list",()=>{
   
    const result = listHelper.totalLikes([]);

    assert.strictEqual(result,0)
})

test("total likes of single item blog list",()=>{
   
    const result = listHelper.totalLikes([blogs[0]]);

    assert.strictEqual(result,7)
})

test("total likes of multiple blogs",()=>{
   
    const result = listHelper.totalLikes(blogs);

    assert.strictEqual(result,36)
})

})


describe("favoratie blog",()=>{

    test("favorite blog",()=>{
        const result = listHelper.favoriteBlog(blogs);
        assert.deepStrictEqual(result,blogs[2])
    })

    test("favorite blog with 0 element",()=>{
        const result = listHelper.favoriteBlog([]);
        assert.deepStrictEqual(result,0)
    })

    test("favorite blog with one element",()=>{
        const result = listHelper.favoriteBlog([blogs[0]]);
        assert.deepStrictEqual(result,blogs[0])
    })
})