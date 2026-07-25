import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import useFetch from '.././useFetch'

function Details() {
    const {id} = useParams()
     const endpoint = "https://cw-blog-backend.onrender.com";
    const {data:blogs,  ispending, error} = useFetch(`${endpoint}/api/blogs/${id}`);
     
    const navigate = useNavigate();

    const handleClick=()=>{
    fetch(`${endpoint}/api/blogs/${id}`,{
    method: 'DELETE'
    }).then(()=>{
      navigate('/');
    }) 

    }
    
    
  return (
    <div className='blog-preview'>
      {/* <h2> me {id}</h2> */}
     {ispending && <p>Loading...</p>}
     {error && <div>{error}</div>}
      {blogs &&(
        <article>
          <h2>{blogs.title}</h2>
          
          <p>Written by {blogs.author_name}</p>
          <div>{blogs.content}</div>
          <button onClick={handleClick}>delete</button>
        </article>
        
      )}
    </div>
  )
}

export default Details