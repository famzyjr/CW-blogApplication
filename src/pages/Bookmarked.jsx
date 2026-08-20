import useFetch from "../../hooks/useFetch";
import BlogList from "../components/BlogList";

const Bookmarked = () => {
  const { data: blog, ispending } = useFetch(
    "https://cw-blog-backend.onrender.com/api/blogs"
  );

  const Saved = localStorage.getItem("Bookmarks");

  const BookmarkedIds = Saved ? JSON.parse(Saved) : [];

  const BookmarkedBlogs = blog?.filter((blogs) =>
    BookmarkedIds.includes(blogs.id)
  );

  return (
    <main
      aria-labelledby="bookmarked-heading"
      className="min-h-screen"
    >
      <h1 id="bookmarked-heading" className="sr-only">
        Your bookmarked blogs
      </h1>

      <BlogList
        blog={BookmarkedBlogs}
        loading={ispending}
        title="Your bookmarks"
      />
    </main>
  );
};

export default Bookmarked;