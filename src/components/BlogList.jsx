import { Link } from "react-router-dom";
import {
  FiArrowUp,
  FiMessageCircle,
  FiBookmark,
  FiClock,
} from "react-icons/fi";
import BlogSkeleton from '../components/BlogSkeleton'
const BlogList = ({ blog, title, loading }) => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Heading */}
      <h2 className="text-3xl sm:text-4xl font-bold text-center mb-10 sm:mb-14">
        {title}
      </h2>

      {/* Loading State */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
          <BlogSkeleton />
          <BlogSkeleton />
          <BlogSkeleton />
          <BlogSkeleton />
          <BlogSkeleton />
          <BlogSkeleton />
        </div>
      ) : (
        /* Blog Grid */
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
          {blog.map((blogs) => {
            const readingTime = Math.max(
              1,
              Math.ceil(blogs.content.split(" ").length / 200)
            );

            return (
              <article
                key={blogs.id}
                className="flex flex-col h-full min-h-[380px] rounded-3xl border border-gray-200 bg-white p-5 sm:p-6 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
              >
                {/* Author */}
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-[#000] text-white font-semibold text-lg">
                    {blogs.author_name.charAt(0).toUpperCase()}
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 capitalize text-sm sm:text-base">
                      {blogs.author_name}
                    </h4>

                    <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-500 mt-1">
                      <FiClock />
                      <span>{readingTime} min read</span>
                    </div>
                  </div>
                </div>

                {/* Title */}
                <h3 className="mt-5 text-2xl sm:text-3xl font-bold text-gray-900 leading-tight line-clamp-2">
                  {blogs.title}
                </h3>

                {/* Description */}
                <p className="mt-4 text-sm sm:text-base text-gray-500 leading-7 line-clamp-3">
                  {blogs.content}
                </p>

                {/* Footer */}
                <div className="mt-auto pt-8 flex items-center justify-between">
                  <div className="flex items-center gap-4 sm:gap-5 text-gray-500">
                    <button className="flex items-center gap-1 hover:text-black transition">
                      <FiArrowUp />
                      <span className="text-sm">28</span>
                    </button>

                    <button className="flex items-center gap-1 hover:text-black transition">
                      <FiMessageCircle />
                      <span className="text-sm">12</span>
                    </button>

                    <button className="hover:text-black transition">
                      <FiBookmark />
                    </button>
                  </div>

                  <Link
                    to={`/blogs/${blogs.id}`}
                    className="rounded-full bg-black text-white px-5 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base font-medium transition hover:bg-gray-800"
                  >
                    Read More
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default BlogList;