const { info } =  require("./logger")

const dummy = (blogs) => {
  return 1
}

const totalLikes =(blogs)=>blogs.reduce((a,b)=>a+Number(b.likes),0)

const favoriteBlog = (blogs)=>{
  return  blogs.length==0 ? 0: blogs.reduce((a,b)=>  Number(a.likes)>Number(b.likes) ? a : b )

  
}

const mostBlogs = (blogs)=>{
  // console.log(blogs);
  const count = {};

  for (const i of blogs) {
    count[i.author] = (count[i.author] || 0) + 1;
}
  
const maxC = Object.keys(count).reduce((a, b) => count[a] > count[b] ? a : b);
console.log("most liked blog athor is ",maxC);

return {
  'author':maxC,
  'blogs':count[maxC]
}


  
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}