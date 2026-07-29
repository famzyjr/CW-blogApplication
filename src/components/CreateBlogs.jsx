import React from "react";
import { useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const CreateBlogs = () => {
  const [title, setTitle] = useState("");

  const [content, setcontent] = useState("");

  const [author_name, setauthor_name] = useState("");

  const [isPending, setisPending] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const blog = { title, author_name, content };
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
          return res.json();
        }
      })
      .then((data) => {
        console.log("New blog added:", data);

        setisPending(false);

        console.log(data);

        toast.success("🎉 Blog published successfully!", {
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        });

        setTimeout(() => {
          navigate("/Home");
        }, 2000);
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
          <label for="blog-title">Blog title:</label>
          <input
            type="text"
            value={title}
            id="blog-title"
            required
            onChange={(e) => setTitle(e.target.value)}
          />
          <label for="blog-author">Blog author:</label>
          <input
            type="text"
            value={author_name}
            required
            id="blog-author"
            onChange={(e) => setauthor_name(e.target.value)}
          />
          <label for="blog-content">Blog body:</label>
          <textarea
            required
            id="blog-content"
            value={content}
            onChange={(e) => setcontent(e.target.value)}
          ></textarea>

          {!isPending && <button>Add blog</button>}
          {isPending && <button disabled>adding blog ...</button>}
          <Toaster position="bottom-right" />
        </form>
      </div>
    </>
  );
};

export default CreateBlogs;
