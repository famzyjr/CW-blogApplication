import { Link } from "react-router-dom";

const BlogList = ({ blog, title }) => {
  return (
    <>
      <h2 style={{textAlign:'center'}}>{title}</h2>
      <div className="blog-list">
        {blog.map((blogs) => (
          <div className="card_con">
            <div className="card" key={blogs.id}>
              <Link to={`/blogs/${blogs.id}`}>
                <h2>{blogs.title}</h2>
                <p>written by {blogs.author_name}</p>
                <p>Time created {blogs.created_at}</p>
                <div class="overlay">
                  <Link href="details.html" class="btn">
                    Read More
                  </Link>
                </div>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default BlogList;
