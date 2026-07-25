import { Link } from "react-router-dom";

const BlogList = ({blog, title}) =>{

return(
  <div className="blog-list">
    <h2>{title}</h2>
 {blog.map((blogs)=> (
    <div className="blog-preview" key={blogs.id}>
     <Link to={`/blogs/${blogs.id}`}>
     <h2>{blogs.title}</h2>
      <p>written by {blogs.author_name}</p>
      <p>Time created  {blogs.created_at}</p>

     </Link>
    </div>
   
    ))}

  </div>
)
}

export default BlogList;
