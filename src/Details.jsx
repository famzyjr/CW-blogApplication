import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";
import MDEditor from "@uiw/react-md-editor";
import useFetch from "../hooks/useFetch";
import LoadingState from "./components/LoadingState";
import remarkGfm from "remark-gfm";
function Details() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [Editindex, setEditIndex] = useState(null);
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
        navigate("/Home");
      }, 2000);
    } catch (err) {
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

  const updatedBlog = { title, content };

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
          navigate("/Home");
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

      <div className="blog-preview">
        {ispending && <LoadingState />}

        {error && <div className="errors">{error}</div>}
        {blogs && (
          <article className="max-w-5xl mx-auto bg-white rounded-3xl shadow-lg border border-gray-200 overflow-hidden">
            {/* Header */}
            <div className="p-8 border-b border-gray-200">
              {!isEdit ? (
                <>
                  <span className="inline-block px-3 py-1 rounded-full bg-black text-white text-xs font-medium">
                    Blog
                  </span>

                  <h1 className="mt-5 text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                    {blogs.title}
                  </h1>

                  <div className="mt-6 flex items-center justify-between flex-wrap gap-5">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center font-bold text-lg">
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

                    <div className="flex gap-3">
                      <button
                        onClick={handleEdit}
                        className="px-6 py-3 rounded-xl bg-black text-white hover:bg-gray-800 transition"
                      >
                        Edit
                      </button>

                      <button
                        onClick={openModal}
                        className="px-6 py-3 rounded-xl border border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="space-y-6">
                  <div>
                    <label className="block mb-2 text-sm font-semibold text-gray-700">
                      Blog Title
                    </label>

                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-full rounded-xl border border-gray-300 px-5 py-3 focus:ring-2 focus:ring-black outline-none"
                    />
                  </div>

                  <div data-color-mode="light mx-auto max-w-5xl rounded-2xl bg-white shadow-xl border border-gray-200 overflow-hidden">
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

                  <div className="flex gap-4">
                    <button
                      onClick={SaveBlog}
                      className="px-7 py-3 rounded-xl bg-black text-white hover:bg-gray-800 transition"
                    >
                      {isPending ? "Saving..." : "Save Changes"}
                    </button>

                    <button
                      onClick={() => {
                        setTitle(blogs.title);
                        setContent(blogs.content);
                        setIsEdit(false);
                      }}
                      className="px-7 py-3 rounded-xl border border-gray-300 hover:bg-gray-100 transition"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>

            {isModalOpen && (
              <div className="modal-overlay">
                <div className="delete-modal">
                  <div className="modal-content">
                    <h3>Delete Blog?</h3>

                    <p>Are you sure you want to delete this blog post?</p>

                    <span>This action cannot be undone.</span>
                    <div className="modal-footer">
                      <button className="cancel-btn" onClick={closeModal}>
                        Cancel
                      </button>

                      <button className="delete-btn" onClick={handleDelete}>
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {!isEdit && (
              <div className="p-8">
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
                  <MDEditor.Markdown source={blogs.content} />
                </div>
              </div>
            )}
          </article>
        )}
      </div>
    </>
  );
}

export default Details;
