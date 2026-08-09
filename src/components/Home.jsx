import React from 'react'
import BlogList from "./BlogList";
import useFetch from '../../hooks/useFetch';
import LoadingState from './LoadingState';
const endpoint = 'https://cw-blog-backend.onrender.com'
const Home = () => {
const {data:blogs, ispending, error} = useFetch(`${endpoint}/api/blogs`)

  return (
    <div className="home">
      {error && <div className='errors'>{error}</div>}
      {ispending && <div><LoadingState/></div>}
      {/* child component  */}
      {blogs && <BlogList blog={blogs} title="All Blogs!"/>}
  
    </div>
  )
}

export default Home
