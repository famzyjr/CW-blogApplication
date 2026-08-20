import React, { useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import MarkdownEditor from "@uiw/react-markdown-editor";

const CreateBlogs = () => {
  const [title, setTitle] = useState("");
  const [content, setcontent] = useState("");
  const [author_name, setauthor_name] = useState("");
  const [isPending, setisPending] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const blog = {
      title,
      author_name,
      content,
    };

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
        }

        return res.json();
      })
      .then((data) => {
        console.log("New blog added:", data);

        setisPending(false);

        toast.success("🎉 Blog published successfully!", {
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        });

        setTimeout(() => {
          navigate("/blogs");
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
      <main className="min-h-screen bg-gray-50 px-4 py-12">
        <div className="mx-auto max-w-5xl rounded-3xl bg-white p-8 shadow-xl">
          {/* Page Header */}
          <header className="mb-8">
            <h1
              id="create-blog-heading"
              className="text-4xl font-bold text-gray-900"
            >
              Create New Blog
            </h1>

            <p className="mt-2 text-gray-500">
              Share your ideas with the world using Markdown.
            </p>
          </header>

          {/* Blog Form */}
          <form
            onSubmit={handleSubmit}
            className="space-y-6"
            aria-labelledby="create-blog-heading"
          >
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
                id="blog-title"
                name="title"
                value={title}
                required
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter blog title..."
                autoComplete="off"
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
                id="blog-author"
                name="author"
                value={author_name}
                required
                onChange={(e) => setauthor_name(e.target.value)}
                placeholder="Your name..."
                autoComplete="name"
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
                id="blog-content"
                data-color-mode="light"
                className="overflow-hidden rounded-2xl border border-gray-200 shadow-sm"
                aria-label="Blog content editor"
              >
                <MarkdownEditor
                  value={content}
                  enablePreview={true}
                  onChange={setcontent}
                  height="500px"
                />
              </div>

              <p
                id="blog-content-help"
                className="mt-2 text-sm text-gray-500"
              >
                Write your blog content using Markdown. You can preview your
                content while writing.
              </p>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              {!isPending ? (
                <button
                  type="submit"
                  className="rounded-xl bg-black px-8 py-3 font-semibold text-white transition-all duration-300 hover:bg-gray-800 active:scale-95 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
                >
                  Publish Blog
                </button>
              ) : (
                <button
                  type="submit"
                  disabled
                  aria-disabled="true"
                  aria-label="Publishing blog"
                  className="cursor-not-allowed rounded-xl bg-gray-400 px-8 py-3 font-semibold text-white"
                >
                  Publishing...
                </button>
              )}
            </div>
          </form>
        </div>
      </main>

      {/* Toast Notifications */}
      <Toaster
        position="bottom-right"
        toastOptions={{
          ariaProps: {
            role: "status",
            "aria-live": "polite",
          },
        }}
      />
    </>
  );
};

export default CreateBlogs;