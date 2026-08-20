import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";
import MDEditor from "@uiw/react-md-editor";
import useFetch from "../hooks/useFetch";
import remarkGfm from "remark-gfm";
import DetailsSkeleton from "./components/Skeletons/DetailsSkeleton";

function Details() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isPending, setisPending] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();

  const endpoint = "https://cw-blog-backend.onrender.com";

  const {
    data: blogs,
    ispending,
    error,
  } = useFetch(`${endpoint}/api/blogs/${id}`);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleDelete = async () => {
    try {
      closeModal();

      const response = await fetch(`${endpoint}/api/blogs/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete blog");
      }

      toast.success("🗑️ Blog deleted successfully!", {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });

      setTimeout(() => {
        navigate("/blogs");
      }, 2000);
    } catch (err) {
      console.error(err);

      toast.error("❌ Failed to delete the blog.", {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
    }
  };

  const handleEdit = () => {
    setTitle(blogs.title);
    setContent(blogs.content || "");
    setIsEdit(true);
  };

  const SaveBlog = () => {
    setisPending(true);

    const updatedBlog = {
      title,
      content,
    };

    fetch(`${endpoint}/api/blogs/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedBlog),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to update blog");
        }

        return res.json();
      })
      .then(() => {
        toast.success("🎉 Blog updated successfully!", {
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        });

        setisPending(false);
        setIsEdit(false);

        setTimeout(() => {
          navigate("/blogs");
        }, 1500);
      })
      .catch((err) => {
        console.error(err);

        toast.error("Failed to update blog", {
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
      <Toaster position="bottom-right" />

      <main
        className="blog-preview"
        aria-label="Blog details"
      >
        {/* Loading */}
        {ispending && (
          <div
            role="status"
            aria-live="polite"
            aria-label="Loading blog"
          >
            <DetailsSkeleton />
          </div>
        )}

        {/* Error */}
        {error && (
          <div
            role="alert"
            className="errors"
          >
            {error}
          </div>
        )}

        {/* Blog */}
        {blogs && (
          <article
            aria-labelledby="blog-title"
            className="max-w-5xl mx-auto bg-white rounded-3xl shadow-lg border border-gray-200 overflow-hidden"
          >
            {/* Header */}
            <div className="p-8 border-b border-gray-200">
              {!isEdit ? (
                <>
                  {/* Category */}
                  <span className="inline-block px-3 py-1 rounded-full bg-black text-white text-xs font-medium">
                    Blog
                  </span>

                  {/* Blog Title */}
                  <h1
                    id="blog-title"
                    className="mt-5 text-4xl md:text-5xl font-bold text-gray-900 leading-tight"
                  >
                    {blogs.title}
                  </h1>

                  {/* Author information */}
                  <div className="mt-6 flex items-center justify-between flex-wrap gap-5">
                    <div className="flex items-center gap-4">
                      {/* Avatar */}
                      <div
                        aria-hidden="true"
                        className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center font-bold text-lg"
                      >
                        {blogs.author_name.charAt(0).toUpperCase()}
                      </div>

                      <div>
                        <p className="font-semibold text-gray-900">
                          {blogs.author_name}
                        </p>

                        <p className="text-sm text-gray-500">
                          Published • {blogs.created_at}
                        </p>
                      </div>
                    </div>

                    {/* Blog Actions */}
                    <div
                      className="flex gap-3"
                      aria-label="Blog actions"
                    >
                      <button
                        type="button"
                        onClick={handleEdit}
                        className="px-6 py-3 rounded-xl bg-black text-white hover:bg-gray-800 transition focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
                      >
                        Edit
                      </button>

                      <button
                        type="button"
                        onClick={openModal}
                        className="px-6 py-3 rounded-xl border border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                /* Edit Mode */
                <div
                  className="space-y-6"
                  aria-labelledby="edit-blog-heading"
                >
                  <h2
                    id="edit-blog-heading"
                    className="text-2xl font-bold text-gray-900"
                  >
                    Edit Blog
                  </h2>

                  {/* Blog Title */}
                  <div>
                    <label
                      htmlFor="blog-title-input"
                      className="block mb-2 text-sm font-semibold text-gray-700"
                    >
                      Blog Title
                    </label>

                    <input
                      id="blog-title-input"
                      name="title"
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      required
                      className="w-full rounded-xl border border-gray-300 px-5 py-3 focus:ring-2 focus:ring-black focus:border-black outline-none"
                    />
                  </div>

                  {/* Markdown Editor */}
                  <div>
                    <label
                      htmlFor="blog-content-editor"
                      className="block mb-2 text-sm font-semibold text-gray-700"
                    >
                      Blog Content
                    </label>

                    <div
                      id="blog-content-editor"
                      data-color-mode="light"
                      className="mx-auto max-w-5xl rounded-2xl bg-white shadow-xl border border-gray-200 overflow-hidden"
                    >
                      <MDEditor
                        value={content}
                        onChange={(value) => setContent(value || "")}
                        height={600}
                        preview="edit"
                        previewOptions={{
                          remarkPlugins: [remarkGfm],
                        }}
                      />
                    </div>
                  </div>

                  {/* Edit Actions */}
                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={SaveBlog}
                      disabled={isPending}
                      aria-busy={isPending}
                      className={`px-7 py-3 rounded-xl bg-black text-white transition focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 ${
                        isPending
                          ? "cursor-not-allowed opacity-60"
                          : "hover:bg-gray-800"
                      }`}
                    >
                      {isPending ? "Saving..." : "Save Changes"}
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setTitle(blogs.title);
                        setContent(blogs.content || "");
                        setIsEdit(false);
                      }}
                      disabled={isPending}
                      className="px-7 py-3 rounded-xl border border-gray-300 hover:bg-gray-100 transition focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Delete Confirmation Modal */}
            {isModalOpen && (
              <div
                className="modal-overlay"
                role="presentation"
              >
                <div
                  className="delete-modal"
                  role="dialog"
                  aria-modal="true"
                  aria-labelledby="delete-blog-title"
                  aria-describedby="delete-blog-description"
                >
                  <div className="modal-content">
                    <h2 id="delete-blog-title">
                      Delete Blog?
                    </h2>

                    <p id="delete-blog-description">
                      Are you sure you want to delete this blog post?
                    </p>

                    <span>
                      This action cannot be undone.
                    </span>

                    <div className="modal-footer">
                      <button
                        type="button"
                        className="cancel-btn focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
                        onClick={closeModal}
                      >
                        Cancel
                      </button>

                      <button
                        type="button"
                        className="delete-btn focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                        onClick={handleDelete}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Blog Content */}
            {!isEdit && (
              <section
                aria-labelledby="blog-content-heading"
                className="p-8"
              >
                <h2
                  id="blog-content-heading"
                  className="sr-only"
                >
                  Blog content
                </h2>

                <div
                  className="
                    prose
                    prose-lg
                    max-w-none
                    prose-headings:font-bold
                    prose-headings:text-gray-900
                    prose-p:text-gray-700
                    prose-p:leading-8
                    prose-img:rounded-2xl
                    prose-pre:rounded-xl
                    prose-code:text-blue-600
                  "
                >
                  <MDEditor.Markdown
                    source={blogs.content}
                  />
                </div>
              </section>
            )}
          </article>
        )}
      </main>
    </>
  );
}

export default Details;