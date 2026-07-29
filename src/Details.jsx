import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";

import useFetch from "../hooks/useFetch";
import LoadingState from "./components/LoadingState";

function Details() {
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  return (
    <>
      <Toaster position="bottom-right" />

      <div className="blog-preview">
        {ispending && <LoadingState />}

        {error && <div className="errors">{error}</div>}

        {blogs && (
          <article>
            <h2>{blogs.title}</h2>

            <p>Written by {blogs.author_name}</p>

            <div>{blogs.content}</div>

            <button onClick={openModal}>
              Delete
            </button>
          </article>
        )}
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="delete-modal">

            <div className="modal-content">
              <h3>Delete Blog?</h3>

              <p>
                Are you sure you want to delete this blog post?
              </p>

              <span>
                This action cannot be undone.
              </span>
            </div>

            <div className="modal-footer">
              <button
                className="cancel-btn"
                onClick={closeModal}
              >
                Cancel
              </button>

              <button
                className="delete-btn"
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
}

export default Details;