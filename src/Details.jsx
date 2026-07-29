import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import LoadingState from "./components/LoadingState";
import { toast, Toaster } from "react-hot-toast";
function Details() {
  const [IsModalOpen, setIsModalOpen] = useState(false);
  const { id } = useParams();
  const endpoint = "https://cw-blog-backend.onrender.com";
  const {
    data: blogs,
    ispending,
    error,
  } = useFetch(`${endpoint}/api/blogs/${id}`);

  const navigate = useNavigate();

  const handleClick = () => {
    fetch(`${endpoint}/api/blogs/${id}`, {
      method: "DELETE",
    }).then(() => {
      toast.success("🎉 Blog deleted successfully!", {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
      setTimeout(() => {
        navigate("/Home");
      }, 2000);
    });
  };

  const OpenModal = () => {
    setIsModalOpen(true);
    console.log("name");
  };
  const CloseModal = () => {
    setIsModalOpen(false);
    console.log("name");
  };

  return (
    <div className="blog-preview">
      {/* <h2> me {id}</h2> */}
      {ispending && <LoadingState />}
      {error && <div className="errors">{error}</div>}
      {blogs && (
        <article>
          <h2>{blogs.title}</h2>

          <p>Written by {blogs.author_name}</p>

          <div>{blogs.content}</div>

          <button onClick={OpenModal}>delete</button>

          {IsModalOpen && (
            <div className="modal-overlay">
              <div className="delete-modal">
                <div className="modal-content">
                  <h3>Delete Blog?</h3>

                  <p>Are you sure you want to delete this blog post?</p>

                  <span>This action cannot be undone.</span>
                </div>

                <div className="modal-footer">
                  <button onClick={CloseModal} className="cancel-btn">
                    Cancel
                  </button>

                  {!ispending && (
                    <button onClick={handleClick} className="delete-btn">
                      Delete
                    </button>
                  )}

                  {ispending && (
                    <button onClick={handleClick} className="delete-btn">
                      Delete
                    </button>
                  )}
                  <Toaster position="bottom-right" />
                </div>
              </div>
            </div>
          )}
        </article>
      )}
    </div>
  );
}

export default Details;
