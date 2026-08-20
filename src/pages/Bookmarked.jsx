import useFetch from "../../hooks/useFetch";
import BlogList from "../components/BlogList";

const Bookmarked = () => {
  
  const { data: blog,loading,ispending} = useFetch(
    "https://cw-blog-backend.onrender.com/api/blogs",
  );
  const Saved = localStorage.getItem("Bookmarks");
  const BookmarkedIds = Saved ? JSON.parse(Saved) : [];
  const BookmarkedBlogs = blog?.filter((blogs) =>
    BookmarkedIds.includes(blogs.id),
  );
  return (
    <div>
       <BlogList blog={BookmarkedBlogs} loading={ispending} title="Your bookmarks" />
  
    
    </div>
  );
};

export default Bookmarked;
