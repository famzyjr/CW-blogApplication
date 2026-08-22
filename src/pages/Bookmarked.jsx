import useFetch from "../../hooks/useFetch";
import BlogList from "../components/BlogList";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";

const Bookmarked = () => {
  const [bookmarked, setBookmarked] = useState([]);

  const { data: blog, ispending } = useFetch(
    "https://cw-blog-backend.onrender.com/api/blogs"
  );

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const key = `Saved_${user.uid}`;

        const saved = JSON.parse(
          localStorage.getItem(key) || "[]"
        );

        setBookmarked(saved);
      } else {
        setBookmarked([]);
      }
    });

    return () => unsubscribe();
  }, []);

  const bookmarkedBlogs = blog?.filter((blogs) =>
    bookmarked.includes(blogs.id)
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
        blog={bookmarkedBlogs || []}
        loading={ispending}
        title="Your bookmarks"
      />
    </main>
  );
};

export default Bookmarked;