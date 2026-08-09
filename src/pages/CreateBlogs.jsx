import React from "react";
import { useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import MDEditor from "@uiw/react-md-editor";

const CreateBlogs = () => {
  const [title, setTitle] = useState("");

  const [content, setcontent] = useState("");

  const [author_name, setauthor_name] = useState("");

  const [isPending, setisPending] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // object shorthand
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
          navigate("/Blogs");
        }, 2000);
      })

      .catch((err) => {
        console.error(err);
        toast.error("Failed to create blog", {
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        });
        setisPending(false);
      });
  };
  return (
    <>
   
  
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="mx-auto max-w-5xl rounded-3xl bg-white p-8 shadow-xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900">
            Create New Blog
          </h1>
          <p className="mt-2 text-gray-500">
            Share your ideas with the world using Markdown.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Blog Title */}
          <div>
            <label
              htmlFor="blog-title"
              className="mb-2 block text-sm font-semibold text-gray-700"
            >
              Blog Title
            </label>

            <input
              type="text"
              value={title}
              id="blog-title"
              required
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter blog title..."
              className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none transition-all duration-300 focus:border-black focus:ring-2 focus:ring-black/10"
            />
          </div>

          {/* Author */}
          <div>
            <label
              htmlFor="blog-author"
              className="mb-2 block text-sm font-semibold text-gray-700"
            >
              Author
            </label>

            <input
              type="text"
              value={author_name}
              required
              id="blog-author"
              onChange={(e) => setauthor_name(e.target.value)}
              placeholder="Your name..."
              className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none transition-all duration-300 focus:border-black focus:ring-2 focus:ring-black/10"
            />
          </div>

          {/* Markdown Editor */}
          <div>
            <label
              htmlFor="blog-content"
              className="mb-2 block text-sm font-semibold text-gray-700"
            >
              Blog Content
            </label>

            <div
              data-color-mode="light"
              className="overflow-hidden rounded-2xl border border-gray-200 shadow-sm"
            >
              <MDEditor
                value={content}
                onChange={setcontent}
                height={300}
                preview="live"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            {!isPending ? (
              <button
                className="rounded-xl bg-black px-8 py-3 font-semibold text-white transition-all duration-300 hover:bg-gray-800 active:scale-95"
              >
                Publish Blog
              </button>
            ) : (
              <button
                disabled
                className="cursor-not-allowed rounded-xl bg-gray-400 px-8 py-3 font-semibold text-white"
              >
                Publishing...
              </button>
            )}
          </div>

          <Toaster position="bottom-right" />
        </form>
      </div>
    </div>
  
);
    </>
  );
};

export default CreateBlogs;
