const { info } =  require("./logger")

const dummy = (blogs) => {
  return 1
}

const totalLikes =(blogs)=>blogs.reduce((a,b)=>a+Number(b.likes),0)

const favoriteBlog = (blogs)=>{
  return  blogs.length==0 ? 0: blogs.reduce((a,b)=>  Number(a.likes)>Number(b.likes) ? a : b )

  
}

const mostBlogs = ()=>{
  
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}