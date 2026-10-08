import React from "react";
import BlogList from "./BlogList";
import useFetch from "../../hooks/useFetch";

const endpoint = "https://blogapi-5lsj.onrender.com";

const Home = () => {
  const { data: blogs, ispending, error } = useFetch(`${endpoint}/api/blogs`);

  return (
    <div className="home">
      {error ? (
        <div className="errors">{error}</div>
      ) : (
        <BlogList blog={blogs || []} title="All Blogs!" loading={ispending} />
      )}
    </div>
  );
};

export default Home;
