import useFetch from "../../hooks/useFetch";
import BlogList from "../components/BlogList";
const Bookmarked = () => {
  const {
    data:blog,
  } = useFetch("https://cw-blog-backend.onrender.com/api/blogs");
  const Saved = localStorage.getItem("Bookmarks");
  const BookmarkedIds = Saved ? JSON.parse(Saved) : [];
const BookmarkedBlogs = blog?.filter((blogs) =>
  BookmarkedIds.includes(blogs.id)
);
  return <div>
    <BlogList blog={BookmarkedBlogs} title='Your bookmarks'/>
     
    
  </div>;
};

export default Bookmarked;
