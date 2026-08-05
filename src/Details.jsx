import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";
import MDEditor from "@uiw/react-md-editor";
import useFetch from "../hooks/useFetch";
import LoadingState from "./components/LoadingState";

function Details() {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEdit,setIsEdit] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
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

const handleEdit=(index)=>{
  setTitle(blogs.title)
  setContent(blogs.content)
    setEditIndex(index);
    setIsEdit(true)
}
const updatedBlog = {title, content};

const SaveBlog=()=>{
fetch(`${endpoint}/api/blogs/${id}`,{
    method:"PUT",

    headers:{
        "Content-Type":"application/json"
    },

    body:JSON.stringify(updatedBlog)
})
.then((res)=>{
   if(!res.ok){
      throw new Error("Failed to create blog");
    
   }else {
          return res.json();
        }
})
  .then((data) => {
        console.log("New blog added:", data);

        setisPending(false);

        console.log(data);

        toast.success("🎉 Blog updated successfully!", {
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
        toast.error("Failed to create blog", {
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        });
        setisPending(false);
      });
}
  return (
    <>
      <Toaster position="bottom-right" />

      <div className="blog-preview">
        {ispending && <LoadingState />}

        {error && <div className="errors">{error}</div>}

        {blogs && (
          <article>
          {!isEdit ? (
            <>
              <h2>{blogs.title}</h2>

            <p>Written by {blogs.author_name}</p>

            <div>{blogs.content}</div>  
             <div className="flex gap-12">
               <button onClick={openModal}>
              Delete blog
            </button> 
            
            <button onClick={handleEdit}>
             Edit
            </button>
            </div>
            </>
          ):(
            <div>

             <div>
            <label
              htmlFor="blog-author"
              className="mb-2 block text-sm font-semibold text-gray-700"
            >
             Blog title
            </label>

            <input
              type="text"
              value={title}
              required
              id="blog-author"
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Your name..."
              className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none transition-all duration-300 focus:border-black focus:ring-2 focus:ring-black/10"
            />
          </div>
                <MDEditor
                value={content}
                onChange={setContent}
                height={300}
                preview="live"
              />
              <button onClick={SaveBlog}>Save</button>
              <button>Cancle</button>

            </div>
            
          )}
             
          
          
           
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