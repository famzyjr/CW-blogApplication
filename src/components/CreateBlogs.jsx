import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const CreateBlogs = () => {
  const [title, setTitle] = useState("");
  const [Content, setContent] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [isPending, setisPending] = useState(false);
 const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventdefault();
    const blog = { title, authorName, Content };
    setisPending(true);
    const endpoint = "https://cw-blog-backend.onrender.com";
    fetch(`${endpoint}/api/blogs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(blog),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to create blog");
        } else {
          return response.json();
        }
      })
      .then((data) => {
        console.log("New blog added:", data);
        setisPending(false);
        console.log(data);
        
        navigate("/");
      })
      .catch((err) => {
        console.error(err);
        setisPending(false);
      });
  };
  return (
    <>
      <div className="create">
        <h1>Add a new blog</h1>
        <form onSubmit={handleSubmit}>
          <label>Blog title:</label>
          <input
            type="text"
            value={title}
            required
            onChange={(e) => setTitle(e.target.value)}
          />
          <label>Blog author</label>
          <input
            type="text"
            value={authorName}
            required
            onChange={(e) => setAuthorName(e.target.value)}
          />
          <label>Blog body:</label>
          <textarea
            required
            value={Content}
            onChange={(e) => setContent(e.target.value)}
            
          ></textarea>
          
            {!isPending && <button>Add blog</button>}
        {isPending && <button disabled>adding blog ...</button>}
        </form>
      </div>
    </>
  );
};

export default CreateBlogs;
