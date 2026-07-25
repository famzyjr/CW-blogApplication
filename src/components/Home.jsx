import React from 'react'
import BlogList from "./BlogList";
import useFetch from '../../hooks/useFetch'
const endpoint = 'https://cw-blog-backend.onrender.com'
const Home = () => {
const {data:blogs, ispending, error} = useFetch(`${endpoint}/api/blogs`)
  console.log(blogs);
  return (
    <div className="home">
      {error && <div>{error}</div>}
      {ispending && <div>Loading...</div>}
      {/* child component  */}
      {blogs && <BlogList blog={blogs} title="All Blogs!"/>}
  
    </div>
  )
}

export default Home
